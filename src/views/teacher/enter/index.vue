<template>
  <div class="container">
    <select-tree class="tree" title="请选择要录入的课程" @node-click="handleNodeClick" />
    <div  class="div-table">
      <h1>{{ title + '成绩录入' }}</h1>
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="610"
        fit
        stripe
        :highlight-current-row="true"
        @current-change="currentRowChange">
        <el-table-column label="序号">
          <template slot-scope="scope">
            <span>{{ scope.$index+1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="学号"
          prop="stuNo"/>
        <el-table-column
          label="姓名"
          prop="stuName"/>
        <el-table-column
          v-for="item in talbeCreateArray"
          :label="item.lable">
          <template slot-scope="scope">
            <el-input v-model.number.lazy="scope.row[item.prop]" type="number" size="small" @input="tableInputValueChange" />
          </template>
        </el-table-column>
        <el-table-column
          label="个人绩点">
          <template slot-scope="scope">
            <el-tag type="info">{{ scope.row.gpa }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="特别记录"
          prop="stuName">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="">查看</el-button>
            <span>/</span>
            <el-button type="text" size="small">记录</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="历史成绩"
          prop="stuName">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showHistoryCourseInfo(scope.row)">详情>></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <special-record ref="SpecialRecordComponents" />
    <history-course ref="HistoryRecordComponents" @goCourseDetailEvent="goCourseDetail" />
    <course-detail ref="CourseDetailComponents" @goFullFillDetailEvent="goFullFillDetail(type)" />
    <full-fill-detail ref="FullFillDetailComponents" />
  </div>
</template>
<script>
import SelectTree from '@/components/Select/SelectTree'
import SpecialRecord from '@/views/teacher/enter/components/speicalRecord'
import HistoryCourse from '@/views/teacher/enter/components/HistoryCourse'
import CourseDetail from '@/views/teacher/enter/components/CourseDetail'
import FullFillDetail from '@/views/teacher/enter/components/FullFillDetail'
export default {
  components: {
    SelectTree, SpecialRecord, HistoryCourse, CourseDetail, FullFillDetail
  },
  data() {
    return {
      title: '东奔西跑',
      showMenu: true,
      tableCurrentRow: 1,
      tableData: [{
        stuNo: '0000001',
        stuName: '朱振强',
        course1: '',
        course2: '',
        course3: '',
        gpa: '自动计算',
        history: ''
      }, {
        stuNo: '0000002',
        stuName: '朱振强',
        course1: 1,
        course2: 2,
        course3: 3,
        gpa: '自动计算',
        history: ''
      }, {
        stuNo: '0000002',
        stuName: '朱振强',
        course1: 1,
        course2: 2,
        course3: 3,
        gpa: '自动计算',
        history: ''
      }, {
        stuNo: '0000002',
        stuName: '朱振强',
        course1: 1,
        course2: 2,
        course3: 3,
        gpa: '自动计算',
        history: ''
      }, {
        stuNo: '0000002',
        stuName: '朱振强',
        course1: 1,
        course2: 2,
        course3: 3,
        gpa: '自动计算',
        history: ''
      }, {
        stuNo: '0000002',
        stuName: '朱振强',
        course1: 1,
        course2: 2,
        course3: 3,
        gpa: '自动计算',
        history: ''
      }, {
        stuNo: '0000002',
        stuName: '朱振强',
        course1: 1,
        course2: 2,
        course3: 3,
        gpa: '自动计算',
        history: ''
      }, {
        stuNo: '0000002',
        stuName: '朱振强',
        course1: 1,
        course2: 2,
        course3: 3,
        gpa: '自动计算',
        history: ''
      }, {
        stuNo: '0000002',
        stuName: '朱振强',
        course1: 1,
        course2: 2,
        course3: 3,
        gpa: '自动计算',
        history: ''
      }, {
        stuNo: '0000002',
        stuName: '朱振强',
        course1: 1,
        course2: 2,
        course3: 3,
        gpa: '自动计算',
        history: ''
      }, {
        stuNo: '0000002',
        stuName: '朱振强',
        course1: 1,
        course2: 2,
        course3: 3,
        gpa: '自动计算',
        history: ''
      }],
      talbeCreateArray: [{
        prop: 'course1',
        lable: '东奔西跑'
      }, {
        prop: 'course2',
        lable: '自主完成拼接任务'
      }, {
        prop: 'course3',
        lable: '情绪表现'
      }],
      currentInput: ''
    }
  },
  methods: {
    handleNodeClick(data) {
      this.showMenu = false
    },
    currentRowChange(newRow, oldRow) {
      this.tableCurrentRow = newRow
      console.log(newRow)
    },
    showHistoryCourseInfo(row) {
      this.$refs.HistoryRecordComponents.showHistoryCourseDialog()
    },
    goCourseDetail() {
      this.$refs.CourseDetailComponents.showHistoryCourseDetailDialog()
    },
    goFullFillDetail(type) {
      this.$refs.FullFillDetailComponents.showFullFillDetailDialog(type)
    },
    tableInputValueChange(value) {
      const tableData = this.tableData
      for (const item of tableData) {
        item.gpa = ((item.course1 + item.course2 + item.course3) / (10 * 3)).toFixed(2)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 60px 20px;
  margin-top: 60px;
  .tree{
    width: 15%;
  }
  .div-table {
    width: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    background-color: white;
    border-radius: 18px;
    padding: 0 20px 50px 20px;
    text-align: center;
    h1{
      width: 80%;
      padding: 15px;
      border-radius: 50px;
      background-color: #4CAF50;
      position: relative;
      top: -50px;
    }
  }

}

</style>
