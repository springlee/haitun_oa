<template>
    <div>
        <x-header>
            商机列表
        </x-header>
        <div style="height: 1rem; background-color: #fbf9fe;"></div>
        <div class="search-form">
            <search v-model="keywords" @on-cancel="onSubmit" @on-focus="onSubmit" ref="search" placeholder='请输入商品名称或关键字' cancel-text='取消'></search>
        </div>
        <div style="height: 1rem; background-color: #fbf9fe;"></div>
        <div class="business-opportunity-top">
            <flexbox >
                    <flexbox-item :span="1.5">
                        <div class="status-info">状态:</div>
                    </flexbox-item>
                    <flexbox-item>
                        <checker v-model="status" default-item-class="status-box-li" radio-required
                                 selected-item-class="status-box-li-selected">
                            <checker-item value="one">
                                全部
                            </checker-item>
                            <checker-item value="tow">
                                已锁定
                            </checker-item>
                            <checker-item value="three">
                                未锁定
                            </checker-item>
                            <checker-item value="four">
                                已失效
                            </checker-item>
                            <checker-item value="five">
                                已成交
                            </checker-item>
                        </checker>
                    </flexbox-item>
            </flexbox>
        </div>
        <div class="business-opportunity-detail">
            <flexbox class="list">
                <div >
                    <div class="title"><span class="status-title-lock status-title">[已锁定]</span>商机标题1</div>
                    <div class="detail-info">
                        <flexbox >
                            <flexbox-item :span="1/4">
                                2018-11-20
                            </flexbox-item>
                            <flexbox-item :span="1/4">
                                张三创建
                            </flexbox-item>
                            <flexbox-item :span="1/4">
                                浏览人数20
                            </flexbox-item >
                            <flexbox-item :span="1/4">
                                点击人数20
                            </flexbox-item>
                        </flexbox>
                    </div>
                </div>
            </flexbox>
            <flexbox class="list">
                <div>
                    <div class="title"><span class="status-title-lock status-title">[已锁定]</span>商机标题1</div>
                    <div class="detail-info">
                        <flexbox >
                            <flexbox-item :span="1/4">
                                2018-11-20
                            </flexbox-item>
                            <flexbox-item :span="1/4">
                                张三创建
                            </flexbox-item>
                            <flexbox-item :span="1/4">
                                浏览人数20
                            </flexbox-item >
                            <flexbox-item :span="1/4">
                                点击人数20
                            </flexbox-item>
                        </flexbox>
                    </div>
                </div>
            </flexbox>
            <flexbox class="list">
                <div>
                    <div class="title"><span class="status-title-lock status-title">[已锁定]</span>商机标题1</div>
                    <div class="detail-info">
                        <flexbox >
                            <flexbox-item :span="1/4">
                                2018-11-20
                            </flexbox-item>
                            <flexbox-item :span="1/4">
                                张三创建
                            </flexbox-item>
                            <flexbox-item :span="1/4">
                                浏览人数20
                            </flexbox-item >
                            <flexbox-item :span="1/4">
                                点击人数20
                            </flexbox-item>
                        </flexbox>
                    </div>
                </div>
            </flexbox>
            <flexbox class="list">
                <div>
                    <div class="title"><span class="status-title-lock status-title">[已锁定]</span>商机标题1</div>
                    <div class="detail-info">
                        <flexbox >
                            <flexbox-item :span="1/4">
                                2018-11-20
                            </flexbox-item>
                            <flexbox-item :span="1/4">
                                张三创建
                            </flexbox-item>
                            <flexbox-item :span="1/4">
                                浏览人数20
                            </flexbox-item >
                            <flexbox-item :span="1/4">
                                点击人数20
                            </flexbox-item>
                        </flexbox>
                    </div>
                </div>
            </flexbox>
        </div>
    </div>


</template>

<script>
    import {XHeader, Cell, CellBox, Search, Group, Checker, CheckerItem, Flexbox, FlexboxItem} from 'vux'

    export default {
        components: {XHeader, Cell, CellBox, Search, Group, Checker, CheckerItem, Flexbox, FlexboxItem},
        methods: {
            onSubmit(val) {
            },
        },
        data() {
            return {
                keywords: '',
                status:'one'
            }
        }
    }
</script>
<style scoped>
    .business-opportunity-top{
        padding: 1rem;
        border-bottom: 1px solid #f1f1f1;

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
        color: #000000;
    }
    .status-title-lock{
        color: #9174e1;
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