<template>
    <div class="table-wrapper-height wrapper">
        <!--<div class="func-wrapper">
             <label for="">&nbsp;筛选:&nbsp;</label>
            <Input class="section-search" size="small" v-model="userName" :placeholder="placeholder" clearable @on-change="selectUserInfo"/> 
            <ButtonGroup>
                <Button type="primary" size="small" @click="refresh">刷新</Button>
            </ButtonGroup>
        </div>-->
        <div class="table-wrapper" ref="tableWrap">
            <Table :loading="loading" type='expand' stripe highlight-row ref="selection" @on-expand="tableExpand" :height="tableHeight" :columns="columns" :data="data"></Table>
        </div>
        <Page size="small" :total="totalSize" :current="pageNum" @on-page-size-change="pageSizeChange" @on-change="pageNumChange" :page-size="pageSize" :page-size-opts="pageOpts" show-total show-elevator show-sizer></Page>
        <!--<Modal
            width="800"
            v-model="modalShow"
            :title="dialogTitle"
            @on-ok="ok('formValidate')"
            @on-cancel="cancel('formValidate')">
            <EditAccount v-if="modalShow" :rowData="rowData" ref="editAccount"></EditAccount>
        </Modal>-->
    </div>
</template>
<script>

// import EditAccount from './EditAccount.vue'
import AccountExpend from './AccountComponent/AccountExpend.vue'
export default {
    name:'page_193',
    data () {
        return {
            //账户细类字典数据
            dicFundType2List:[],
            dicFundOperation:[],
            dicFundEquity:[],
            dicFundFixIncome:[],
            //主托管行编号字典
            lCustodianNo:[],

            pageSize:30,
            totalSize:null,
            pageNum:1,
            pageOpts:[30,40,50],
            timer:null,
            loading:false,
            
            dialogTitle:'修改',
            // modalShow: false,
            rowData:null,
            tableHeight:0,
            userName:'',
            placeholder:'请输入用户名称',
            columns: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(AccountExpend, {
                            props: {
                                dicFundType2List:this.dicFundType2List,
                                dicFundOperation:this.dicFundOperation,
                                dicFundEquity:this.dicFundEquity,
                                dicFundFixIncome:this.dicFundFixIncome,
                                custodianNo:this.lCustodianNo,
                                row: params.row
                            },
                            on: {
                                    sumbitSuccess: () => {
                                            this.selectAccountInfo()
                                        }
                                    }
                        })
                    }
                },
                {
                    title: '账户编号',
                    key: 'id',
                    minWidth:75,
                    ellipsis:true
                },
                {//只显示
                    title: '账户简称',
                    key: 'vcFundName',
                    minWidth:130,
                    ellipsis:true,
                    tooltip:true
                },
                 {
                    title: '账户全称',
                    key: 'vcFundCaption',
                    minWidth:160,
                    ellipsis:true,
                    tooltip:true

                },
                // {//只显示
                //     title: '账户代码',
                //     key: 'vcFundCode',
                //     minWidth:75

                // },
                {
                    title: '账户大类',
                    key: 'vcFundType1',
                    minWidth:60
                },
                {
                    title: '账户细类',
                    key: 'vcFundType2',
                    minWidth:100
                },
                // {
                //     title: '险种信息',
                //     key: 'vcInsurInfo',
                //     minWidth:75
                // },
                {
                    title: '账户运营类型',
                    key: 'vcOperationType',
                    minWidth:100
                },
                 {
                    title: '账户权益类型',
                    key: 'vcEquityType',
                    minWidth:100
                },
                 {
                    title: '账户固收类型',
                    key: 'vcFixincomeName',
                    minWidth:100
                },
                // {//只显示
                //     title: '本币币种',
                //     key: 'vcCurrencyNo',
                //     minWidth:75
                // },
                // {
                //     title: 'TA账户代码',
                //     key: 'vcFundCodeTa',
                //     minWidth:75
                // },
                {
                    title: '主托管行',
                    key: 'vcBankName',
                    minWidth:85
                },
                // {   //只显示
                //     title: '银行间托管账号',
                //     key: 'vcBankAccount',
                //     minWidth:100
                // },
                // {//只显示
                //     title: '上清所托管账号',
                //     key: 'vcShclearingAccount',
                //     minWidth:100
                // },
                {
                    title: '是否有效',
                    key: 'cIsValid',
                    minWidth:60,
                    render:(h,params) => {
                            let self = this;
                            if(params.row.cIsValid == '1'){
                                return h('span', '有效')
                            }else{
                                return h('span', '无效')
                            } 
                        }
                },
                // {
                //     title: '年金类型',
                //     key: 'vcAnnuityTypeName',
                //     minWidth:75
                // },
                {
                    title: '上交所主席位',
                    key: 'vcMainSeatSh',
                    minWidth:85
                },
                {
                    title: '深交所主席位',
                    key: 'vcMainSeatSz',
                    minWidth:85
                },
                {
                    title: '投资管理人',
                    key: 'vcInvestManager',
                    minWidth:85
                },
                // {
                //     title: '生效日期',
                //     key: 'vcInvestManager',
                //     minWidth:75
                // },
                // {
                //     title: '清算开始日期',
                //     key: 'lBeginDate',
                //     minWidth:85
                // },
                // { //只显示
                //     title: '成立日期',
                //     key: 'lOpenDate',
                //     minWidth:75
                // },
                // { //只显示
                //     title: '结束日期',
                //     key: 'lEndDate',
                //     minWidth:75
                // },
                // {   //只显示
                //     title: '资金头寸控制点',
                //     key: 'vcCashControlPointName',
                //     minWidth:100
                // },
                // {//只显示
                //     title: '证券控制点',
                //     key: 'vcStockControlPointName',
                //     minWidth:75
                // },
                {
                    title: '资金来源类型',
                    key: 'cInvestSourceType',
                    minWidth:85,
                    render:(h,params) => {
                            let self = this;
                            if(params.row.cIsValid == '1'){
                                return h('span', '泰康')
                            }else{
                                return h('span', '非泰康')
                            } 
                           
                        }
                },
                {
                    title: '是否自动合规检查',
                    key: 'cAutoCompliance',
                    minWidth:110,
                    render:(h,params) => {
                            let self = this;
                            if(params.row.cIsValid == '0'){
                                return h('span', '否')
                            }else{
                                return h('span', '是')
                            } 
                           
                        }
                },
                {
                    title: '是否后端集合',
                    key: 'cIsBackIntegration',
                    minWidth:110,
                    render:(h,params) => {
                            let self = this;
                            if(params.row.cIsValid == '0'){
                                return h('span', '否')
                            }else{
                                return h('span', '是')
                            } 
                           
                        }
                },
                // {//只显示
                //     title: '默认会计分类',
                //     key: 'vcInvestTypeName',
                //     minWidth:85
                // },
                {
                    title: '备注',
                    key: 'vcRemarks',
                    minWidth:75,
                    ellipsis:true,
                    tooltip:true
                },
                // {
                //     title: '修改时间',
                //     key: 'tsModifyTime',
                //     minWidth:75
                // }
                // {
                //     title: '操作',
                //     key: 'setting',
                //     align: 'center',
                    
                //     minWidth:100,
                //     fixed: 'right',
                //     render: (h, params) => {
                //         return h('div', [
                //             h('Button', {
                //                 props: {
                //                     type: 'primary',
                //                     size: 'small'
                //                 },
                //                 style: {
                //                     marginRight: '5px'
                //                 },
                //                 on: {
                //                     click: () => {
                //                         this.showModal(params.row)
                //                         // console.log("编辑")
                //                         // console.log(this)
                                        
                //                     }
                //                 }
                //             }, '编辑'),
                //             h('Button', {
                //                 props: {
                //                     type: 'error',
                //                     size: 'small'
                //                 },
                //                 on: {
                //                     click: () => {
                //                         this.remove(params.index)
                //                     }
                //                 }
                //             }, '删除')
                //         ]);
                //     }
                // }
            ],
            data: []
        }
    },
    created(){
        this.selectDicFundType2();
        this.selectDicFundOperation();
        this.selectDicFundEquity();
        this.selectDicFundFixIncome();
        this.selectCustodianNo();
        this.selectAccountInfo();
    },
    mounted(){
        this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height;
        window.addEventListener('resize', () => {//动态调整高度
            this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height;
        })
    },
    methods: {
        getTableHeight(){
            this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height;
        },
        
        create(){
            //alert('新建')
            // this.modalShow=true;
            // this.$refs[name].resetFields();
        },

        refresh(){
            this.pageNum = 1;
            this.selectAccountInfo()
        },
        edit(){
        //    this.modalShow=true;
        },
        save(){
            
        },
        cancel(){
            
        },
        // showModal(rowData){
        //     this.rowData = rowData;
        //     this.modalShow = true;
        // },
        // ok(name) {
        //     console.log(name)
        //     this.$refs.editAccount.submit();
        // },
        cancel(name) {
            //this.$Message.info('Clicked cancel');
            // this.$refs[name].resetFields();
        },
        //页码改变时的回调
        pageNumChange (page){
            this.pageNum = page;
            this.selectAccountInfo();
        },
        //每页数据条数改变时的回调
        pageSizeChange (pageSize){
            this.pageSize = pageSize;
            this.selectAccountInfo();
        },
        //请求账户信息列表
        selectAccountInfo(){
            this.$httpGet(`/fixedIncome/selectFundInfos?pageNum=${this.pageNum}&pageSize=${this.pageSize}`).then((res) => {
                this.loading=true;
                this.totalSize = res.data.total;
                this.data=res.data.list;
                this.loading=false;
            })
        },
        // 请求账户细类
         selectDicFundType2(){
            this.$httpGet('/dic/selectDicFundType2s').then((res) => {
                console.log(res.data)
                this.dicFundType2List= res.data;
            })
        },
        // 请求运营类型
         selectDicFundOperation(){
            this.$httpGet('/dic/selectDicFundOperation').then((res) => {
                console.log(res.data)
                this.dicFundOperation= res.data;
            })
        },
        // 请求账户权益类型
        selectDicFundEquity(){
            this.$httpGet('/dic/selectDicFundEquity').then((res) => {
                console.log(res.data)
                this.dicFundEquity= res.data;
            })
        },
        //请求账户固收类型
        selectDicFundFixIncome(){
            this.$httpGet('/dic/selectDicFundFixincome').then((res) => {
                console.log(res.data)
                this.dicFundFixIncome= res.data;
            })
        },
        // 请求主托管行编号字典
        selectCustodianNo(){
            this.$httpGet('/dic/selectCustodianNo').then((res) => {
                // console.log(res.data)
                this.lCustodianNo= res.data;
            })
        },
        tableExpand(row, status){
            console.log(status);
        }
    },
    components:{
        // EditAccount,
        AccountExpend
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


