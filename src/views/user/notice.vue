<template>
  <div class="rightBox">
    <div class="noticeTop">
      <button class="addBtn" type="primary" @click="addItem()">新增</button>
      <div class="rightBtn">
        <input class="searchBox" type="text" name="" id="" placeholder="请输入公告标题" v-model="searchKeyword"/>
        <button class="addBtn" type="primary" @click="searchBtn()">搜索</button>
        <button class="addBtn" type="primary" @click="getNoticeInfo()">重置</button>
      </div>
    </div>
    <!-- 用户管理列表 -->
    <el-table v-loading="tableLoading" :data="tableData">
      <!-- id就直接这样写了 -->
      <el-table-column label="序号" type="index" sortable="custom" align="center"/>
      <el-table-column label="标题" align="center" prop="title"/>
      <el-table-column label="内容" align="center" prop="content" :formatter="stateFormat"/>
      <el-table-column label="发布时间" align="center" prop="date"/>
      <el-table-column label="发布人" align="center" prop="userName"/>
      <el-table-column label="操作" align="center" prop="compile">
        <template slot-scope="scope">
          <el-button type="text" size="middle" @click.native.prevent="editRow(scope.row)">编辑</el-button>
          <el-button type="text" size="middle" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--弹框组件开始-----------------------start-->
    <dialog-component v-if="showDialog" ref="dialogComponent" :dialog-title="dialogTitle" :item-info="tableItem"
                      @closeDialog="closeDialog">
    </dialog-component>
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
    <!-- 分页组件 -->

  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'

import DialogComponent from '../dialog/dialogComponent.vue'

// import { listUser } from '@/api/system/user'
export default {
  name: '',
  data() {
    return {
      // 表格数据，这里是中括号，别瞎写
      tableData: [],
      // 当前要删除或者编辑的item的数据
      tableItem: {
        id: '',
        title: '',
        content: '',
        date: '',
        userName: ''
      },
      tableLoading: false,
      showDialog: false,
      dialogTitle: '添加公告',
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
    DialogComponent
  },
  mounted() {
    this.getNoticeInfo()
  },
  methods: {
    getNoticeInfo() {
      const that = this
      this.searchKeyword = ''
      that.tableLoading = true
      axios.post('/api' + '/news/getList')
        .then(function (response) {
          // handle success
          that.tableLoading = false
          if (response.data.code === 1) {
            that.tableData = response.data.data
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
    // 搜索框
    searchBtn() {
      var searchKeyword = this.searchKeyword
      const that = this
      that.tableLoading = true
      axios.post('/api' + '/news/searchRecord', {title: searchKeyword})
        .then(function (response) {
          // handle success
          that.tableLoading = false
          if (response.data.code === 1) {
            that.tableData = response.data.data
            // 注意这里，后台返回的json格式不一样写的就不一样
          } else {
            that.tableLoading = false
            that.$message.error(response.data.msg)
          }
        })
        .catch(function (error) {
          that.tableLoading = false
          that.$message.error(error)
        })
    },
    // 添加操作
    addItem() {
      this.tableItem = {
        id: '',
        title: '',
        content: '',
        date: '',
        city: '',
        userName: ''
      }
      this.dialogTitle = '添加公告'
      this.showDialog = true
      this.$nextTick(() => {
        const that = this
        this.$refs['dialogComponent'].showDialog = true
        this.$refs['dialogComponent'].confirmListener = (formInfo) => {
          // 新增
          axios.post('/api' + '/news/addRecord', {
            title: formInfo.title,
            content: formInfo.content,
            userId: that.$LocalStorage.GetUserId()
          }).then(res => {
            if (res.data.code === 1) {
              that.$refs['dialogComponent'].showDialog = false
              that.$message.success('添加成功')
              that.getNoticeInfo()
            } else {
              that.$message.error(res.data.msg)
            }
          }).catch(err => {
            that.$message.error(err)
          })
        }
      })
    },
    // 编辑操作
    editRow(row) {
      const that = this
      that.tableItem = row
      that.dialogTitle = '编辑公告'
      that.showDialog = true
      that.$nextTick(() => {
        that.$refs['dialogComponent'].showDialog = true
        that.$refs['dialogComponent'].confirmListener = (formInfo) => {
          axios.post('/api' + '/news/editRecord', {
            id: formInfo.id,
            content: formInfo.content,
            title: formInfo.title
          }).then(response => {
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
        this.getNoticeInfo()
      }
      this.showDialog = false
    },
    // 单行删除
    handleDelete(row) {
      // 每一条数据的记录
      this.tableItem = row
      // 把单行删除的每条数据的id添加进放删除数据的数组
      this.delVisible = true
    },
    // 确定删除
    deleteRow() {
      axios.post('/api' + '/news/deleteRecord', {
        id: this.tableItem.id
      }).then(res => {
        if (res.data.code === 1) {
          this.getNoticeInfo()
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
    // 格式化表格消息内容
    stateFormat(row, column, cellValue) {
      // console.log(row , column , cellValue)
      if (!cellValue) return ''
      if (cellValue.length > 10) {
        // 最长固定显示10个字符
        return cellValue.slice(0, 10) + '...'
      }
      return cellValue
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
