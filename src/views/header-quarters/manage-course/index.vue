<template>
  <div class="container">
    <div class="title">
      <i class="el-icon-notebook-1" />
      <span>课程管理</span>
    </div>
    <!--    标题-->
    <div class="input-stunum">
      <el-input id="el-input-stu" v-model="form.inputStuNo" size="small" clearable placeholder="课程名称" style="width: 195px" />
      <el-button id="el-button-query" size="small">查询</el-button>
      <el-button id="el-button-reset" size="small">重置</el-button>
    </div>
    <!--    高级筛选-->
    <span style="margin: 8px auto;display: block">高级筛选▽</span>
    <div class="input-filter">
      <div class="input-filter-class">
        <span>适合年级:</span>
        <el-checkbox-group v-model="form.classCheckList" style="margin-left: 57px;">
          <el-checkbox label="大班" />
          <el-checkbox label="中班" />
          <el-checkbox label="小班" />
        </el-checkbox-group>
      </div>

      <div class="input-filter-course-type">
        <span>课程类型:</span>
        <el-checkbox-group v-model="form.classCheckList" style="margin-left: 57px;">
          <el-checkbox label="健康" />
          <el-checkbox label="社会" />
          <el-checkbox label="科学" />
          <el-checkbox label="语言" />
          <el-checkbox label="艺术" />
        </el-checkbox-group>
      </div>
    </div>
    <!--    添加学生-->
    <el-row class="el-row-add">
      <el-col :span="2" :offset="21"> <el-button size="small" style="width: 140px;" @click="showAddDialog">+添加课程</el-button></el-col>
    </el-row>
    <add-course ref="AddCourseComponents" />
    <delete ref="DeleteCourseComponents" title="是否删除该课程的信息？" />
    <!--    表格-->
    <template class="table">
      <el-table :data="tableData" border style="width: 95%" max-height="320px">
        <el-table-column fixed prop="order" label="序号" width="150" />
        <el-table-column fixed prop="courseName" label="课程名称" width="250" />
        <el-table-column prop="gender" label="适合年级" width="200" />
        <el-table-column prop="courseType" label="课程类型" width="150" />
        <el-table-column prop="courseID" label="课程代码" width="200" />
        <el-table-column prop="courseData" label="课程教材" width="200" />
        <el-table-column prop="remark" label="备注" width="200" />
        <el-table-column prop="createTime" label="添加时间" width="250" />
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showEditDialog(scope.row)">修改</el-button>
            <span>|</span>
            <el-button type="text" size="small" @click="showDeleteDialog(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next,jumper"
        :total="1000"
        style="margin: 15px 0px"
      />
      <!--        @size-change="" @current-change="" @prev-click="" @next-click=""-->
    </template>
  </div>
</template>

<script>
import Delete from '@/components/manage/Delete'
import AddCourse from '@/views/header-quarters/manage-course/components/AddCourse'
export default {
  components: { Delete, AddCourse },
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
        courseName: '无忧无虑',
        gender: '大班',
        courseType: '社会',
        courseID: '548686857485454',
        courseData: '查看详情',
        remark: '',
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
      this.$refs.AddCourseComponents.showAddCourseDialog()
      console.log('aaa')
    },
    showEditDialog(row) {
      this.$refs.AddCourseComponents.showEditCourseDialog(row)
    },
    showDeleteDialog(row) {
      this.$refs.DeleteCourseComponents.showDeleteDialog(row)
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
