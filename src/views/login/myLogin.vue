<template>
  <div class="login-warp">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="login-form"
    >
      <h2
        class="login_title"
        label-position="top"
        label-width="80px"
        :model="form"
      >
        用户登录
      </h2>
      <!-- prop：定义在form中对应的字段 -->
      <el-form-item label="账号" prop="u_id" class="username">
        <!-- autocomplete：表单是否启用自动完成功能。自动完成允许浏览器对字段的输入，是基于之前输入过的值。 -->
        <el-input
          type="input"
          v-model="form.u_id"
          autocomplete="off"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="u_password">
        <el-input
          type="password"
          v-model="form.u_password"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code" class="yzm">
        <div class="yan">
          <el-input
            type="input"
            v-model="form.code"
            autocomplete="off"
            placeholder="验证码"
            class="yan"
          ></el-input>
          <img id="yzm" :src="this.vCode" @click="changeCodeImg()" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin" class="login-btn"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="isMsg" width="30%">
      {{ msg }}
    </el-dialog>
    <el-dialog :visible.sync="isOpen" width="30%">
      {{ msg }}
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        u_id: '',
        u_password: '',
        code: '',
      },
      // 表单校验的定义
      rules: {
        u_id: [
          // 用户名校验：必需、没有输入会有提示、失去焦点触发
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            min: 3,
            message: '账号长度不能小于3位',
            trigger: 'blur',
          },
        ],
        // 密码校验：必需、提示、失去焦点触发
        u_password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },
      menu: [],
      token: '',
      vCode: '/api/vCode',
      msg: '',
      isMsg: false,
      isOpen: false,
    }
  },
  created() {
    // // document.getElementById('yzm')
    // this.api.post('/vCode')
    // .then((res)=>{
    //   this.vCode= `data: image/jpeg;base64,
    //   ${atob(new Uint8Array(res).reduce(
    //     (data, byte) => data + String.fromCharCode(byte), ''))}`
    //         // console.log(this.vCode);
    // })
  },
  methods: {
    changeCodeImg() {
      this.vCode = '/api/vCode?count=' + Math.random()
    },
    //登录请求
    handleLogin() {
      this.api.post('/login', this.form).then((res) => {
        console.log(res.code)
        // console.log(this.form.code);
        // if(res){
        //   this.$router.push({ path: "/" });
        // }
        this.token = res.code
        console.log(this.token)
        this.$store.commit('setToken', this.token)
        if (res.code == 200) {
          (this.menu = [
            {
              name: '首页',
              order: '1',
              path: 'show',
            },
            {
              name: '用户管理',
              order: '1',
              path: 'user',
            },
            {
              name: '角色管理',
              order: '1',
              path: 'role',
            },
            {
              name: '用户权限管理',
              order: '1',
              path: 'permission',
            },{
              name: '权限管理',
              order: '1',
              path: 'power',
            },
          ]),
            console.log(res.data.s_id)
          if (res.data.s_id == 1) {
            console.log(111)
            // if(res.)
            this.$router.push({ path: '/home' })
            this.$store.commit('setMenu', this.menu)
            this.isOpen = true
            this.msg = '管理员登陆成功'
          } else {
            this.isOpen = true
            this.msg = '用户登陆成功'
            this.changeCodeImg()
          }
        }else{
          if(res.code == 500){
            alert('输入格式错误，请重新输入')
          }else{
            this.isMsg = true
            this.msg = res.msg
            console.log(res.msg)
            this.changeCodeImg()
          }
          } 

        //     else  if(res.code==2){
        //       this.menu=  [
        //     {
        //       name: '用户管理',
        //       order: '1',
        //       path: 'user',
        //     },{
        //       name: '管理',
        //       order: '1',
        //       children: [
        //         {
        //           path: 'stuednt',
        //           name: '学生管理',
        //         },
        //         {
        //           path: 'teacher',
        //           name: '教师管理',
        //         },
        //       ],
        //     },

        //   ],
        //   this.$router.push({ path: "/home" });
        //   this.$store.commit('setMenu', this.menu);
        //   // this.$store.commit('getMenu');
        //     }
      })
    },
  },
}
</script>

<style scoped>
.login-warp {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-warp .login_title {
  margin-left: 150px;
}
.login-warp .login-form {
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
}
.login-warp .login-btn {
  width: 100%;
}
.yzm {
  /* position: absolute; */
  /* display: flex; */
  /* align-items: center; */
}
.yan {
  display: flex;
  /* position: relative;
  top: 0; */
  /* width: 150px; */
}
.yan > el-input {
  width: 150px;
}
</style>
