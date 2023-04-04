<template>
  <div id="textbox">
    <vManageTop></vManageTop>
    <vManageLeft></vManageLeft>
  </div>
</template>

<script>
import vManageTop from './manageTop.vue'
import vManageLeft from './manageLeft.vue'

export default {
  // 注入依赖
  inject: ['reload'],
  name: 'Manage',
  components: {
    vManageTop,
    vManageLeft
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
  }
#textbox{
  height: 100%;
  width: 100%;
  background-color: #fff;
}
</style>
