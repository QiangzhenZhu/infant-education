<template>
  <div>
    <el-dialog :visible.sync="dialogFormVisible">
      <!--      标题-->
      <div class="title">
        <i class="el-icon-circle-plus-outline" />
        <span>{{ title }}</span>
      </div>
      <div id="title-divider" />
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="特别记录" name="1">
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
        <el-collapse-item title="落实情况记录表" name="2">
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
                  prop="advise"
                  label="建议措施"
                  width="100"
                />
                <el-table-column
                  prop="measure"
                  label="落实措施"
                  width="300"
                />
                <el-table-column
                  prop="isComplete"
                  label="是否完成"
                  width="120"
                >
                  <template slot-scope="scope">
                    <el-select size="small" v-model="scope.row.isComplete" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </template>

                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="详情" name="3">
          <template>
            <div class="div-detail">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="textarea"
                maxlength="60"
                size="medium"
                show-word-limit>
              </el-input>
            </div>
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
export default {
  data() {
    return {
      title: '',
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
        advise: '多动症', measure: '看医生', isComplete: '否'
      }, {
        advise: '注意力不集中', measure: '看医生', isComplete: '否'
      }, {
        advise: '身体不协调', measure: '看医生', isComplete: '否'
      }, {
        advise: '分心', measure: '看医生', isComplete: '否'
      }],
      options: [{
        value: '0',
        label: '否'
      }, {
        value: '1',
        label: '是'
      }]
    }
  },
  methods: {
    showFullFillDetailDialog(type) {
      this.dialogFormVisible = true
      type === 0 ? this.title = '添加落实情况记录' : this.title = '家长/教师落实情况记录'
    },
    showEditFullFillDetailDialog(formData) {
      this.dialogFormVisible = true
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
          .div-detail{
            padding: 18px;
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
