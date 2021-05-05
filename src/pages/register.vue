<template>
    <div class="login">
        <div class="wrapper">
            <div class="container">
                <div class="login-form">
                    <h3>
                        <span class="checked">帐号注册</span>
                    </h3>
                    <div class="input">
                        <input type="text" placeholder="请输入帐号" v-model="userCode">
                    </div>
                    <div class="input">
                        <input type="text" placeholder="请输入昵称" v-model="userName">
                    </div>
                    <div class="input">
                        <input type="password" placeholder="请输入密码" v-model="userPwd">
                    </div>
                    <div class="input">
                        <input type="text" placeholder="注册手机号" v-model="loginPhone">
                    </div>
                    <div class="input">
                        <input type="text" placeholder="注册邮箱号" v-model="loginEmail">
                    </div>
                    <div class="input">
                        <input type="text" placeholder="备注" v-model="remark">
                    </div>
                    <div class="btn-box">
                        <a href="javascript:;" class="btn" @click="register">注册</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'register',
        components: {},
        data() {
            return {
                userCode: '',
                userName: '',
                userPwd: '',
                loginPhone: '',
                loginEmail: '',
                code: '123',
                remark: ''
            }
        },
        methods: {
            register() {
                this.axios.post('/login/user/register', {
                    userCode: this.userCode,
                    userName: this.userName,
                    userPwd: this.userPwd,
                    loginPhone: this.loginPhone,
                    loginEmail: this.loginEmail,
                    code: this.code,
                    remark: this.remark
                }).then((res) => {
                    if (res.code === 1) {
                        this.$message.success('注册成功');
                        this.$router.push({name: 'login'});
                    } else {
                        this.$message.success('注册失败');
                    }
                }).catch((err)=>{
                    window.console.log(err.message)
                })
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
                height: 800px;

                .login-form {
                    box-sizing: border-box;
                    padding-left: 31px;
                    padding-right: 31px;
                    width: 410px;
                    height: 671px;
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
                }
            }
        }
    }
</style>