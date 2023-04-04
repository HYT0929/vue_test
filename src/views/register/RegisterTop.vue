<template>
  <div id="topTitle">
    <h1>{{ msg1 }}</h1>
  </div>
</template>

<script>
export default {
  name: 'v-RegisterTop',
  data () {
    return {
      msg1: '社区疫情防控管理系统'
    }
  }
}
</script>

<style>
#topTitle {
  text-align: center;
  /* 字间距 */
  letter-spacing: 10px;
  color: #fff;
  font-size: 20px;
  /* 阴影发光效果 */
  text-shadow: 0 0 10px #00BFFF,0 0 20px #00BFFF,0 0 30px #00BFFF;
}
</style>
