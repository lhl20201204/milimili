<template>
  <div class="loginPage"
       :style="{
  minHeight: '276px',
  height: `calc(100vh - ${formStyle.height})`
  }">
      <div class="card-body">
        <a-form :model="formState"
              name="basic"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed">
        <a-form-item label="Username"
                     name="username"
                     :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item label="Password"
                     name="password"
                     :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item name="remember"
                     :wrapper-col="{ offset: 8, span: 16 }">
          <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
          <span class="register"
                @click="goRegister">没有账号现在去注册
            <ArrowRightOutlined />
          </span>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary"
                    html-type="submit"
                    :disabled="formState.username === '' || formState.password === ''">Submit</a-button>
        </a-form-item>
      </a-form>
      </div>

  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { useStore } from 'vuex'
import config from '@/config'
import { ArrowRightOutlined } from '@ant-design/icons-vue'
import s from '@/service/Login'
export default defineComponent({
  components: {
    ArrowRightOutlined
  },
  setup (props) {
    const storage = sessionStorage // 可能会换sessionstorage待定
    const router = useRouter()
    const store = useStore()
    const onLogin = (username, userId, avatar, introduction, time) => {
      store.commit('changeLoginStatus', true)
      store.commit('changeUserStatus', username)
      store.commit('changeUserId', userId)
      store.commit('changeUserAvatarSrc', avatar)
      store.commit('changeUserIntroduction', introduction)
      store.commit('changeUserTime', time)
      router.push('/home')
      message.success(`${username} 您好！欢迎登录milimili`)
    }

    if (config.hasAccessNotLogin()) {
      onLogin(storage.getItem('currentUser'), storage.getItem('currentUserId'), storage.getItem('currentUserAvatarSrc'), storage.getItem('currentUserIntroduction'), storage.getItem('currentUserTime'))
    }
    const formState = reactive({
      username: '',
      password: '',
      remember: true
    })

    const formStyle = reactive({
      height: ((config.navHeaderHeight.slice(0, -2)) * 1 + (config.layoutContentPadding.slice(0, -2)) * 2 + (config.layoutFooterHeight.slice(0, -2)) * 1) + 'px'
    })

    const onFinish = async values => {
      const { username } = values
      const { data } = await s.getLoginStatus(values)
      if (!data || (typeof data.userId !== 'string')) {
        return message.error('用户名或者密码错误')
      }
      storage.setItem('rememberPassword', values.remember)
      storage.setItem('currentUser', username)
      storage.setItem('currentUserId', data.userId)
      storage.setItem('currentUserAvatarSrc', data.avatar || config.userDefaultImagePath)
      storage.setItem('authority', data.authority || '')
      storage.setItem('currentUserIntroduction', data.introduction || config.defaultIntroduction)
      storage.setItem('currentUserTime', data.userTime)
      onLogin(username, data.userId, storage.getItem('currentUserAvatarSrc'), storage.getItem('currentUserIntroduction'), data.userTime)
    }

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo)
    }

    const goRegister = () => {
      router.push('/register')
    }

    return {
      formStyle,
      formState,
      onFinish,
      onFinishFailed,
      goRegister
    }
  }

})
</script>

<style lang="less" scoped>
@padding: 24px;
.loginPage {
  display: flex;
  justify-content: center;
  align-items: center;
  > .card-body {
    width: 500px;
    border: 1px solid rgba(0,0,0,0.1);
    height: 250px;
    padding: @padding;
    //  定位写死是为了解决从视频详情页跳转到投稿页面的高度塌陷，排查找不出原因，待改进
    position: relative;
    > .ant-form {
      width: 450px;
      height: 200px;
      background: transparent;
      border: none;
      box-shadow: none;
      top: 0;
      left: 0;
      > :deep(.ant-form-item) {
        .register {
           float: right;
           font-size: 8px;
           color: #40a9ff;
           &:hover {
             color: #1890ff;
           }
           }

        > .ant-form-item-label {
          > label {
            color: black;
          }
        }
      }
    }
  }
}
</style>
