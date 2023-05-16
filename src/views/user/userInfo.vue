<template>
  <div class="rightBox">
    <div class="noticeTop">
      <button class="addBtn" type="primary" @click="addUser()">新增</button>
      <div class="rightBtn">
        <input class="searchBox" type="text" name="" id="" placeholder="请输入用户姓名" v-model="searchKeyword"/>
        <button class="addBtn" type="primary" @click="searchBtn()">搜索</button>
        <button class="addBtn" type="primary" @click="getUserInfo()">重置</button>
      </div>
    </div>
    <!-- 用户管理列表 -->
    <el-table v-loading="tableLoading" :data="userInfotable">
      <el-table-column label="序号" type="index" sortable="custom" align="center"/>
      <el-table-column label="姓名" align="center" prop="name"/>
      <el-table-column label="性别" align="center" prop="sex"/>
      <el-table-column label="年龄" align="center" prop="age"/>
      <el-table-column label="身份证号码" align="center" prop="idNo"/>
      <el-table-column label="手机号码" align="center" prop="phone"/>
      <el-table-column label="住址" align="center" prop="address"/>
      <el-table-column label="操作" align="center" prop="compile">
        <template slot-scope="scope">
          <el-button type="text" size="middle" @click.native.prevent="editUser(scope.row)">编辑</el-button>
          <el-button type="text" size="middle" @click="deleteUser(scope.row)">删除</el-button>
          <el-button type="text" size="middle" @click="replaceUser(scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template>
      <!--弹框组件开始-----------------------start-->
      <dialog-new-user v-if="showDialog" ref="dialogNewUser" :dialog-title="dialogTitle" :item-info="userInfoItem"
                       @closeDialog="closeDialog">
      </dialog-new-user>
      <!--弹框组件结束-----------------------end-->
      <!-- 删除提示框-----------------------start-->
      <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
        <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
        <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
      </el-dialog>
      <!-- 删除提示框-----------------------end-->
      <!-- 重置密码提示框-----------------------start-->
      <el-dialog title="提示" :visible.sync="pwdVisible" width="300px" center>
        <div class="del-dialog-cnt">重置密码不可恢复，是否确定重置？</div>
        <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="replace()">确 定</el-button>
            </span>
      </el-dialog>
      <!-- 重置密码提示框-----------------------end-->
    </template>

  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import DialogNewUser from '../dialog/dialogNewUser.vue'

export default {
  name: '',
  data() {
    return {
      userInfotable: [],
      userInfoItem: {
        id: '',
        name: '',
        sex: '',
        age: '',
        idNo: '',
        phone: '',
        address: ''
      },
      tableLoading: false,
      showDialog: false,
      dialogTitle: '添加用户',
      // 删除提示弹框的状态
      delVisible: false,
      // 存放删除的数据
      delId: 0,
      // 重置提示弹框的状态
      pwdVisible: false,
      // 搜索关键字
      searchKeyword: '',
      searchData: ''
    }
  },
  components: {
    DialogNewUser
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      const that = this
      this.searchKeyword = ''
      this.tableLoading = true
      axios.post('/api' + '/user/getList')
        .then(function (response) {
          // handle success
          that.tableLoading = false
          if (response.data.code === 1) {
            that.userInfotable = response.data.data
            // 注意这里，后台返回的json格式不一样写的就不一样
          } else {
            that.$message.error(response.data.msg)
          }
        })
        .catch(function (error) {
          that.tableLoading = false
          that.$message.error(error)
        })
    },
    addUser() {
      this.userInfoItem = {
        user_id: '',
        name: '',
        sex: '',
        age: '',
        idNo: '',
        phone: '',
        address: ''
      }
      this.dialogTitle = '添加人员'
      this.showDialog = true
      this.$nextTick(() => {
        const that = this
        this.$refs['dialogNewUser'].showDialog = true
        this.$refs['dialogNewUser'].formInfo = this.userInfoItem
        this.$refs['dialogNewUser'].confirmListener = (formInfo) => {
          // 新增
          axios.post('/api' + '/user/register', {
            name: formInfo.name,
            sex: formInfo.sex === '男' ? 1 : 2,
            age: formInfo.age,
            phone: formInfo.phone,
            idNo: formInfo.idNo,
            address: formInfo.address,
            userId: that.$LocalStorage.GetUserId()
          }).then(res => {
            if (res.data.code === 1) {
              that.$refs['dialogNewUser'].showDialog = false
              that.$message.success('添加成功')
              that.getUserInfo()
            } else {
              that.$message.error(res.data.msg)
            }
          }).catch(err => {
            that.$message.error(err)
          })
        }
      })
    },
    // 搜索框
    searchBtn() {
      var searchKeyword = this.searchKeyword
      const that = this
      this.tableLoading = true
      axios.post('/api' + '/user/search', {name: searchKeyword})
        .then(function (response) {
          // handle success
          that.tableLoading = false
          if (response.data.code === 1) {
            that.userInfotable = response.data.data
            // 注意这里，后台返回的json格式不一样写的就不一样
          } else {
            that.$message.error(response.data.msg)
          }
        })
        .catch(function (error) {
          that.tableLoading = false
          that.$message.error(error)
        })
    },
    // 编辑操作
    editUser(row) {
      const that = this
      that.userInfoItem = row
      that.dialogTitle = '编辑人员'
      that.showDialog = true
      that.$nextTick(() => {
        that.$refs['dialogNewUser'].showDialog = true
        that.$refs['dialogNewUser'].confirmListener = (formInfo) => {
          axios.post('/api' + '/user/editUserInfo', {
            userId: formInfo.user_id,
            name: formInfo.name,
            sex: formInfo.sex,
            age: formInfo.age,
            idNo: formInfo.idNo,
            phone: formInfo.phone,
            address: formInfo.address
          }).then(response => {
            console.log(formInfo.sex)
            if (response.data.code === 1) {
              that.$message.success('保存成功')
              that.closeDialog(1)
            } else {
              that.$message.error(response.data.msg)
            }
          }).catch(err => {
            that.$message.err(err)
          })
        }
      })
    },
    // 关闭操作
    closeDialog(flag) {
      console.log(flag)
      if (flag) {
        // 重新刷新表格内容
        this.getUserInfo()
      }
      this.showDialog = false
    },
    // 单行删除
    deleteUser(row) {
      // 每一条数据的记录
      this.userInfoItem = row
      // 把单行删除的每条数据的id添加进放删除数据的数组
      this.delVisible = true
    },
    // 确定删除
    deleteRow() {
      const that = this
      axios.post('/api' + '/user/deleteUser', {
        userId: this.userInfoItem.user_id
      }).then(res => {
        if (res.data.code === 1) {
          that.getUserInfo()
          that.$message.success('删除成功')
        } else {
          that.$message.success(res.data.msg)
        }
      }).catch(error => {
        console.log(error)
        that.$message.error()
      })
      // 关闭删除提示模态框
      that.delVisible = false
    },
    replaceUser(row) {
      // 每一条数据的记录
      this.userInfoItem = row
      // 把单行的每条数据的id添加进放重置数据的数组
      this.pwdVisible = true
    },
    // 密码重置
    replace() {
      const that = this
      axios.post('/api' + '/user/resetPwd', {
        userId: this.userInfoItem.user_id
      }).then(res => {
        if (res.data.code === 1) {
          that.getUserInfo()
          that.$message.success('重置成功')
        } else {
          that.$message.success(res.data.msg)
        }
      }).catch(error => {
        that.$message.error(error)
      })
      // 关闭重置密码提示模态框
      this.pwdVisible = false
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
  width: 98%;
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
