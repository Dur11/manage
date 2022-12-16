<template>
  <div class="main">
    <div class="head abcd">
        <!-- <span>用户管理</span> -->
        <el-button type="primary" @click="addPow" style="height: 40px"
          >新增</el-button>
        </div>
    <CommonTable
        :tableData="tableData"
        :tableLabel="tableLabel"
        :query="query"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @del="delPow"
        @edit="editUser"
      ></CommonTable>
       <!-- 添加限权 -->
    <el-dialog :visible.sync="isAdd" width="50%">
      <el-form>
        <el-form-item label="限权" >
          <el-input v-model="add.re_name" style="width:200px"></el-input>
  </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isAdd = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑限权 -->
    <el-dialog :visible.sync="isEdit" width="50%">
      <el-form>
  
        <el-form-item label="限权" >
          <el-input v-model="edit.re_name" style="width:200px"></el-input>
  </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isEdit = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import CommonTable from '@/components/CommonTablep.vue'
export default{
  components:{CommonTable},
  data(){
    return{
       // table表格的数据
       tableData: [],
      // // table中列的配置数据
      tableLabel: [
        {
          prop: 're_id',
          label: 'id',
        },
        {
          prop: 're_name',
          label: '权限',
        },
      ],
      powdata:'',
      query: {
        //分页对象
        pageNum: 1,
        pageSize: 5,
        total: 0,
      },
      table:[],
      isAdd:false,
      isEdit:false,
        // 增加
        add: {
        re_name:''
      },
      edit:{
        re_id:'',
        re_name:''
      }
    }
  },
  created(){
    this.getList()
  },
  methods:{

    getList(){
      this.table=[]
      this.api.post('/resourceList').then((res)=>{
        res.data.forEach(item => {
          
          this.table.push(item)
          // console.log(this.table);
          // console.log(item.user);
        })
        console.log(this.table);
        // console.log(this.table);
        const DataAll = this.table
        console.log(DataAll);
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
        // console.log(this.tableData);
        // this.tableData.forEach((item) => {
        //   // console.log(item);
        //   if (item.s_id == 2) {
        //     item.s_id = '学生'
        //   } else {
        //     item.s_id = '教师'
        //   }
        // })
        //数据的总条数
        this.query.total = DataAll.length  
        //  this.tableData.forEach((item)=>{
        //   if(item.s_id==2){
        //     item.s_id='学生'
        //     // console.log(item);
        //   }else if(item.s_id==3){
        //     item.s_id='教师'
        //   }else if(item.s_id==1){
        //     item.s_id='管理员'
        //   }
        // })  
      })
    },
    addPow(){
      this.operateType = 'add'
      this.isAdd=true
      // console.log(this.add.re_name);
    },
    editUser(row) {
      this.operateType = 'edit'
      this.isEdit = true
      console.log(row);
      this.edit=row
      },
    
    delPow(row){
      console.log(row);
      this.$confirm('确定删除该条数据?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
      }).then((res) => {
        console.log(res)
        const id = row.re_id
        this.api.post('/delResource', { re_id: id }).then(() => {
          // $message、$confirm 为ElementUI弹出框的相关属性
          this.$message({
            type: 'success',
            message: '删除成功',
          })
          this.getList()
        })
      })
    },
    confirm() {
      if (this.operateType == 'add') {
        console.log(this.add)
        this.api.post('/addResource', this.add).then((res) => {
          console.log(res);
          this.isAdd = false //关闭弹窗
          if(res==true){
            this.$message({
            type: 'success',
            message: '添加成功',
          })
          }else{
            this.$message({
            type: 'success',
            message: '添加失败',
          })
          }
          this.getList()
         
        })
        // getList()
      } else {
        this.api.post('/updateResourceById', this.edit).then((res) => {
          console.log(res);
          this.isEdit= false //关闭弹窗
          if(res.code==200){
            this.$message({
            type: 'success',
            message: '编辑成功',
          })
          }else{
            this.$message({
            type: 'success',
            message: '编辑失败',
          })
          }
          this.getList()
        })
      }
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
   
}
}
</script>
<style>
</style>