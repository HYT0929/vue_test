<template>
  <div class="rightBox">
    <div class="noticeTop">
      <div class="rightBtn">
        <input class="searchBox" type="text" name="" id="" placeholder="请输入用户姓名" v-model="searchKeyword"/>
        <button class="addBtn" type="primary" @click="searchBtn()">搜索</button>
        <button class="addBtn" type="primary" @click="getCheckInfo()">重置</button>
      </div>
    </div>
    <!-- 用户管理列表 -->
    <el-table :data="checkInfotable">
      <el-table-column label="序号" type="index" sortable="custom" align="center"/>
      <el-table-column label="姓名" align="center" prop="name"/>
      <el-table-column label="出发地" align="center" prop="from_region"/>
      <el-table-column label="返回时间" align="center" prop="back_date"/>
      <el-table-column label="交通方式" align="center" prop="traffic" v-slot="scope">
        <div v-if="scope.row.traffic===0">火车</div>
        <div v-if="scope.row.traffic===1">公共交通</div>
        <div v-if="scope.row.traffic===2">私家车</div>
        <div v-if="scope.row.traffic===3">其他</div>
      </el-table-column>
      <el-table-column label="车次/车牌号码" align="center" prop="traffic_detail"/>
      <el-table-column label="审批状态" align="center" prop="status" v-slot="scope">
        <div v-if="scope.row.status===0">已通过</div>
        <div v-if="scope.row.status===1">已驳回</div>
        <div v-if="scope.row.status===2">待审核</div>
      </el-table-column>
      <el-table-column label="操作" align="center" prop="compile">
        <template slot-scope="scope">
          <el-button type="text" size="middle" @click="showDetailDialog(scope.row)">详情</el-button>
          <el-button type="text" size="middle" @click="approve(scope.row)">审批</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template>
      <!--弹框组件开始-----------------------start-->
      <dialog-check v-if="showDialog" ref="dialogCheck" :dialog-title="dialogTitle" :item-info="{}"
                    @closeDialog="closeDialog">
      </dialog-check>
      <!--弹框组件结束-----------------------end-->
      <!-- 删除提示框-----------------------start-->
      <el-dialog title="提示" :visible.sync="showApprove" :item-info="currentSelectInfo" width="300px" center>
        <div style="text-align: center">是否通过”{{ currentSelectInfo.name }}“的申请？</div>
        <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="doApprove(false)">拒绝</el-button>
                <el-button type="primary" @click="doApprove(true)">通过</el-button>
            </span>
      </el-dialog>
      <!-- 删除提示框-----------------------end-->
    </template>

  </div>
</template>

<script>
import axios from 'axios'
import DialogCheck from '../dialog/dialogCheck.vue'

export default {
  name: '',
  data() {
    return {
      checkInfotable: [],
      tableLoading: false,
      showDialog: false,
      dialogTitle: '添加用户',
      // 删除提示弹框的状态
      showApprove: false,
      currentSelectInfo: {},
      // 搜索关键字
      searchKeyword: '',
      searchData: ''
    }
  },
  components: {
    DialogCheck
  },
  mounted() {
    this.getCheckInfo()
  },
  methods: {
    getCheckInfo() {
      const that = this
      this.searchKeyword = ''
      axios.post('/api' + '/applicate/getList')
        .then(function (response) {
          // handle success
          if (response.data.code === 1) {
            that.checkInfotable = response.data.data
            // 注意这里，后台返回的json格式不一样写的就不一样
          } else {
            that.$message.error(response.data.msg)
          }
        })
        .catch(function (error) {
          that.$message.error(error)
        })
    },
    // 搜索框
    searchBtn() {
      var searchKeyword = this.searchKeyword
      const that = this
      axios.post('/api' + '/applicate/search', {name: searchKeyword})
        .then(function (response) {
          // handle success
          if (response.data.code === 1) {
            that.checkInfotable = response.data.data
            // 注意这里，后台返回的json格式不一样写的就不一样
          } else {
            that.$message.error(response.data.msg)
          }
        })
        .catch(function (error) {
          that.$message.error(error)
        })
    },
    // 关闭操作
    closeDialog(flag) {
      console.log(flag)
      if (flag) {
        // 重新刷新表格内容
        this.getCheckInfo()
      }
      this.showDialog = false
    },
    showDetailDialog(data) {
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs['dialogCheck'].showDialog = this.showDialog
        this.$refs['dialogCheck'].dialogTitle = '申请详情'
        this.$refs['dialogCheck'].formInfo = data
        this.$refs['dialogCheck'].closeDialog = (flag) => {
          this.showDialog = false
        }
      })
    },
    approve(data) {
      this.showApprove = true
      this.currentSelectInfo = data
    },
    doApprove(agree) {
      const that = this
      axios.post('/api' + '/applicate/approveApply', {
        status: agree ? 0 : 1,
        id: this.currentSelectInfo.id,
        user_id: that.$LocalStorage.GetUserId()
      })
        .then(function (response) {
          // handle success
          if (response.data.code === 1) {
            that.$message.success('操作成功')
            that.showApprove = false
            that.getCheckInfo()
            // 注意这里，后台返回的json格式不一样写的就不一样
          } else {
            that.$message.error(response.data.msg)
          }
        })
        .catch(function (error) {
          that.$message.error(error)
        })
    }
  }
}

</script>

<style>

</style>
