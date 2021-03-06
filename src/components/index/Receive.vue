<template>
    <div>
        <el-form ref="form" :model="form">
            <el-form-item label="主题">
                <el-input v-model="form.subject"></el-input>
            </el-form-item>
            <el-form-item label="邮箱号">
                <el-input v-model="form.account"></el-input>
            </el-form-item>
            <el-form-item label="发件人">
                <el-input v-model="form.fromAddress"></el-input>
            </el-form-item>
            <el-form-item label="收件人">
                <el-input v-model="form.receivers"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list" style="width: 100%">

            <el-table-column
                    prop="subject"
                    label="主题"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="makerDate"
                    label="发送时间"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="fromAddress"
                    label="发件人">
            </el-table-column>
            <el-table-column prop="userSeen" label="是否已读">
                <template slot-scope="scope">
                    <p v-if="scope.row.userSeen === '0'">已读</p>
                    <p v-else>未读</p>
                </template>
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-button type="primary" @click="deleteEmail(scope.row)">删除</el-button>
                    <el-button type="primary" @click="searchEmailDetail(scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="查看详情" :visible.sync="detailEmailVisible" width="60%" modal-append-to-body style="text-align: center">
            <div class="app-container">
                <div style="margin: 20px 0;"></div>
                <el-form ref="form" :model="detailEmail" label-width="120px">
                    <el-form-item label=" 收件人：" prop="receivers">
                        <el-input v-model="detailEmail.receivers" placeholder="请输入内容" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="主 题：" prop="subject">
                        <el-input v-model="detailEmail.subject"  :disabled="true"></el-input>
                    </el-form-item>
                    <div v-for="(item,index) in  detailEmail.fileInfoDtoList " :key="index">
                        <p>{{item.originalFileName}}<el-button type="primary" @click="download(item)">下载</el-button></p>
                    </div>
                    <el-form-item label="内容" prop="content">
                        <el-input v-model="detailEmail.content" type="textarea" placeholder="请输入内容" :disabled="true"></el-input>
                    </el-form-item>

                    <span>发件人: {{detailEmail.fromAddress}}</span>
                </el-form>
            </div>
        </el-dialog>
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageObj.pageNum"
                    :page-sizes="[10, 20, 50]"
                    :page-size="pageObj.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageObj.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>

    import {getCookie} from '@/util/support';

    export default {
        // 收件箱
        name: 'receive',

        data() {
            return {
                list: [{'address': 'NVIDIA Accounts', 'subject': 'NVIDA电子邮件验证', 'seen': true, 'date': '2020-11-07'}],
                detailEmailVisible: false,
                pageObj: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                form: {
                    subject: '',
                    account: '',
                    fromAddress: '',
                    receivers: '',
                },
                detailEmail: {
                    receivers: '',
                    subject: '',
                    content: ''
                }
            }
        },
        mounted() {
            this.getReceiveList(this.pageObj.pageNum, this.pageObj.pageSize);
            this.readEmail();
        },
        methods: {

            readEmail(){
                let userCode = getCookie('userCode');
                this.axios.post('/api/email/readEmailByUserCode', {
                    userCode: userCode
                }, {headers: {'userCode': userCode}}).then((res) => {
                    if(res.code === 1){
                        this.$message({type: 'success', message: res.msg});
                    } else {
                        this.$message({type: 'info', message: res.msg});
                    }
                }).catch((err) => {
                    this.$message({type: 'info', message: err.msg});
                })
            },

            getReceiveList(size, current) {
                let userCode = getCookie('userCode');
                this.axios.post('/api/email/selectInboxEmailList', {
                    userCode: userCode,
                    account: this.form.account,
                    subject: this.form.subject,
                    receivers: this.form.receivers,
                    fromAddress: this.form.fromAddress,
                    page: size,
                    pageSize: current,
                }, {headers: {'userCode': userCode}}).then((res) => {
                    if(res.code === 1){
                        this.$message({type: 'success', message: res.msg});
                        this.list = res.data.records;
                        this.pageObj.pageNum = res.data.current;
                        this.pageObj.pageSize = res.data.size;
                        this.pageObj.total = res.data.total;
                    } else {
                        this.$message({type: 'info', message: res.msg});
                    }

                }).catch((err) => {
                    this.$message({type: 'info', message: +err.msg});
                })
            },
            handleSizeChange(val) {
                this.pageObj.pageNum = val;
                this.getReceiveList(val, this.pageObj.pageSize);
            },
            handleCurrentChange(val) {
                this.pageObj.pageSize = val;
                this.getReceiveList(this.pageNum.pageNum, val);
            },
            onSubmit() {
                this.getReceiveList(this.pageObj.pageNum, this.pageObj.pageSize);
            },
            deleteEmail(row) {

                this.$confirm('邮件删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let userCode = getCookie('userCode');
                    this.axios.post('/api/email/delEmail', {
                        userCode: userCode,
                        emailId: row.emailId
                    }, {headers: {'userCode': userCode}}).then((res) => {
                        if(res.code === 1){
                            this.getReceiveList(this.pageObj.pageNum, this.pageObj.pageSize);
                            this.$message({type: 'success', message: res.msg});
                        } else {
                            this.$message({type: 'info', message: res.msg});
                        }
                    }).catch((err) => {
                        this.$message({type: 'info', message: err.msg});
                    });
                })

            },
            searchEmailDetail(row) {
                let userCode = getCookie('userCode');
                this.axios.post('/api/email/selectInboxInfo', {
                    userCode: userCode,
                    emailId: row.emailId
                }, {headers: {'userCode': userCode}}).then((res) => {
                    if(res.code === 1){
                        this.detailEmailVisible = true;
                        this.detailEmail = res.data;
                        this.$message({type: 'success', message: res.msg});
                    } else {
                        this.$message({type: 'info', message: res.msg});
                    }
                }).catch((err) => {
                    this.$message({type: 'info', message: err.msg});
                });
            },
            download(row){
                let userCode = getCookie('userCode');
                this.axios.get('/api/file/downloadFile?id='+row.id,
                    {headers: {'userCode': userCode}}).then((res) => {
                    this.$message({type: 'success', message: res.msg});
                }).catch((err) => {
                    this.$message({type: 'info', message: err.msg});
                })

            }
        }
    }
</script>


<style scoped>
    .container {
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