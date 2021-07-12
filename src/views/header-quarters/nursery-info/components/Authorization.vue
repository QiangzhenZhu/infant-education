<template>
  <div>
    <el-dialog :visible.sync="dialogFormVisible">
      <!--      标题-->
      <div class="title">
        <i class="el-icon-document-add" />
        <span>您正在授权课程资料</span>
      </div>
      <el-divider />
      <span id="body-span-title">关联课程</span>
      <div class="body-div-select">
        <div class="div-gender">
          <span>请选择课程所属年级:</span>
          <el-checkbox-group v-model="form.genderCheckList" class="el-c-group-gender">
            <el-checkbox label="大班" />
            <el-checkbox label="中班" />
            <el-checkbox label="小班" />
          </el-checkbox-group>
        </div>
        <div class="div-course">
          <span>请选择课程(多选):</span>
          <el-checkbox-group v-model="form.genderCheckList" class="el-c-group-course">
            <el-checkbox label="大班" />
            <el-checkbox label="中班" />
            <el-checkbox label="小班" />
            <el-checkbox label="小班" />
            <el-checkbox label="小班" />
            <el-checkbox label="小班" />
            <el-checkbox label="小班" />
            <el-checkbox label="小班" />
          </el-checkbox-group>
        </div>
      </div>
      <div class="div-footer">
        <el-button id="el-button-add" style="width: 140px" @click="confirm">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        genderCheckList: []
      },
      formLabelWidth: '40px'
    }
  },
  methods: {
    showAuthorizationDialog() {
      this.dialogFormVisible = true
    },
    showEditNurseryDialog(formData) {
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
::v-deep .el-dialog__header, ::v-deep .el-dialog__footer{
  display: none;
}
::v-deep .el-dialog{
  width: 683px;
  height: 390px;
  border: solid 1px #797979;
}
::v-deep .el-dialog__body{
  padding: 0px;
  width: 100%;
  height: 100%;
}

.title{
  height: 60px;
  text-align: center;
  position: relative;
  i{
    position: absolute;
    left: 20px;
    font-size: 36px;
    line-height: 60px;
  }
  span{
    line-height: 60px;
    font-size: 22px;
    font-weight: bold;
    color: #333333;
  }
}
.el-divider{
  margin: 0;
}
#body-span-title{
  display: block;
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  margin-left: 28px;
  margin-top: 35px;
}
.body-div-select{
  display: flex;
  flex-direction: row;
  .div-gender {
    margin-top: 18px;
    margin-left: 51px;
    .el-c-group-gender {
      display: flex;
      flex-direction: column;
      border: 1px solid #797979;
      width: 247px;
      height: 145px;
      margin-top: 17px;
      padding-left: 17px;
      padding-top: 30px;
    }
  }
  .div-course{
    margin-top: 18px;
    margin-left: 92px;
    .el-c-group-course{
      display: flex;
      flex-direction: column;
      border: 1px solid #797979;
      width: 247px;
      height: 145px;
      margin-top: 17px;
      padding-left: 17px;
      padding-top: 30px;
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }
}

//.form{
//  ::v-deep .el-form-item {
//    margin-bottom: 0;
//    line-height: 20px;
//  }
//  ::v-deep .el-form-item__label {
//    padding:5px 0;
//    font-weight: normal;
//    line-height: 30px;
//  }
//}
.div-footer{
  display: flex;
  margin-top: 20px;
  justify-content: space-evenly;
}

</style>

<!--修改dialog的全局样式-->
<style>

</style>
