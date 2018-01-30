<template>
  <div id="app">
    <loading v-model="isLoading"></loading>
    <transition name="fade" mode="out-in">
      <router-view>
      </router-view>
    </transition>
  </div>
</template>
<script>
    import * as types from './store/types';
    import {mapState} from 'vuex';
    import { Loading,ViewBox } from 'vux'
    export default {
        components: {
            Loading,ViewBox
        },
        computed: mapState({
            token: state => state.token,
            isLoading: state => state.isLoading
        }),
        methods: {
            logout(){
                this.$store.commit(types.LOGOUT);
                this.$router.push({
                    path: '/'
                });
            }
        }
    }

</script>
<style lang="less">
  @import "~vux/src/styles/reset.less";

  body,
  html {
    background-color: #ffffff;
    max-width: 600px;
    margin: 0 auto;
    position: relative;
    color: #c9c9c9 ;
    }

  .vux-header{
    background: linear-gradient(to right, #57b7fe,#43d8fe)!important;
  }
  .weui-search-bar__cancel-btn{
    color:#26ade3 !important;
  }
  .vux-header .vux-header-title{
    font-size: 1.2rem !important;
  }
  .vux-header .vux-header-left a, .vux-header .vux-header-left button, .vux-header .vux-header-right a, .vux-header .vux-header-right button{
    color: #ffffff!important;
  }
  .vux-header .vux-header-left .left-arrow:before{
    border-color: #ffffff !important;
  }
  .weui-search-bar{
    padding: 10px 10px !important;
    background-color: #ffffff !important;
  }
  .weui-search-bar:before, .weui-search-bar:after{
    border: none !important;
  }
  .weui-search-bar__form{
    border-radius: 1rem !important;
  }
  .login-form .weui-cells:before , .login-form .weui-cells:after{
    border: none;
  }
  .systems .weui-grid__icon{
      width: 60px;
      height: 60px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
</style>