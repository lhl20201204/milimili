<template>
    <a-card>
      <List :list="list"
            loadingTip="loading..."
            nullDescription="暂时没有需要修改的">
        <template #content>
          <div class="edit">
            <div>
              <component :is="comp"
                         :item="list[current-1]" />
            </div>
            <div>
              <a-table :dataSource="list[current-1].notice.map(v=>({
        ...v,
        key:v.noticeId}))"
                       :columns="columns" />
              <a-pagination v-model:current="current"
                            :pageSize="1"
                            :total="list.length" />
            </div>
          </div>
        </template>
      </List>
    </a-card>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import List from '@/components/List'
import config from '@/config'
export default defineComponent({
  props: ['list', 'comp'],
  components: {
    List
  },
  setup (props) {
    const current = ref(1)
    watch(() => props.list.length, () => {
      if (current.value > props.list.length) {
        current.value = 1
      }
    })
    return {
      current,
      columns: [
        {
          title: '通知时间',
          dataIndex: 'time'
        },
        {
          title: '内容',
          dataIndex: 'content'
        },
        {
          title: '类型',
          customRender: ({ record }) => (<span>{config.auditStatusMeans[0][record.status]} </span>) // 这里暂定
        }
      ]
    }
  }

})
</script>
<style lang="less" scoped>
.edit {
  display: flex;
  > div {
    margin: 10px;
    &:first-child {
      flex: 2;
    }
    &:last-child {
      flex: 1;
    }
  }
}
</style>
