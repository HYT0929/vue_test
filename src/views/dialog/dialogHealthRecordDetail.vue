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
        <el-form-item label="体温：" prop="from_region">{{ formInfo.temperature }}℃</el-form-item>
        <el-form-item label="健康状况：" prop="status">
          <div v-if="formInfo.status===0">健康</div>
          <div v-else-if="formInfo.status===1">发热</div>
          <div v-else-if="formInfo.status===2">疑似</div>
          <div v-else-if="formInfo.status===3">确诊</div>
          <div v-else-if="formInfo.status===4">治愈</div>
          <div v-else>其他</div>
        </el-form-item>
        <el-form-item label="亲属健康状态：" prop="relativesStatus">
          <div v-if="formInfo.status===0">健康</div>
          <div v-if="formInfo.status===1">确诊</div>
        </el-form-item>
        <el-form-item label="生活是否有有困难：" prop="lifeDifficult">
          <div v-if="formInfo.lifeDifficult===0">正常</div>
          <div v-if="formInfo.lifeDifficult===1">有困难</div>
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
  name: 'DialogHealthDetail',
  props: {
    dialogTitle: {
      type: String,
      default: '详情'
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
