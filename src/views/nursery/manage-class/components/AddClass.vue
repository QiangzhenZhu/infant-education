<template>
  <div>
    <el-dialog :visible.sync="dialogFormVisible">
      <!--      标题-->
      <div class="title">
        <i class="el-icon-circle-plus-outline" />
        <span>添加班级</span>
      </div>
      <div id="title-divider" />
      <el-form class="form" :model="form" label-position="top" :inline="true" style="margin-left: 22px">
        <el-form-item label="入学年月*" :label-width="formLabelWidth">
          <el-date-picker v-model="form.inTime" type="month" placeholder="选择年月" style="width: 120px" size="small" />
        </el-form-item>
        <el-form-item label="班级*" :label-width="formLabelWidth" lable-height="30px" style="padding: 0px">
          <el-input v-model="form.accout" autocomplete="off" size="small" style="width: 100px" />
        </el-form-item>
        <el-form-item label="班主任姓名*" :label-width="formLabelWidth">
          <el-select v-model="form.nurseryType" placeholder="请选择" size="small" style="width: 120px">
            <el-option
              v-for="item in options_nurseryType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="班主任联系方式*" :label-width="formLabelWidth" style="padding: 0px">
          <el-input v-model="form.nurseryAddress" autocomplete="off" size="small" style="width: 180px" />
        </el-form-item>
        <br>
        <el-form-item label="备注" :label-width="formLabelWidth" style="padding: 0px ;width: 90%">
          <el-input v-model="form.remark" type="textarea" :rows="1" placeholder="" style="width: 100%" />
        </el-form-item>
      </el-form>
      <div id="foot-divider" />
      <div class="div-footer">
        <el-button id="el-button-add" style="width: 140px" @click="confirm">提交</el-button>
        <el-button id="el-button-cancel" style="width: 140px" @click="cancel">取消</el-button>
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
        nurseryName: '',
        account: '',
        nurseryType: '',
        nurseryAddress: '',
        contactPeople: '',
        contact: '',
        remark: ''
      },
      formLabelWidth: '40px',
      options_nurseryType: [{
        label: '幼儿园',
        value: 1
      }, {
        label: '机构',
        value: 2
      }]
    }
  },
  methods: {
    showAddClassDialog() {
      this.dialogFormVisible = true
    },
    showEditClassDialog(formData) {
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
  height: 320px;
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
    #foot-divider{
      width: 100%;
      height: 1px;
      background-color: #DCDFE6;
      margin: 24px 0;
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
  margin-top: 24px;
  justify-content: space-evenly;
}

</style>

<!--修改dialog的全局样式-->
<style>

</style>
