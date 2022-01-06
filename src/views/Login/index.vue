<template>
<div class="loginPage" :style="{
  minHeight: '276px',
  height:`calc(100vh - ${formStyle.height})`
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
      label="Username"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
  </a-card>
</div>
</template>
<script>
import { defineComponent, reactive, getCurrentInstance } from 'vue'
import { message } from 'ant-design-vue'
import config from '@/config'
export default defineComponent({
  setup () {
    const { proxy } = getCurrentInstance()
    const storage = sessionStorage // 可能会换sessionstorage待定
    const onLogin = (username) => {
      console.log('执行一次')
      const store = proxy.$root.$store
      const router = proxy.$root.$router
      store.commit('changeLoginStatus', true)
      store.commit('changeUserStatus', username)
      router.push('/home')
      message.success(`${username}您好！欢迎登录milimili`)
    }
    console.log(storage.getItem('rememberPassword'))
    if (storage.getItem('rememberPassword') && storage.getItem('currentUser')) {
      console.log('跳转')
      onLogin(storage.getItem('currentUser'))
    }
    const formState = reactive({
      username: '',
      password: '',
      remember: true
    })

    const formStyle = reactive({
      height: config.navHeaderHeight
    })

    const onFinish = values => {
      const { username } = values
      storage.setItem('rememberPassword', values.remember)
      storage.setItem('currentUser', username)
      onLogin(username)
    }

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo)
    }

    return {
      formStyle,
      formState,
      onFinish,
      onFinishFailed
    }
  }

})
</script>

<style lang="less" scoped>
.loginPage{
   display: flex;
   justify-content: center;
   align-items: center;
}
</style>
