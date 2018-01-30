<template>
    <div>
        <div class="name">{{userInfo.name}}</div>
        <div class="logo">
            <img src="../../assets/icon/logo@3x.png"/>
            <p>欢迎使用海豚工作平台系统</p>
        </div>
        <div class="systems">
            <group>
                <grid>
                    <grid-item link="/b2b/businessOpportunityList" >
                        <img slot="icon" src="../../assets/icon/icon_system@3x.png">
                        <span slot="label" class="system_name">商机互动</span>
                    </grid-item>
                    <grid-item link="/" >
                        <img slot="icon" src="../../assets/icon/icon_system@3x.png">
                        <span slot="label" class="system_name">商机互动</span>
                    </grid-item>
                    <grid-item link="/" >
                        <img slot="icon" src="../../assets/icon/icon_system@3x.png">
                        <span slot="label" class="system_name">商机互动</span>
                    </grid-item>
                </grid>
                <grid>
                    <grid-item link="/" >
                        <img slot="icon" src="../../assets/icon/icon_system@3x.png">
                        <span slot="label" class="system_name">商机互动</span>
                    </grid-item>
                    <grid-item link="/" >
                        <img slot="icon" src="../../assets/icon/icon_system@3x.png">
                        <span slot="label" class="system_name">商机互动</span>
                    </grid-item>
                    <grid-item link="/" >
                        <img slot="icon" src="../../assets/icon/icon_system@3x.png">
                        <span slot="label" class="system_name">商机互动</span>
                    </grid-item>
                </grid>
            </group>
        </div>

    </div>
</template>

<script>
    import { Group,Grid,GridItem} from 'vux'
    export default {
        components: {Group, Grid, GridItem},
        data() {
            return {
                userInfo:{}
            }
        },
        mounted() {
           this.userInfo = JSON.parse(window.localStorage.getItem('user'));
        }
    }
</script>

<style type="text/css" scoped>
    .logo{
        text-align: center;
        margin: 4rem auto 0;
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
    .system_name{
        color: #26ade3;
    }
    .name{
        text-align: right;
        margin: 2rem  2rem 0 0;
    }
</style>