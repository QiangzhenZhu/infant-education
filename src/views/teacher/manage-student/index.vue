<template>
  <div class="container">
    <div class="title">
      <i class="el-icon-notebook-1" />
      <span>学生信息管理</span>
    </div>
    <!--    标题-->
    <div class="input-stunum">
      <el-input id="el-input-stu" v-model="form.inputStuNo" size="small" clearable placeholder="学号/学生姓名" style="width: 195px" />
      <el-button id="el-button-query" size="small" @click="queryStudent">查询</el-button>
      <el-button id="el-button-reset" size="small" @click="reset">重置</el-button>
    </div>
    <!--    高级筛选-->
    <span style="margin: 8px auto;display: block">高级筛选▽</span>
    <div class="input-filter">
      <div class="input-filter-gender">
        <span>年级:</span>
        <el-checkbox-group v-model="form.genderCheckList" style="margin-left: 57px;">
          <el-checkbox label="2018级" />
          <el-checkbox label="2019级" />
          <el-checkbox label="2020级" />
          <el-checkbox label="2021级" />
        </el-checkbox-group>
      </div>

      <div class="input-filter-class">
        <span>班级:</span>
        <el-checkbox-group v-model="form.classCheckList" style="margin-left: 57px;">
          <el-checkbox label="大班" />
          <el-checkbox label="中班" />
          <el-checkbox label="小班" />
        </el-checkbox-group>
      </div>

      <div class="input-filter-sex">
        <span>性别:</span>
        <el-radio v-model="form.sexRadio" style="margin-left: 57px" label="1">男</el-radio>
        <el-radio v-model="form.sexRadio" label="0">女</el-radio>
      </div>

      <div class="input-filter-age">
        <span>年龄:</span>
        <el-select v-model="form.startAge" placeholder="请选择" size="small" style="width: 120px;margin-left: 57px">
          <el-option
            v-for="item in options_age"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <span id="divide">~</span>
        <el-select v-model="form.endAge" placeholder="请选择" size="small" style="width: 120px">
          <el-option
            v-for="item in options_age"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <!--    添加学生-->
    <el-row class="el-row-add">
      <el-col :span="2" :offset="21"> <el-button size="small" style="width: 140px;" @click="showAddDialog">+添加学生</el-button></el-col>
    </el-row>
    <add-student ref="AddStudentComponents"@CommitAddStudent="addStudent" />
    <delete-student ref="DeleteStudentComponents" title="是否删除该学生的信息(家长信息同时删除)？" />
    <!--    表格-->
    <template class="table">
      <el-table :data="tableData" border style="width: 95%" max-height="320px">
        <el-table-column fixed prop="order" label="序号" width="150" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="studentNo" label="学号" width="120" />
        <el-table-column prop="gender" label="年级" width="120" />
        <el-table-column prop="class" label="班级" width="80" />
        <el-table-column prop="address" label="家庭地址" width="300" />
        <el-table-column prop="parentName" label="家长姓名" width="300" />
        <el-table-column prop="contact" label="联系方式" width="300" />
        <el-table-column prop="courseInfo" label="学生课程信息" width="120" />
        <el-table-column prop="remark" label="备注" width="120" />
        <el-table-column prop="createTime" label="添加时间" width="120" />
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showEditDialog(scope.row)">修改</el-button>
            <span>|</span>
            <el-button type="text" size="small" @click="showDeleteDialog(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background page-size="4" pager-count="5" layout="prev, pager, next,jumper" :total="1000" style="margin: 15px 0px" />
    </template>
  </div>
</template>

<script>
import AddStudent from '@/views/teacher/manage-student/components/AddStudent'
import DeleteStudent from '@/components/manage/Delete'
export default {
  components: { AddStudent, DeleteStudent },
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
        name: '朱振强',
        studentNo: '12585455',
        gender: '3班',
        class: '3班',
        address: '山东省临沂市费县',
        parentName: '朱振强',
        contact: '13791556326',
        courseInfo: 'alksldad',
        remark: '无',
        createTime: '16165'
      }],
      addVisible: false,
      deleteVisible: false,
      editVisible: false
    }
  },
  methods: {
    // 学生添加 删除 修改操作
    showAddDialog: function() {
      this.$refs.AddStudentComponents.showAddStudentDialog()
      console.log('aaa')
    },
    showEditDialog(row) {
      this.$refs.AddStudentComponents.showEditStudentDialog(row)
    },
    showDeleteDialog(row) {
      this.$refs.DeleteStudentComponents.showDeleteDialog(row)
    },
    // 分页操作
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    reset() {
      this.form = {
        inputStuNo: '',
        genderCheckList: [],
        classCheckList: [],
        sexRadio: '',
        startAge: '',
        endAge: ''
      }
    },
    // 根据条件查询学生列表
    queryStudent() {
    },
    addStudent(form) {
      console.log(JSON.stringify(form));
    },
    queryClass(){

    }
  },
  mounted() {
    this.query()
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
