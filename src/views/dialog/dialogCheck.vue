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
      <el-form ref="formInfo"
               :model="formInfo"
               class="demo-form-inline">
        <el-form-item label="姓名：" prop="name">{{ formInfo.name }}</el-form-item>
        <el-form-item label="身份证号：" prop="idNo">{{ formInfo.idNo }}</el-form-item>
        <el-form-item label="手机号码：" prop="phone">{{ formInfo.phone }}</el-form-item>
        <el-form-item label="住址：" prop="address">{{ formInfo.address }}</el-form-item>
        <el-form-item label="出发地：" prop="from_region">{{ formInfo.from_region }}</el-form-item>
        <el-form-item label="返回时间：" prop="back_date">{{ formInfo.back_date }}</el-form-item>
        <el-form-item label="交通方式：" prop="traffic">
          <div v-if="formInfo.traffic===0">火车</div>
          <div v-if="formInfo.traffic===1">公共交通</div>
          <div v-if="formInfo.traffic===2">私家车</div>
          <div v-if="formInfo.traffic===3">其他</div>
        </el-form-item>
        <el-form-item label="车次/车牌号码：" prop="traffic_detail">{{ formInfo.traffic_detail }}</el-form-item>
        <el-form-item label="审批状态：" prop="status" >
          <div v-if="formInfo.status===0">已通过</div>
          <div v-if="formInfo.status===1">已驳回</div>
          <div v-if="formInfo.status===2">待审核</div>
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
  data() {
    return {
      showDialog: false,
      formInfo: JSON.parse(JSON.stringify(this.itemInfo)),
      confirmListener(formInfo) {

      }
    }
  },
  methods: {
    // 关闭弹框
    closeDialog(flag) {
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
