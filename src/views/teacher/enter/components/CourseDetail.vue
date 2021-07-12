<template>
  <div>
    <el-dialog :visible.sync="dialogFormVisible">
      <!--      标题-->
      <div class="title">
        <i class="el-icon-circle-plus-outline" />
        <span>课程详细信息</span>
      </div>
      <div id="title-divider" />
      <el-collapse v-model="activeName" accordion>
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
        <el-collapse-item title="专家分析" name="3">
          <template>
            <div class="div-span-title" />
            <div class="div-advise">
              <div>
                <span>专家分析:</span>
                <div class="div-advise-container">
                  <el-checkbox-group v-model="expertAdviseCheckLisToParent">
                    <el-checkbox v-for="item in expertAdviseStaticListToParent" :label="item" />
                  </el-checkbox-group>
                </div>
              </div>
              <div>
                <span>教师落实措施:</span>
                <div class="div-advise-container">
                  <el-checkbox-group v-model="expertAdviseCheckLisToParent">
                    <el-checkbox v-for="item in expertAdviseStaticListToParent" :label="item" />
                  </el-checkbox-group>
                </div>
              </div>
              <div>
                <span>家长落实措施:</span>
                <div class="div-advise-container">
                  <el-checkbox-group v-model="expertAdviseCheckLisToParent">
                    <el-checkbox v-for="item in expertAdviseStaticListToParent" :label="item" />
                  </el-checkbox-group>
                </div>
              </div>
            </div>
          </template>
        </el-collapse-item>
        <el-collapse-item title="教师落实情况" name="4">
          <el-row>
            <el-col :span="2" :offset="21">
              <el-button size="small" class="el-button-add" type="primary" @click="showFullFillDetail(0)">添加</el-button>
            </el-col>
          </el-row>
          <template>
            <div class="div-upload-detail-info">
              <div class="div-upload-detail-info-container">
                <ul>
                  <li v-for="item in teacherFullFill">
                    <span>{{ item.insertTime }}</span>
                    <el-button style="color:black ;" type="text" size="small" @click="showFullFillDetail(1)"> >> </el-button>
                  </li>
                </ul>
              </div>
            </div>
          </template>
        </el-collapse-item>
        <el-collapse-item title="家长落实情况" name="5">
          <template>
            <div class="div-upload-detail-info">
              <div class="div-upload-detail-info-container">
                <ul>
                  <li v-for="item in parentFullFill">
                    <span>{{ item.insertTime }}</span>
                    <el-button style="color:black;" type="text" size="small" @click="showFullFillDetail(1)"> >> </el-button>
                  </li>
                </ul>
              </div>
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
      }],
      teacherFullFill: [{
        insertTime: '2020年7月5日'
      }, {
        insertTime: '2020年7月5日'
      }, {
        insertTime: '2020年7月5日'
      }],
      parentFullFill: [{
        insertTime: '2020年7月5日'
      }, {
        insertTime: '2020年7月5日'
      }, {
        insertTime: '2020年7月5日'
      }]
    }
  },
  methods: {
    showHistoryCourseDetailDialog() {
      this.dialogFormVisible = true
    },
    showEditHistoryCourseDetailDialog(formData) {
      this.dialogFormVisible = true
      // this.form = formData
    },
    confirm() {
      this.dialogFormVisible = false
    },
    cancel() {
      this.dialogFormVisible = false
    },
    showFullFillDetail(index) {
      this.dialogFormVisible = false
      this.$emit('goFullFillDetailEvent', index)
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
          .div-span-title{
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
          }
          .el-button-add{
            float: right;
            font-weight: bold;
          }
          .div-advise{
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            .div-advise-container{
              border: black 1px solid;
              padding: 10px;
              .el-checkbox-group{
                display: flex;
                flex-direction: column;
              }
            }
          }
          .div-upload-detail-info{
            position: relative;
            .div-upload-detail-info-container{
              margin: 12px 20px 20px 18px;
              width: 546px;
              height: 144px;
              border: black 2px solid;
              border-radius: 5px;
              ul{
                list-style: none;
                padding-left: 0px;
                li{
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                  padding: 0 20px;
                  &:hover{
                    background-color: #20a0ff;
                  }
                }
              }

            }
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
