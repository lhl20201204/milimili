<template>
  <div>
    <div class="show-list-wrapper"
         :class="classes||{}"
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
      <List :list="list"
            nullDescription="暂时没有数据">
        <template #content>
          <keep-alive>
            <component :is="childComp" />
          </keep-alive>
          <keep-alive>
            <component :is="childComp"
                       v-for="item in list"
                       :key="item[keyAttr]"
                       :item="item" />
          </keep-alive>
        </template>
      </List>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons-vue'
import List from '@/components/List'
export default defineComponent({
  components: {
    ArrowDownOutlined,
    ArrowUpOutlined,
    List
  },
  props: ['childComp', 'list', 'title', 'keyAttr', 'classes'],
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
