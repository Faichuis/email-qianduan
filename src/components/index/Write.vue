<template>
  <div class="app-container">
    <div>
      <el-button type="success">发送</el-button>
      <el-button>存草稿</el-button>
      <el-button>取消</el-button>
    </div>
    <div style="margin: 20px 0;"></div>

    <el-form ref="form" :model="form" label-width="120px">
      收件人：<el-input v-model="form.name" placeholder="请输入内容"></el-input><br>
      <div style="margin: 20px 0;"></div>
      主 题： <el-input v-model="form.theme" placeholder="请输入内容"></el-input>
      <div style="margin: 20px 0;"></div>

    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList">
      <el-button size="small" type="primary">添加附件</el-button>
      <span slot="tip" class="el-upload__tip">单文件最大3G</span>
    </el-upload>

    <div style="margin: 20px 0;"></div>
    <el-input
      type="textarea"
      placeholder="请输入内容"
      v-model="textarea">
    </el-input>

    <div style="margin: 20px 0;"></div>
    <span>发件人: Lds@0303@163.com</span>

    <!-- <el-select v-model="value" placeholder="Lds@0303@163.com">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select> -->

    </el-form>   
  <div>
</div>



  </div>
</template>

<style scoped>
 .app-container{
   margin-left: 20%;
   margin-right: 20%
 }
</style>

<script>
  export default{
    name:'write',
    data(){
      return {
        form: {
          'name': '',
          'theme': ''
        },
        fileList: [],
        textarea: '',
        options: [{
          value: '选项1',
          label: 'Lds@0303@163.com'
        },
        {
          value: '选项2',
          label: '...'
        }],
      }
  },
  methods: {
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>

