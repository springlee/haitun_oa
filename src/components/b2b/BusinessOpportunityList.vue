<template>
    <div>
        <div class="header">
            <x-header   @on-click-back="goBack" :left-options="{preventGoBack:true}">
                商机列表
            </x-header>
        </div>

        <div class="container">
            <div style="height: 1rem; background-color: #fbf9fe;"></div>
            <div class="search-form">
                <search v-model="keywords" @on-cancel="onCancel"   position="absolute"
                        auto-scroll-to-top top="0"  @on-submit="onSearch"  ref="search"  placeholder='输入标题' cancel-text='取消'></search>
            </div>
            <div style="height: 1rem; background-color: #fbf9fe;"></div>
            <div class="business-opportunity-top">
                <flexbox >
                    <flexbox-item :span="1.5">
                        <div class="status-info">状态:</div>
                    </flexbox-item>
                    <flexbox-item>
                        <checker v-model="status" default-item-class="status-box-li" radio-required selected-item-class="status-box-li-selected" @on-change="onSearch">
                            <checker-item value='-1' >
                                全部
                            </checker-item>
                            <checker-item value='0'  >
                                已锁定
                            </checker-item>
                            <checker-item value='1'  >
                                未锁定
                            </checker-item>
                            <checker-item value='2'  >
                                已失效
                            </checker-item>
                            <checker-item value='3' >
                                已成交
                            </checker-item>
                        </checker>
                    </flexbox-item>
                </flexbox>
            </div>
            <div class="business-opportunity-detail">
                <div v-for="item in dataList">
                    <flexbox class="list">
                        <flexbox-item>
                            <div class="title" @click="toDetail(item)">
                                <span  v-if="item.status===0 && item.process===0 " class="status-title status-title-lock">[{{item.statusTxt}}]</span>
                                <span  v-if="item.status===1 && item.process===0" class="status-title status-title-unlock">[{{item.statusTxt}}]</span>
                                <span  v-if="item.process===2" class="status-title status-title-fail">[{{item.statusTxt}}]</span>
                                <span  v-if="item.process===1" class="status-title status-title-success">[{{item.statusTxt}}]</span>
                                {{item.title}}
                            </div>

                            <div class="detail-info">
                                <flexbox >
                                    <flexbox-item :span="3">
                                        {{item.add_time}}
                                    </flexbox-item>
                                    <flexbox-item :span="3">
                                        {{item.remark}}创建
                                    </flexbox-item>
                                    <flexbox-item :span="3">
                                        浏览人数{{item.read_num}}
                                    </flexbox-item >
                                    <flexbox-item :span="3">
                                        点击人数{{item.clicks}}
                                    </flexbox-item>
                                </flexbox>
                            </div>
                        </flexbox-item>
                    </flexbox>
                </div>
                <infinite-loading @infinite="onInfinite" ref="infiniteLoading" style="padding-bottom:3rem;">
                       <span slot="no-more">
                             我也是有底线的~
                        </span>
                    <span slot="no-results">
                        空空如也，换个姿势试试~
                       </span>
                </infinite-loading>
            </div>
        </div>

    </div>


</template>

<script>
    import {XHeader, Cell, CellBox, Search, Group, Checker, CheckerItem, Flexbox, FlexboxItem,querystring} from 'vux'
    import InfiniteLoading from 'vue-infinite-loading'
    import api from '../../constant/api'
    export default {
        components: {XHeader, Cell, CellBox, Search, Group, Checker, CheckerItem, Flexbox, FlexboxItem,InfiniteLoading},
        methods: {
            onSearch() {
                let url = '/b2b/businessOpportunityList';
                if(this.keywords){
                    url+='/keywords/'+this.keywords;
                }
                if(this.status){
                    url+='/status/'+this.status;
                }
                this.$refs.search.setBlur();
                this.$router.push({
                    path: url
                })
            },
            onCancel(){
                let url = '/b2b/businessOpportunityList';
                if(this.status){
                    url+='/status/'+this.status;
                }
                this.$refs.search.setBlur();
                this.$router.push({
                    path: url
                })
            },
            toDetail(item){
                this.$router.push({
                    path: '/b2b/businessOpportunityDetail/'+item.id
                })
            },
            onInfinite($state) {
                let that = this;
                let params ={
                    page:this.page,
                    keywords: this.keywords ? this.keywords:'',
                    status: this.status!==-1 ? this.status:'',
                };
                this.axios.post(api.b2bUrl+api.businessOpportunityList, querystring.stringify(params))
                    .then(response => {
                        if (response.data.length === 0) {
                            $state.complete();
                        }
                        this.dataList = this.dataList.concat(response.data);
                        $state.loaded();
                        that.page++;
                    })
            },
            goBack(){
                this.$router.push({
                    path: '/user/profile'
                })
            }
        },
        data() {
            return {
                keywords: '',
                status:'-1',
                dataList:[],
                page:1,
                page_size: 10
            }
        },
        mounted () {
            this.dataList= [];
            this.page =1;
            this.keywords = this.$route.params.keywords ? this.$route.params.keywords : '';
            this.status = this.$route.params.status ? this.$route.params.status : '-1' ;
        },
        watch: {
            '$route' (to, from) {
                this.dataList= [];
                this.page =1;
                this.$nextTick(() => {
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
                })
            }
        }


    }
</script>
<style scoped>
    .business-opportunity-top{
        padding: 1rem;
        border-bottom: 1px solid #f1f1f1;

    }
    .container{
        margin-top: 3rem;
    }
    .business-opportunity-detail{
        padding: 0 1rem;
    }
    .status-info {
        color: #000000;
    }

    .status-box-li {
        font-size: .8rem;
        border: 1px solid #f1f1f1;
        border-radius: .2rem;
        padding: 0 .5rem;
    }

    .status-box-li-selected {
        color: #ffffff;
        background-color: #26ade3;
    }

    .title{
        color: #696969;
    }
    .status-title-lock{
        color: #9174e1;
    }
    .status-title-unlock{
        color: #44d4cf;
    }
    .status-title-fail{
        color: #f65f5f;
    }
    .status-title-success{
        color: #21a712;
    }
    .detail-info{
        font-size: .8rem;
    }
    .list{
        padding: 1rem 0;
        border-bottom: 1px solid #f1f1f1;
    }
    .status-title{
        padding-right: 1rem;
    }
</style>