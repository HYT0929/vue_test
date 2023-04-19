<template>
  <transition name="dialog-fade">
    <el-dialog
      v-if="showDialog"
      :title="dialogTitle"
      class="dialog-component"
      :visible.sync="showDialog"
      width="500px"
      @close="closeDialog(0)"
      @confirmListener="confirmListener()"
    >
      <el-form
        ref="formInfo"
        :model="formInfo"
        class="demo-form-inline"
        label-width="80px"
      >
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="formInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" prop="idNo">
          <el-input v-model="formInfo.idNo"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：" prop="phone">
          <el-input v-model="formInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="住址：" prop="address">
          <el-input v-model="formInfo.address"></el-input>
        </el-form-item>
        <el-form-item label="出发地：" prop="from_region">
          <el-input v-model="formInfo.from_region"></el-input>
        </el-form-item>
        <el-form-item label="返回时间：" prop="back_date">
          <el-input v-model="formInfo.back_date"></el-input>
        </el-form-item>
        <el-form-item label="交通方式：" prop="traffic">
          <el-input v-model="formInfo.traffic"></el-input>
        </el-form-item>
        <el-form-item label="车次/车牌号码：" prop="traffic_detail">
          <el-input v-model="formInfo.traffic_detail"></el-input>
        </el-form-item>
        <el-form-item label="审批状态：" prop="status">
          <el-input v-model="formInfo.status"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right;">
          <el-button @click="closeDialog(0)">关 闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </transition>
</template>

<script>

export default {
  name: 'DialogCheck',
  props: {
    dialogTitle: {
      type: String,
      default: '申请详情'
    },
    itemInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      showDialog: false,
      formInfo: JSON.parse(JSON.stringify(this.itemInfo)),
      confirmListener (formInfo) {

      }
    }
  },
  methods: {
    // 关闭弹框
    closeDialog (flag) {
      this.showDialog = false
      this.$emit('closeDialog', flag)
    }
  }
}
</script>

<style scoped lang="scss">
.dialog-fade-enter-active {
  -webkit-animation: dialog-fade-in 0.3s;
  animation: dialog-fade-in 0.3s;
}
.dialog-fade-leave-active {
  -webkit-animation: dialog-fade-out 0.3s;
  animation: dialog-fade-out 0.3s;
}
@-webkit-keyframes dialog-fade-in {
  0% {
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@keyframes dialog-fade-in {
  0% {
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@-webkit-keyframes dialog-fade-out {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
@keyframes dialog-fade-out {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
</style>
