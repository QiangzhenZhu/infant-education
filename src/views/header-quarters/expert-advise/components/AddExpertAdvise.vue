<template>
  <div>
    <el-dialog :visible.sync="dialogFormVisible">
      <!--      标题-->
      <div class="title">
        <i class="el-icon-circle-plus-outline" />
        <span>添加建议与措施</span>
      </div>
      <div id="title-divider" />
      <el-form class="form" :model="form" label-position="top" :inline="true" style="margin-left: 22px">
        <el-form-item label="学生姓名*" :label-width="formLabelWidth" style="padding: 0px">
          <el-input v-model="form.courseName" autocomplete="off" size="small" style="width: 100px" />
        </el-form-item>
        <el-form-item label="地址*" :label-width="formLabelWidth" lable-height="30px" style="padding: 0px">
          <el-input v-model="form.courseID" autocomplete="off" size="small" style="width: 180px" />
        </el-form-item>
        <el-form-item label="年龄*" :label-width="formLabelWidth" lable-height="30px" style="padding: 0px">
          <el-input v-model="form.courseID" autocomplete="off" size="small" style="width: 60px" />
        </el-form-item>
        <el-form-item label="年级*" :label-width="formLabelWidth" lable-height="30px" style="padding: 0px">
          <el-input v-model="form.courseID" autocomplete="off" size="small" style="width: 60px" />
        </el-form-item>
        <el-form-item label="班级*" :label-width="formLabelWidth" lable-height="30px" style="padding: 0px">
          <el-input v-model="form.courseID" autocomplete="off" size="small" style="width: 60px" />
        </el-form-item>
        <el-form-item label="课程*" :label-width="formLabelWidth" lable-height="30px" style="padding: 0px">
          <el-input v-model="form.courseID" autocomplete="off" size="small" style="width: 200px" />
        </el-form-item>
        <el-form-item label="备注*" label-width="formLabelWidth" lable-height="30px" style="padding: 0px">
          <el-input v-model="form.courseID" autocomplete="off" size="small" style="width: 300px" />
        </el-form-item>
      </el-form>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="成绩" name="1">
          <el-row type="flex" justify="start" style="margin-left: 20px;margin-top: 10px">
            <el-col :span="22">
              <el-table
                :data="courseTableData"
                border
                stripe
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
            <el-col :span="12" :offset="2" >
              <template>
                <span>文字记录</span>
                <br>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  :disabled="true"/>
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
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </el-collapse-item>
        <el-collapse-item title="专家分析:" name="4">
          <div class="div-advise">
            <el-checkbox-group v-model="expertAnalysisAdviseCheckList">
              <el-checkbox v-for="item in expertAdviseAnalysisStaticList" :label="item" />
            </el-checkbox-group>
          </div>
        </el-collapse-item>
        <el-collapse-item title="建议和措施(教师):" name="5">
          <div class="div-advise">
            <el-checkbox-group v-model="expertAdviseCheckListToTeacher">
              <el-checkbox v-for="item in expertAdviseStaticListToTeacher" :label="item" />
            </el-checkbox-group>
          </div>
        </el-collapse-item>
        <el-collapse-item title="建议和措施(家长):" name="6">
          <div class="div-advise">
            <el-checkbox-group v-model="expertAdviseCheckLisToParent">
              <el-checkbox v-for="item in expertAdviseStaticListToParent" :label="item" />
            </el-checkbox-group>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="div-footer">
        <el-button id="el-button-add" :loading="true" style="width: 140px;margin-bottom: 30px" size="small" @click="confirm">提交</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
export default {
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
      }
      ]
    }
  },
  methods: {
    showAddCourseDialog() {
      this.dialogFormVisible = true
    },
    showEditCourseDialog(formData) {
      this.dialogFormVisible = true
      // this.form = formData
    },
    confirm() {
      this.dialogFormVisible = false
    },
    cancel() {
      this.dialogFormVisible = false
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
      .el-collapse-item__header{
        color: #4C4C4C;
        font-weight: bold;
        padding-left: 20px;
      }
      .el-collapse-item__wrap{
        background-color: #F5F7FA;
        display: flex;
        flex-direction: row;
        justify-content: center;
        .div-advise{
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 367px;
          height: 150px;
          overflow-y: scroll;
          border: #797979 1px solid;
          border-radius: 5px;
          margin-top: 10px;
          margin-right: 24px;
          .el-checkbox-group{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: start;
            margin: 12px 12px;
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
