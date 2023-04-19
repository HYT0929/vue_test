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
      <el-table-column label="姓名" align="center" prop="name" />
      <el-table-column label="出发地" align="center" prop="from_region" />
      <el-table-column label="返回时间" align="center" prop="back_date" />
      <el-table-column label="交通方式" align="center" prop="traffic" />
      <el-table-column label="车次/车牌号码" align="center" prop="traffic_detail" />
      <el-table-column label="审批状态" align="center" prop="status" />
      <el-table-column label="操作" align="center" prop="compile">
        <template slot-scope="scope">
          <el-button type="text" size="middle" @click.native.prevent="editUser(scope.row)">详情</el-button>
          <el-button type="text" size="middle" @click="deleteUser(scope.row)">删除</el-button>
          <el-button type="text" size="middle" @click="replaceUser(scope.row)">审批</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template>
      <!--弹框组件开始-----------------------start-->
    <dialog-check v-if="showDialog" ref="dialogCheck" :dialog-title="dialogTitle" :item-info="checkInfoItem" @closeDialog="closeDialog">
    </dialog-check>
    <!--弹框组件结束-----------------------end-->
    <!-- 删除提示框-----------------------start-->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow" >确 定</el-button>
            </span>
        </el-dialog>
      <!-- 删除提示框-----------------------end-->
    </template>

  </div>
</template>

<script>
import axios from 'axios'
import DialogCheck from '../little/dialogCheck.vue'

export default {
  name: '',
  data () {
    return {
      checkInfotable: [],
      checkInfoItem: {
        id: '',
        name: '',
        from_region: '',
        back_date: '',
        traffic: '',
        traffic_detail: '',
        status: ''
      },
      tableLoading: false,
      showDialog: false,
      dialogTitle: '添加用户',
      // 删除提示弹框的状态
      delVisible: false,
      // 存放删除的数据
      delId: 0,
      // 搜索关键字
      searchKeyword: '',
      searchData: ''
    }
  },
  components: {
    DialogCheck
  },
  mounted () {
    this.getCheckInfo()
  },
  methods: {
    getCheckInfo () {
      const that = this
      this.searchKeyword = ''
      axios.post('/api' + '/applicate/getList')
        .then(function (response) {
          // handle success
          if (response.data.code === 1) {
            that.checkInfotable = response.data.data
            // 注意这里，后台返回的json格式不一样写的就不一样
          } else {
            this.$message.error(response.data.msg)
          }
        })
        .catch(function (error) {
          this.$message.error(error)
        })
    },
    // 搜索框
    searchBtn () {
      var searchKeyword = this.searchKeyword
      const that = this
      axios.post('/api' + '/applicate/search', {name: searchKeyword})
        .then(function (response) {
          // handle success
          if (response.data.code === 1) {
            that.checkInfotable = response.data.data
            // 注意这里，后台返回的json格式不一样写的就不一样
          } else {
            this.$message.error(response.data.msg)
          }
        })
        .catch(function (error) {
          this.$message.error(error)
        })
    },
    // 关闭操作
    closeDialog (flag) {
      console.log(flag)
      if (flag) {
        // 重新刷新表格内容
        this.getCheckInfo()
      }
      this.showDialog = false
    },
    // 单行删除
    deleteUser (row) {
      // 每一条数据的记录
      this.checkInfoItem = row
      // 把单行删除的每条数据的id添加进放删除数据的数组
      this.delVisible = true
    },
    // 确定删除
    deleteRow () {
      axios.post('/api' + '/user/deleteUser', {
        userId: this.checkInfoItem.user_id
      }).then(res => {
        if (res.data.code === 1) {
          this.getCheckInfo()
          this.$message.success('删除成功')
        } else {
          this.$message.success(res.data.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$message.error()
      })
      // 关闭删除提示模态框
      this.delVisible = false
    },
    replaceUser (row) {
      // 每一条数据的记录
      this.checkInfoItem = row
      // 把单行的每条数据的id添加进放重置数据的数组
      this.delVisible = true
    },
    // 查看详情
    editRow (row) {
      this.checkInfoItem = row
      this.dialogTitle = '申请详情'
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs['DialogCheck'].showDialog = true
      })
    }
  }
}

</script>

<style>

</style>
