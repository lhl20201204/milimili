<template>

  <div class="upload-page">
    <a-card :style="{
      width: '700px'
  }">
      <a-form :model="form"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 12 }"
              @finish="onFinish"
              @finishFailed="onFinishFailed">
        <a-form-item label="
                   视频封面">
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
            <Progress v-if="loading"
                      :style="imageProgressStyle" />
          </span>
        </a-form-item>
        <a-form-item label="上传视频">
          <span>
            <input type="file"
                   id="videoFile"
                   accept=".mp4"
                   @change="videoChange"
                   :style="{display:'none'}" />
            <label for="videoFile">
              <div>
                <UploadOutlined></UploadOutlined>
                <Tooltip :text="!form.video? 'select video' : form.video.name" />
              </div>
            </label>
            <Progress v-if="loading"
                      :style="videoProgressStyle" />
          </span>
        </a-form-item>

        <a-form-item label="视频标题">
          <a-input v-model:value="form.title"
                   :rules="[{ required: true, message: 'Please input your title!' }]"
                   placeholder="听说标题党更吸引流量哦~~" />
        </a-form-item>
        <a-form-item label="视频简介*">
          <a-input v-model:value="form.videoIntroduction"
                   placeholder="可不传*" />
        </a-form-item>
        <a-form-item label="视频标签">
          <span>
            <a-input-search placeholder="标签会给你增加播放量~~"
                            :allowClear="true"
                            size="large"
                            @search="addTag">
              <template #enterButton>
                <a-button>添加标签</a-button>
              </template>
            </a-input-search>
            <div>
              <a-tag v-for="item in form.tag"
                     closable
                     @close.prevent="closeTag(item)"
                     :key="item">{{item}}</a-tag>
            </div>
          </span>

        </a-form-item>
        <a-form-item>
          <a-button type="primary"
                    html-type="submit">
            upload
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>

</template>
<script>

import { UploadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { defineComponent, reactive, ref } from 'vue'
import s from '@/service/Upload'
import Progress from '@/components/Progress'
import Tooltip from '@/components/Tooltip'
import _ from 'lodash'
// import config from '@/config'
export default defineComponent({
  components: {
    UploadOutlined,
    Progress,
    Tooltip
  },
  setup () {
    const form = reactive({
      title: '',
      videoIntroduction: '',
      tag: [],
      image: null,
      video: null
    })
    const videoProgressStyle = reactive({
      ratio: 0
    })
    const imageProgressStyle = reactive({
      ratio: 0
    })
    const loading = ref(false)
    function imageChange (x) {
      form.image = x.target.files[0]
    }
    function videoChange (x) {
      form.video = x.target.files[0]
    }
    const validate = () => {
      if (!form.video) {
        message.error('待上传视频不能为空')
        return false
      }
      if (!form.image) {
        message.error('封面图片不能为空')
        return false
      }
      if (!form.title) {
        message.error('视频标题不能为空')
        return false
      }
      if (!form.tag.length) {
        message.error('视频标签不能为空')
        return false
      }
      return true
    }
    const videoProgress = _.throttle(progressEvent => {
      videoProgressStyle.ratio = Number((progressEvent.loaded / progressEvent.total).toFixed(4))
    }, 1000)

    const imageProgress = _.throttle(progressEvent => {
      imageProgressStyle.ratio = Number((progressEvent.loaded / progressEvent.total).toFixed(4))
    }, 1000)

    const onFinish = async () => {
      if (!validate()) {
        return
      }
      try {
        loading.value = true
        await s._uploadVideo({
          ...form
        }, {
          videoProgress,
          imageProgress
        })
        form.videoIntroduction = ''
        form.title = ''
        form.tag.splice(0, form.tag.length)
        message.success('上传成功')
      } catch (e) {
        message.error('上传失败')
      } finally {
        loading.value = false
      }
    }

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo)
    }

    function addTag (x) {
      if (!x) {
        return message.error('不能添加空标签')
      }
      if (form.tag.includes(x)) {
        return message.error('不能添加重复标签')
      }
      form.tag.push(x)
    }
    const closeTag = (item) => {
      if (form.tag.includes(item)) {
        form.tag.splice(form.tag.indexOf(item), 1)
      }
    }

    return {
      onFinish,
      onFinishFailed,
      form,
      imageChange,
      videoChange,
      loading,
      videoProgressStyle,
      imageProgressStyle,
      addTag,
      closeTag
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
  :deep(.ant-card-body) {
    min-height: 556px;
    padding: @padding;
    //  定位写死是为了解决从视频详情页跳转到投稿页面的高度塌陷，排查找不出原因，待改进
    position: relative;
    > .ant-form {
      background: transparent;
      min-height: 484px;
      min-width: 650px;
      border: none;
      box-shadow: none;
      top: @padding;
      left: @padding;
      > .ant-form-item {
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
          #videoFile ~ label {
            display: inline-block;
            text-align: center;
            width: 127px;
            height: 32px;
            border: 1px solid rgb(200, 212, 221);
            padding: 4px 15px;
            cursor: pointer;
            &:hover {
              border-color: #40a9ff;
              color: #40a9ff;
            }
            > div {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
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
