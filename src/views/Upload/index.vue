<template>
<div class="upload">
   <a-upload
    v-model:file-list="fileList"
    name="file"
    :multiple="true"
    action="http://localhost:8080"
    :headers="headers"
    @change="handleChange"
  >
    <a-button>
      <upload-outlined></upload-outlined>
      Click to Upload
    </a-button>
  </a-upload>
  <a-upload
    v-model:file-list="fileList2"
    name="avatar"
    list-type="picture-card"
    class="avatar-uploader"
    :show-upload-list="false"
    action="http://localhost:8080"
    :before-upload="beforeUpload"
    @change="handleChange2"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
      <loading-outlined v-if="loading"></loading-outlined>
      <plus-outlined v-else></plus-outlined>
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
</div>

</template>
<script>
import { message } from 'ant-design-vue'
import { UploadOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue'

// function getBase64 (img, callback) {
//   const reader = new FileReader()
//   reader.addEventListener('load', () => callback(reader.result))
//   reader.readAsDataURL(img)
// }
export default defineComponent({
  components: {
    LoadingOutlined,
    PlusOutlined,
    UploadOutlined
  },

  setup () {
    const handleChange = info => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }

      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }

    const fileList = ref([])

    const fileList2 = ref([])
    const loading = ref(false)
    const imageUrl = ref('')

    const handleChange2 = info => {
      if (info.file.status === 'uploading') {
        loading.value = true
      }
    }

    const beforeUpload = file => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'

      if (!isJpgOrPng) {
        message.error('You can only upload JPG file!')
      }

      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
      }

      return isJpgOrPng && isLt2M
    }
    return {
      fileList,
      headers: {
        authorization: 'authorization-text'
      },
      handleChange,
      fileList2,
      loading,
      imageUrl,
      handleChange2,
      beforeUpload
    }
  }

})
</script>
<style lang="less" scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.upload {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
}
</style>
