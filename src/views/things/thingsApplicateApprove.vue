<template>
  <div class="rightBox">
    <div class="noticeTop">
      <div class="rightBtn">
        <input class="searchBox" type="text" name="" id="" placeholder="请输入用户姓名" v-model="searchKeyword"/>
        <button class="addBtn" type="primary" @click="searchBtn()">搜索</button>
        <button class="addBtn" type="primary" @click="resetSearch()">重置</button>
      </div>
    </div>
    <!-- 用户管理列表 -->
    <el-table v-loading="loading" :data="tableInfo">
      <el-table-column label="序号" type="index" sortable="custom" align="center"/>
      <el-table-column label="物资名称" align="center" prop="name"/>
      <el-table-column label="数量" align="center" prop="count"/>
      <el-table-column label="申请人" align="center" prop="applicant"/>
      <el-table-column label="申请时间" align="center" prop="time"/>
      <el-table-column label="申请原因" align="center" v-slot="scope">
        <el-button type="text" @click="showAuditMsg(scope.row.reason)">查看</el-button>
      </el-table-column>
      <el-table-column label="审核状态" align="center" v-slot="scope">
        <div style="color: orange" v-if="scope.row.auditStatus===0">待审核</div>
        <div style="color: forestgreen" v-if="scope.row.auditStatus===1">通过</div>
        <div style="color: red" v-if="scope.row.auditStatus===2">拒绝</div>
      </el-table-column>
      <el-table-column label="审批备注" align="center" v-slot="scope">
        <el-button type="text" v-if="scope.row.auditStatus!==0" @click="showAuditMsg(scope.row.auditMsg)">查看</el-button>
      </el-table-column>
      <el-table-column label="操作" align="center" prop="compile">
        <template slot-scope="scope">
          <el-button type="primary" :disabled="scope.row.auditStatus!==0" size="small"
                     @click="approve(scope.row,true)">通过
          </el-button>
          <el-button type="warning" :disabled="scope.row.auditStatus!==0" size="small"
                     @click="approve(scope.row,false)">拒绝
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <template>
      <!--弹框组件开始-----------------------start-->
      <dialog-things-approve ref="dialogThingsApprove">
      </dialog-things-approve>
      <dialog-tip ref="dialogTip"></dialog-tip>
    </template>

  </div>
</template>

<script>
import axios from 'axios'
import DialogThingsApprove from '../dialog/dialogThingsApprove'
import DialogTip from '../dialog/dialogTip'

export default {
  name: '',
  components: {DialogTip, DialogThingsApprove},
  data() {
    return {
      searchKeyword: '',
      tableInfo: [],
      loading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    resetSearch() {
      this.searchKeyword = ''
      this.getList()
    },
    getList() {
      this.loading = true
      const that = this
      axios.post('/api' + '/things/getApplicationList')
        .then(function (response) {
          // handle success
          that.loading = false
          if (response.data.code === 1) {
            that.tableInfo = response.data.data
            // 注意这里，后台返回的json格式不一样写的就不一样
          } else {
            this.$message.error(response.data.msg)
          }
        })
        .catch(function (error) {
          this.$message.error(error)
        })
    },
    searchBtn() {
      if (this.searchKeyword.length === 0) {
        this.getList()
        return
      }
      const that = this
      that.loading = true
      axios.post('/api' + '/things/searchApplication', {
        keyword: this.searchKeyword
      })
        .then(function (response) {
          // handle success
          that.loading = false
          if (response.data.code === 1) {
            that.tableInfo = response.data.data
            // 注意这里，后台返回的json格式不一样写的就不一样
          } else {
            this.$message.error(response.data.msg)
          }
        })
        .catch(function (error) {
          this.$message.error(error)
        })
    },
    approve(data, agree) {
      const that = this
      this.$refs['dialogThingsApprove'].showDialog = true
      this.$refs['dialogThingsApprove'].dialogTitle = agree ? '通过申请' : '驳回申请'
      this.$refs['dialogThingsApprove'].inputMsg = ''
      this.$refs['dialogThingsApprove'].confirmListener = (msg) => {
        that.loading = true
        axios.post('/api' + '/things/approveApplication', {
          id: data.id,
          auditMsg: msg,
          agree: agree,
          user_id: that.$LocalStorage.GetUserId()
        })
          .then(function (response) {
            // handle success
            that.loading = false
            if (response.data.code === 1) {
              that.$refs['dialogThingsApprove'].showDialog = false
              that.getList()
              that.$message.success('操作成功')
              // 注意这里，后台返回的json格式不一样写的就不一样
            } else {
              this.$message.error(response.data.msg)
            }
          })
          .catch(function (error) {
            this.$message.error(error)
          })
      }
    },
    showAuditMsg(msg) {
      this.$refs['dialogTip'].showDialog = true
      this.$refs['dialogTip'].dialogTitle = '详情'
      this.$refs['dialogTip'].dialogMsg = msg
    }
  }
}
</script>

<style>

.rightBox {
  float: right;
  height: auto;
  width: 90%;
}

.noticeTop {
  float: left;
  left: 20%;
  margin-left: 10px;
  height: 50px;
}

.rightBtn {
  float: right;
}

.searchBox {
  width: 200px;
  height: 25px;
  border: solid 2px #6699CC;
}

.addBtn {
  margin-top: 10px;
  height: 30px;
  width: 60px;
  border: 0;
  border-radius: 10px;
  background-color: #B6D6FF;
  color: #000;
}

.addBtn:hover {
  background-color: #6699CC;
  color: #fff;
}
</style>
