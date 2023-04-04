<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
// 引入组件

export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },

  data () {
    return {
      isRouterAlive: true
    }
  },

  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style></style>
