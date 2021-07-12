<template>
  <el-card class="tree">
    <div slot="header" class="clearfix">
      <span>课程列表</span>
    </div>
    <el-tree :data="treeData" :props="treeProps" highlight-current="true" @node-click="handleNodeClick" />
  </el-card>
</template>

<script>
export default {
  name: "SelectTree",
  methods:{
    handleNodeClick(data1,data2,data3){
     this.$emit('node-click',data1)
    }
  },
  props: {
    title:{
      type:String,
      default:'课程列表'
    }
  },

  data(){
    return{
      treeData: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }]
    }
  }
}
</script>

<style scoped>

</style>
