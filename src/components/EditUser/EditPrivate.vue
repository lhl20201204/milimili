<template>
  <div class="upload-page">
    <div class="card-body">
       <a-form :model="form"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 12 }"
              @finish="onFinish"
              @finishFailed="onFinishFailed">
        <a-form-item label="更换封面*">
          <span>
            <input type="file"
                   id="imageFile"
                   accept=".jpg,.png,.jpeg"
                   @change="imageChange"
                   :style="{display:'none'}" />
            <label for="imageFile">
              <div>
                <UploadOutlined></UploadOutlined>
                <div>
                  <Tooltip :text="!form.image ? 'select Image' : form.image.name" />
                </div>
              </div>
            </label>
            <Progress v-if="loading&&form.image"
                      :style="imageProgressStyle" />
          </span>
        </a-form-item>

        <a-form-item label="账号*">
          <a-input v-model:value="form.account"
                   :rules="[{ required: true, message: 'Please input your title!' }]"
                   placeholder="随便填" />
        </a-form-item>
        <a-form-item label="密码*">
          <a-input v-model:value="form.pwd"
                   :rules="[{ required: true, message: 'Please input your title!' }]"
                   placeholder="随便填" />
        </a-form-item>
        <a-form-item label="个性签名*">
          <a-input v-model:value="form.introduction"
                   placeholder="随便填" />
        </a-form-item>

        <a-form-item>
          <a-button type="primary"
                    html-type="submit">
              修改
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>

</template>
<script>

import { UploadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { defineComponent, inject, reactive, ref } from 'vue'
import s from '@/service/User'
import Progress from '@/components/Progress'
import Tooltip from '@/components/Tooltip'
import _ from 'lodash'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import config from '@/config'
export default defineComponent({
  props: ['item'],
  components: {
    UploadOutlined,
    Progress,
    Tooltip
  },
  setup (props) {
    const form = reactive({
      account: '',
      pwd: '',
      introduction: '',
      image: null
    })
    const store = useStore()
    const router = useRouter()
    const imageProgressStyle = reactive({
      ratio: 0
    })
    const loading = ref(false)
    function imageChange (x) {
      form.image = x.target.files[0]
    }

    const imageProgress = _.throttle(progressEvent => {
      imageProgressStyle.ratio = Number((progressEvent.loaded / progressEvent.total).toFixed(4))
    }, 1000)
    const clearNavRouter = inject('clearNavRouter')
    const onFinish = async () => {
      try {
        loading.value = true
        await s._updateUserMessage(form, {
          imageProgress
        })
        console.log('修改', form)
        form.introduction = ''
        form.account = ''
        form.pwd = ''
        sessionStorage.setItem('rememberPassword', '')
        sessionStorage.setItem('currentUser', '')
        sessionStorage.setItem('currentUserId', '')
        sessionStorage.setItem('currentUserAvatarSrc', '')
        sessionStorage.setItem('currentUserIntroduction', '')
        sessionStorage.setItem('currentUserTime', '')
        Reflect.deleteProperty(config.avatarCacheMap, store.state.userAvatarSrc)
        Reflect.deleteProperty(config.userMessageCacheMap, store.state.userId)
        store.commit('changeUserAvatarSrc', '')
        store.commit('changeUserStatus', '')
        clearNavRouter()
        router.push('/login')
        message.success('更新成功, 需重新登录')
      } catch (e) {
        message.error('更新失败')
      } finally {
        loading.value = false
      }
    }

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo)
    }

    return {
      onFinish,
      onFinishFailed,
      form,
      imageChange,
      loading,
      imageProgressStyle
    }
  }

})
</script>
<style lang="less" scoped>
@padding: 24px;
.upload-page {
  display: flex;
  justify-content: center;
  align-items: center;
  > .card-body {
    width: 700px;
    border: 1px solid rgba(0,0,0,0.1);
    height: 400px;
    padding: @padding;
    //  定位写死是为了解决从视频详情页跳转到投稿页面的高度塌陷，排查找不出原因，待改进
    position: relative;
    > .ant-form {
      width: 422px;
      height: 352px;
      background: transparent;
      border: none;
      box-shadow: none;
      top: @padding;
      left: @padding;
      > :deep(.ant-form-item) {
        &:last-child {
          display: flex;
          justify-content: center;
          button {
            width: 100%;
          }
        }
        > .ant-form-item-label {
          > label {
            color: black;
          }
        }
        > .ant-form-item-control {
          #imageFile ~ label {
            display: inline-block;
            text-align: center;
            width: 102px;
            height: 102px;
            border: 1px dashed rgb(200, 212, 221);
            cursor: pointer;
            padding: 8px;
            &:hover {
              border-color: #1890ff;
            }
            > div {
              width: 86px;
              height: 44px;
              margin: 21px 0;
              > div {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
  }
}
</style>
