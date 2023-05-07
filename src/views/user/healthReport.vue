<template>
  <div class="rightBox">
    <div class="noticeTop">
      <div class="rightBtn">
        <input class="searchBox" type="text" name="" id="" placeholder="请输入用户姓名" v-model="searchKeyword"/>
        <button class="addBtn" type="primary" @click="search()">搜索</button>
        <button class="addBtn" type="primary" @click="resetSearch()">重置</button>
      </div>
    </div>
    <!-- 用户管理列表 -->
    <el-table v-loading="showLoading" :data="tableData" :row-class-name="tableRowClassName">
      <el-table-column label="序号" type="index" sortable="custom" align="center"/>
      <el-table-column label="姓名" align="center" prop="name"/>
      <el-table-column label="性别" align="center" v-slot="scope">
        <div v-if="scope.row.sex===1">男</div>
        <div v-else>女</div>
      </el-table-column>
      <el-table-column label="体温" align="center">
        <template slot-scope="data">{{ data.row.temperature }}℃
        </template>
      </el-table-column>
      <el-table-column label="手机号码" align="center" prop="phone"/>
      <el-table-column label="住址" align="center" prop="address"/>
      <el-table-column label="上报日期" align="center" prop="date"/>
      <el-table-column label="操作" align="center" prop="compile">
        <template slot-scope="scope">
          <el-button type="text" size="middle" @click="showDeleteDialog(scope.row)">删除</el-button>
          <el-button type="text" size="middle" @click="recordDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template>
      <!--弹框组件开始-----------------------start-->
      <dialog-health-detail v-if="showDetailDialog" ref="dialogHealthDetail" :dialog-title="详情"
                            @closeDialog="closeDialog">
      </dialog-health-detail>
      <!--弹框组件结束-----------------------end-->

      <!-- 重置密码提示框-----------------------start-->
      <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
        <div class="del-dialog-cnt" style="text-align: center">是否删除？</div>
        <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="doDelete()">确 定</el-button>
            </span>
      </el-dialog>
      <!-- 重置密码提示框-----------------------end-->
    </template>

  </div>
</template>

<script>

import DialogHealthDetail from '../dialog/dialogHealthRecordDetail'
import axios from 'axios'

export default {
  name: '',
  data() {
    return {
      tableData: [],
      searchKeyword: '',
      showDetailDialog: false,
      delVisible: false,
      showLoading: false
    }
  },
  components: {
    DialogHealthDetail
  },
  mounted() {
    this.getList()
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (this.tableData[rowIndex].temperature >= 38) {
        return 'error-row'
      }
      if (this.tableData[rowIndex].temperature >= 37) {
        return 'warning-row'
      }
      return ''
    },
    getList() {
      const that = this
      that.showLoading = true
      axios.post('/api' + '/health/getList')
        .then(function (response) {
          // handle success
          that.showLoading = false
          if (response.data.code === 1) {
            that.tableData = response.data.data
            // 注意这里，后台返回的json格式不一样写的就不一样
          } else {
            that.$message.error(response.data.msg)
          }
        })
        .catch(function (error) {
          that.$message.error(error)
        })
    },
    search() {
      const that = this
      that.showLoading = true
      axios.post('/api' + '/health/search', {
        name: that.searchKeyword
      })
        .then(function (response) {
          // handle success
          that.showLoading = false
          if (response.data.code === 1) {
            that.tableData = response.data.data
            // 注意这里，后台返回的json格式不一样写的就不一样
          } else {
            that.$message.error(response.data.msg)
          }
        })
        .catch(function (error) {
          that.$message.error(error)
        })
    },
    showDeleteDialog(info) {
      this.delVisible = true
      this.deleteInfo = info
    },
    doDelete() {
      const that = this
      axios.post('/api' + '/health/deleteRecord', {
        id: that.deleteInfo.id
      })
        .then(function (response) {
          // handle success
          if (response.data.code === 1) {
            that.delVisible = false
            that.getList()
            that.$message.success('操作成功')
            // 注意这里，后台返回的json格式不一样写的就不一样
          } else {
            that.$message.error(response.data.msg)
          }
        })
        .catch(function (error) {
          that.$message.error(error)
        })
    },
    recordDetail(info) {
      this.showDetailDialog = true
      const that = this
      this.$nextTick(() => {
        this.$refs['dialogHealthDetail'].showDialog = that.showDetailDialog
        this.$refs['dialogHealthDetail'].formInfo = info
        this.$refs['dialogHealthDetail'].confirmListener = (formInfo) => {

        }
      })
    },
    resetSearch() {
      this.searchKeyword = ''
      this.getList()
    }

  }

}

</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-table .error-row {
  background: rgba(255, 105, 89, 0.56);
}
</style>
