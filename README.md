# per-manage

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



<template>
  <div class="manage">
    <div class="manage-header">
      <el-button type="primary" @click="addUser">新增</el-button>
      <!-- 查询 -->
<div class="chaxun">
  <el-form :inline="true" :model="searchForm" class="demo-form-inline">
  <el-form-item >
    <el-input v-model="searchForm.u_sex" placeholder="性别" style="width:70px"></el-input>
  </el-form-item>
  <el-form-item>
    <el-input v-model="searchForm.s_id" placeholder="职位" style="width:70px"></el-input>
  </el-form-item>
  <el-form-item >
    <el-input v-model="searchForm.minAge" placeholder="最小年龄" style="width:70px"></el-input>
  </el-form-item>
  <el-form-item >
    <el-input v-model="searchForm.maxAge" placeholder="最大年龄" style="width:70px"></el-input>
  </el-form-item>
  <el-form-item >
    <el-input v-model="searchForm.orderByAge" placeholder="年龄排序" style="width:70px"></el-input>
  </el-form-item>
  <el-form-item >
    <el-input v-model="searchForm.orderById" placeholder="id排序" style="width:70px"></el-input>
  </el-form-item>
  <el-button type="primary" @click="consult()">查询</el-button>
    </el-form>
    <!-- <el-select v-model="value"  placeholder="性别"  @change="sexSelect"  style="width:75px">
    <el-option
      v-for="item in sex"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-select v-model="value"  placeholder="职位"  @change="poSelect" style="width:75px">
    <el-option
      v-for="item in position"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-select v-model="value"  placeholder="排序"  @change="ageSelect"  style="width:75px">
    <el-option
      v-for="item in orderByAge"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-select v-model="value"  placeholder="排序"  @change="idSelect"  style="width:75px">
    <el-option
      v-for="item in orderById"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
   <div class="input">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
  <el-form-item>
    <el-input v-model="searchForm.minAge" placeholder="最小年龄" style="width:70px"></el-input>
  </el-form-item>
  <el-form-item >
    <el-input v-model="searchForm.maxAge" placeholder="最大年龄" style="width:70px"></el-input>
  </el-form-item>
    </el-form>
   </div>
    <el-button type="primary" @click="consult()">查询</el-button> -->
</div>
      <!-- 搜索 -->
      <div class="content">
        <el-input
          v-model.trim="inputContent"
          placeholder="请输入id"
        ></el-input>
        <el-button type="primary" @click="getSearch" class="search"
          >搜索</el-button
        >
      </div>
    </div>
    <el-dialog :visible.sync="isShow" width="50%">
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
      >
      </common-form>
      <div slot="footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="manage-table">
      <CommonTable
        :tableData="tableData"
        :tableLabel="tableLabel"
        :query="query"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @edit="editUser"
        @del="delUser"
      ></CommonTable>
    </div>
  </div>
</template>

<script>
import CommonTable from '@/components/CommonTable.vue'
import CommonForm from '@/components/CommonForm.vue'
export default {
  components: { CommonTable, CommonForm },
  data() {
    return {
        //   sex: [{
        //   value: '0',
        //   label: '不限'
        // },{
        //   value: '1',
        //   label: '男'
        // }, {
        //   value: '2',
        //   label: '女'
        // }],
        // value: '请选择',
        //   position:[{
        //   value: '0',
        //   label: '不限'
        // },{
        //   value: '1',
        //   label: '管理员'
        // }, {
        //   value: '2',
        //   label: '学生'
        // }, {
        //   value: '3',
        //   label: '教师'
        // }],
        //   orderByAge:[{
        //   value: '0',
        //   label: '不限'
        // },{
        //   value: '1',
        //   label: '顺序'
        // }, {
        //   value: '2',
        //   label: '倒叙'
        // }],
        // orderById: [{
        //   value: '0',
        //   label: '不限'
        // },{
        //   value: '1',
        //   label: '顺序'
        // }, {
        //   value: '2',
        //   label: '倒叙'
        // }],
      // 这是el-from表单对应的数据存放处,id，name则是form中input输入框
      // formInline: {
      //   id: "",
      //   name: "",
      // },
      u_id: '',
      // dialog弹窗默认关闭
      isShow: false,
      // table表格的数据
      tableData: [],
      // table中列的配置数据
      tableLabel: [
        {
          prop: 'u_id',
          label: 'id',
        },
        {
          prop: 'u_name',
          label: '姓名',
        },
        {
          prop: 'u_age',
          label: '年龄',
        },
        {
          prop: 'u_sex',
          label: '性别',
        },
        {
          prop: 's_id',
          label: '职位',
        },
      ],
      // 新增表单标签数据
      operateFormLabel: [
        {
          model: 'u_name',
          label: '姓名',
          type: 'input',
        },
        {
          model: 'u_age',
          label: '年龄',
          type: 'input',
        },
        {
          model: 'u_sex',
          label: '性别',
          type: 'input',
        },
        {
          model: 's_id',
          label: '职位',
          type: 'input',
        },
      ],
      // 修改表单元素时会通过双向数据绑定修改父组件传递来的数据
      operateForm: {
        u_id:"",
        u_name: '',
        u_age: '',
        u_sex: '',
        s_id: '',
      },
      // 搜索时要传入的数据
      inputContent: '',
      
      searchForm: {
        // 点击搜索传给的数据
        u_id: '',
    u_sex: "",
    s_id: "",
    minAge: "",
    maxAge: "",
    orderByAge: "",
    orderById: ""
      },
      query: {
        //分页对象
        pageNum: 1,
        pageSize: 5,
        total: 0,
      },
      form:{
        u_sex:"",
        s_id:" ",
        minAge:" ",
        maxAge:" ",
        orderBy:" ",
        orderById:" "
      }  
    }
  },
  methods: {
    sexSelect(val){
    //  console.log(val);
     this.form.u_sex=val
     console.log(this.form.u_sex);
    //  this.getList()
    },
    confirm() {
      if (this.operateType == 'add') {
        // console.log(this.operateForm)
        this.api.post('/addUser', this.operateForm).then((res) => {
          console.log(res)
          this.isShow = false //关闭弹窗
          this.getList()
        })
        // getList()
      }else{
        this.api.post("/updateUserById", this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false; //关闭弹窗
          this.getList();
        });
      }
    },
    // 新增
    addUser() {
      (this.isShow = true),
        (this.operateType = 'add'),
        // 数据初始化
        (this.operateForm = {
          s_id: '',
          u_name: '',
          u_age: '',
          u_sex: '',
        })
    },
    editUser(row) {
      this.operateType = 'edit'
      this.isShow = true
      // this.operateForm = row //数据回写当前行的数据
      // if(this.operateForm)
      this.operateForm = {
          u_id: row.u_id,
          s_id: row.s_id=="学生"?2:3,
          u_name: row.u_name,
          u_age: row.u_age,
          u_sex: row.u_sex,
        }
        console.log(this.operateForm)
    },
    // 删除
    delUser(row) {
      this.$confirm('确定删除该条数据?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
      }).then((res) => {
        console.log(res)
        const id = row.u_id
        this.api.post('/delUser', { u_id: id }).then(() => {
          // $message、$confirm 为ElementUI弹出框的相关属性
          this.$message({
            type: 'success',
            message: '删除成功',
          })
          this.getList()
        })
      })
    },
    getList() {
      this.api.get('/userPage').then((res) => {
        // console.log(res)
        this.table = res.records
        const DataAll = this.table
        //每次执行方法，将展示的数据清空
        this.tableData = []
        //1、当前页的第一条数据在总数据中的位置
        let strlength = (this.query.pageNum - 1) * this.query.pageSize + 1
        //2、当前页的最后一条数据在总数据中的位置
        let endlength = this.query.pageNum * this.query.pageSize
        //3、此判断很重要，执行时机：当分页的页数在最后一页时，进行重新筛选获取数据时
        //获取本次表格最后一页第一条数据所在的位置的长度
        let resStrLength = 0
        if (DataAll.length % this.query.pageSize == 0) {
          resStrLength =
            (parseInt(DataAll.length / this.query.pageSize) - 1) *
              this.query.pageSize +
            1
        } else {
          resStrLength =
            parseInt(DataAll.length / this.query.pageSize) *
              this.query.pageSize +1
        }
        //如果上一次表格的最后一页第一条数据所在的位置的长度 大于 本次表格最后一页第一条数据所在的位置的长度，则将本次表格的最后一页第一条数据所在的位置的长度 为最后长度
        if (strlength > resStrLength) {
          strlength = resStrLength
        }
        //4、当分页的页数切换至最后一页，如果最后一页获取到的数据长度不足最后一页设置的长度，则将设置的长度 以 获取到的数据长度 为最后长度
        if (endlength > DataAll.length) {
          endlength = DataAll.length
        }
        //5、循环获取当前页数的数据，放入展示的数组中
        for (let i = strlength - 1; i < endlength; i++) {
          this.tableData.push(DataAll[i])
        }
        this.tableData.forEach((item)=>{
          // console.log(item);
          if(item.s_id==2){
            item.s_id='学生'
          }else{
            item.s_id='教师'
          }
        })
        //数据的总条数
        this.query.total = DataAll.length
      })
    },
    //切换当前页显示的数据条数，执行方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.query.pageSize = val
      this.getList()
    },
    //切换页数，执行方法
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.query.pageNum = val
      this.getList()
    },
    getSearch() {
      this.searchForm.u_id= this.inputContent
      if(this.searchForm.u_id==""){
        this.getList()
      }else{
        this.api.post('/getUserById', this.searchForm).then((res) => {
          console.log(res);
        this.tableData = []
        // console.log(this.tableData);
        this.tableData.push(res)
      })
      }
    },
    consult(){
      this.api.post('/selectBy',this.searchForm).then((res)=>{
        this.tableData = []
        this.tableData=res
        
      })
    }
  },
  // 页面一加载就得调用
  created() {
    this.getList()
  },
}
</script>

<style>
/* .manage{
  height: 60px;
} */
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* height:"calc(100vh - 300px)"; */
  position: relative;
}
.content {
  position: relative;
}
.search {
  /* display: inline-block; */
  position: absolute;
  top: 0;
  right: 0;
}
.chaxun{
 position: absolute;
 left: 200px;
 top: 0px;
}
</style>
