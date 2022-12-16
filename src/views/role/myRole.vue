<template>
  <div class="manage">
    <div class="rmanage-header">
      <!-- 新增 -->
      <div class="lhead">
        身份名称：
        <el-select v-model="value"  placeholder="角色名称"  @change="watchSelect" class="select">
          <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-button type="primary" @click="consult()">查询</el-button>
        
      </div>  
    </div>
     <!-- 选择 -->
     <div class="rhead">
       <div class="luse">角色列表</div>
       <div class="ruse">
        <el-button type="primary" @click="addRole" size="small">新增</el-button>
      <el-button type="primary" @click="deleAll" size="small">批量删除</el-button>
       </div>
      </div>
      <!-- 新增 -->
      <el-dialog :visible.sync="isAdd" width="50%">
      <el-form>
        <el-form-item label="角色">
          <el-input v-model="add.r_name" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <el-select
            v-model="valuen"
            placeholder="请选择"
            @change="inSid"
            style="width: 150px"
          >
          <el-option label="管理员" value="管理员"></el-option>
      <el-option label="学生" value="学生"></el-option>
      <el-option label="教师" value="教师"></el-option>
          </el-select>
  </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isAdd = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog :visible.sync="isEdit" width="50%">
      <el-form>
        <el-form-item label="角色">
          <el-input v-model="add.r_name" style="width:200px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isEdit = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <el-dialog :visible.sync="isShow" width="50%">
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
    </el-dialog> -->
    <el-dialog :visible.sync="isOpen" width="50%">
      <el-form>
        <el-form-item label="权限拥有:">
          <el-tag v-for="(item,index) in this.roleData" :key="index">{{item}}</el-tag>
    </el-form-item>
    <el-form-item label="未拥有权限:">
      <el-tag v-for="(item,index) in this.nroleData" :key="index">{{item}}</el-tag>
    </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isOpen = false">关闭</el-button>
        
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
        @set="setPre"
        ref="multipleTable"
      ></CommonTable>
 </div>
  </div>
</template>

<script>
import CommonTable from '@/components/CommonTable.vue'
// import CommonForm from '@/components/CommonForm.vue'
  export default {
    components:{CommonTable},
  data() {
    return {
      options: [{
          value: '0',
          label: '不限'
        },{
          value: '1',
          label: '管理员'
        },{
          value: '2',
          label: '学生'
        }, {
          value: '3',
          label: '教师'
        }],
        value: '请选择',
      r_id: '',
      // dialog弹窗默认关闭
      isShow: false,
      isOpen:false,
      isAdd:false,
      isEdit:false,
      // table表格的数据
      tableData: [],
      // // table中列的配置数据
      tableLabel: [
        {
          prop: 'r_id',
          label: 'id',
        },
        {
          prop: 'r_name',
          label: '角色',
        },
        {
          prop: 's_id',
          label: '身份',
        }
      ],
      // 新增表单标签数据
      operateFormLabel: [
        {
          model: 'r_name',
          label: '角色',
          type: 'input',
        },
        {
          model: 's_id',
          label: '身份',
          type: 'input',
        }
      ],
      // 修改表单元素时会通过双向数据绑定修改父组件传递来的数据
      operateForm: {
        // u_id:"",
        r_name: '',
        s_id: '',
      },
      query: {
        //分页对象
        pageNum: 1,
        pageSize: 5,
        total: 0,
      },
      form:{
        s_id:"0",
      },
      roleData:[],
      nroleData:[],
      valuen:[],
      add:{
        r_id:'',
        r_name:'',
        s_id:''
      },
      id:'',
      deldata:{
        re_id:''
      }
    }
  },
  methods: {
    // 搜索
    watchSelect(val){
    //  console.log(val);
     this.form.s_id=val
    },
    consult() {
        console.log(this.form);
          this.api.post('/roleList', this.form).then(res => {
            // console.log(res);
              // this.tableData = [];
              // this.tableData = res;
              this.table = res
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
              this.query.pageSize +
            1
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
        this.tableData.forEach((item) => {
          // console.log(item);
          if (item.s_id == 2) {
            item.s_id = '学生'
          } else {
            item.s_id = '教师'
          }
        })
        //数据的总条数
        this.query.total = DataAll.length
          });
      },
    confirm() {
      if (this.operateType == 'add') {
        // console.log(this.operateForm)
        this.api.post('/addRole', this.add).then((res) => {
          console.log(res)
          this.isAdd = false //关闭弹窗
          if(res.msg=='成功'){
            this.$message({
            type: 'success',
            message: '添加成功',
          })
          }else{
            this.$message({
            type: 'success',
            message: '该角色名称已存在',
          })
          }
          this.getList()
        })
        // getList()
      }else {
        this.api.post('/updateRoleById', this.add).then((res) => {
          console.log(res.msg)
          if(res.msg=='name存在'){
            this.$message({
            type: 'success',
            message: '该角色名称存在',
          })
          }else{
            this.isEdit= false //关闭弹窗
          this.$message({
            type: 'success',
            message: '编辑成功',
          })
          this.getList()
          }
          

        })
      }
    },
    // 新增
    inSid(val){
      this.add.s_id=val
      console.log(this.add.s_id);
    },
    addRole() {
      // console.log(111);
      (this.isAdd = true),
        (this.operateType = 'add'),
        // 数据初始化
        (this.add = {
          r_name: '',
          s_id:''
        })
    },
    editUser(row) {
      // console.log(row);
      this.operateType = 'edit'
      this.isEdit= true
      this.add = {
        r_id:row.r_id,
          r_name: row.r_name,
          // s_id:row.s_id,
        }
      console.log(row)
    },
    // 删除
    delUser(row) {
      this.$confirm('确定删除该条数据?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
      }).then((res) => {
        console.log(res)
        const id = row.r_id
        this.api.post('/delRole', { r_id: id }).then(() => {
          // $message、$confirm 为ElementUI弹出框的相关属性
          this.$message({
            type: 'success',
            message: '删除成功',
          })
          this.getList()
        })
      })
    },
    // 批量删除
    deleAll(){
      var arr=[]
      // const id=this.$refs.multipleTable.multipleSelection
      console.log(this.$refs.multipleTable.multipleSelection)
      this.$refs.multipleTable.multipleSelection.forEach(row=>arr.push(row.r_id))
      console.log(arr);
      this.$confirm('确定删除该条数据?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
      }).then(()=>{
        this.api.post('/delRoles',arr).then(()=>{
        this.$message({
            type: 'success',
            message: '删除成功',
          })
          this.getList()
      })
      })
    },
    getList(){
        this.api.post('/roleList',this.form).then((res) => {
          console.log(res);
        // this.tableData=res
        this.table = res
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
              this.query.pageSize +
            1
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
        this.tableData.forEach((item) => {
          // console.log(item);
          if (item.s_id == 2) {
            item.s_id = '学生'
          } else {
            item.s_id = '教师'
          }
        })
        //数据的总条数
        this.query.total = DataAll.length  
         this.tableData.forEach((item)=>{
          if(item.s_id==2){
            item.s_id='学生'
            // console.log(item);
          }else if(item.s_id==3){
            item.s_id='教师'
          }else if(item.s_id==1){
            item.s_id='管理员'
          }
        })  
    },
    // console.log(this.tableData)
   
    )},
    // 设置权限
    setPre(row){
      this.isOpen=true
      console.log(row);
      if(row.s_id=='学生'){
        this.id = 2
      }else if(row.s_id=='教师'){
        this.id = 3
      }else{
        this.id=1
      }
      console.log(this.id);
      this.api.post('/status_resource/queryResourceBySId',{ s_id: this.id }).then((res)=>{
        // console.log(res);
        this.roleData=[]
       res.data.forEach(item=>this.roleData.push(item.re_name))
        // console.log(this.roleData);
      })
      this.api.post('/status_resource/queryNONResourceBySId',{ s_id: this.id }).then((res)=>{
        // console.log(res.data);
        // console.log(res.data);
        this.nroleData=[]
        res.data.forEach(item=>this.nroleData.push(item.re_name))
        // console.log(this.nroleData);
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
    // },
  },
},

  // 页面一加载就得调用
  created() {
    this.getList()
  },
  }
</script>
<style>
.container{
  height: 100%;
  background-color: white;
}
.rmanage-header{
  /* position: relative; */
  margin-top: 10px;
  /* display: flex;
  justify-content: space-between;
        align-items: center; */
}
.lhead{
  height: 50px;
  background-color: #fff;
  margin-bottom: 5px;
  padding: 3px 20px;
}
.rhead{
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
}
/* .ruse el-button{
  font-size: 24px;
} */
/* .this.tableData-header .alldel{
  position: absolute;
  left: 80px;
} */
/* .manage-header .select{
  width: 200px;
  position: absolute;
  left: 0;
} */
</style>