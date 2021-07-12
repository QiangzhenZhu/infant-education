<template>
  <div>
    <el-dialog :visible.sync="dialogFormVisible">
      <!--      标题-->
      <div class="title">
        <i class="el-icon-circle-plus-outline" />
        <span>添加机构/学校</span>
      </div>
      <div id="title-divider" />
      <el-form class="form" :model="form" label-position="top" :inline="true" style="margin-left: 22px">
        <el-form-item label="机构名称*" :label-width="formLabelWidth" style="padding: 0px">
          <el-input v-model="form.nurseryName" autocomplete="off" size="small" style="width: 180px" />
        </el-form-item>
        <el-form-item label="账号*" :label-width="formLabelWidth" lable-height="30px" style="padding: 0px">
          <el-input v-model="form.accout" autocomplete="off" size="small" style="width: 150px" />
        </el-form-item>
        <el-form-item label="机构类型*" :label-width="formLabelWidth">
          <el-select v-model="form.nurseryType" placeholder="请选择" size="small" style="width: 120px">
            <el-option
              v-for="item in options_nurseryType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="地址*" :label-width="formLabelWidth" style="padding: 0px">
          <el-input v-model="form.nurseryAddress" autocomplete="off" size="small" style="width: 180px" />
        </el-form-item>
        <el-form-item label="联系人*" :label-width="formLabelWidth" style="padding: 0px">
          <el-input v-model="form.contactPeople" autocomplete="off" size="small" style="width: 120px" />
        </el-form-item>
        <el-form-item label="联系电话*" :label-width="formLabelWidth" disabled="true" style="padding: 0px">
          <el-input v-model="form.contact" autocomplete="off" size="small" style="width: 160px" />
        </el-form-item>
        <br>
        <el-form-item label="备注" :label-width="formLabelWidth" style="padding: 0px ;width: 90%">
          <el-input v-model="form.remark" type="textarea" :rows="1" placeholder="" style="width: 100%" />
        </el-form-item>
      </el-form>
      <div id="foot-divider" />
      <span id="foot-title">上传资料</span>
      <div class="div-upload">
        <div class="div-upload-bl">
          <span>营业执照</span>
          <el-upload class="upload-bussiness-license" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </div>
        <div class="div-upload-ic-front">
          <span>法人表表身份证(国徽)*</span>
          <el-upload class="upload-ic-front" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </div>
        <div class="div-upload-ic-back">
          <span>法人表表身份证(头像)*</span>
          <el-upload class="upload-ic-back" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </div>
      </div>
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
    showAddNurseryDialog() {
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

::v-deep .el-dialog {
  width: 590px;
  height: 482px;
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
      margin: 8px 0;
    }
    #foot-title{
      color: #4C4C4C;
      font-weight: bold;
      margin-left: 18px;
    }
    .div-upload{
      display: flex;
      flex-direction: row;
      margin: 18px;
      .div-upload-bl,.div-upload-ic-front,.div-upload-ic-back{
        width: 190px;
        height: 30px;
      }
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
