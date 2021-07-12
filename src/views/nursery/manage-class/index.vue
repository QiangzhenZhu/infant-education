<template>
  <div class="container">
    <div class="title">
      <i class="el-icon-notebook-1" />
      <span>班级管理</span>
    </div>
    <!--    标题-->
    <div class="input-stunum">
      <el-input id="el-input-stu" v-model="form.inputStuNo" size="small" clearable placeholder="班主任姓名" style="width: 195px" />
      <el-button id="el-button-query" size="small">查询</el-button>
      <el-button id="el-button-reset" size="small">重置</el-button>
    </div>
    <!--    添加学生-->
    <el-row class="el-row-add">
      <el-col :span="2" :offset="21"> <el-button size="small" style="width: 140px;" @click="showAddDialog">+添加班级</el-button></el-col>
    </el-row>
    <add-nursery ref="AddClassComponents" />
    <delete ref="DeleteClassComponents" title="是否删除该机构的信息"/>
    <!--    表格-->
    <template class="table">
      <el-table :data="tableData" border style="width: 95%" max-height="320px">
        <el-table-column fixed prop="order" label="序号" width="150" />
        <el-table-column prop="gender" label="教师姓名" width="150" />
        <el-table-column prop="class" label="职称" width="150" />
        <el-table-column prop="mainTeacher" label="班主任姓名" width="150" />
        <el-table-column prop="studentsNumber" label="班级人数" width="150" />
        <el-table-column prop="mainTeacherContact" label="班主任手机号" width="300" />
        <el-table-column prop="remark" label="备注" width="200" />
        <el-table-column prop="createTime" label="添加时间" width="200" />
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showEditDialog(scope.row)">修改</el-button>
            <span>|</span>
            <el-button type="text" size="small" @click="showDeleteDialog(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        page-size="4"
        pager-count="5"
        layout="prev, pager, next,jumper"
        :total="1000"
        style="margin: 15px 0px"/>
      <!--        @size-change="" @current-change="" @prev-click="" @next-click=""-->
    </template>
  </div>
</template>

<script>
import AddNursery from '@/views/nursery/manage-class/components/AddClass'
import Delete from '@/components/manage/Delete'
export default {
  components: { AddNursery, Delete },
  data() {
    return {
      form: {
        inputStuNo: '',
        genderCheckList: [],
        classCheckList: [],
        sexRadio: '',
        startAge: '',
        endAge: ''
      },
      options_age: [{
        label: '3岁',
        value: 3
      }, {
        label: '4岁',
        value: 4
      }, {
        label: '5岁',
        value: 5
      }, {
        label: '6岁',
        value: 6
      }, {
        label: '7岁',
        value: 7
      }, {
        label: '8岁',
        value: 8
      }, {
        label: '9岁',
        value: 9
      }],
      tableData: [{
        order: 1,
        mainTeacher: '朱振强',
        studentsNumber: 50,
        gender: '2019级',
        class: '3班',
        mainTeacherContact: '17853593228',
        parentName: '朱振强',
        contact: '13791556326',
        remark: '无',
        createTime: '2021-6-29 20:31:59'
      }],
      addVisible: false,
      deleteVisible: false,
      editVisible: false
    }
  },
  methods: {
    // 学生添加 删除 修改操作
    showAddDialog: function() {
      this.$refs.AddClassComponents.showAddClassDialog()
      console.log('aaa')
    },
    showEditDialog(row) {
      this.$refs.AddClassComponents.showEditClassDialog(row)
    },
    showDeleteDialog(row) {
      this.$refs.DeleteClassComponents.showDeleteDialog(row)
    },
    // 分页操作
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: 100%;
  margin-left: 50px;
  .title{
    margin-top: 4px;
    i{
      position: relative;
      top: 4px;
      color: black;
      font-size: 34px;
    }
    span{
      margin-left: 4px;
      color: #333333;
      font-size: 19px;
      font-weight: bold;
    }
  }
  .input-stunum{
    margin-top: 20px;
    .el-input-stu{
    }
    #el-button-query{
      width: 140px;
      margin-left: 22px;
    }
    #el-button-reset{
      width: 140px;
      margin-left: 22px;
    }
  }

  .input-filter{
    font-size: 14px;
    div{
      display: flex;
      justify-content: start;
      align-items: center;
      color: #333333;
      margin: 5px 0px;
    }
    label{
      font-weight: normal;
    }
    .input-filter-age{
      #divide{
        margin-left: 15px;
        margin-right: 15px;
      }
    }
  }
  .el-row-add{
    margin: 15px;
  }
}
</style>

