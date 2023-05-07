<template>
  <div id="manageTopTitle">
    <p>{{ msg1 }}</p>
    <div class="right">
      <p style="margin-right: 20px">欢迎您,{{ userName }}!</p>
      <button id="returnBtn" @click="returnRegister">退出</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-ManageTop',
  data() {
    return {
      userName: '',
      msg1: '社区疫情防控管理系统'
    }
  },
  methods: {
    returnRegister() {
      //  路径/home对应我在router目录下index.js中定义的path属性值
      this.$LocalStorage.CookiesRemove('userInfo')
      this.$router.push('/')
    }
  },
  mounted() {
    this.userName = this.$LocalStorage.CookiesGet('userInfo').name
  }
}
</script>

<style>
#manageTopTitle {
  display: inline-block;
  vertical-align: middle;
  height: 60px;
  width: 100%;
  background-color: #2B4BA4;
}

.right {
  float: right;
  line-height: 60px;
}

#manageTopTitle p {
  margin-left: 8px;
  line-height: 60px;
  float: left;
  color: azure;
  font-size: 20px;
  font-weight: 600;
}

#returnBtn {
  margin-right: 10px;
  height: 36px;
  margin-top: 12px;
  width: 72px;
  border: 0;

  border-radius: 10px;
  background-color: #B6D6FF;
  color: #000;
}

#returnBtn:hover {
  background-color: #FFF0F5;
  color: #000;
}
</style>
