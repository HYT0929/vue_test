<template>
  <div class="rightBox">
    <!-- 用户管理列表 -->
    <el-table :data="userList">
      <el-table-column type="selection" width="40" align="center" />
      <el-table-column label="姓名" align="center" prop="userName" />
      <el-table-column label="性别" align="center" prop="sex" />
      <el-table-column label="年龄" align="center" prop="age" />
      <el-table-column label="手机号码" align="center" prop="tel" />
      <el-table-column label="住址" align="center" prop="address" />
      <el-table-column label="体温" align="center" prop="temp" />
      <el-table-column label="是否有咳嗽、腹泻、头疼等症状" align="center" prop="symptom" />
    </el-table>
    <!-- 分页组件 -->
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
    />
  </div>
</template>

<script type="text/ecmascript-6">
// import { listUser } from '@/api/system/user'
export default {
  name: '',
  data () {
    return {
      // 用户表格数据
      userList: null,
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phonenumber: undefined,
        status: undefined,
        deptId: undefined
      },
      // 日期范围
      dateRange: []
    }
  },
  components: {},
  methods: {
    // /** 查询用户列表 */
    // getList () {
    //   // addDateRange 方法在 main.js中全局挂载
    //   listUser(this.addDateRange(this.queryParams, this.dateRange)).then(
    //     response => {
    //       this.userList = response.rows
    //       this.total = response.total
    //       // this.loading = false;
    //     }
    //   )
    // }
  },
  created () {
    this.getList()
  }
}

</script>

<style>
.rightBox{
    float: right;
    height: auto;
    width: 90%;
}
</style>
