<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加意见与措施</span>
      </div>
      <el-tree :data="treeData" :props="treeProps" @node-click="handleNodeClick" />
    </el-card>
    <add-expert-advised ref="AddExpertAdvise"></add-expert-advised>
  </div>
</template>

<script>
import AddExpertAdvised from '@/views/header-quarters/expert-advise/components/AddExpertAdvise'
export default {
  name: 'Index',
  components: {
    AddExpertAdvised
  },
  data() {
    return {
      treeData: [{
        label: '山东省',
        children: [{
          label: '临沂市',
          children: [{
            label: '费县',
            children: [{
              label: '知行合一幼儿园',
              children: [{
                label: '派大星'
              }, {
                label: '海绵宝宝'
              }, {
                label: '章鱼老板'
              }]
            }, {
              label: '派大星幼儿园',
              children: [{
                label: '派大星'
              }, {
                label: '海绵宝宝'
              }, {
                label: '章鱼老板'
              }]
            }, {
              label: '真果粒幼儿园',
              children: [{
                label: '派大星'
              }, {
                label: '海绵宝宝'
              }, {
                label: '章鱼老板'
              }]
            }]
          }]
        }]
      }],
      treeProps: {
        label: 'label',
        children: 'children'
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
      this.$refs.AddExpertAdvise.showAddCourseDialog();
    }
  }
}
</script>

<style lang="scss"   scoped>
.container{
  display: flex;
  justify-content: start;
  align-items: center;
  ::v-deep .el-card{
    width: 15%;
    height: 700px;
    margin-top: 80px;
    margin-left: 40px;
  }
}

</style>
