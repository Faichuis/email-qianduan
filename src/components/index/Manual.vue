<template>
  <div class="index-page"> 
    manual
  </div>
</template>

<script>
  export default {

    name: 'manual',

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
