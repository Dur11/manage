<template>
  <div class="common-table">
    <!-- :data="用于存放请求数据回来的数组"  -->
    <el-table :data="tableData" height="90%"  ref="multipleTable" @selection-change="handleSelectionChange"  stripe>
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-for="(item, index) in tableLabel"
        :prop="item.prop"
        :key="index"
        :label="item.label"
        width="160px"
      >
        <template slot-scope="scope">
          <!-- 表示该列的数 是来自所有行中的item.prop值 -->
          <!-- scope.row：用插槽拿到当前行row内置属性 -->
          <span style="margin-left=10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180" >
        <template slot-scope="scope">
          <!-- scope.row表示当前行的数据 -->
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>        
          <el-button size="mini" type="warning" @click="handleSet(scope.row)">相关信息</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
 
      </el-table-column>
    </el-table>
    <div style="margin-top: 0.2rem; margin-left: 0.2rem">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.pageNum"
        :page-sizes="[2, 3, 4, 5]"
        :page-size="query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="query.total"
      ></el-pagination>
      </div>
  </div>
</template>

<script>
export default {
  name: 'CommonTable',
  props: {
    tableData: Array, //表格的数据
    tableLabel: Array, //表格的首行提示数据
    query: Object,// 用于传输的总数居 接收分页等配置
    
  },
  data() {
    return {
      multipleSelection: []
    }
  },
  methods: {
    handleEdit(row) {
        this.$emit('edit',row)
    },
    handleDelete(row) {
         this.$emit('del',row)
    },
    handleSet(row){
      this.$emit('set',row)
    },
    handleSelectionChange(val) {
        // console.log(val)  //打印选中的行集合
        this.multipleSelection = val;
    },


    handleSizeChange(e) {
      this.$emit('handleSizeChange', e);
    },
    // 页码变化
    handleCurrentChange(e) {
      this.$emit('handleCurrentChange', e);
    }
}
}
</script>
<style>
.common-table {
  height: 550px;
  background-color: #fff;
  position: relative;
}
.common-table .pager {
  position: absolute;
  bottom: 0;
  right: 20px;
}
</style>
