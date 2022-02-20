<template>
  <List :list="complaint"
        loadingTip="complaint loading..."
        nullDescription="暂时没有需要审核的视频">
    <template #content>
      <a-table :dataSource="complaint.map(v=>({
        ...v,
        key:v.complaintId}))"
               bordered
               :columns="columns">
      </a-table>
    </template>
  </List>
</template>

<script>
import { defineComponent, inject } from 'vue'
import List from '@/components/List'
import ShowDetailItem from './ShowDetailItem'
export default defineComponent({
  components: {
    List
  },
  setup () {
    const { v: complaint } = inject('complaint')
    return {
      complaint,
      columns: [
        {
          title: '举报类型',
          dataIndex: 'type'
        },
        {
          title: '举报用户',
          dataIndex: 'originUserId'
        },
        {
          title: '被举报用户',
          dataIndex: 'targetUserId'
        },
        {
          title: '举报时间',
          dataIndex: 'complaintTime'
        },
        {
          title: '操作',
          customRender: ({ record }) => (<ShowDetailItem item={record}> </ShowDetailItem>)
        }
      ]
    }
  }

})
</script>

<style lang="less" scoped>
</style>
