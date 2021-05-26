<template>
  <div class="container">
    <div class="handle-box">
      <el-table :data="list"  tooltip-effect="light" align="center">
        <el-table-column
          align="center"
          prop="address"
          label="fromAddress">
        </el-table-column>
        <el-table-column
          align="center"
          prop="subject"
          label="subject">
        </el-table-column>
        <el-table-column
          align="center"
          prop="seen"
          label="userSeen">
        </el-table-column>

        <el-table-column
          align="center"
          prop="date"
          label="makerDate"
          show-overflow-tooltip>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>



<style scoped>
  .container{
    margin-left: 18%;
    /* margin-right: 20% */
  }

  .handle-box {
    margin-top: 10px;
    /* margin-left: 20px; */
    margin-bottom: 20px;
    /* width: 35%; */
    /* padding: 0 5px 0 0; */
  }
</style>

<script>

  export default {

    name:'send',

    data() {
      return {
        list: [{'address': 'NVIDIA Accounts', 'subject': 'NVIDA电子邮件验证', 'seen': true, 'date': '2020-11-07'}],
        ruleForm: {
          address: '',
          subject: '',
          seen: '',
          date: ''
        },
      }
    }
  }
</script>