<template>
    <Row class="wrapper" :gutter="5">
        <Col span="9" class="tree-wrapper-height">
            <div class="func-wrapper bg-none2">
                <span class="section-title">数据权限</span>
                <label for="">&nbsp;筛选:&nbsp;</label>
                <Input class="section-search" size="small" @on-change="selectDataRightTable('2')" v-model="accountName" placeholder="账户名或首字母" clearable style="width:100px;"/>
                <Button :disabled="btnDisabled" type="primary" size="small" @click="saveRight">保存</Button>
            </div>
            <div class="table-wrapper center-table" ref="tableWrap">
                <Table :loading="loadingRight"  stripe ref="selection" @on-selection-change="getSelectedRight" :columns="dataRightColumns" :data="tableDataRight" :height="tableHeight"></Table>
            </div>
            <Page size="small" :page-size="40" :current="pageNumRight" :total="totalSizeRight" @on-change="pageNumChangeRight" simple />
        </Col>
        <Col span="6" class="table-wrapper-height">
            <div class="func-wrapper bg-none2">
                <span class="section-title">部门信息</span>
                <label for="">&nbsp;筛选:&nbsp;</label><Input class="section-search" size="small" v-model="branchName" :placeholder="placeholder" clearable @on-change="selectTAuthDepartInfos(pageNum)"/>
            </div>
            <div class="table-wrapper center-table" ref="tableWrap">
                <Table stripe highlight-row ref="selection" :loading="tableLoading" :columns="tableColumns" :data="tableData" @on-current-change="singleSelect" :height="tableHeight"></Table>
            </div>
            <Page size="small" :page-size="40" :total="totalSize" :current="pageNum" @on-change="pageNumChange" simple></Page>
        </Col> 
        <Col span="9" class="tree-wrapper-height">
            <div class="func-wrapper bg-none2">
                <span class="section-title">已有数据权限</span>                
                <!-- <Input class="section-search" size="small" @on-change="selectDataHasRightTable('2')" v-model="accountName2" placeholder="账户名或首字母" clearable style="width:100px;"/> -->
                <Button :disabled="btnDisabled" type="primary" size="small" @click="delRight">删除</Button>
            </div>
            <div class="table-wrapper center-table" ref="tableWrap">
                <Table :loading="loadingHasRight"  stripe highlight-row ref="selection" @on-selection-change="getSelectedHasRight" :columns="hasDataRightColumns" :data="tableDataHasRight" :height="tableHeight"></Table>
            </div>
            <Page size="small" :page-size="40" :current="pageNumHasRight" :total="totalSizeHasRight" @on-change="pageNumChangeHasRight" simple />
        </Col>       
    </Row>
</template>
<script>
//import UpdateTree from '../busitree/index.js'
//import DatarightTree from '../menutree2/index.js'
import DatarightTree from '../datarighttree/index.js'
import DatarightTreeTwo from '../datarighttree2/index.js'
import { connect } from 'net';
export default {
    name:'page_189',
    data () {
        return {
            //账户名称或首字母
            accountName:'',
            //账户名称或首字母
            accountName2:'',
            //tree加载状态
            leftTreePageNum:1,
            //加载状态
            btnDisabled:false,
            tableHeight:0,
            //保存数据对象
            selectedObj:{},
            //所有半选的数组
            indeterminateItemArr:[],
            //包含所有checked项的数组
            selectItemArr:[],
            branchId:-10,
            //账户、资产单元、组合类型
            types:1,
            //选中项tree的item的id
            selectedId:1,
            //分页数据
            pageSize:40,
            totalSize:null,
            pageNum:1,
            branchName:'',
            placeholder:'请输入部门名称',
            tableLoading:false,
            tableColumns: [
                // {
                //     type: 'selection',
                //     width: 50,
                //     align: 'left'
                // },
                {
                    title: '部门名称',
                    key: 'vcDepartName',
                    minWidth:130                   
                },
                {
                    title: '部门类型',
                    key: 'vcDepartTypeName',
                    minWidth:120
                },
                // {
                //     title: '上级部门名称',
                //     key: 'vcParentDepartName',
                //     minWidth:120
                // },
                // {
                //     title: '状态',
                //     key: 'vcStatusName',
                //     minWidth:120
                // },
                // {
                //     title: '创建时间',
                //     key: 'tsCreateTime'
                // },
                // {
                //     title: '修改时间',
                //     key: 'tsModifyTime'
                // }
            ],
            tableData: [
               
            ],
            treeData: [],
            hasRightTreeData:[],  
            //新改内容  
            //数据权限对应信息
            totalSizeRight:null,
            pageNumRight:1,
            tableDataRight:[],
            loadingRight:false,
            selectedRight:[],  
            dataRightColumns: [
                {
                    type: 'selection',
                    width: 30,
                    align: 'left'
                },
                {
                    title: '账户',
                    key: 'vcFundName',
                    tooltip:true,
                    minWidth:50
                },
                {   
                    title: '资产单元',
                    key: 'vcAssetName',
                    tooltip:true,
                    minWidth:70
                },
                {
                    title: '组合',
                    key: 'vcCombiName',
                    tooltip:true,
                    minWidth:50
                },        
            ],
            //非数据权限对应信息   
            totalSizeHasRight:null,
            pageNumHasRight:1,      
            tableDataHasRight:[],
            loadingHasRight:false,
            selectedHasRight:[],                  
            hasDataRightColumns: [
                {
                    type: 'selection',
                    width: 30,
                    align: 'left'
                },
                {
                    title: '账户',
                    key: 'vcFundName',
                    tooltip:true,
                    minWidth:50
                },
                {   
                    title: '资产单元',
                    key: 'vcAssetName',
                    tooltip:true,
                    minWidth:70
                },
                {
                    title: '组合',
                    key: 'vcCombiName',
                    tooltip:true,
                    minWidth:50
                }        
            ]
        }
    },
    computed:{
        treeHeight(){
            return this.tableHeight + 32;
        }
    },
    created(){
        //this.selectDataRightTable();
        this.selectTAuthDepartInfos();
    },
    mounted(){
        this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height;
        window.addEventListener('resize', () => {//动态调整高度
            this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height;
        })
    },
    methods: {
        //保存部门权限
        saveRight(){
            if(this.selectedRight.length<1){
                this.$Message.warning("请选择数据权限！");
            }else{
                //console.log(this.selectItemArr);
                if(this.branchId==-10 || this.branchId==null || this.branchId==undefined){//若没选择用户
                    this.$Message.warning("请选择要授权的部门！");
                }else{//若已选择用户
                    this.$httpPost('/omd/saveTPortO3MapDept',{"permisList":this.selectedRight,"lDeptId":this.branchId})
                        .then((res)=>{
                            if(res.data.actionResult==1){
                                this.$Message.success(res.data.data);
                                this.selectDataRightTable();
                                this.selectDataHasRightTable();
                            }else{
                                this.$Message.warning(res.data.data);
                            }
                        })
                        .catch(err => console.log('错误信息为:'+err))
                }
            }
        },
        //删除部门权限
        delRight(){
            if(this.selectedHasRight.length<1){
                this.$Message.warning("请选择数据！");
            }else{
                if(this.branchId==-10 || this.branchId==null || this.branchId==undefined){//若没选择用户
                    this.$Message.warning("请选择要授权部门！");
                }else if(this.selectedHasRight.length<1){
                    this.$Message.warning("请选择要删除的数据！");
                }else{//若已选择用户
                    // this.$httpPost('/omm/savePageTPortO3MapManager',{"list":this.treeData,"tPortO3MapInfoVo":{"pageBranches":this.selectItemArr,"halfPageBranches":this.indeterminateItemArr,"vcUserId":this.userId}})
                    this.$httpPost('/omd/deleteTPortO3MapDept',{"permisList":this.selectedHasRight,"lDeptId":this.branchId})
                        .then((res)=>{
                            if(res.data.actionResult==1){
                                this.$Message.success(res.data.data);
                                this.selectDataRightTable();
                                this.selectDataHasRightTable();
                            }else{
                                this.$Message.warning(res.data.data);
                            }
                        })
                        .catch(err => console.log('错误信息为:'+err))
                }
            }
        },
        //单选用户行高亮时，获取userID
        singleSelect(currentRow,oldCurrentRow){            
            this.branchId=currentRow.id;
            //查询所有权限
            this.selectDataRightTable();
            //查询部门已有权限
            this.selectDataHasRightTable();
        },
         //页码改变时的回调
        pageNumChange (page){
            this.pageNum = page;
            this.selectTAuthDepartInfos();
        },       
        // 查询部门列表(若通过搜索框实现查询则将pageNum设置为1)
        selectTAuthDepartInfos(pageNum){
            let pageNumber=this.pageNum;
            if(pageNum){
                pageNumber=1
            }else{
                pageNumber=this.pageNum;
            }
            this.tableLoading=true;
            this.$httpGet(`/omd/selectTAuthDepartInfos?pageNum=${pageNumber}&pageSize=${this.pageSize}&vcDepartName=${this.branchName}`).then((res) => {
                this.totalSize = res.data.total;
                this.tableData=res.data.list;
                this.tableLoading=false;
               
            })
        },

        //新改内容
        //左侧
        //获取左侧表格选中项
        getSelectedRight(selection){
            this.selectedRight=selection;
            console.log(selection);
        },         
        //页码改变时的回调
        pageNumChangeRight (page){
            this.pageNumRight = page;
            this.selectDataRightTable();
        }, 
        //获取"数据权限"表格
        selectDataRightTable(pageNum){
            console.log(this.branchId==undefined);
            if(this.branchId==-10 || this.branchId==null || this.branchId==undefined){
                this.$Message.warning("请选择部门！");
            }else{
                let pageNumber=this.pageNumRight;
                if(pageNum){
                    pageNumber=1
                }else{
                    pageNumber=this.pageNumRight;
                }
                this.loadingRight=true;
                //var url = `/user/selectUsers?pageNum=${pageNumber}&pageSize=${this.pageSize}&vcDisplayName=${this.userName}`;
                this.$httpGet(`/omd/selectDeptNotHavePermissions`,{pageNum:pageNumber,vcFundName:this.accountName.toUpperCase(),lDeptId:this.branchId}).then((res) => {          
                    this.totalSizeRight = res.data.total;
                    this.tableDataRight=res.data.list;
                    this.loadingRight=false;
                })
            }
        },
        //右侧     
        //获取右侧表格选中项
        getSelectedHasRight(selection){
            this.selectedHasRight=selection;
            console.log(selection);
        },       
        //页码改变时的回调
        pageNumChangeHasRight (page){
            this.pageNumHasRight = page;
            this.selectDataHasRightTable();
        },
        //获取"已有数据权限"表格
        selectDataHasRightTable(pageNum){
            if(this.branchId==-10 || this.branchId==null || this.branchId==undefined){
                this.$Message.warning("请选择部门！");
            }else{
                let pageNumber=this.pageNumHasRight;
                if(pageNum){
                    pageNumber=1
                }else{
                    pageNumber=this.pageNumHasRight;
                }
                this.loadingHasRight=true;
                //this.$httpGet(`/omm/selectUserHavePermissions`,{lPageId:this.pageName,pageNum:pageNumber,pageSize:this.pageSizeHasRight,vcFundName:this.accountName,vcUserId:this.userId}).then((res) => {          
                this.$httpGet(`/omd/selectUserHavePermissions`,{pageNum:pageNumber,vcFundName:this.accountName2.toUpperCase(),lDeptId:this.branchId}).then((res) => {          
                    this.totalSizeHasRight = res.data.total;
                    this.tableDataHasRight=res.data.list;
                    this.loadingHasRight=false;
                })
            }
        },
    },
    components:{
        DatarightTree,
        DatarightTreeTwo
    }
}
</script>
<style scoped>
    .wrapper{
        height: 100%;
    }
    /*tree高度*/
    .tree-wrapper-height,.table-wrapper-height{
        /* height:calc(100vh - 140px); */
        height: 100%;
    }
    .center-table{
        height: calc(100% - 71px);
    }
    .ivu-table-wrapper{
        height: 100%;
    }
    .tree-wrapper{
        overflow-y: auto;
    }
</style>


