<template>
    <div class="login">
        <div class="wrapper">
            <div class="container">
                <div class="login-form">
                    <h3>
                        <span class="checked">帐号登录</span>
                    </h3>
                    <div class="input">
                        <input type="text" placeholder="请输入帐号" v-model="username">
                    </div>
                    <div class="input">
                        <input type="password" placeholder="请输入密码" v-model="password">
                    </div>
                    <div class="btn-box">
                        <a href="javascript:;" class="btn" @click="login">登录</a>
                    </div>
                    <div class="tips">
                        <div class="reg" @click="register">立即注册</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>

    import {mapActions} from 'vuex';
    import {setCookie} from '@/util/support';

    import Qs from 'qs'

    export default {

        Qs,

        name: 'login',

        data() {
            return {
                username: '',
                password: '',
                userId: ''
            }
        },

        methods: {
            ...mapActions(['saveUserName']),

            login() {
                let {username, password} = this;

                this.axios.post(
                    '/login/user/loginUser',
                    Qs.parse({
                        userCode: username,
                        userPwd: password
                    }), {headers: {'Content-Type': 'application/json'}}).then((res) => {
                        if (res.code === 1){
                            this.$message({type: 'success', message: res.msg});

                            setCookie("username", username, 120);
                            setCookie("userCode", res.data.userCode);
                            this.saveUserName(res.data.userName);
                            this.$router.push({name: 'index', params: {from: 'login'}});
                        } else {
                            this.$message({type: 'info', message: res.msg});
                        }

                })
            },

            register() {
                this.$router.push({name:'Register'})
            }
        }
    }
</script>
<style lang="scss">
    .login {
        & > .container {
            height: 113px;

            img {
                width: auto;
                height: 100%;
            }
        }

        .wrapper {
            background: url('/imgs/youxiangbeijing.jpg') no-repeat center;

            .container {
                height: 576px;

                .login-form {
                    box-sizing: border-box;
                    padding-left: 31px;
                    padding-right: 31px;
                    width: 410px;
                    height: 510px;
                    background-color: #ffffff;
                    position: absolute;
                    bottom: 29px;
                    right: 0;

                    h3 {
                        line-height: 23px;
                        font-size: 24px;
                        text-align: center;
                        margin: 40px auto 49px;

                        .checked {
                            color: #FF6600;
                        }

                        .sep-line {
                            margin: 0 32px;
                        }
                    }

                    .input {
                        display: inline-block;
                        width: 348px;
                        height: 50px;
                        border: 1px solid #E5E5E5;
                        margin-bottom: 20px;

                        input {
                            width: 100%;
                            height: 100%;
                            border: none;
                            padding: 18px;
                        }
                    }

                    .btn {
                        width: 100%;
                        line-height: 50px;
                        margin-top: 10px;
                        font-size: 16px;
                    }

                    .tips {
                        margin-top: 14px;
                        display: flex;
                        justify-content: space-between;
                        font-size: 14px;
                        cursor: pointer;

                        .sms {
                            color: #FF6600;
                        }

                        .reg {
                            color: #999999;

                            span {
                                margin: 0 7px;
                            }
                        }
                    }
                }
            }
        }

        .footer {
            height: 100px;
            padding-top: 60px;
            color: #999999;
            font-size: 16px;
            text-align: center;

            .footer-link {
                a {
                    color: #999999;
                    display: inline-block;
                }

                span {
                    margin: 0 10px;
                }
            }

            .copyright {
                margin-top: 13px;
            }
        }
    }
</style>