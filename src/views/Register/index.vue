<template>
<div class="registerPage" :style="{
  minHeight: '276px',
  height: `calc(100vh - ${formStyle.height})`
  }">
 <a-card style="width: 500px">
   <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="昵称"
      name="username"
      :rules="[{ required: true, message: '请输入你要注册的昵称!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
      label="密码"
      name="password"
      :rules="[{ required: true, message: '请输入你要注册的密码!!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <span class="login" @click="goLogin">回到登录页面 <ArrowLeftOutlined/> </span>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit"
      :disabled="formState.username === '' || formState.password === ''">注册</a-button>
    </a-form-item>
  </a-form>
  </a-card>
</div>
</template>
<script>
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import config from '@/config'
import s from '@/service/Register'
export default defineComponent({
  components: {
    ArrowLeftOutlined
  },
  setup (props) {
    const router = useRouter()
    const formState = reactive({
      username: '',
      password: ''
    })
    const formStyle = reactive({
      height: ((config.navHeaderHeight.slice(0, -2)) * 1 + (config.layoutContentPadding.slice(0, -2)) * 2 + (config.layoutFooterHeight.slice(0, -2)) * 1) + 'px'
    })
    const onFinish = async values => {
      const time = config.time()
      const timeStr = {
        message: time,
        reply: time,
        love: time,
        notice: time
      }
      const { data } = await s.getRegisterStatus({
        ...values,
        avatar: config.defaultNewUserAvatar,
        userTime: JSON.stringify(timeStr)
      })
      if (!data) {
        message.error('注册失败')
      }
      const condition = data.code && ('' + data.code)[0] === '2'
      if (condition) {
        formState.username = ''
        formState.password = ''
        message.success(data.msg)
      } else {
        message.error(data.msg)
      }
    }

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo)
    }

    const goLogin = () => {
      router.push('/login')
    }

    return {
      formStyle,
      formState,
      onFinish,
      onFinishFailed,
      goLogin
    }
  }

})
</script>

<style lang="less" scoped>
.registerPage{
   display: flex;
   justify-content: center;
   align-items: center;
   .login{
     float: right;
     font-size:8px ;
     color:#40a9ff;
     &:hover {
       color: #1890ff;
     }
   }
}

</style>
