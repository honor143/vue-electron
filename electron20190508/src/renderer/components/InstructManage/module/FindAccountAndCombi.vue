<template>
    <Row class="wrapper" :gutter="10">
        <Col span="12" class="tree-wrapper-height">
            <div class="func-wrapper">
                <span class="section-title">账户列表</span>               
                <label for="">&nbsp;筛选:</label>
                <Input class="section-search" size="small" @on-change="selectUserPermissionFund" v-model="accountName" placeholder="账户名或首字母" clearable style="width:100px;"/>
                
            </div>
            <Table stripe highlight-row :columns="fundListColumns" @on-current-change="fundCurrentRow" :height="tableHeight" :data="fundList"></Table>
             <!-- @on-change="pageNumChange" -->
            <Page size="small" :current="fundPageNum" @on-change="selectUserPermissionFund" :page-size="30"  show-elevator ></Page>
        </Col>
       
        <Col span="12" class="tree-wrapper-height">
            <div class="func-wrapper">
                <span class="section-title">组合列表</span>
                <label for="">&nbsp;筛选:</label>
                <Input class="section-search" size="small" @on-change="selectUserPermissionCombi" v-model="combiName" placeholder="组合名或首字母" clearable style="width:100px;"/>
            </div>
            <Table  stripe highlight-row ref="selection" @on-current-change="combiCurrentRow" @on-selection-change="selectCombiItem" :data="combiList" :columns="combiListColumns" :height="tableHeight"></Table>
            <Page size="small" :current="combiPageNum" @on-change="selectUserPermissionCombi" :page-size="30"  show-elevator ></Page>
        </Col>
       
    </Row>
</template>
<script>
//import UpdateTree from '../busitree/index.js'


export default {
   
    data () {
        return {
            accountName:'',
            combiName:'',
            tableHeight:500,
            fundListColumns: [
                {
                    title: '账户',
                    key: 'vcName',
                    tooltip:true,
                    minWidth:50
                }
            ],
            combiListColumns: [
                // {
                //     type: 'selection',
                //     width: 30,
                //     align: 'left'
                // },
                {
                    title: '组合名称',
                    key: 'vcName',
                    tooltip:true,
                    minWidth:50
                }      
            ],
            fundList:[],
            combiList:[],
            fundPageNum:1,
            combiPageNum:1,
            selectionCombi:null,
            currentRow:null,
            combiCurrent:null
           
        }
    },  
    created(){
        this.selectUserPermissionFund();
        this.selectUserPermissionCombi();
    },
    computed:{
       
    },
    mounted(){
      
    },
    methods: {
        selectUserPermissionFund(){
            
            this.$httpGet('/bondChange/selectUserPermissionFund',{pageNum :this.fundPageNum,pageSize:30,vcFundName:this.accountName}).then((res) => {
                this.fundList = res.data.list;
                // this.editAccountModel = true;
            })
        },
        selectUserPermissionCombi(){
              if(this.currentRow){
                this.$httpGet('/bondChange/selectUserPermissionCombi',{pageNum :this.combiPageNum,pageSize:30,lFundId:this.currentRow.id,vcCombiName:this.combiName}).then((res) => {
                    this.combiList = res.data.list;
                })
              }
        },
        selectCombiItem(selection){
            this.selectionCombi = selection;
        },
        fundCurrentRow(current){
            this.combiCurrent = null;
            this.currentRow = current
            this.selectUserPermissionCombi();
        },
        combiCurrentRow(current){
            this.combiCurrent = current;
        },
        // 提交修改的组合
        submitCombi(){
            if(this.combiCurrent){
                this.$emit('editfundandcombi',{fundCurrent:this.currentRow,combiCurrent:this.combiCurrent})
            }else{
                this.$emit('nocombi')
                this.$Message.warning('请高亮一行指令后确定！')
            }
        }
    }
}
</script>
<style scoped>
    .wrapper{
        height: 100%;
    }
    /*tree高度*/
    .tree-wrapper-height,.table-wrapper-height{
        height:100%;
    }
    .tree-wrapper{
        overflow-y: auto;
    }
    .center-table{
        height:calc(100% - 63px);
    } 
    .center-table .ivu-table-wrapper{
        height: 100%;
    }
    /* modal body高度 */
    .modals >>> .ivu-modal-body{
        height:440px;
    }
    .modals >>> .ivu-modal-body .ivu-transfer-list-header{
        background: #212121;
    }
    /* transfer样式 */
    .ivu-transfer{
        width:482px;
        margin:20px auto;
    }
    .ivu-transfer-list span{
        color:#FFEC8B;
    }
    /* 取消页面前的checkbox */
    .tree-wrapper >>> .ivu-tree>.ivu-tree-children>li>label.ivu-checkbox-wrapper{
        display: none;
    }

    /* 修改权限时的poptip高度 */
    .ivu-tree>>>.ivu-poptip-inner{
        width:160px;
        /* height: 120px; */
        background-color: rgb(39,41,44);
    }
    .ivu-tree>>>.ivu-poptip-inner .ivu-poptip-body{
        text-align: center;
        height: calc(100% - 34px);
    }
    .ivu-tree>>>.ivu-poptip-inner .ivu-poptip-body .ivu-poptip-body-content{
        white-space: pre-wrap;
    }
    .ivu-tree>>>.ivu-poptip-inner .ivu-poptip-body .ivu-icon.ivu-icon-ios-help-circle{
        display: none;
    }
    .ivu-tree>>>.ivu-poptip-inner .ivu-poptip-body .ivu-poptip-confirm .ivu-poptip-body-message{
        padding-left: 14px!important;
    }

    /* table中select边距 */
    .table-wrapper >>> .ivu-table .ivu-table-cell .ivu-select {
        margin: 1px!important;
    }
</style>


