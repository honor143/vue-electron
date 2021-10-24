<template>
    <div class="table-wrapper-height wrapper">
        <!--<div class="func-wrapper">
             <label for="">&nbsp;筛选:&nbsp;</label>
            <Input class="section-search" size="small" v-model="userName" :placeholder="placeholder" clearable @on-change="selectUserInfo"/> 
            <ButtonGroup>
                <Button type="primary" size="small" @click="refresh">刷新</Button>
                <Button type="primary" size="small" @click="edit">编辑</Button>
                <Button type="primary" size="small" @click="save">保存</Button>
                <Button type="primary" size="small" @click="cancel">取消</Button>
            </ButtonGroup>
        </div>-->
        <div class="table-wrapper" ref="tableWrap">
            <Table :loading="loading" stripe highlight-row ref="selection" :height="tableHeight" :columns="columns" :data="data" v-if="data"></Table>
        </div>
        <Page size="small" :total="totalSize" :current="pageNum" @on-page-size-change="pageSizeChange" @on-change="pageNumChange" :page-size="pageSize" :page-size-opts="pageOpts" show-total show-elevator show-sizer></Page>
        
    </div>
</template>
<script>
import AssetExpand from './AssetComponent/AssetExpand.vue'
export default {
    name:'page_194',
    data () {
        return {
            // 分页状态
            pageSize:30,
            totalSize:null,
            pageNum:1,
            pageOpts:[30,40,50],
            
       
            loading:false,
            formValidate: {
                id: '',
                vcDisplayName: '',
                vcEmail: '',
                vcPassword: '',
                vcRemark: ''
            },
            dialogTitle:'新建',
            modalShow: false,
            tableHeight:0,
            userName:'',
            placeholder:'请输入用户名称',
            columns: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(AssetExpand, {
                            props: {
                                row: params.row
                            },
                            on: {
                                    sumbitSuccess: () => {
                                            this.selectAssetInfo()
                                        }
                                    }
                        })
                    }
                },
                {
                    title: '账户编号',
                    key: 'lFundId',                   
                },
                {
                    title: '账户名称',
                    key: 'vcFundName',                   
                },
                {
                    title: '资产单元编号',
                    key: 'id'
                },
                {
                    title: '资产单元名称',
                    key: 'vcAssetName'
                },
                {
                    title: '托管行编号',
                    key: 'lCustodianNo',
                    
                },
                {
                    title: '银行账号',
                    key: 'vcBankAccount',
                    
                },
                 {
                    title: '流动性模式',
                    key: 'vcLiquidModeName'
                },
                  {
                    title: '状态',
                    key: 'vcAssetStatusName',
                },
                 {
                    title: '是否资金池单元',
                    key: 'vcCashPoolName',
                },
               
                {
                    title: '是否有效',
                    key: 'vcIsValidName',
                    render:(h,params) => {
                            let self = this;
                            if(params.row.cIsValid == '1'){
                                return h('span', '有效')
                            }else{
                                return h('span', '无效')
                            } 
                        }
                },
               
                {
                    title: '修改时间',
                    key: 'tsModifyTime'
                },
                {
                    title: '备注',
                    key: 'vcRemarks'
                }
            ],
            data: []
        }
    },
    created(){
        this.selectAssetInfo();
    },
    mounted(){
        this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height;
        window.addEventListener('resize', () => {//动态调整高度
            this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height;
        })
    },
    methods: {
        getTableHeight(){
            this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height - 30;
        },
       
        //页码改变时的回调
        pageNumChange (page){
            this.pageNum = page;
            this.selectAssetInfo();
        },
        //每页数据条数改变时的回调
        pageSizeChange (pageSize){
            this.pageSize = pageSize;
            this.selectAssetInfo();
        },
        //获取资产单元信息列表
        selectAssetInfo(){
            this.$httpGet(`/asset/selectAssetInfos?pageNum=${this.pageNum}&pageSize=${this.pageSize}`).then((res) => {
                this.loading=true;
                this.totalSize = res.data.total;
                this.data=res.data.list;
                this.loading=false;
               
            })
        },
        create(){
            //alert('新建')
            //this.modalShow=true;
            //this.$refs[name].resetFields();
        },
        refresh(){
            this.pageNum = 1;
            this.selectAssetInfo();
        }
        
    },
    components:{
        AssetExpand
    }
    
}
</script>
<style scoped>
    /*table相关样式*/
    .table-wrapper-height,.ivu-table-wrapper{/*table高度*/
        /* height:calc(100vh - 165px); */
        height: 100%;
    }
    .table-wrapper,.table-wrapper .ivu-table-wrapper{
        height: calc(100% - 43px);
    }
</style>


