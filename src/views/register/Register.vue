<template>
  <div id="container">
    <div id="topBox">
      <vRegisterTop></vRegisterTop>
    </div>
    <div id="bodyBox">
      <vRegisterbody></vRegisterbody>
    </div>
  </div>
</template>

<script>
// 引入组件
import vRegisterTop from '../register/RegisterTop.vue'
import vRegisterbody from '../register/RegisterBody.vue'

export default {
  name: 'Register',
  components: {
    vRegisterTop,
    vRegisterbody
  },
  beforeCreate () {
    document.querySelector('body').classList.add('registerBody')
  },
  beforeDestroy () {
    document.querySelector('body').classList.remove('registerBody')
  }
}
</script>

<style>
.registerBody{
  background-image: url('../../assets/display.jpg');
  background-size:cover;
  overflow: hidden;
}
#container{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
#topBox{
  height: 100px;
  width: 100%;
}
#bodyBox{
  margin: 20px auto;
  box-shadow: 0 0 20px 5px #00BFFF;
  border-radius: 30px;
}
</style>
