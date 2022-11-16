<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="auto">
      {{#queryParams}}
      <el-form-item label="{{description}}" prop="{{name}}">
        <el-input v-model="queryParams.{{name}}" placeholder="请输入{{description}}" clearable style="width: 240px" />
      </el-form-item>
      {{/queryParams}}
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="getFirstList">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="list">
      <el-table-column type="index" label="序号" width="50" align="center" />
      {{#columns}}
      {{#column_default}}
      <el-table-column label="{{label}}" width="auto" align="center" key="{{key}}" prop="{{key}}" :show-overflow-tooltip="true" />
      {{/column_default}}
      {{#column_formatter}}
      <el-table-column label="{{label}}" width="auto" align="center" key="{{key}}" prop="{{key}}" :show-overflow-tooltip="true" :formatter="{{key}}Formatter" />
      {{/column_formatter}}
      {{#column_action}}
      <el-table-column label="操作" fixed="right" width="140">
        <template slot-scope="scope">
          <el-button @click="showRecordDetail(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
      {{/column_action}}
      {{/columns}}
    </el-table>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  data() {
    return {
      // 分页参数
      pagination: {
        page: 1,
        total: 0,
      },
      // 列表参数
      list: [],
      loading: false,
      queryParams: {
        {{#queryParams}}
        {{name}}:"",
        {{/queryParams}}
      },
    }
  },
  methods:{
    {{#columns}}
    {{#column_formatter}}
    {{key}}Formatter(record){
        return record.{{key}}
    },
    {{/column_formatter}}
    {{#column_action}}
    showRecordDetail(record){

    },
    {{/column_action}}
    {{/columns}}
    async getList(){
        const queryParams = Object.assign({},this.queryParams,{
            page:this.pagination.page,
            pageSize:this.pagination.pageSize,
        })
        const {data} = await request({
            url:'{{{url}}}',
            methods:'{{method}}'
        })
        this.list = data.rows||[]
        this.pagination.total = data.total
    },
    getFirstList(){
        this.pagination.page = 1
        this.getList()
    },
    resetQueryParmas(){
        this.$refs.queryForm.resetFields()
    }
  }
}
</script>

<style></style>
