<template>
    <div>
        <x-header>
            商机详情
        </x-header>
        <group label-width="5rem">
            <cell primary="content" value-align="left"  align-items="flex-start">
                <div slot="title" class="title">商机编号</div>
                <div slot="value">SSBH20102102120011</div>
            </cell>
            <cell primary="content" align-items="flex-start"  value-align="left">
                <div slot="title" class="title" >商机标题</div>
                <div slot="value">商机标题商机标题商机标题商机标题商机标题商机标题商机标题商机标题商机标题商机标题</div>
            </cell>
            <cell primary="content"  align-items="flex-start"  value-align="left">
                <div slot="title" class="title">商机状态</div>
                <div slot="value" class="status-lock">已锁定</div>
            </cell>
            <cell primary="content"  align-items="flex-start"  value-align="left">
                <div slot="title" class="title">交期</div>
                <div slot="value">已锁定</div>
            </cell>
        </group>
        <group label-width="5rem">
            <cell primary="content" value-align="left"  align-items="flex-start">
                <div slot="title" class="title">类目</div>
                <div slot="value">SSBH20102102120011</div>
            </cell>
            <cell primary="content" align-items="flex-start"  value-align="left">
                <div slot="title" class="title" >品牌</div>
                <div slot="value">商机标题商机标题商机标题商机标题商机标题商机标题商机标题商机标题商机标题商机标题</div>
            </cell>
            <cell primary="content"  align-items="flex-start"  value-align="left">
                <div slot="title" class="title">产品名称</div>
                <div slot="value" class="status-lock">已锁定</div>
            </cell>
            <cell primary="content"  align-items="flex-start"  value-align="left">
                <div slot="title" class="title">条码</div>
                <div slot="value">已锁定</div>
            </cell>
            <cell primary="content"  align-items="flex-start"  value-align="left">
                <div slot="title" class="title">数量</div>
                <div slot="value">已锁定</div>
            </cell>
            <cell primary="content"  align-items="flex-start"  value-align="left">
                <div slot="title" class="title">保质期</div>
                <div slot="value">已锁定</div>
            </cell>
            <cell primary="content"  align-items="flex-start"  value-align="left">
                <div slot="title" class="title">货物地点</div>
                <div slot="value">已锁定</div>
            </cell>
        </group>
        <group label-width="7rem">
            <cell primary="content" value-align="left"  align-items="flex-start">
                <div slot="title" class="title">配比</div>
                <div slot="value">SSBH20102102120011</div>
            </cell>
            <cell primary="content" align-items="flex-start"  value-align="left">
                <div slot="title" class="title" >链路层级</div>
                <div slot="value">商机标题商机标题商机标题商机标题商机标题商机标题商机标题商机标题商机标题商机标题</div>
            </cell>
            <cell primary="content"  align-items="flex-start"  value-align="left">
                <div slot="title" class="title">软文介绍链接</div>
                <div slot="value" class="status-lock">已锁定</div>
            </cell>
            <cell primary="content"  align-items="flex-start"  value-align="left">
                <div slot="title" class="title">备注</div>
                <div slot="value">已锁定</div>
            </cell>
        </group>

       <div>
           <x-button type="default">下载附件</x-button>
       </div>
    </div>
</template>

<script>
    import {XHeader, Cell, Group,  Flexbox, FlexboxItem,XButton} from 'vux'
    export default {
        components: {XHeader, Cell, Group,  Flexbox, FlexboxItem,XButton},
        methods: {
            onSubmit(val) {
            },
            onCancel() {
                console.log('on cancel')
            },
            onFocus() {
                console.log('on focus')
            }
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
    .title{
        color: #26ade3;
    }
    .status-lock{
        color: #9174e1;
    }
</style>