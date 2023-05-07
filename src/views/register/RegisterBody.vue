<template>
  <div id="login">
    <div class="circle">
      <img src="../../assets/userpic1.png" alt=""/>
    </div>
    <div id="inputBox1">
      <input class="loginBox" v-model="phone" placeholder="请输入手机号码"/>
      <input class="loginBox" v-model="pwd" type="password" placeholder="请输入密码"/>
    </div>
    <div>
      <button id="loginBtn" @click="handle()">Login</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'v-RegisterBody',
  data() {
    return {
      phone: this.phone,
      pwd: this.pwd
    }
  },
  mounted() {
    console.log(this.$LocalStorage.GetUserInfo())
    if (this.$LocalStorage.GetUserInfo()) {
      this.$router.push({path: '/manage'})
    }
  },
  methods: {
    handle() {
      //  路径/home对应我在router目录下index.js中定义的path属性值
      // this.$router.push('/manage')
      const that = this
      axios.post('/api' + '/user/adminLogin', {phone: this.phone, pwd: this.pwd})
        .then(function (response) {
          // handle success
          if (response.data.code === 1) {
            that.$LocalStorage.CookiesPut('userInfo', response.data.data)
            that.$message.success('登录成功')
            that.$router.push({path: '/manage'})
          } else {
            that.$message.error(response.data.msg)
          }
        })
        .catch(function (error) {
          // handle error
          that.$message.error(error)
        })
    }
  }
}
</script>

<style>
.circle {
  float: left;
  margin: 20px auto 0 auto;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  overflow: hidden;
}

.circle img {
  height: 150px;
  width: 150px;
}

#login {
  display: flex;
  flex-direction: column;
  height: 520px;
  width: 400px;
  background-color: #f0ffff;
  border-radius: 30px;
  /* 透明度 */
  background: rgba(0, 0, 0, 0.5);
}

#inputBox1 {
  display: flex;
  flex-direction: column;
  /* background-color: pink; */
  height: 160px;
  width: 360px;
  margin: 20px auto 0 auto;
}

.loginBox {
  margin: auto;
  height: 30px;
  width: 300px;
  font-size: 18px;
  color: #fff;
  background: rgba(0, 0, 0, 0);
  border: 0;
  border-bottom: 2px solid #fff;
}

.loginBox::placeholder {
  color: #fff;
}

.loginBox:hover {
  box-shadow: 0 15px 20px -5px #00bfff;
}

input:focus {
  outline: none;
}

#loginBtn {
  margin-top: 60px;
  position: absolute;
  left: 50%;
  margin-left: -100px;
  width: 200px;
  height: 50px;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  background-image: linear-gradient(
    to right bottom,
    #7fffaa 0%,
    #87cefa 50%,
    #7b68ee 100%
  );
  border: 0;
  border-radius: 30px;
}

#loginBtn:hover {
  box-shadow: 0 0px 20px 2px #00bfff;
  font-size: 26px;
}
</style>
