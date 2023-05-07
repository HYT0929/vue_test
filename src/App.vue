<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },

  data() {
    return {
      isRouterAlive: true
    }
  },

  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  mounted() {
    if (!this.$LocalStorage.GetUserId) {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style></style>
