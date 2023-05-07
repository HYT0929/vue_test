<template>
  <div class="rightBox">
    <div class="noticeTop">
      <button class="addBtn" type="primary" @click="addThings()">新增</button>
      <div class="rightBtn">
        <input class="searchBox" type="text" name="" id="" placeholder="请输入物资名称" v-model="searchKeyword"/>
        <button class="addBtn" type="primary" @click="searchBtn()">搜索</button>
        <button class="addBtn" type="primary" @click="resetSearch()">重置</button>
      </div>
    </div>
    <!-- 用户管理列表 -->
    <el-table v-loading="tableLoading" :data="tableInfo">
      <el-table-column label="序号" type="index" sortable="custom" align="center"/>
      <el-table-column label="物资编号" align="center" prop="id"/>
      <el-table-column label="物资名称" align="center" prop="name"/>
      <el-table-column label="数量" align="center" prop="count"/>
      <el-table-column label="发布人" align="center" prop="publisher"/>
      <el-table-column label="发布时间" align="center" prop="publishTime"/>
    </el-table>
    <template>
      <dialog-add-things ref="dialogAddThings"></dialog-add-things>

    </template>

  </div>
</template>

<script>
import axios from 'axios'
import DialogAddThings from '../dialog/dialogAddThings'

export default {
  name: 'thingsList',
  components: {DialogAddThings},
  data() {
    return {
      searchKeyword: '',
      tableInfo: [],
      tableLoading: false
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
      const that = this
      that.tableLoading = true
      axios.post('/api' + '/things/getList')
        .then(function (response) {
          // handle success
          that.tableLoading = false
          if (response.data.code === 1) {
            that.tableInfo = response.data.data
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
    searchBtn() {
      if (this.searchKeyword.length === 0) {
        this.getList()
        return
      }
      const that = this
      that.tableLoading = true
      axios.post('/api' + '/things/search', {
        keyword: this.searchKeyword
      })
        .then(function (response) {
          // handle success
          that.tableLoading = false
          if (response.data.code === 1) {
            that.tableInfo = response.data.data
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
    addThings() {
      const that = this
      this.$nextTick(() => {
        this.$refs['dialogAddThings'].showDialog = true
        this.$refs['dialogAddThings'].confirmListener = (info) => {
          if (info.name.length < 1 || info.number < 1) {
            this.$message.error('输入有误')
            return
          }
          axios.post('/api' + '/things/add', {
            user_id: this.$LocalStorage.GetUserId(),
            name: info.name,
            number: info.number
          })
            .then(function (response) {
              // handle success
              if (response.data.code === 1) {
                that.$refs['dialogAddThings'].showDialog = false
                that.$message.success('添加成功')
                that.getList()
              } else {
                that.$message.error(response.data.msg)
              }
            })
            .catch(function (error) {
              that.$message.error(error)
            })
        }
      })
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
