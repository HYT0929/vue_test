<template>
  <div>
    <div class="nav">
      <div class="userpic">
        <img src="../../assets/house.png" alt=""/>
      </div>
      <el-menu default-active="1"
               background-color="#00000000"
               @open="handleOpen"
               @select="handleSelect"
               @close="handleClose">
        <el-menu-item index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span style="font-size: 18px">用户信息</span>
          </template>
        </el-menu-item>
        <el-menu-item index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span style="font-size: 18px">健康上报</span>
          </template>
        </el-menu-item>
        <el-menu-item index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span style="font-size: 18px">返程申请</span>
          </template>
        </el-menu-item>
        <el-menu-item index="4">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span style="font-size: 18px">疫情公告</span>
          </template>
        </el-menu-item>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span style="font-size: 18px">物资信息</span>
          </template>
          <el-menu-item-group>
            <el-menu-item style="min-width: auto" index="5-1" slot="title">物资列表</el-menu-item>
            <el-menu-item style="min-width: auto" index="5-2" slot="title">申请审核</el-menu-item>
            <el-menu-item style="min-width: auto" index="5-3" slot="title">发布审核</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

      </el-menu>
    </div>
    <div class="tab_content">
      <keep-alive>
        <component :is="comp" v-show="isShow"></component>
      </keep-alive>
    </div>

  </div>

</template>

<script>
import UserManage from '../user/userInfo.vue'
import HealthReport from '../user/healthReport.vue'
import HealthApprove from '../user/healthApprove.vue'
import Notice from '../user/notice.vue'
import ThingsList from '../things/thingsList.vue'
import ThingsApplicateApprove from '../things/thingsApplicateApprove.vue'
import ThingsPublishApprove from '../things/thingsPublishApprove.vue'

export default {
  name: 'v-ManageRight',
  components: {
    UserManage,
    HealthReport,
    HealthApprove,
    Notice,
    ThingsList,
    ThingsApplicateApprove,
    ThingsPublishApprove
  },
  data() {
    return {
      // 控制切换按钮后按钮改变样式
      index: 1,
      // 控制子组件显示
      comp: '',
      // 控制点击按钮后子组件显示，再次点击隐藏
      isShow: true
    }
  },
  mounted() {
    this.show('1')
  },
  methods: {
    show(value) {
      if (this.index === value) {
        this.index = '0'
      } else {
        this.index = value
        this.isShow = true
      }
      if (value === '1') this.comp = 'UserManage'
      if (value === '2') this.comp = 'HealthReport'
      if (value === '3') this.comp = 'HealthApprove'
      if (value === '4') this.comp = 'Notice'
      if (value === '5-1') this.comp = 'ThingsList'
      if (value === '5-2') this.comp = 'ThingsApplicateApprove'
      if (value === '5-3') this.comp = 'ThingsPublishApprove'
    },
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    handleSelect(key, keyPath) {
      this.show(key)
    }
  }
}
</script>

<style>
.nav {
  float: left;
  height: auto;
  width: 10%;
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
