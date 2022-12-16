<template>
  <div class="main">
      <CommonTable
        :tableData="tableData"
        :tableLabel="tableLabel"
        :query="query"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @look="lookUser"
        @del="delUser"
        @set="setPre"
        ref="multipleTable"
      ></CommonTable>
      <el-dialog :visible.sync="isOpen" width="50%">
      <el-form>
        <el-form-item label="包含的权限有:">
          <el-tag v-for="(item,index) in this.preData" :key="index">{{item}}</el-tag>
    </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isOpen = false">关闭</el-button>
        
      </div>
    </el-dialog>
    <el-dialog :visible.sync="isOpenn" width="30%">
      该用户暂无限权
      <div slot="footer">
        <el-button @click="isOpenn = false">关闭</el-button>
        
      </div>
    </el-dialog>
    <!-- 添加限权 -->
    <el-dialog :visible.sync="isAdd" width="50%">
      <el-form>
        <el-form-item label="限权" >
          <el-select
            v-model="value"
            placeholder="限权"
            @change="inReid"
            style="width: 150px"
            @click.native="inSee"
          >
          <el-option v-for="(item,index) in this.xdata" :key="index" :label="item.re_name" :value="item.re_id"></el-option>

          </el-select>
  </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isAdd = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog :visible.sync="isdel" width="50%">
      <el-form>
        <el-form-item label="限权" >
          <el-select
            v-model="value"
            placeholder="限权"
            @change="inReid"
            style="width: 150px"
            @click.native="noSee"
          >
          <el-option v-for="(item,index) in this.xdata" :key="index" :label="item.re_name" :value="item.re_id"></el-option>

          </el-select>
  </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isdel = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
 </div>
</template>

<script>
import CommonTable from '@/components/CommonTablet.vue'
export default{
  components:{CommonTable},
  data(){
    return{
      isOpen:false,
      isOpenn:false,
      isAdd:false,
      isdel:false,
      // table表格的数据
      tableData: [],
      // // table中列的配置数据
      tableLabel: [
        {
          prop: 'u_id',
          label: 'id',
        },
        {
          prop: 'u_name',
          label: '姓名',
        },
      ],
      form:{
        u_id:"0",
      },
      query: {
        //分页对象
        pageNum: 1,
        pageSize: 5,
        total: 0,
      },
      table:[],
      preData:[],
      value:[],
      xquan:{
        u_id:'',
        re_id:''
      },
      nxquan:{
        u_id:'',
        re_id:''
      },
      xdata:[],
      ydata:[]
    }
  },
  // 页面一加载就得调用
  created() {
    this.getList()
  },
  methods:{
    inSee(){
      // console.log(this.xquan.u_id);
      this.api.post('/user_resource/queryNONResourceByUId',this.xquan).then((res)=>{
        console.log(res.data);
        this.xdata=[]
        res.data.forEach(item=>{
          this.xdata.push(item)
        })
        console.log(this.xdata);
      })
    },
    noSee(){
      console.log(this.xquan);
      this.api.post('/user_resource/queryResourceByUId',this.xquan).then((res)=>{
        console.log(res.data);
        this.xdata=[]
        res.data.forEach(item=>{
          this.xdata.push(item)
        })
        console.log(this.xdata);
      })
    },
    inReid(val){
      this.xquan.re_id=val
      console.log(this.xquan.re_id);
    },
    lookUser(row){
      
      const id=row.u_id
      this.api.post('/user_resource/queryResourceByUId', { u_id: id }).then((res) => {
          // $message、$confirm 为ElementUI弹出框的相关属性
          console.log(res.msg);
          this.preData=[]
          if(res.msg=='成功'){
            this.isOpen=true
            res.data.forEach(item=>this.preData.push(item.re_name))
        }else{
          // this.isOpen=false
          this.isOpenn=true
        }
        console.log(this.preData)
          })
    },
    delUser(row){
      this.nxquan=row
      this.$confirm('确定删除该条数据?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
      }).then(()=>{
        this.api.post('/user_resource/delUserResource',this.nxquan).then(()=>{
        this.$message({
            type: 'success',
            message: '删除成功',
          })
          this.getList()
      })
      })
    },
    setPre(row){
      this.operateType = 'set'
      this.isAdd=true
      this.xquan.u_id=row.u_id
     
    },
    confirm() {   
        // console.log(this.operateForm)
          this.api.post('/user_resource/addUserResource',this.xquan).then((res)=>{
        console.log(res);
        this.isAdd = false //关闭弹窗
        this.$message({
            type: 'success',
            message: '添加成功',
          })
      })
        
        // getList()
    },
    getList(){
      this.table=[]
        this.api.post('/user_resource/queryUserResource').then((res) => {
          // console.log(res[0].resource);
          // console.log(res[0].user);
          // console.log(111);
        // this.tableData=res
        // const table=[]
        res.forEach(item => {
          
          this.table.push(item.user)
          // console.log(this.table);
          // console.log(item.user);
        })
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
    },
    // console.log(this.tableData)
   
    )},
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
.main{
margin-top: 15px;
}
</style>