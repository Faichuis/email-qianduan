<template>

    <div class="app-container">
        <div>
            <el-button type="success" @click="sendEmil(1)">发送</el-button>
            <el-button @click="sendEmil(2)">存草稿</el-button>
            <el-button>取消</el-button>
        </div>
        <div style="margin: 20px 0;"></div>

        <el-form ref="form" :model="form" label-width="120px">
            收件人：
            <el-input v-model="form.receivers" placeholder="请输入内容"></el-input>
            <br>
            <div style="margin: 20px 0;"></div>
            主 题：
            <el-input v-model="form.subject" placeholder="请输入内容"></el-input>
            <div style="margin: 20px 0;"></div>

            <el-upload
                    class="upload-demo"
                    :headers="headers"
                    action="/api/api/file/uploadFile"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :multiple="true"
                    :limit="3"
                    :on-exceed="handleExceed"
                    :on-success="handleSuccess"
                    :file-list="fileList">
                <el-button size="small" type="primary">添加附件</el-button>
                <span slot="tip" class="el-upload__tip">单文件最大1M</span>
            </el-upload>

            <div style="margin: 20px 0;"></div>
            <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="emailContent">
            </el-input>

            <div style="margin: 20px 0;"></div>
            <span>发件人: {{emailAccount}}</span>

        </el-form>

    </div>
</template>

<script>

    import {mapState} from 'vuex';
    import {getCookie} from '@/util/support';

    var userCode =  getCookie('userCode');

    export default {

        name: 'write',
        data() {
            return {
                form: {
                    'subject': '',
                    'receivers': ''
                },
                fileList: [],
                emailContent: '',
                headers:{userCode:userCode},
                fileInfoDtoList:[],
            }
        },
        computed:{
            ...mapState(['emailAccount'])
        },
        mounted(){

        },
        methods: {
            sendEmil(num){
                let userCode =  getCookie('userCode');
                this.axios.post('/api/email/sendEmail', {
                    userCode: userCode,
                    account:this.emailAccount,
                    subject:this.form.subject,
                    receivers:this.form.receivers,
                    fromAddress:this.emailAccount,
                    content: this.emailContent,
                    carbonCopys:'',
                    blindCarbonCopys:'',
                    pririty:3,
                    isReplaySign:0,
                    outEmailType:1,
                    sendStatus:num,
                    fileInfoDtoList:this.fileInfoDtoList
                },{headers: {'userCode': userCode}}).then((res) => {
                    if (res.code === 1){
                        this.$message({type: 'success', message: res.msg});
                        this.fileInfoDtoList = [];
                        this.this.form.subject = '';
                        this.this.form.receivers = '';
                        this.emailContent = '';
                        this.fileInfoDtoList = [];
                    }else {
                        this.$message({type: 'info', message: res.msg});
                    }

                }).catch((err) => {
                    this.$message({type: 'info', message: err.msg});
                })
            },
            handleSuccess(res){
                this.fileInfoDtoList.push(res.data);
            },
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
                return this.$confirm(`确定移除 ${file.name}？`);
            }
        }
    }
</script>

<style scoped>
    .app-container {
        margin-left: 20%;
        margin-right: 20%
    }
</style>

