<template>
  <transition name="dialog-fade">
    <el-dialog
      :title="dialogTitle"
      class="dialog-component"
      :visible.sync="showDialog"
      width="500px"
      @close="close(0)"
      show-close
      center
    >
      <div>{{ dialogMsg }}</div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="close()">确 定</el-button>
      </span>
    </el-dialog>
  </transition>
</template>
<script>
export default {
  name: 'dialogTip',
  props: {},
  data() {
    return {
      showDialog: false,
      dialogMsg: '',
      dialogTitle: '',
      close(flag) {
        this.showDialog = false
      }
    }
  }
}
</script>

<style scoped>

</style>
