<template>
  <span @click="()=>visible=true">
    <a-tag>
      <slot name="text"> </slot>
      <span class="tooltip number">
        <Tooltip :text="list.length" />
      </span>
    </a-tag>
    <a-modal v-model:visible="visible"
             :footer="null"
             :title="(type==='subscribes'?'关注':'粉丝') + ' 列表'"
             @ok="()=>visible=false">
      <List :list="list"
            :nullDescription="'暂时没有'+ type + '信息'">
        <template #content>
          <a-table :dataSource="list.map(v=>({
        ...v,
        introduction:v.introduction||defaultIntroduction,
        key:v.userId}))"
                   bordered
                   :columns="columns">
          </a-table>
        </template>
      </List>
    </a-modal>
  </span>

</template>

<script>
import { defineComponent, ref } from 'vue'
import Tooltip from '@/components/Tooltip'
import List from '@/components/List'
import DynamicAvatar from '@/components/DynamicAvatar'
import TooltipItem from '@/components/TooltipItem'
import config from '@/config'
export default defineComponent({
  components: {
    Tooltip,
    List
  },
  props: ['list', 'type'],
  setup (props) {
    const visible = ref(false)
    const columns = [
      {
        title: '昵称',
        customRender: ({ record }) => (<TooltipItem text={record.account} width={10} />)
      },
      {
        title: '头像',
        customRender: ({ record }) => (<DynamicAvatar item={record} />)
      },
      {
        title: '简介',
        dataIndex: 'introduction'
      },
      {
        title: '关注时间',
        dataIndex: 'time'
      }
    ]
    return {
      visible,
      columns,
      defaultIntroduction: config.defaultIntroduction
    }
  }

})
</script>
<style lang="less" scoped>
</style>
