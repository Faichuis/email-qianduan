<template>
    <div class="header">
        <div class="nav-topbar">
            <div class="container">
                <div class="topbar-menu">
                    <a href="javascript:;">邮箱管理平台</a>
                </div>
                <div>
                    <el-select v-model="value">
                        <el-option
                                v-for="item in options"
                                :key="item.userMailBoxId"
                                :label="item.account"
                                :value="item.account">
                        </el-option>
                    </el-select>
                    <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit"></el-button>
                </div>
                <div class="topbar-user">
                    <a href="javascript:;" v-if="username">{{username}}</a>
                    <a href="javascript:;" v-if="!username" @click="login">登录</a>
                    <a href="javascript:;" v-if="username" @click="logout">退出</a>
                </div>
            </div>
            <!-- 编辑弹出框 -->
            <el-dialog title="用户邮箱管理" :visible.sync="editVisible" width="60%" style="text-align: center">
                <el-button @click="addNew">新增</el-button>
                <el-button>修改</el-button>
                <el-button>删除</el-button>
                <el-button>查看</el-button>
            </el-dialog>
            <!-- 编辑新增 -->
            <el-dialog title="新增邮箱" :visible.sync="addNewVisible" width="60%" style="text-align: center">
                <div>
                    邮箱号：
                    <el-input
                            placeholder="请输入内容"
                            prefix-icon="el-icon-search"
                    >
                    </el-input>
                </div>
                <div>
                    密码：
                    <el-input
                            placeholder="请输入内容"
                            prefix-icon="el-icon-search"
                    >
                    </el-input>
                </div>
                <div>
                    备注：
                    <el-input
                            placeholder="请输入内容"
                            prefix-icon="el-icon-search"
                    >
                    </el-input>
                </div>
                <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveEdit()">确 定</el-button>
            <el-button @click="editVisible = false">取 消</el-button>
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
                options: [],
                value: '',
                editVisible: false,
                addNewVisible: false,
                userCode:''
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

            let params = this.$route.params;
            if (params && params.from === 'login') {
                this.getCartCount();
            }
        },
        methods: {

            login() {
                this.$router.push('/login');
            },
            getEmailList() {
                let userCode =  getCookie('userCode');
                this.axios.post('/api/userMail/selectMailbox', {
                    userCode: userCode,
                },{headers: {'userCode': userCode}}).then((res) => {
                    this.options = res.data;
                }).catch((err) => {
                    window.console.log(err.message)
                })
            },
            getCartCount() {
            },
            logout() {
                this.$cookie.set('token', '');
                this.$cookie.set('username', '');
                this.$cookie.set('userCode', '');
                this.$message.success('退出成功');
                this.$store.dispatch('saveUserName', '');
                this.$store.dispatch('saveCartCount', '0');

            },
            doSearch() {
                this.$router.push(`/searchResult/${this.keyword}`).catch(err => {
                    window.console.log(err)
                });
            },
            goToCart() {
                this.$router.push('/cart');
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
            // 编辑操作
            handleEdit(index, row) {
                this.dynamicValidateForm = row;
                this.editVisible = true;
            },
            // 新增邮箱
            addNew() {
                this.addNewVisible = true
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