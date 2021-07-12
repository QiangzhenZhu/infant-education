<template>
  <div>
    <el-dialog :visible.sync="dialogFormVisible">
      <!--      标题-->
      <div class="title">
        <i class="el-icon-plus" />
        <span>添加学生</span>
      </div>
      <el-divider />
      <el-form class="form" :model="form" label-position="top" :inline="true" style="margin-left: 22px">
        <el-form-item label="学生姓名*" :label-width="formLabelWidth" style="padding: 0px">
          <el-input v-model="form.name" autocomplete="off" size="small" style="width: 100px" />
        </el-form-item>
        <el-form-item label="性别*" :label-width="formLabelWidth" lable-height="30px" style="padding: 0px">
          <el-select v-model="form.sex" placeholder="请选择" size="small" style="width: 120px">
            <el-option
              v-for="item in options_sex"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="学号*" :label-width="formLabelWidth" style="padding: 0px">
          <el-input v-model="form.stuNo" autocomplete="off" size="small" disabled="false" placeholder="自动生成" style="width: 160px" />
        </el-form-item>
        <el-form-item label="入学年月*" :label-width="formLabelWidth">
          <el-date-picker v-model="form.Intake" type="month" placeholder="选择年月" style="width: 120px" size="small" />
        </el-form-item>
        <br>
        <el-form-item label="班级*" :label-width="formLabelWidth" style="padding: 0px">
          <el-input v-model="form.class_no" autocomplete="off" size="small" style="width: 120px" />
        </el-form-item>
        <el-form-item label="出生年月日*" :label-width="formLabelWidth" style="padding: 0px">
          <el-date-picker v-model="form.birth" type="date" style="width: 160px" size="small" placeholder="选择日期 " />
        </el-form-item>
        <el-form-item label="年龄*" :label-width="formLabelWidth" style="padding: 0px">
          <el-input v-model="form.age" autocomplete="off" size="small" style="width: 120px" />
        </el-form-item>
        <br>
        <el-form-item label="家庭地址*" :label-width="formLabelWidth" style="padding: 0px">
          <el-input v-model="form.address" autocomplete="off" size="small" style="width: 160px" />
        </el-form-item>
        <el-form-item label="家长姓名*" :label-width="formLabelWidth" style="padding: 0px">
          <el-input v-model="form.parent_name" autocomplete="off" size="small" style="width: 120px" />
        </el-form-item>
        <el-form-item label="联系方式*" :label-width="formLabelWidth" style="padding: 0px">
          <el-input v-model="form.parent_phone" autocomplete="off" size="small" style="width: 120px" />
        </el-form-item>
        <br>
        <el-form-item label="备注" :label-width="formLabelWidth" style="padding: 0px ;width: 90%">
          <el-input v-model="form.remark" type="textarea" :rows="2" placeholder="" style="width: 100%" />
        </el-form-item>
      </el-form>
      <div class="div-footer">
        <el-button id="el-button-add" type="primary" :loading="loading" style="width: 140px" @click="confirm">提交</el-button>
        <el-button id="el-button-cancel" type="info" style="width: 140px" @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      loading: false,
      options_sex: [{
        label: '男',
        value: 1
      }, {
        label: '女',
        value: 0
      }],
      form: {
        name: '',
        sex: '',
        studentNo: '',
        Intake: '',
        birth: '',
        class_no: '',
        address: '',
        parent_name: '',
        parent_phone: '',
        remark: ''
      },
      formLabelWidth: '40px'
    }
  },
  methods: {
    showAddStudentDialog() {
      this.dialogFormVisible = true
    },
    showEditStudentDialog(formData) {
      this.dialogFormVisible = true
      // this.form = formData
    },
    confirm() {
      this.loading = true
      this.$emit('CommitAddStudent', this.form)
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
  width: 590px;
  height: 455px;
  border: solid 1px #797979;
}
::v-deep .el-dialog__body{
  padding: 0px;
  width: 100%;
  height: 100%;
}

  .title{
    height: 40px;
    i{
      margin-left: 20px;
    }
    span{
      line-height: 40px;
      margin-left: 10px;
    }
  }
  .el-divider{
    margin: 0;
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
