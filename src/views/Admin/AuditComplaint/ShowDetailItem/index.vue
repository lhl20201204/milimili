<template>
  <ButtonModal :noprimary="true"
               :bodyStyle="{
                }"
               :disabled="item.hadHandleItem"
               :btnText="item.hadHandleItem? '已处理':'查看详情'"
               :handleOk="()=>(failVisible=false)"
               :footer="null"
               :show="failVisible"
               :title="item.type+'Id'+item.typeId+'详情'"
               :changeVisible="(x)=>(failVisible=x)">
    <template #content>
      <div v-if="item.type==='video'"
           :style="{
        width: '472px',
        height: '330px',
        background: 'black',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center'
      }">
        <a-spin tip="loading"
                v-if="!item.videoId || item.videoId === nullValue" />
        <Video v-else
               :v="item"
               width="472px"
               height="330px"
               :changeCurrentTime="() => null"
               :isNotNeedAddeventListener="true" />
      </div>
      <br />
      <AuditVideoDetail v-if="item.type==='video'"
                        :item="item">
        <template #content>
          <a-descriptions-item label="举报原因"
                               class="tooltip">
            <Tooltip :text="item.complaintContent" />
          </a-descriptions-item>
        </template>
      </AuditVideoDetail>
      <ShowCommentDetail v-else-if="item.type==='comment'"
                         :item="item">
        <template #content>
          <a-descriptions-item label="举报原因"
                               class="tooltip">
            <Tooltip :text="item.complaintContent" />
          </a-descriptions-item>
        </template>
      </ShowCommentDetail>
      <br />
      <a-textarea placeholder="操作原因必填"
                  v-model:value="failReason">
      </a-textarea>
      <br />
      <br />
      <a-space>
        <a-popconfirm :title="'你确定要退回'+item.type+item.typeId+'吗？'"
                      @confirm="needUserEditItem">
          <template #icon>
            <question-circle-outlined style="color: red" />
          </template>

          <a-button type="primary"
                    :disabled="failReason===''">退回</a-button>

        </a-popconfirm>

        <a-popconfirm :title="'你确定要删除'+item.type+item.typeId+'吗？'"
                      @confirm="deleteItem">
          <template #icon>
            <question-circle-outlined style="color: red" />
          </template>

          <a-button type="primary"
                    :disabled="failReason===''">删除</a-button>

        </a-popconfirm>
      </a-space>

    </template>
  </ButtonModal>
</template>

<script>
import { defineComponent, ref } from 'vue'
import ButtonModal from '@/components/ButtonModal'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import config from '@/config'
import s from '@/service/Admin'
import uploadService from '@/service/Upload'
import { useStore } from 'vuex'
import Video from '@/components/Video'
import AuditVideoDetail from '@/views/Admin/AuditVideo/AuditVideoDetail'
import ShowCommentDetail from './ShowCommentDetail'
import Tooltip from '@/components/Tooltip'
export default defineComponent({
  components: {
    ButtonModal,
    QuestionCircleOutlined,
    Video,
    AuditVideoDetail,
    ShowCommentDetail,
    Tooltip
  },
  props: ['item'],
  setup (props) {
    const failVisible = ref(false)
    const store = useStore()
    const failReason = ref('')
    let loading = false
    const handleItem = async (method, auditing, content, isDelete) => {
      if (loading) {
        return message.error('操作中请稍后')
      }
      loading = true
      const obj = {}
      obj[props.item.type + 'Id'] = props.item[props.item.type + 'Id']
      await method({
        ...obj,
        auditing
      })
      await s.insertNotice({
        time: config.time(),
        userId: store.state.userId,
        type: props.item.type,
        typeId: props.item[props.item.type + 'Id'],
        noticedUserId: props.item.userId,
        content,
        status: isDelete ? config.auditStatusDelete : config.auditStatusBeReturned
      })
      await s.updateComplaint({
        complaintId: props.item.complaintId,
        auditing: config.complaintDoneStatus
      })
      loading = false
    }
    const needUserEditItem = async () => {
      if (!failReason.value) {
        return message.error('原因不能为空')
      }
      if (typeof props.item.setHandleItem !== 'function') {
        return message.error('没有setHandleItem方法')
      }
      if (props.item.type === 'video') {
        await handleItem(uploadService.updateVideo, config.videoNeedEdit,
          failReason.value)
      } else if (props.item.type === 'comment') {
        await handleItem(s.updateComment, config.commentNeedEdit,
          failReason.value
        )
      } else {
        return message.error('暂不支持')
      }

      failVisible.value = false
      props.item.setHandleItem(true)
      message.success(config.videoControlAttrMeanSubRoute[props.item.type] + '退回成功')
    }
    const deleteItem = async () => { // 删除修改分开写，以防后面逻辑变更，难修改
      if (!failReason.value) {
        return message.error('原因不能为空')
      }
      if (typeof props.item.setHandleItem !== 'function') {
        return message.error('没有setHandleItem方法')
      }
      if (props.item.type === 'video') {
        await handleItem(uploadService.deleteVideo, config.videoBeDeleted, failReason.value, true)
      } else if (props.item.type === 'comment') {
        await handleItem(s.deleteComment, config.commentBeDeleted, failReason.value, true
        )
      } else {
        return message.error('暂不支持')
      }
      failVisible.value = false
      props.item.setHandleItem(true)
      message.success(config.videoControlAttrMeanSubRoute[props.item.type] + '删除成功')
    }
    return {
      deleteItem,
      needUserEditItem,
      failVisible,
      failReason,
      nullValue: config.nullValue
    }
  }
})
</script>
