<template>
<div>
  <div class="nav">
    <div class="userpic">
      <img src="../../assets/house.png" alt="" />
    </div>
    <ul>
      <li @click="show(1)" :class="index===1? 'active':''">用户信息</li>
      <li @click="show(2)" :class="index===1? 'active':''">健康上报</li>
      <li @click="show(3)" :class="index===1? 'active':''">申请审核</li>
      <li @click="show(4)" :class="index===1? 'active':''">疫情公告</li>
      <li @click="show(5)" :class="index===1? 'active':''">物资信息</li>
    </ul>
  </div>
  <div class="tab_content">
    <keep-alive>
       <component :is="comp" v-show="isShow"></component>
    </keep-alive>
  </div>

</div>

</template>

<script >
import One from '../user/userInfo.vue'
import Two from '../user/healthReport.vue'
import Three from '../user/healthCheck.vue'
import Four from '../user/notice.vue'
import Five from '../user/goods.vue'

export default {
  name: 'v-ManageRight',
  components: {
    One,
    Two,
    Three,
    Four,
    Five
  },
  data () {
    return {
      // 控制切换按钮后按钮改变样式
      index: 1,
      // 控制子组件显示
      comp: 'one',
      // 控制点击按钮后子组件显示，再次点击隐藏
      isShow: true
    }
  },
  methods: {
    show (value) {
      if (this.index === value) {
        this.index = 0
      } else {
        this.index = value
        this.isShow = true
      }
      if (value === 1) this.comp = 'One'
      if (value === 2) this.comp = 'Two'
      if (value === 3) this.comp = 'Three'
      if (value === 4) this.comp = 'Four'
      if (value === 5) this.comp = 'Five'
    }
  }
}
</script>

<style>
.nav {
  float: left;
  height: auto;
  width: 10%;
  background-color: #2b4ba4;
}
.nav ul {
  margin: 0 auto;
  margin-top: 20px;
  height: 400px;
  width: 140px;
  list-style-type:none;
}
.nav li {
  margin-top: 10px;
  line-height: 40px;
  height: 40px;
  width: 140px;
  color: #fff;
  text-align: center;
  font-size: 18px;
}
.nav li:hover {
  background-color: #fff;
  color: #000;
}
.userpic {
  margin: 0 auto;
  margin-top: 20px;
  height: 120px;
  width: 120px;
  background-color: #fff;
  border-radius: 50%;
  overflow: hidden;
}
.userpic img {
  height: 120px;
  width: 120px;
}
</style>
