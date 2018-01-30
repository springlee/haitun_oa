<template>
    <div>
        <div class="logo">
            <img src="../../assets/icon/logo@3x.png"/>
            <p>欢迎使用海豚工作平台系统</p>
        </div>

        <div class="login-form">
            <group >
                <x-input title="用户名"  placeholder="用户名" class="login-form-input" required  v-model="username">
                    <img slot="label" style="padding-right: 1rem" src="../../assets/icon/icon_user@3x.png" width="24" height="24">
                </x-input>
                <x-input title="密码"  placeholder="密码" type="password"  class="login-form-input" required v-model="password">
                    <img slot="label"  style="padding-right: 1rem" src="../../assets/icon/icon_password@3x.png" width="24" height="24">
                </x-input>
            </group>
            <p class="login-info"> <span>账号和密码与OA保持一致</span></p>
            <x-button class="login-form-button" type="primary" action-type="button" @click.native="login" >登录</x-button>
        </div>
        <toast v-model="login_fail"  :time="time" type='cancel'>{{login_fail_message}}</toast>
    </div>
</template>

<script>
    import qs from 'qs'
    import { Group,GroupTitle ,XInput,XButton,Toast} from 'vux'
    import api from '../../constant/api'
    import * as types from '../../store/types';
    export default {
        components: {Group,GroupTitle,XInput,XButton,Toast},
        data() {
            return {
                time:500,
                username: '',
                password: '',
                login_success:false,
                login_fail:false,
                login_fail_message:''
            }
        },
        methods: {
            login() {
                let params = {
                    username: this.username,
                    password: this.password,
                    system:'base',
                    ip:'127.0.0.1',
                }
                let that = this;
                this.axios.post(api.backendUrl+api.login, qs.stringify(params))
                    .then(response => {
                        if(response.data.success){
                            let userinfo  = response.data.data;
                            this.$store.commit(types.LOGIN,userinfo.sso_token);
                            let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                            this.$router.push({
                                path: redirect
                            })
                        }else {
                            that.login_fail_message = response.data.message
                            that.login_fail = true;
                        }
                    })
            },
        },
        mounted () {
            if(this.$store.state.token){
                this.$router.push({
                    path: 'user/profile'
                })
            }
        }

    }
</script>

<style type="text/css" scoped>
    .logo{
        text-align: center;
        margin: 6rem auto 0;
        width: 15rem;
    }
    .logo img {
        width:100px ;
        height:50px ;
    }
    .logo p {
        margin-top: 1rem;
        font-size: 1.2rem;
        color:#26ade3 ;
    }
    .login-form{
        padding: 2rem;
    }
    .login-form .login-form-button {
        margin-top: 6rem;
        background-color: #26ade3 ;
    }
    .login-form .login-form-button:not(.weui-btn_disabled):active{
        background-color: #26ade3 ;
    }
    .login-form-input:before,.login-form-input:after{
        border: none;
    }
    .login-form-input{
        border-bottom: 1px solid #D9D9D9;
    }
    .login-info{
        margin-top: 1rem;
        color: #fce0a2;
        text-align: right;
    }
</style>