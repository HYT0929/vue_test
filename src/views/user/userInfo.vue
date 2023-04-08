<template>
  <div class="rightBox">
    <!-- 用户管理列表 -->
    <el-table>
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

  </div>
</template>

<script type="text/ecmascript-6">
// import { listUser } from '@/api/system/user'
export default {
  name: '',
  data () {
    return {
      // 用户表格数据
      // userList: null,
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
