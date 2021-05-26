<template>
    <div class="header">
        <div class="nav-topbar">
            <div class="container">
                <div class="topbar-menu">
                    <a href="javascript:;">邮箱管理平台</a>
                </div>
                <div>
                    <el-select v-model="selectValue">
                        <el-option
                                v-for="item in options"
                                :key="item.userMailBoxId"
                                :label="item.account"
                                :value="item.account">
                        </el-option>
                    </el-select>
                    <el-button type="primary" round @click="addEmail">新增</el-button>
                    <el-button type="primary" round @click="editEmail">修改</el-button>
                    <el-button type="primary" round @click="deleteEmail">删除</el-button>
                    <el-button type="primary" round @click="detailEmail">查看</el-button>
                </div>
                <div class="topbar-user">
                    <a href="javascript:;" v-if="username">{{username}}</a>
                    <a href="javascript:;" v-if="!username" @click="login">登录</a>
                    <a href="javascript:;" v-if="username" @click="logout">退出</a>
                </div>
            </div>
            <!-- 编辑弹出框 -->
            <el-dialog title="用户邮箱管理" :visible.sync="editVisible" width="60%" style="text-align: center">
                <el-button @click="addEmail">新增</el-button>
                <el-button @click="editEmail">修改</el-button>
                <el-button>删除</el-button>
                <el-button>查看</el-button>
            </el-dialog>
            <!-- 新增 -->
            <el-dialog title="新增邮箱" :visible.sync="addNewVisible" width="60%" style="text-align: center">
                <el-form ref="form" :model="userMailBoxInfo" label-width="80px">
                    <el-form-item >
                        <div>
                            邮箱号：<el-input v-model="userMailBoxInfo.account" placeholder="请输入内容" ></el-input>
                        </div>
                        <div>
                            密码：<el-input v-model="userMailBoxInfo.password" placeholder="请输入内容" ></el-input>
                        </div>
                        <div>
                            备注：<el-input v-model="userMailBoxInfo.remark" placeholder="请输入内容" ></el-input>
                        </div>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addSave()">确 定</el-button>
                    <el-button @click="addNewVisible = false">取 消</el-button>
                </span>
            </el-dialog>
            <!-- 修改 -->
            <el-dialog title="修改邮箱" :visible.sync="editEmailVisible" width="60%" style="text-align: center">
                <el-form ref="form" :model="userMailBoxInfo" label-width="80px">
                    <el-form-item >
                        <div>
                            邮箱号：<el-input v-model="userMailBoxInfo.account" :disabled="true" placeholder="请输入内容" ></el-input>
                        </div>
                        <div>
                            密码：<el-input v-model="userMailBoxInfo.password" placeholder="请输入内容" ></el-input>
                        </div>
                        <div>
                            备注：<el-input v-model="userMailBoxInfo.remark" placeholder="请输入内容" ></el-input>
                        </div>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="editSave()">确 定</el-button>
                    <el-button @click="editEmailVisible = false">取 消</el-button>
                </span>
            </el-dialog>
            <!-- 删除 -->
            <el-dialog title="删除邮箱" :visible.sync="deleteEmailVisible" width="60%" style="text-align: center">
                <h4>{{selectValue}}</h4>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="deleteSave">确 定</el-button>
                    <el-button @click="deleteEmailVisible = false">取 消</el-button>
                </span>
            </el-dialog>
            <!-- 查看 -->
            <el-dialog title="查看邮箱" :visible.sync="detailEmailVisible" width="60%" style="text-align: center">
                <el-table :data="detailTable" stripe style="width: 100%">
                    <el-table-column prop="account" label="邮箱号" width="180"></el-table-column>
                    <el-table-column prop="password" label="密码" width="180"></el-table-column>
                    <el-table-column prop="remark" label="备注"></el-table-column>
                </el-table>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="detailEmailVisible = false">取 消</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {getCookie} from '@/util/support';

    export default {
        name: 'nav-header',
        data() {
            return {
                keyword: "请输入产品关键字",
                options: [{
                    userMailBoxId:'',
                    account:''
                }],
                editVisible: false,
                selectValue: '',
                addNewVisible: false,
                editEmailVisible: false,
                deleteEmailVisible: false,
                detailEmailVisible: false,
                userMailBoxInfo:{
                    account:'',
                    password:'',
                    remark:'',
                    userCode:''
                },
                detailTable:[{
                    account:'',
                    password:'',
                    remark:''
                }],
            }

        },
        computed: {
            username() {
                return this.$store.state.username;
            },
            cartCount() {
                // 取
                return this.$store.state.cartCount;
            },
            ...mapState(['username', 'cartCount'])
        },
        mounted() {

            this.getEmailList();

        },
        methods: {

            login() {
                this.$router.push('/login');
            },

            logout() {
                this.$cookie.set('token', '');
                this.$cookie.set('username', '');
                this.$cookie.set('userCode', '');
                this.$message.success('退出成功');
                this.$router.push('/login');
                this.$store.dispatch('saveUserName', '');
                this.$store.dispatch('saveCartCount', '0');

            },
            getEmailList() {
                let userCode =  getCookie('userCode');
                this.axios.post('/api/userMail/selectMailbox', {
                    userCode: userCode,
                },{headers: {'userCode': userCode}}).then((res) => {
                    this.options = res.data;
                    this.selectValue = this.options[0].account;
                }).catch((err) => {
                    window.console.log(err.message)
                })
            },
            addSave(){

                let userCode =  getCookie('userCode');
                this.userMailBoxInfo.userCode = userCode;
                this.axios.post('/api/userMail/saveMailbox', this.userMailBoxInfo
                ,{headers: {'userCode': userCode}}).then(() => {
                    this.addNewVisible = false;
                    this.getEmailList();
                }).catch((err) => {
                    window.console.log(err.message)
                })

            },
            editSave(){

                let userCode =  getCookie('userCode');
                this.userMailBoxInfo.userCode = userCode;
                this.axios.post('/api/userMail/updateMailbox', this.userMailBoxInfo
                    ,{headers: {'userCode': userCode}}).then(() => {
                    this.editEmailVisible = false;
                    this.getEmailList();
                }).catch((err) => {
                    window.console.log(err.message)
                })
            },
            deleteSave(){

                let userCode =  getCookie('userCode');
                let email = this.options.filter(item=>item.account === this.selectValue)[0];
                this.axios.post('/api/userMail/delMailbox', {
                    userCode:email.userCode,
                    account:email.account
                    },{headers: {'userCode': userCode}}).then(() => {
                    this.deleteEmailVisible = false;
                    this.getEmailList();
                }).catch((err) => {
                    window.console.log(err.message)
                })
            },
            open() {
                this.$confirm('', '用户邮箱管理', {
                    cancelButtonText: '删除',
                    confirmButtonText: '新增',
                    type: 'info',
                    center: true
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 新增邮箱
            addEmail() {
                this.addNewVisible = true;
                this.userMailBoxInfo = {};
            },
            // 修改邮箱
            editEmail() {
                this.editEmailVisible = true;

                let email = this.options.filter(item=>item.account === this.selectValue);
                window.console.log(email);
                this.userMailBoxInfo = email[0];
            },
            // 删除油箱
            deleteEmail(){
                this.deleteEmailVisible = true;
            },
            // 删除油箱
            detailEmail(){
                this.detailEmailVisible = true;
                let email = this.options.filter(item=>item.account === this.selectValue);
                this.detailTable = email;
                window.console.log(this.detailTable);
            }
        }
    }
</script>
<style lang="scss">
    @import './../assets/scss/base.scss';
    @import './../assets/scss/mixin.scss';
    @import './../assets/scss/config.scss';

    .el-input {
        width: 50%;
    }

    .header {
        .nav-topbar {
            height: 39px;
            line-height: 39px;
            font-size: 15px;
            background-color: #333333;
            color: #B0B0B0;

            .container {
                @include flex();

                a {
                    display: inline-block;
                    color: #B0B0B0;
                    margin-right: 17px;
                }

                .my-cart {
                    width: 110px;
                    background-color: #FF6600;
                    text-align: center;
                    color: #ffffff;
                    margin-right: 0;

                    .icon-cart {
                        @include bgImg(16px, 12px, '/imgs/icon-cart-checked.png');
                        margin-right: 4px;
                    }
                }
            }
        }

        .nav-header {
            .container {
                position: relative;
                height: 112px;
                @include flex();

                .header-menu {
                    display: inline-block;
                    width: 643px;
                    padding-left: 209px;

                    .item-menu {
                        display: inline-block;
                        color: #333333;
                        font-weight: bold;
                        font-size: 16px;
                        line-height: 112px;
                        margin-right: 20px;

                        span {
                            cursor: pointer;
                        }

                        &:hover {
                            color: $colorA;

                            .children {
                                height: 220px;
                                opacity: 1;
                            }
                        }

                        .children {
                            position: absolute;
                            top: 112px;
                            left: 0;
                            width: 1226px;
                            height: 0;
                            opacity: 0;
                            overflow: hidden;
                            border-top: 1px solid #E5E5E5;
                            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
                            z-index: 10;
                            transition: all .5s;
                            background-color: #ffffff;

                            .product {
                                position: relative;
                                float: left;
                                width: 16.6%;
                                height: 220px;
                                font-size: 12px;
                                line-height: 12px;
                                text-align: center;

                                a {
                                    display: inline-block;
                                }

                                img {
                                    width: auto;
                                    height: 111px;
                                    margin-top: 26px;
                                }

                                .pro-img {
                                    height: 137px;
                                }

                                .pro-name {
                                    font-weight: bold;
                                    margin-top: 19px;
                                    margin-bottom: 8px;
                                    color: $colorB;
                                }

                                .pro-price {
                                    color: $colorA;
                                }

                                &:before {
                                    content: ' ';
                                    position: absolute;
                                    top: 28px;
                                    right: 0;
                                    border-left: 1px solid $colorF;
                                    height: 100px;
                                    width: 1px;
                                }

                                &:last-child:before {
                                    display: none;
                                }
                            }
                        }
                    }
                }

                .header-search {
                    width: 319px;

                    .wrapper {
                        height: 50px;
                        border: 1px solid #E0E0E0;
                        display: flex;
                        align-items: center;

                        input {
                            border: none;
                            box-sizing: border-box;
                            border-right: 1px solid #E0E0E0;
                            width: 264px;
                            height: 50px;
                            padding-left: 14px;
                        }

                        a {
                            @include bgImg(18px, 18px, '/imgs/icon-search.png');
                            margin-left: 17px;
                        }
                    }
                }
            }
        }
    }
</style>