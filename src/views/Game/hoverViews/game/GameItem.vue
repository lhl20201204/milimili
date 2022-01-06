<template>
  <div class="game_icon_parent"
       @click="goGame">
    <img :src="baseUrl+item.path"
         class="game_icon"> <span>{{item.name}}</span>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data () {
    return {
      baseUrl: this.$store.state.baseURL
    }
  },
  methods: {
    goGame () {
      if (this.$route.path !== '/' + this.item.path) {
        this.$router.push('/' + this.item.path)
      }
    }
  }
}
</script>

<style>
.game_icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  vertical-align: middle;
}
.game_icon_parent {
  text-align: left;
}
.game_icon_parent:hover > span {
  color: red;
}
</style>
