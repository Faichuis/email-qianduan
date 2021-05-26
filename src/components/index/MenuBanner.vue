<template>
<el-row class="tac" >
  <el-col :span="4">
    <el-menu
      default-active="$route.path"
      class="el-menu-vertical-demo"
      router
      unique-opened>

      <el-menu-item index="/write">
        <template slot="title">
          <!-- <i class="el-icon-location"></i> -->
          <div slot="title">写</div>
          <!-- <span>写</span> -->
        </template>
      </el-menu-item>

      <el-menu-item index="/receive">
        <!-- <i class="el-icon-menu"></i> -->
        <span slot="title">收</span>
      </el-menu-item>

      <el-menu-item index="/manual">
        <!-- <i class="el-icon-document"></i> -->
        <span slot="title">稿</span>
      </el-menu-item>

      <el-menu-item index="/send">
        <!-- <i class="el-icon-setting"></i> -->
        <span slot="title">发</span>
      </el-menu-item>

    </el-menu>
  </el-col>


</el-row>

</template>
<style lang="less">
  .tac {
    height: 50px;
    line-height: 80px;
    .el-row {
      height: 80px;
    }
  }
  .el-menu-item {
    // min-height: 120px!important;
    // height:calc(100vh - 0px);
    text-align:center;
    min-height:200px;
    _height:auto !important;
    height:200px;
    font-size: 30px;
    line-height: 200px;
  }
</style>

<script>
  import { write } from './Write'
  export default {
    methods: {
    }
  }
</script>  