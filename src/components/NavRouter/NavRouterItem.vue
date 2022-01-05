<template>
  <div class="nav_router_item"
       ref="nav_item">
    <span>{{navRouterItem.title}}</span>
  </div>
</template>

<script>
export default {
  props: {
    navRouterItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      isHovering: false
    }
  },
  methods: {
    toggleHover () {
      this.isHovering = !this.isHovering
      console.log(this.isHovering)
    }
  },
  mounted () {
    if (this.navRouterItem.type === 'hover') {
      if (this.navRouterItem.path === 'game') {
        this.$addHover(this.$refs.nav_item, 'HoverGame')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.nav_router_item {
  height: 100%;
}
</style>
