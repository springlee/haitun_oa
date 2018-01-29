<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view>
      </router-view>
    </transition>
  </div>
</template>
<script>
    import * as types from './store/types';
    import {mapState} from 'vuex';
    export default {
        computed: mapState({
            title: state => state.title,
            token: state => state.token
        }),
        methods: {
            logout(){
                this.$store.commit(types.LOGOUT);
                this.$store.commit(types.TITLE, '未登录');
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
    background-color: #fbf9fe;
    font-size: 14px;
    max-width: 600px;
    margin: 0 auto;
    position: relative;
    color: #6a6a6a;
  }
  </style>