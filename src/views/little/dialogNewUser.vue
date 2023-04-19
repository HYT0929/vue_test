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
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="formInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-select v-model="formInfo.sex" clearable filterable @blur="selectBlur" @clear="selectClear" @change="selectChange">
            <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.label"/>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄：" prop="age">
          <el-input v-model="formInfo.age"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码：" prop="idNo">
          <el-input v-model="formInfo.idNo"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：" prop="phone">
          <el-input v-model="formInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="住址：" prop="address">
          <el-input v-model="formInfo.address"></el-input>
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
  name: 'DialogNewUser',
  props: {
    dialogTitle: {
      type: String,
      default: '添加人员'
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
      // 校验
      dialogRules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        idNo: [
          { required: true, message: '请输入正确的身份证号码', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '住址不能为空', trigger: 'blur' }
        ]
      },
      confirmListener (formInfo) {

      },
      options: [
        {value: '1', label: '男'},
        {value: '2', label: '女'}
      ]
    }
  },
  methods: {
    // 关闭弹框
    closeDialog (flag) {
      this.showDialog = false
      this.$emit('closeDialog', flag)
    },
    selectBlur (e) {
    // 意见类型
      if (e.target.value !== '') {
        this.value = e.target.value + '(其他)'
        // 强制更新
        this.$forceUpdate()
      }
    },
    selectClear () {
      this.value = ''
      this.$forceUpdate()
    },
    selectChange (val) {
      this.$forceUpdate()
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
