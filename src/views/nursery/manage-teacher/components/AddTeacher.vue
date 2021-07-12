<template>
  <div>
    <el-dialog :visible.sync="dialogFormVisible">
      <!--      标题-->
      <div class="title">
        <i class="el-icon-plus" />
        <span>添加教师</span>
      </div>
      <el-divider />
      <el-form class="form" :model="form" label-position="top" :inline="true" style="margin-left: 22px">
        <el-form-item label="教师姓名*" :label-width="formLabelWidth" style="padding: 0px">
          <el-input v-model="form.teacherName" autocomplete="off" size="small" style="width: 100px" />
        </el-form-item>
        <el-form-item label="账号*" :label-width="formLabelWidth" lable-height="30px" style="padding: 0px">
          <el-input v-model="form.account" autocomplete="off" size="small" style="width: 160px" />
        </el-form-item>
        <el-form-item label="年龄*" :label-width="formLabelWidth" disabled="true" style="padding: 0px">
          <el-input v-model="form.age" autocomplete="off" size="small" style="width: 100px" />
        </el-form-item>
        <el-form-item label="工龄*" :label-width="formLabelWidth">
          <el-input v-model="form.lengthOfServiceSeniority" autocomplete="off" size="small" style="width: 100px" />
        </el-form-item>
        <br>
        <el-form-item label="家庭地址*" :label-width="formLabelWidth" style="padding: 0px">
          <el-input v-model="form.address" autocomplete="off" size="small" style="width: 120px" />
        </el-form-item>
        <el-form-item label="联系方式*" :label-width="formLabelWidth" style="padding: 0px">
          <el-input v-model="form.contact" autocomplete="off" size="small" style="width: 160px" />
        </el-form-item>
        <el-form-item label="职称*" :label-width="formLabelWidth" style="padding: 0px">
          <el-select v-model="form.title" placeholder="请选择" size="small" style="width: 120px">
            <el-option
              v-for="item in options_titleType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="性别*" :label-width="formLabelWidth" style="padding: 0px">
          <el-select v-model="form.sex" placeholder="请选择" size="small" style="width: 100px">
            <el-option
              v-for="item in options_sexType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="备注" :label-width="formLabelWidth" style="padding: 0px ;width: 90%">
          <el-input v-model="form.remark" type="textarea" :rows="1" placeholder="" style="width: 100%" />
        </el-form-item>
      </el-form>
      <div id="foot-divider" />
      <span id="foot-title">关联班级</span>
      <div class="block">
        <el-cascader
          v-model="form.class"
          :options="options_class"
          :props="props"
          placeholder="请选择"
          collapse-tags
          clearable
        />
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
        teacherName: '',
        account: '',
        sex: '',
        age: '',
        class: [],
        lengthOfServiceSeniority: '',
        address: '',
        contact: '',
        remark: ''
      },
      formLabelWidth: '40px',
      options_sexType: [{
        label: '男',
        value: 0
      }, {
        label: '女',
        value: 1
      }],
      options_class: [{
        label: '大班',
        value: '0',
        children: [{
          value: '00',
          label: '一班'
        }, {
          value: '01',
          label: '二班'
        }, {
          value: '02',
          label: '三班'
        }]
      }, {
        label: '中班',
        value: 1,
        children: [{
          value: '00',
          label: '一班'
        }, {
          value: '01',
          label: '二班'
        }, {
          value: '02',
          label: '三班'
        }]
      }, {
        label: '小班',
        value: 2,
        children: [{
          value: '00',
          label: '一班'
        }, {
          value: '01',
          label: '二班'
        }, {
          value: '02',
          label: '三班'
        }]
      }],
      props: { multiple: true }
    }
  },
  methods: {
    showAddTeacherDialog() {
      this.dialogFormVisible = true
    },
    showEditTeacherDialog(formData) {
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
  width: 590px;
  height: 480px;
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
.block{
  margin-left: 18px;
  margin-top: 8px;
}

.div-footer{
  display: flex;
  margin-top: 30px;
  justify-content: space-evenly;
}

</style>

<!--修改dialog的全局样式-->
<style>

</style>
