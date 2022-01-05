<template>
  <div class="triangleShape"
       :style="' border: '+width+'px solid transparent;border-'+direction+': '+height+'px solid '+color+';'"> </div>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: 'bottom'
    },
    width: {
      type: Number,
      default: 6
    },
    height: {
      type: Number,
      default: 8
    },
    color: {
      type: String,
      default: 'red'
    }
  }
}
</script>

<style>
.triangleShape {
  width: 0;
  height: 0;
}
</style>
