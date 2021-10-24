<template>
    <Row class="wrapper" :gutter="5">
        <Col span="8" class="table-wrapper-height">
            <div class="func-wrapper bg-none2">
                <span class="section-title">系统组合信息</span>
                <label for="">&nbsp;筛选:&nbsp;</label><Input class="section-search" size="small" v-model="userName"  :placeholder="userNamePh" clearable @on-change="selectCombiInfo"/>
            </div>
            <div class="table-wrapper" ref="tableWrap">
                <Table stripe highlight-row ref="userInfo" :loading="sysLoading" :columns="combiInfoColumns" @on-current-change="singleSelect" :data="combiInfoData" :height="tableHeight"></Table>
            </div>
            <!-- <Page :total="totalSize" size="small" :current="pageNum" @on-page-size-change="pageSizeChange" @on-change="pageNumChange" :page-size="pageSize" :page-size-opts="pageOpts" show-elevator ></Page> -->
            <Page size="small" :page-size="40" :current="pageNum" :total="totalSize" @on-change="pageNumChange" simple />
        </Col>
        <Col span="7" class="table-wrapper-height">
            <div class="func-wrapper bg-none2">
                <span class="section-title">系统组合-GP3组合</span>
            </div>
            <div class="table-wrapper">
                <Table stripe highlight-row ref="sysTable" :loading="sysGp3Loading" :columns="sysColumns" :data="sysData" @on-selection-change="selectedCombiRow" :height="tableHeight"></Table>
            </div>
        </Col>
        <Col span="2" class="table-wrapper-height">
            <div class="transfer-btn-wrapper">
                <Button type="primary" @click="giveRight"><</Button>
                <br><br>
                <Button type="primary" @click="cancleRight">></Button>
            </div>
        </Col>
        <Col span="7" class="table-wrapper-height">
            <div class="func-wrapper bg-none2">
                <span class="section-title">非系统组合-GP3组合</span>
                <label for="">&nbsp;筛选:&nbsp;</label><Input size="small" class="section-search" v-model="branchName" :placeholder="branchNamePh" clearable @on-change="selectNoGP3Combi"/>
            </div>
            <div class="table-wrapper">
                <Table stripe highlight-row ref="noSysTable" :loading="nosysGp3Loading" :columns="noSysColumns" :data="noSysDataList" @on-selection-change="selectedNoCombiRow" :height="tableHeight"></Table>
            </div>
            <!-- <Page :total="GP3totalSize" size="small" :current="GP3pageNum" @on-page-size-change="GP3pageSizeChange" @on-change="GP3pageNumChange" :page-size="GP3pageSize" :page-size-opts="GP3pageOpts"  ></Page> -->
            <!--<Page simple :current="GP3pageNum"  @on-change="GP3pageNumChange" ></Page>-->
            <Page size="small" :page-size="40" :current="GP3pageNum" :total="GP3totalSize" @on-change="GP3pageNumChange" simple />
        </Col>
    </Row>
</template>
<script>
export default {
    name:'page_192',
    data () {
        return {
            sysLoading:false,
            sysGp3Loading:false,
            nosysGp3Loading:false,
            tableHeight:500,
            //组合分页数据
            pageSize:40,
            totalSize:null,
            pageNum:1,
            pageOpts:[30,40,50],
             //GP3组合分页数据
            GP3pageSize:40,
            GP3totalSize:null,
            GP3pageNum:1,
            GP3pageOpts:[30,40,50],

            //组合对应gp3组合选中list
            selectArr:[],
            //组合不对应gp3组合选中list
            selectNotArr:[],

            combiId:'',

            userName:'',
            userNamePh:'组合名称',
            branchName:'',
            branchNamePh:'GP3组合名称',
            combiInfoColumns: [
                {
                    title: '账户名称',
                    key: 'vcFundName'
                },
                {
                    title: '组合编号',
                    key: 'lCombiId'
                },
                {
                    title: '组合名称',
                    key: 'vcCombiName'
                },
                {
                    title: '组合状态',
                    key: 'vcCombiStatusName'
                },
                // {
                //     title: '备注',
                //     key: 'vcRemarks'
                // }
            ],
            combiInfoData: [],
            sysColumns: [
                {
                    type: 'selection',
                    width: 50,
                    align: 'left'
                },
                {
                    title: 'GP3组合名称',
                    key: 'vcPortNameGp3'
                },
                {
                    title: '是否有效',
                    key: 'cIsValid',                    
                    render: (h, params) => {
                        if(params.row.cHasData == 0 ){
                            return h('div','无效')
                        }else{
                            return h('div','有效')
                        }
                    }
                },
                // {
                //     title: '备注',
                //     key: 'vcRemarks'
                // }
            ],
            sysData: [],
            noSysDataList: [],
            noSysColumns: [
                {
                    type: 'selection',
                    width: 50,
                    align: 'left'
                },
                {
                    title: 'GP3组合名称',
                    key: 'vcPortNameGp3'
                },
                {
                    title: '是否有效',
                    key: 'cIsValid',
                    render: (h, params) => {
                        if(params.row.cHasData == 0 ){
                            return h('div','无效')
                        }else{
                            return h('div','有效')
                        }
                    }
                },
                // {
                //     title: '备注',
                //     key: 'vcRemarks'
                // }
            ],
            
        }
    },
    created(){
        this.selectCombiInfo();
    },
    mounted(){
        this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height;
        window.addEventListener('resize', () => {//动态调整高度
            this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height;
        })
    },
    methods: {
         //‘组合对应GP3组合’选项改变时触发
        selectedCombiRow(selection){
            this.selectArr=[];
            for(let i in selection){
                this.selectArr.push(selection[i].vcPortCodeGp3); 
            }
        },
        //‘组合不对应GP3组合’选项改变时触发
        selectedNoCombiRow(selection){
            console.log(selection)
            this.selectNotArr=[];
            for(let i in selection){
                this.selectNotArr.push(selection[i].vcPortCodeGp3); 
            }   
            console.log(this.selectNotArr)         
        },
        //添加对应GP3组合
        giveRight(){
            let ids=[];
            ids=this.selectNotArr;
            if(this.selectNotArr.length<1){
                this.$Message.warning("请选择要对应的恒生用户");
            }else{
                this.$httpPost('/cmg/saveTPortCombiMapGp3',{lCombiId:this.combiId,branches:ids})
                    .then((res)=>{
                        if(res.data.actionResult==1){
                            this.$Message.success(res.data.data);
                            this.selectGP3Combi();
                            this.selectNoGP3Combi();
                            this.selectNotArr=[];
                        }else{
                            this.$Message.warning(res.data.data);
                        }
                    })
                    .catch(err => console.log('错误信息为:'+err))
            }
        }, 
         //删除对应GP3组合
        cancleRight(){
            let ids=[];
            ids=this.selectArr;
            if(this.selectArr.length<1){
                this.$Message.warning("请选择要取消的恒生用户");
            }else{
                this.$httpPost('/cmg/deleteTPortCombiMapGp3',{lCombiId:this.combiId,branches:ids})
                    .then((res)=>{
                        if(res.data.actionResult==1){
                            this.$Message.success(res.data.data);
                            this.selectGP3Combi();
                            this.selectNoGP3Combi();
                            this.selectArr=[];
                        }else{
                            this.$Message.warning(res.data.data);
                        }
                    })
                    .catch(err => console.log('错误信息为:'+err))
            }
        },
        //单选用户行高亮时，获取userID
        singleSelect(currentRow,oldCurrentRow){
            console.log("当前选中行"+currentRow.id);
            this.combiId=currentRow.id;
            this.selectNoGP3Combi();
            this.selectGP3Combi();
        },

          //查询非系统组合对应gp3组合
        selectNoGP3Combi(){
            this.nosysGp3Loading=true;
            this.$httpGet(`/cmg/selectFPortCombiMapGp3s?lCombiId=${this.combiId}&pageNum=${this.GP3pageNum}&pageSize=${this.GP3pageSize}&fVcPortNameGp3=${this.branchName}`)
                .then((res) => {
                    console.log(res.data);                
                    if(res.data){
                        this.GP3totalSize = res.data.total;
                        this.noSysDataList = res.data.list;
                        this.nosysGp3Loading=false;
                    }                
                })
        },
        //查询系统组合对应gp3组合
        selectGP3Combi(){
            this.sysGp3Loading=true;
            this.$httpGet(`/cmg/selectTPortCombiMapGp3s?lCombiId=${this.combiId}`)
                .then((res) => {
                    if(res.data){
                        this.sysData=res.data;
                        this.sysGp3Loading=false;
                    }                
                })
        },

         //GP3页码改变时的回调
        GP3pageNumChange (page){
            
            this.GP3pageNum = page;
            this.selectNoGP3Combi();
        },
        //GP3每页数据条数改变时的回调
        GP3pageSizeChange (pageSize){
            this.GP3pageSize = pageSize;
            this.selectNoGP3Combi();
        },


        //页码改变时的回调
        pageNumChange (page){
            this.pageNum = page;
            this.selectCombiInfo();
        },
        //每页数据条数改变时的回调
        pageSizeChange (pageSize){
            this.pageSize = pageSize;
            this.selectCombiInfo();
        },
        //获取系统组合信息信息列表
        selectCombiInfo(){
            this.sysLoading=true;
            this.$httpGet(`/combi/selectCombis?pageNum=${this.pageNum}&pageSize=${this.pageSize}&vcCombiName=${this.userName}`).then((res) => {
                this.loading=true;
                this.totalSize = res.data.total;
                this.combiInfoData=res.data.list;
                this.sysLoading=false;
            })
        }
    }
}
</script>
<style scoped>
.wrapper{
    height:100%;
}
/*tree高度*/
.tree-wrapper-height{
    height:100%;
}   
    .table-wrapper-height{
    height:100%;
} 
.table-wrapper{
    height:calc(100% - 71px);
}

</style>


