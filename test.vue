<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="auto">
      <el-form-item label="设备号" prop="deviceSN">
        <el-input v-model="queryParams.deviceSN" placeholder="请输入设备号" clearable style="width: 240px" />
      </el-form-item>
      <el-form-item label="id" prop="id">
        <el-input v-model="queryParams.id" placeholder="请输入id" clearable style="width: 240px" />
      </el-form-item>
      <el-form-item label="page" prop="page">
        <el-input v-model="queryParams.page" placeholder="请输入page" clearable style="width: 240px" />
      </el-form-item>
      <el-form-item label="pageSize" prop="pageSize">
        <el-input v-model="queryParams.pageSize" placeholder="请输入pageSize" clearable style="width: 240px" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="getFirstList">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="list">
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column label="设备序列号" width="auto" align="center" key="deviceSN" prop="deviceSN" :show-overflow-tooltip="true" :formatter="deviceSNFormatter" />
      <el-table-column label="操作" fixed="right" width="140">
        <template slot-scope="scope">
          <el-button @click="showRecordDetail(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
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
        deviceSN:"",
        id:"",
        page:"",
        pageSize:"",
      },
    }
  },
  methods:{
    deviceSNFormatter(record){
        return record.deviceSN
    },
    showRecordDetail(record){

    },
    async getList(){
        const queryParams = Object.assign({},this.queryParams,{
            page:this.pagination.page,
            pageSize:this.pagination.pageSize,
        })
        const {data} = await request({
            url:'/device',
            methods:'POST'
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
