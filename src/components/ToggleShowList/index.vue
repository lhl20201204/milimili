<template>
  <div>
    <div class="show-list-wrapper"
         :class="{
           'not-allow': list.length === 0
         }"
         @click="folder=!folder">
      <span>{{title}}</span>
      <span>{{list.length}}
      </span>
      <span v-show="folder">展开
        <ArrowDownOutlined />
      </span>
      <span v-show="!folder">收起
        <ArrowUpOutlined />
      </span>

    </div>
    <div class="show-list"
         v-show="!folder"
         :class="{'solid-height':list.length>20}">
      <keep-alive>
        <component :is="childComp" />
      </keep-alive>

      <keep-alive>
        <component :is="childComp"
                   v-for="item in list"
                   :key="item[keyAttr]"
                   :item="item" />
      </keep-alive>

    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  components: {
    ArrowDownOutlined,
    ArrowUpOutlined
  },
  props: ['childComp', 'list', 'title', 'keyAttr'],
  setup () {
    const folder = ref(true)
    return {
      folder
    }
  }
})
</script>
<style lang="less" scoped>
.show-list-wrapper {
  height: 45px;
  width: 100%;
  margin-top: 5px;
  background: #f4f4f4;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 45px;
}
.not-allow {
  cursor: not-allowed;
}

.show-list {
  width: 100%;
}
.solid-height {
  height: 400px;
  overflow-y: scroll;
}
</style>
