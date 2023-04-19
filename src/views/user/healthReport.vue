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
    <el-table :data="healthInfotable">
      <el-table-column label="序号" type="index" sortable="custom" align="center"/>
      <el-table-column label="体温" align="center" prop="name" />
      <el-table-column label="性别" align="center" prop="sex" />
      <el-table-column label="年龄" align="center" prop="age" />
      <el-table-column label="身份证号码" align="center" prop="idNo" />
      <el-table-column label="手机号码" align="center" prop="phone" />
      <el-table-column label="住址" align="center" prop="address" />
      <el-table-column label="操作" align="center" prop="compile">
        <template slot-scope="scope">
          <el-button type="text" size="middle" @click.native.prevent="editUser(scope.row)">编辑</el-button>
          <el-button type="text" size="middle" @click="deleteUser(scope.row)">删除</el-button>
          <el-button type="text" size="middle" @click="replaceUser(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template>
      <!--弹框组件开始-----------------------start-->
    <dialog-new-user v-if="showDialog" ref="dialogNewUser" :dialog-title="dialogTitle" :item-info="userInfoItem" @closeDialog="closeDialog">
    </dialog-new-user>
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
      <!-- 重置密码提示框-----------------------start-->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">重置密码不可恢复，是否确定重置？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="replace()" >确 定</el-button>
            </span>
        </el-dialog>
      <!-- 重置密码提示框-----------------------end-->
    </template>

  </div>
</template>

<script>

</script>

<style>

</style>
