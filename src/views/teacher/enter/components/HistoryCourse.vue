<template>
  <div>
    <el-dialog :visible.sync="dialogFormVisible">
      <!--      标题-->
      <div class="title">
        <i class="el-icon-circle-plus-outline" />
        <span>课程信息</span>
      </div>
      <div id="title-divider" />
      <el-form class="form" :model="form" label-position="top" :inline="true" style="margin-left: 22px">
        <el-form-item label="学生姓名*" :label-width="formLabelWidth" style="padding: 0px">
          <el-input v-model="form.studentName" autocomplete="off" size="small" style="width: 100px" />
        </el-form-item>
        <el-form-item label="学号*" :label-width="formLabelWidth" lable-height="30px" style="padding: 0px">
          <el-input v-model="form.studentId" autocomplete="off" size="small" style="width: 180px" />
        </el-form-item>
        <el-form-item label="性别*" :label-width="formLabelWidth" lable-height="30px" style="padding: 0px">
          <el-input v-model="form.sex" autocomplete="off" size="small" style="width: 100px" />
        </el-form-item>
        <el-form-item label="年龄*" :label-width="formLabelWidth" lable-height="30px" style="padding: 0px">
          <el-input v-model="form.age" autocomplete="off" size="small" style="width: 100px" />
        </el-form-item>
      </el-form>
      <el-collapse v-model="activeName" accordion @change="changeEvent">
        <el-collapse-item title="成绩" name="1">
          <el-row type="flex" justify="start" style="margin-left: 20px;margin-top: 10px">
            <el-col :span="22">
              <el-table
                :data="courseTableData"
                border
                stripe
                size="mini"
                max-height="180px"
                style="width: 100%"
              >
                <el-table-column
                  prop="order"
                  label="序号"
                  width="100"
                />
                <el-table-column
                  prop="name"
                  label="指标名称"
                  width="300"
                />
                <el-table-column
                  prop="score"
                  label="分数"
                  width="120"
                />
              </el-table>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="特别记录" name="2">
          <el-row type="flex" justify="start" :gutter="20" style="width: 600px;margin: 10px  ">
            <el-col :span="12" :offset="2">
              <template>
                <span>文字记录</span>
                <br>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  :disabled="true"
                />
              </template>
            </el-col>
            <el-col :span="12" :offset="1">
              <template>
                <span>视频记录</span>
                <br>
                <el-button type="primary" icon="el-icon-video-camera">查看视频记录</el-button>
              </template>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="历史课程信息" name="3">
          <template>
            <line-chart ref="lineChartComponent" :chart-data="lineChartData.newVisitis" />
            <el-button id="el-button_info" type="text" size="small" @click="showHistoryCourseDetail">详细信息>></el-button>
          </template>
        </el-collapse-item>
      </el-collapse>
      <div class="div-footer">
        <el-button id="el-button-add" style="width: 140px;margin-bottom: 30px" size="small" @click="confirm">提交</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import LineChart from '@/views/teacher/enter/components/chart/LineChart'
export default {
  components: {
    LineChart
  },
  data() {
    return {
      activeName: '1',
      dialogFormVisible: false,
      form: {
        courseName: '',
        courseID: '',
        gender: '',
        filesProps: '',
        classCheckList: []
      },
      formLabelWidth: '40px',
      expertAdviseAnalysisStaticList: ['多动症', '注意力不集中', '无法集中注意力', '上课走神'],
      expertAnalysisAdviseCheckList: [],
      expertAdviseStaticListToParent: ['多参加户外活动', '多读书', '多喝水', '多运动'],
      expertAdviseCheckLisToParent: [],
      expertAdviseStaticListToTeacher: ['多吃饭', '多睡觉', '少玩手机', '勤洗手'],
      expertAdviseCheckListToTeacher: [],
      courseTableData: [{
        order: 1, name: '自主完成拼接任务', score: 8
      }, {
        order: 2, name: '活动过程中的情绪', score: 8
      }, {
        order: 3, name: '身体协调稳定度', score: 8
      }, {
        order: 4, name: '个人绩点', score: 8
      }, {
        order: 5, name: '排名', score: '3/20'
      }
      ],
      lineChartData: {
        newVisitis: {
          expectedData: [100, 120, 161, 134, 105, 160, 165],
          actualData: [120, 82, 91, 154, 162, 140, 145]
        },
        messages: {
          expectedData: [200, 192, 120, 144, 160, 130, 140],
          actualData: [180, 160, 151, 106, 145, 150, 130]
        },
        purchases: {
          expectedData: [80, 100, 121, 104, 105, 90, 100],
          actualData: [120, 90, 100, 138, 142, 130, 130]
        },
        shoppings: {
          expectedData: [130, 140, 141, 142, 145, 150, 160],
          actualData: [120, 82, 91, 154, 162, 140, 130]
        }
      }
    }
  },
  methods: {
    showHistoryCourseDialog() {
      this.dialogFormVisible = true
    },
    showEditHistoryCourseDialog(formData) {
      this.dialogFormVisible = true
      // this.form = formData
    },
    showHistoryCourseDetail() {
      this.dialogFormVisible = false
      this.$emit('goCourseDetailEvent')
    },
    confirm() {
      this.dialogFormVisible = false
    },
    cancel() {
      this.dialogFormVisible = false
    },
    changeEvent(a) {
      this.$refs.lineChartComponent.initChart()
      this.$nextTick(() => {
        this.$refs.lineChartComponent.chartResize()
      })
    }
  }
}
</script>

<style  lang="scss" scoped>
//dialog 默认样式修改

::v-deep .el-dialog {
  width: 590px;
  border: solid 1px #797979;

  .el-dialog__header, .el-dialog__footer {
    display: none;
  }

  .el-dialog__body {
    padding: 0px;
    width: 100%;
    height: 100%;
    .title {
      height: 36px;
      i {
        margin-left: 20px;
      }
      span {
        line-height: 40px;
        margin-left: 10px;
        font-weight: bold;
      }
    }
    #title-divider{
      width: 100%;
      height: 1px;
      background-color: #DCDFE6;
    }
    .el-collapse{
      width: 100%;
      .el-collapse-item__header{
        color: #4C4C4C;
        font-weight: bold;
        padding-left: 20px;
      }
      .el-collapse-item__wrap{
        width: 100%;
        .el-collapse-item__content{
          position: relative;
          height: 100%;
          #el-button_info{
            position: absolute;
            right: 40px;
            bottom: 80px;
          }
        }
      }
    }
    .foot-divider{
      width: 100%;
      height: 1px;
      background-color: #DCDFE6;
      margin: 8px 0;
    }
    .foot-title{
      color: #4C4C4C;
      font-weight: bold;
      margin-left: 18px;
    }

    .div-footer{
      margin-top: 13px;
      text-align: center;
    }
  }
}
.form{
  ::v-deep .el-form-item {
    margin-bottom: 0;
    line-height: 20px;
  }
  ::v-deep .el-form-item__label {
    padding:5px 0;
    font-weight: normal;
    line-height: 30px;
  }
}
.div-footer{
  display: flex;
  margin-top: 20px;
  justify-content: space-evenly;
}

</style>

<!--修改dialog的全局样式-->
<style>

</style>
