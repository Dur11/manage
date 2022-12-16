<template>
  <el-form ref="form" label-width="100px" :model="form" :inline="inline">
    <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
      <el-input         
          :placeholder="`请输入${item.label}`"
          v-model="form[item.model]"
      >
      </el-input>
    </el-form-item>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name:'CommonForm',
    // 由外部组件传入数据。
    props:{
        formLabel:Array,
        form:Object,
        inline:Boolean,
    },

  data() {
      return {
        
      }
    },
}
</script>

<style scoped>

</style>