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
        label-width="110px"
        :rules="dialogRules"
      >
        <el-form-item label="物资名称：" prop="name">
          <el-input v-model="formInfo.name" maxlength ="30" ></el-input>
        </el-form-item>
        <el-form-item label="物资数量："  prop="number">
          <el-input v-model="formInfo.number" type="number" maxlength ="10" minlength="1"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right;">
          <el-button type="primary" @click="confirmListener(formInfo)">确定</el-button>
          <el-button @click="closeDialog(0)">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </transition>
</template>

<script>

export default {
  name: 'dialogAddThings',
  props: {
    dialogTitle: {
      type: String,
      default: '发布物资'
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
      formInfo: {

      },
      // 校验
      dialogRules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入正确的物资数量', trigger: 'blur' }
        ]
      },
      confirmListener (formInfo) {

      },
      closeDialog (flag) {
        this.showDialog = false
        this.$emit('closeDialog', flag)
      }
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
