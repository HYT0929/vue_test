<template>
  <transition name="dialog-fade">
    <el-dialog
      :title="dialogTitle"
      class="dialog-component"
      :visible.sync="showDialog"
      width="500px"
      @close="closeDialog(0)"
      @confirmListener="confirmListener()"
    >
      <el-form
        ref="formInfo"
        :model="itemInfo"
        class="demo-form-inline"
        label-width="110px"
        :rules="dialogRules"
      >
        <el-form-item label="审核意见：" prop="name">
          <el-input v-model="inputMsg" type="textarea" maxlength="200"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right;">
          <el-button type="primary" @click="confirmListener(inputMsg)">确定</el-button>
          <el-button @click="closeDialog(0)">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </transition>
</template>

<script>
export default {
  name: 'dialogThingsApprove',
  props: {
    dialogTitle: {
      type: String,
      default: '审核'
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
      inputMsg: '',
      // 校验
      dialogRules: {
        reason: [
          {required: true, message: '请输入审核原因', trigger: 'blur'}
        ]
      },
      confirmListener(formInfo) {

      },
      closeDialog(flag) {
        this.showDialog = false
        this.$emit('closeDialog', flag)
      }
    }
  }
}
</script>

<style scoped>

</style>
