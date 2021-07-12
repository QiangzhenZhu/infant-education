<template>
  <div class="container">
    <el-dialog :visible.sync="dialogFormVisible">
      <!--      标题-->
      <div class="title">
        <i class="el-icon-circle-plus-outline" />
        <span>添加课程</span>
      </div>
      <div id="title-divider" />
      <el-form class="form" :model="form" label-position="top" :inline="true" style="margin-left: 22px">
        <el-form-item label="课程名称*" :label-width="formLabelWidth" style="padding: 0px">
          <el-input v-model="form.courseName" autocomplete="off" size="small" style="width: 180px" />
        </el-form-item>
        <el-form-item label="课程代码*" :label-width="formLabelWidth" lable-height="30px" style="padding: 0px">
          <el-input v-model="form.courseID" autocomplete="off" size="small" style="width: 150px" />
        </el-form-item>
        <el-form-item label="适合年级*" :label-width="formLabelWidth">
          <el-select v-model="form.gender" placeholder="请选择" size="small" style="width: 120px">
            <el-option
              v-for="item in options_gender"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="课程类型*" :label-width="formLabelWidth" style="padding: 0px">
          <el-checkbox-group v-model="form.classCheckList">
            <el-checkbox label="健康" />
            <el-checkbox label="社会" />
            <el-checkbox label="科学" />
            <el-checkbox label="语言" />
            <el-checkbox label="艺术" />
          </el-checkbox-group>
        </el-form-item>
        <br>
      </el-form>
      <div class="foot-divider" />
      <span class="foot-title">课程指标</span>
      <el-row :gutter="20" style="margin-top: 8px;margin-left: 10px">
        <el-col :span="5">
          <el-input v-model="currentCourseQuota.quotaName" size="small" placeholder="指标名称" />
        </el-col>
        <el-col :span="5">
          <el-input v-model="currentCourseQuota.quotaScore" size="small" placeholder="指标分值" />
        </el-col>
        <el-col :span="4">
          <el-button size="small" type="primary" @click="addCourseQuota">添加指标</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" justify="start" style="margin-left: 20px;margin-top: 10px">
        <el-col :span="22">
          <el-table
            v-if="courseTableData.length"
            :data="courseTableData"
            border
            stripe
            max-height="180px"
            style="width: 100%">
            <el-table-column
              prop="order"
              label="序号"
              width="80"/>
            <el-table-column
              prop="name"
              label="指标名称"
              width="200"/>
            <el-table-column
              prop="score"
              label="满分"
              width="120"
            />
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small">修改</el-button>
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <div class="foot-divider" />
      <span class="foot-title">关联资料</span>
      <el-form class="form" :model="form" label-position="top" :inline="true" style="margin-left: 22px">
        <el-form-item label="资料名称*" :label-width="formLabelWidth" style="padding: 0px">
          <el-input v-model="form.courseName" autocomplete="off" size="small" style="width: 180px" />
        </el-form-item>
        <el-form-item label="文件类型*" :label-width="formLabelWidth" lable-height="30px" style="padding: 0px">
          <el-input v-model="form.courseID" autocomplete="off" size="small" style="width: 100px" />
        </el-form-item>
        <el-form-item label="上传者身份*" :label-width="formLabelWidth" lable-height="30px" style="padding: 0px">
          <el-input v-model="form.courseID" autocomplete="off" size="small" style="width: 100px" />
        </el-form-item>
        <el-form-item label="上传者姓名*" :label-width="formLabelWidth" lable-height="30px" style="padding: 0px">
          <el-input v-model="form.courseID" autocomplete="off" size="small" style="width: 100px" />
        </el-form-item>
        <el-form-item label="浏览文件*" :label-width="formLabelWidth" lable-height="30px" style="padding: 0px">
          <el-upload
            ref="upload"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="文件用途*" :label-width="formLabelWidth" lable-height="30px" style="padding: 0px">
          <el-select v-model="form.gender" placeholder="请选择" size="small" style="width: 120px">
            <el-option
              v-for="item in options_files_props"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button style="margin-left: 25px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        </el-form-item>
        <div class="div-upload-detail-info">
          <ul>
            <li v-for="item in selectFiles">
              <span>{{ item.insertTime }}</span>
              <span>{{ item.name }}</span>
              <span> >> </span>
            </li>
          </ul>

        </div>
      </el-form>
      <div class="div-footer">
        <el-button id="el-button-submit" style="width: 140px; margin-bottom: 30px" size="small" @click="confirm">提交</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      innerVisible: false,
      currentCourseQuota: {
        quotaName: '',
        quotaScore: ''
      },
      courseTableData: [],
      form: {
        courseName: '',
        courseID: '',
        gender: '',
        filesProps: '',
        classCheckList: []
      },
      formLabelWidth: '40px',
      options_gender: [{
        label: '大班',
        value: 1
      }, {
        label: '中班',
        value: 2
      }, {
        label: '小班',
        value: 3
      }],
      options_files_props: [{
        label: '教学视频',
        value: 1
      }, {
        label: '教学音频',
        value: 2
      }, {
        label: '辅助视频',
        value: 3
      }, {
        label: '辅助照片',
        value: 4
      }, {
        label: '作业',
        value: 5
      }, {
        label: '观察记录表',
        value: 6
      }],
      selectFiles: [
        {
          insertTime: '2021-06-29 12:33:33',
          name: '东跑西跑(作业)'
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
    },
    addCourseQuota() {
      this.courseTableData.push({ order: this.courseTableData.length + 1,
        name: this.currentCourseQuota.quotaName,
        score: this.currentCourseQuota.quotaScore })
      this.currentCourseQuota.quotaScore = ''
      this.currentCourseQuota.quotaName = ''
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
    .el-table{
      font-size: 12px!important;
      th{
        padding: 0;
      }
      td{
        padding: 3px;
      }
    }
    #title-divider{
      width: 100%;
      height: 1px;
      background-color: #DCDFE6;
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
    .div-upload-detail-info{
      width: 546px;
      height: 144px;
      border: black 2px solid;
      border-radius: 5px;
      margin-top: 10px;
      margin-right: 24px;
      ul{
        list-style: none;
        padding-left: 0px;
        li{
          span:nth-child(1){
            margin-left: 8px;
          }
          span:nth-child(2){
            margin-left: 50px;
          }
          span:nth-child(3){
            margin-left: 150px;
          }
          &:hover{
            background-color: #20a0ff;
          }
        }
      }

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
