<template>
  <header>
    <!-- <el-row>
        <el-col :span="22" class="middle">
          <div class="lhead">
            后台管理系统
          </div>
        </el-col>
        <el-col :span="2" class="loginout">
            <el-button type="primary" @click="addUser" style="height: 40px">退出</el-button>
        </el-col>
      </el-row> -->
      <div class="lhead">
        <div>后台管理系统</div>
      </div>
      <div class="rhead">
        <el-button type="primary" @click="addUser" style="height: 40px">退出</el-button>
      </div>
    </header>
</template>

<script>
export default {
  methods:{
    handleSignout() {
      // 提示
      this.$message.success('退出成功')
      // 来到login组件
      this.$router.push({ name: 'login' })
    },
  }
}
</script>

<style>
header {
  display: flex;
  justify-content: space-between;;
  align-items: center;
  background-color: #fff;
  height: 50px;
}
.lhead{
  width: 300px;
}
/* .loginout{
  padding-right: 0;
} */
</style>