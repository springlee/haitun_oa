<template>
    <div>
        <div class="header">
            <x-header class="header">
                商机详情
            </x-header>
        </div>
        <div class="container">
            <group label-width="5rem">
                <cell primary="content" value-align="left" align-items="flex-start">
                    <div slot="title" class="title">商机编号</div>
                    <div>{{business.sn}}</div>
                </cell>
                <cell primary="content" align-items="flex-start" value-align="left">
                    <div slot="title" class="title">商机标题</div>
                    <div>{{business.title}}</div>
                </cell>
                <cell primary="content" align-items="flex-start" value-align="left">
                    <div slot="title" class="title">商机状态</div>
                    <div  v-if="business.status===0 && business.process===0 "
                         class="status-title-lock">{{business.statusTxt}}
                    </div>
                    <div  v-if="business.status===1 && business.process===0"
                         class="status-title-unlock">{{business.statusTxt}}
                    </div>
                    <div  v-if="business.process===2" class="status-title-fail">
                        {{business.statusTxt}}
                    </div>
                    <div  v-if="business.process===1" class="status-title-success">
                        {{business.statusTxt}}
                    </div>
                </cell>
                <cell primary="content" align-items="flex-start" value-align="left">
                    <div slot="title" class="title">交期</div>
                    <div>{{business.delivery_time}}</div>
                </cell>
            </group>
            <div style="height: 1rem; background-color: #fbf9fe;"></div>
            <div v-for="item in goods ">
                <group label-width="5rem">
                    <cell primary="content" value-align="left" align-items="flex-start">
                        <div slot="title">类目</div>
                        <div>{{item.category}}</div>
                    </cell>
                    <cell primary="content" align-items="flex-start" value-align="left">
                        <div slot="title">品牌</div>
                        <div>{{item.brand}}</div>
                    </cell>
                    <cell primary="content" align-items="flex-start" value-align="left">
                        <div slot="title">产品名称</div>
                        <div>{{item.goods_name}}</div>
                    </cell>
                    <cell primary="content" align-items="flex-start" value-align="left">
                        <div slot="title">条码</div>
                        <div>{{item.goods_sn}}</div>
                    </cell>
                    <cell primary="content" align-items="flex-start" value-align="left">
                        <div slot="title">数量</div>
                        <div>{{item.num}}</div>
                    </cell>
                    <cell primary="content" align-items="flex-start" value-align="left">
                        <div slot="title">保质期</div>
                        <div>{{item.expireday}}</div>
                    </cell>
                    <cell primary="content" align-items="flex-start" value-align="left">
                        <div slot="title">货物地点</div>
                        <div>{{item.address}}</div>
                    </cell>
                    <cell primary="content" value-align="left" align-items="flex-start">
                        <div slot="title">配比</div>
                        <div>{{item.patch}}</div>
                    </cell>
                    <cell primary="content" align-items="flex-start" value-align="left">
                        <div slot="title">链路层级</div>
                        <div>{{item.link_level}}</div>
                    </cell>
                    <cell primary="content" align-items="flex-start" value-align="left">
                        <div slot="title">软文链接</div>
                        <div>{{item.url}}</div>
                    </cell>
                    <cell primary="content" align-items="flex-start" value-align="left">
                        <div slot="title">备注</div>
                        <div>{{item.remark}}</div>
                    </cell>
                </group>
                <div style="height: 1rem; background-color: #fbf9fe;"></div>
            </div>


            <div>
                <group label-width="5rem">
                    <cell primary="content" value-align="left" align-items="flex-start">
                        <div slot="title">下载附件</div>
                        <div v-html="attached"></div>
                    </cell>
                </group>
            </div>
        </div>

    </div>
</template>

<script>
    import {XHeader, Cell, Group, Flexbox, FlexboxItem, XButton} from 'vux'
    import qs from 'qs'
    import api from '../../constant/api'

    export default {
        components: {XHeader, Cell, Group, Flexbox, FlexboxItem, XButton},
        methods: {
            getDetail() {
                let userInfo = JSON.parse(window.localStorage.getItem('user'));
                let params = {
                    id: this.$route.params.id,
                    name: userInfo.username
                }
                let that = this;
                this.axios.post(api.b2bUrl + api.businessOpportunityDetail, qs.stringify(params))
                    .then(response => {
                        if(response.data){
                            that.business = response.data.business
                            that.goods = response.data.goods
                            that.attached = response.data.attached
                        }else {
                            that.$router.push({path:'/b2b/businessOpportunityList'})
                        }
                    })
            }
        },
        data() {
            return {
                business: {},
                goods:{},
                attached:''
            }
        },
        mounted() {

            this.getDetail()
        }
    }
</script>

<style scoped>
    .title {
        color: #26ade3;
    }

    .status-title-lock {
        color: #9174e1;
    }

    .status-title-unlock {
        color: #44d4cf;
    }

    .status-title-fail {
        color: #f65f5f;
    }

    .status-title-success {
        color: #21a712;
    }

    .container {
        margin-top: 3rem;
    }
</style>