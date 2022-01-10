<template>
  <div class="home">
    <img alt="Vue logo"
         src="@/assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <Loading :promiseInstance="promise" :successComp="comp" />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import { defineComponent, getCurrentInstance } from 'vue'
import Loading from '@/components/Loading'
import config from '@/config'
export default defineComponent(
  {
    components: {
      HelloWorld,
      Loading
    },
    setup () {
      function getP () {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            Math.random() > 0.5 ? reject(new Error(1)) : resolve(1)
          }, 3000)
        })
      }
      console.log(config.CrownOutlined, getCurrentInstance())
      return {
        promise: getP,
        Loading,
        comp: {
          render () {
            const tag = 'h1'
            return <tag>我是{tag}</tag>
          }
        }
      }
    }
  })
</script>
