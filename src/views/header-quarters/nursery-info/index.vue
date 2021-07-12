<template>
  <div class="container">
    <div class="title">
      <i class="el-icon-notebook-1" />
      <span>学校管理</span>
    </div>
    <!--    标题-->
    <div class="input-stunum">
      <el-input id="el-input-stu" v-model="form.inputStuNo" size="small" clearable placeholder="机构名称/负责人/账号" style="width: 195px" />
      <el-button id="el-button-query" size="small">查询</el-button>
      <el-button id="el-button-reset" size="small">重置</el-button>
    </div>
    <!--    高级筛选-->
    <span style="margin: 8px auto;display: block">高级筛选▽</span>
    <div class="input-filter">
      <div class="input-filter-gender">
        <span>机构类型:</span>
        <el-checkbox-group v-model="form.genderCheckList" style="margin-left: 57px;">
          <el-checkbox label="幼儿园" />
          <el-checkbox label="机构" />
        </el-checkbox-group>
      </div>
      <div class="input-filter-age">
        <span>地址:</span>
        <el-select v-model="form.startAge" placeholder="请选择" size="small" style="width: 120px;margin-left: 57px">
          <el-option
            v-for="item in options_age"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <span class="divide">省</span>
        <el-select v-model="form.endAge" placeholder="请选择" size="small" style="width: 120px">
          <el-option
            v-for="item in options_age"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <span class="divide">市</span>
        <el-select v-model="form.endAge" placeholder="请选择" size="small" style="width: 120px">
          <el-option
            v-for="item in options_age"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <span class="divide">区/县</span>
      </div>
    </div>
    <!--    添加学生-->
    <el-row class="el-row-add">
      <el-col :span="2" :offset="21"> <el-button size="small" style="width: 140px;" @click="showAddDialog">+添加机构</el-button></el-col>
    </el-row>
    <add-nursery ref="AddNurseryComponents" />
    <delete-student ref="DeleteNurseryComponents" title="是否删除该该机构的信息？" />
    <authorization ref="Authorization" />
    <!--    表格-->
    <template class="table">
      <el-table :data="tableData" border style="width: 95%" max-height="320px">
        <el-table-column fixed prop="order" label="序号" width="150" />
        <el-table-column fixed prop="nurseryName" label="机构名称" width="120" />
        <el-table-column prop="contactPerson" label="联系人" width="120" />
        <el-table-column prop="account" label="账号" width="120" />
        <el-table-column prop="bussinessLicense" label="机构营业执照" width="200" />
        <el-table-column prop="contact" label="联系方式" width="150" />
        <el-table-column prop="address" label="地址" width="300" />
        <el-table-column prop="type" label="机构类型" width="150" />
        <el-table-column prop="remark" label="备注" width="120" />
        <el-table-column prop="createTime" label="添加时间" width="120" />
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showEditDialog(scope.row)">修改</el-button>
            <span>|</span>
            <el-button type="text" size="small" @click="showDeleteDialog(scope.row)">删除</el-button>
            <span>|</span>
            <el-button type="text" size="small" @click="showAutnorizationDialog(scope.row)">资料授权</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next,jumper"
        :total="1000"
        style="margin: 15px 0px"
      />
      <!--        @size-change="" @current-change="" @prev-click="" @next-click=""-->
    </template>
  </div>
</template>

<script>
import DeleteStudent from '@/components/manage/Delete'
import Authorization from '@/views/header-quarters/nursery-info/components/Authorization'
import AddNursery from '@/views/header-quarters/nursery-info/components/AddNursery'
export default {
  components: { Authorization, DeleteStudent, AddNursery },
  data() {
    return {
      form: {
        inputStuNo: '',
        genderCheckList: [],
        classCheckList: [],
        sexRadio: '',
        startAge: '',
        endAge: ''
      },
      options_age: [{
        label: '3岁',
        value: 3
      }, {
        label: '4岁',
        value: 4
      }, {
        label: '5岁',
        value: 5
      }, {
        label: '6岁',
        value: 6
      }, {
        label: '7岁',
        value: 7
      }, {
        label: '8岁',
        value: 8
      }, {
        label: '9岁',
        value: 9
      }],
      tableData: [{
        order: 1,
        nurseryName: '无忧无虑',
        contactPerson: '朱振强',
        account: '12585455',
        bussinessLicense: '548686857485454',
        address: '山东省临沂市费县',
        parentName: '朱振强',
        contact: '13791556326',
        remark: '无',
        createTime: '16165'
      }],
      addVisible: false,
      deleteVisible: false,
      editVisible: false
    }
  },
  methods: {
    // 学生添加 删除 修改操作
    showAddDialog: function() {
      this.$refs.AddNurseryComponents.showAddNurseryDialog()
      console.log('aaa')
    },
    showEditDialog(row) {
      this.$refs.AddNurseryComponents.showEditNurseryDialog(row)
    },
    showDeleteDialog(row) {
      this.$refs.DeleteNurseryComponents.showDeleteDialog(row)
    },
    showAutnorizationDialog(row) {
      this.$refs.Authorization.showAuthorizationDialog(row)
    },
    // 分页操作
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: 100%;
  margin-left: 50px;
  .title{
    margin-top: 4px;
    i{
      position: relative;
      top: 4px;
      color: black;
      font-size: 34px;
    }
    span{
      margin-left: 4px;
      color: #333333;
      font-size: 19px;
      font-weight: bold;
    }
  }
  .input-stunum{
    margin-top: 20px;
    .el-input-stu{
    }
    #el-button-query{
      width: 140px;
      margin-left: 22px;
    }
    #el-button-reset{
      width: 140px;
      margin-left: 22px;
    }
  }

  .input-filter{
    font-size: 14px;
    div{
      display: flex;
      justify-content: start;
      align-items: center;
      color: #333333;
      margin: 5px 0px;
    }
    label{
      font-weight: normal;
    }
    .divide{
      margin: 0 4px;
    }
  }
  .el-row-add{
    margin: 15px;
  }
}
</style>
