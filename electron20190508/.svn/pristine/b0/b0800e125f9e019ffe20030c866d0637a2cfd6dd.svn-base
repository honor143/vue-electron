<template>
    <Row class="wrapper" :gutter="5">
        <Col span="9" class="tree-wrapper-height">
            <div class="func-wrapper bg-none2">
                <span class="section-title">数据权限</span>               
                <label for="">&nbsp;筛选:</label>
                <Input class="section-search" size="small" @on-change="selectDataRightTable(2)" v-model="accountName" placeholder="账户名或首字母" clearable style="width:100px;"/>
                
                <Button :disabled="btnDisabled" type="primary" size="small" @click="saveRight" style="position:relative;z-index:10000;">保存</Button>
            </div>
            <div class="table-wrapper center-table" ref="tableWrap">
                <Table :loading="loadingRight"  stripe ref="selection" @on-selection-change="getSelectedRight" :columns="dataRightColumns" :data="tableDataRight" :height="tableHeight"></Table>
            </div>
            <!-- <Page size="small" :total="totalSizeRight" :current="pageNumRight" @on-page-size-change="pageSizeChangeRight" @on-change="pageNumChangeRight" :page-size="pageSizeRight" :page-size-opts="pageOptsRight" show-total show-elevator></Page> -->
            <Page size="small" :page-size="40" :current="pageNumRight" :total="totalSizeRight" @on-change="pageNumChangeRight" simple />
        </Col>
        <Col span="6" class="table-wrapper-height">
            <div class="func-wrapper bg-none2">
                <span class="section-title">用户信息</span>
                <!-- <Button type="primary" size="small" @click="pageManage">页面管理</Button> -->
                <!-- <label for="">&nbsp;页面:</label>
                <Select size="small" v-model="pageName" style="width:80px;" @on-change="selectRightTable(pageName)">
                    <Option v-for="item in pageList" :value="item.key" :key="item.key">{{ item.label }}</Option>
                </Select> -->
                <label for="">&nbsp;筛选:&nbsp;</label>
                <Input class="section-search" size="small" @on-change="selectUserInfo(pageNum)" v-model="userName" :placeholder="placeholder" clearable style="width:100px;"/>
            </div>
            <div class="table-wrapper center-table" ref="tableWrap">
                <Table :loading="loading"  stripe highlight-row ref="selection" @on-current-change="singleSelect" :columns="tableColumns" :data="tableData" :height="tableHeight"></Table>
            </div>
            <!-- <Page size="small" :total="totalSize" :current="pageNum" @on-page-size-change="pageSizeChange" @on-change="pageNumChange" :page-size="pageSize" :page-size-opts="pageOpts" show-total show-elevator show-sizer></Page> -->
            <Page size="small" :page-size="40"  :current="pageNum" :total="totalSize" @on-change="pageNumChange" simple />
        </Col>
        <Col span="9" class="tree-wrapper-height">
            <div class="func-wrapper bg-none2">
                <span class="section-title">已有数据权限</span>
                <!-- <label for="">&nbsp;页面:</label>
                <Select size="small" v-model="pageName" style="width:80px;" @on-change="selectHasRightTable(pageNum)">
                    <Option v-for="item in pageList" :value="item.key" :key="item.key">{{ item.label }}</Option>
                </Select> -->
                <Button :disabled="btnHasRightDisabled" type="primary" size="small" @click="editRight">修改</Button>
                <Button :disabled="btnHasRightDisabled" type="primary" size="small" @click="delRight">删除</Button>
            </div>
            <div class="table-wrapper center-table" ref="tableWrap">
                <Table :loading="loadingHasRight"  stripe highlight-row ref="selection" @on-selection-change="getSelectedHasRight" :columns="hasDataRightColumns" :data="tableDataHasRight" :height="tableHeight"></Table>
            </div>
            <!-- <Page size="small" :total="totalSizeHasRight" :current="pageNumHasRight" @on-page-size-change="pageSizeChangeHasRight" @on-change="pageNumChangeHasRight" :page-size="pageSizeHasRight" :page-size-opts="pageOptsHasRight" show-total show-elevator show-sizer></Page> -->
            <!-- <Page size="small" :total="totalSizeHasRight" :current="pageNumHasRight" @on-page-size-change="pageSizeChangeHasRight" @on-change="pageNumChangeHasRight" :page-size="pageSizeHasRight" :page-size-opts="pageOptsHasRight" show-total show-elevator show-sizer></Page> -->
            <Page size="small" :page-size="40" :current="pageNumHasRight" :total="totalSizeHasRight" @on-change="pageNumChangeHasRight" simple />
        </Col>
        <Modal
            class="modals"
            width="600"
            v-model="modalShow"
            :title="modalTitle"
            :loading="modalLoading">
            <div class="transfer-wraper" v-if="modalTitle==='页面信息'">
                <Transfer
                    :list-style="listStyle"
                    :titles="['未授权页面','授权页面']"
                    :data="allPages"
                    :target-keys="rightPages"
                    :render-format="render1"
                    @on-change="handleChange1">
                </Transfer>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" @click="modalShow=false">关闭</Button>
            </div>
        </Modal>
    </Row>
</template>
<script>
//import UpdateTree from '../busitree/index.js'

import DatarightTree from '../datarighttree/index.js'
import DatarightTreeTwo from '../datarighttree2/index.js'
import { authBaseURL } from '../../ajax/config.js';
import { contentTracing } from 'electron';
import { parseZone, parseTwoDigitYear } from 'moment';
export default {
    name:'page_188',
    data () {
        return {
            //中间权限(select)
            pageName:-10,
            pageList:[],
            tableDataRight:[],
            loadingRight:false,
            selectedRight:[],
            mutiSelectArr:{},
            //右侧已有权限(select)
            //pageName:'',
            //pageList:[],
            tableDataHasRight:[],
            loadingHasRight:false,
            selectedHasRight:[],
            mutiSelectArrHasRight:{},
            selectItemArrHasRight:[],
            //修改权限弹框
            //rightsArr:[{label:'添加',value:1},{label:'删除',value:100},{label:'修改',value:1000},{label:'查询',value:10000},{label:'指令审批',value:100000}],
            //rightsArr:[],
            //账户名称或首字母
            accountName:'',
            //tree的pageNum
            pageNumArr:[],
            //左侧tree页码
            leftTreePageNum:1,
            //左侧打开项页面ID
            expandId:-100,
            //右侧tree页码
            rightTreePageNum:1,
            //右侧打开项页面ID
            expandRightId:-100,
            //加载状态
            treeLoadingText:'加载中',
            //加载状态
            treeLoadingTextRight:'加载中',
            showSpin:false,
            showHasRightSpin:false,
            listStyle: {
                width: '200px',
                height: '380px',
                margin:'0 auto'
            },
            allPages:[],
            rightPages:[],
            //弹框属性
            modalShow:false,
            modalTitle:'页面信息',
            modalLoading:true,
            //弹框表格
            selectArr:[],
            selectRow:{},
            //保存按钮state
            btnDisabled:false,
            btnHasRightDisabled:false,
            //选中编辑经理职位的行ID
            selectedEditRowId:'',
            modalShow:false,
            emptyText:"请选择用户",
            emptyHasRightText:"请选择用户",
            //所有半选状态
            indeterminateItemArr:[],
            //包含所有checked项的数组
            selectItemArr:[],
            userId:0,
            //页面、账户、资产单元、组合类型
            types:1,
            //选中项tree的item的id
            selectedId:1,
            //选中页面ID
            pageId:-100,
            loading:false,
            //"数据权限"表格分页
            pageSizeRight:40,
            totalSizeRight:null,
            pageNumRight:1,
            pageOptsRight:[30,40,50],
            //"已有数据权限"表格分页
            pageSizeHasRight:40,
            totalSizeHasRight:null,
            pageNumHasRight:1,
            pageOptsHasRight:[30,40,50],
            //分页数据
            pageSize:40,
            totalSize:null,
            pageNum:1,
            pageOpts:[30,40,50],
            userName:'',
            placeholder:'请输入用户名称',
            tableColumns: [
                // {
                //     type: 'selection',
                //     width: 50,
                //     align: 'left'
                // },
                {   
                    title: '用户账号',
                    key: 'id',
                    minWidth:80
                },
                {
                    title: '用户中文名',
                    key: 'vcDisplayName',
                    minWidth:80
                },
                // {
                //     title: '邮箱',
                //     key: 'vcEmail',
                //     minWidth:160
                // },
                // {
                //     title: '备注',
                //     key: 'vcRemark',
                //     minWidth:100
                // }                
            ],
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
                {
                    title:'权限设置',
                    minWidth:120,
                    key:'vcManagerType',
                    render: (h, params) => {
                        const posList=params.row.rightsArr;
                        return h('Select',{
                                props:{
                                    //value:params.row.rightArr,
                                    //value:posList[0].id,
                                    value:[posList[0].id],
                                    size: 'small',
                                    clearable:true,
                                    multiple:true
                                },
                                on: {
                                    'on-change':(value) => {
                                        //多选框无法直接往全体data中赋值,通过空对象挂载数据，保存时再匹配id一致的数据
                                        let sum=0;
                                        value.forEach((item)=>{
                                            sum+=item;
                                        })
                                        this.mutiSelectArr[params.row.id]=sum;
                                    }
                                },
                            },
                            posList.map((item) => {
                                return h('Option',{
                                    props: {
                                        value: item.id,
                                        //type:number
                                    }
                                },item.vcRights);
                            })                       
                        );
                    }
                }        
            ],
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
                },
                {
                    title:'权限设置',
                    minWidth:120,
                    key:'vcManagerType',
                    render: (h, params) => {
                        const posList=params.row.rightsArr;
                        return h('Select',{
                                props:{
                                    value:params.row.rightArr,
                                    size: 'small',
                                    clearable:true,
                                    multiple:true
                                },
                                on: {
                                    'on-change':(value) => {
                                        //多选框无法直接往全体data中赋值,通过空对象挂载数据，保存时再匹配id一致的数据
                                        let sum=0;
                                        value.forEach((item)=>{
                                            sum+=item;
                                        })
                                        this.mutiSelectArrHasRight[params.row.id]=sum;
                                    }
                                },
                            },
                            posList.map((item) => {
                                return h('Option',{
                                    props: {
                                        value: item.id,
                                        //type:number
                                    }
                                },item.vcRights);
                            })                       
                        );
                    }
                }        
            ],
            tableHeight:0,
            tableData: [],
            treeData: [],
            treeHasRightData:[],
            //弹框数据
            columnsPage: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'left'
                },
                {
                    title: '资源名称',
                    key: 'vcName'
                }
            ],
            dataPage: []
        }
    },  
    created(){
        //this.getAuthList();
        this.selectUserInfo();
    },
    computed:{
        treeHeight(){
            return this.tableHeight + 32;
        }
    },
    mounted(){
        this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height;
        window.addEventListener('resize', () => {//动态调整高度
            this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height;
        })
    },
    methods: {
        //左侧change select 查询
        selectRightTable(val){
            console.log(val);
            this.selectDataRightTable();
            this.selectDataHasRightTable();
        },
        //右侧change select 查询
        // selectHasRightTable(){
        //     this.selectDataHasRightTable();
        // },
        //获取权限列表
        // getAuthList(){
        //     this.$httpGet(`/omm/selectRightsDescribe`)
        //         .then((res) => {                                 
        //             if(res.status===200 && res.data){
        //                 this.rightsArr=res.data;
        //             }else{
        //                 this.$Message.warning(res.data.data);                           
        //             }                
        //         })
        // },
        //中间权限select
        getPageList() {
            this.$httpGet(`/omm/selectUserPageResAll?vcUserId=${this.userId}`)
                .then((res) => {                                 
                    if(res.status===200 && res.data){
                        this.pageList=res.data;
                    }else{
                        this.$Message.warning(res.data.data);                           
                    }                
                })
        },
        //右侧权限select
        // getRightPageList() {
        //     this.$httpGet(`/omm/selectUserPageResAll?vcUserId=${this.userId}`)
        //         .then((res) => {                                 
        //             if(res.status===200 && res.data){
        //                 this.pageList=res.data;
        //             }else{
        //                 this.$Message.warning(res.data.data);                           
        //             }                
        //         })
        // },
        //(穿梭框)获取所有页面
        getAllPage() {
            this.$httpGet(`/omm/selectAllPageRes`)
                .then((res) => {                                 
                    if(res.status===200 && res.data){
                        this.allPages=res.data;
                    }else{
                        this.$Message.warning(res.data.data);                           
                    }                
                })
        },
        //获取授权页面
        getRightPages() {
            //this.rightPages=[];
            this.$httpGet(`/omm/selectUserPageRes?vcUserId=${this.userId}`)
                .then((res) => {                                 
                    if(res.status===200 && res.data){
                        //this.rightPages=res.data;
                        let rightArr=[];
                        for(let i=0;i<res.data.length;i++){
                            rightArr.push(res.data[i].key);
                        }
                        this.rightPages=rightArr;
                    }else{
                        this.$Message.warning(res.data.data);                           
                    }                
                })
        },
        //渲染transfer
        render1 (item) {
            return item.label;
        },
        //transfer中授权与取消授权
        handleChange1 (newTargetKeys, direction, moveKeys) {
            if(direction==="left"){//删除用户的权限页面
                this.$httpGet(`/omm/deletetUserPageRes?vcUserId=${this.userId}&lPageId=${moveKeys}`)
                .then((res) => {                                 
                    if(res.status===200 && res.data){
                        this.getAllPage();
                        this.getRightPages();
                        this.getPageList();
                        //this.selectUserRight('num');
                        //this.selectUserHasRight('num');
                    }else{
                        this.$Message.warning(res.data.data);                           
                    }                
                })
            }else if(direction==="right"){//保存用户权限页面
                this.$httpGet(`/omm/saveUserPageRes?vcUserId=${this.userId}&lPageId=${moveKeys}`)
                .then((res) => {                                 
                    if(res.status===200 && res.data){
                        this.getAllPage();
                        this.getRightPages();
                        this.getPageList();
                       // this.selectUserRight('num');
                       // this.selectUserHasRight('num');
                    }else{
                        this.$Message.warning(res.data.data);                           
                    }                
                })
            }
        },
        //添加页面
        pageManage(){
            if(!this.userId){
                this.$Message.warning('请选择用户!'); 
            }else{
                this.modalShow=true; 
                this.getAllPage();
                this.getRightPages();
            }
        },
        //获取左侧表格选中项
        getSelectedRight(selection){
            this.selectedRight=selection;
            console.log(selection);
        },
        //保存用户权限
        saveRight(){
            if(this.selectedRight.length<1){
                this.$Message.warning("请选择数据！");
            }else{
                let flag=false;//是否权限有空值
                //与触发表格中多选select匹配，id一致的提交
                this.selectItemArr=[];           
                this.selectedRight.forEach((item)=>{                
                    for(let key in this.mutiSelectArr){
                        if(item.id==key){
                            item.rights=this.mutiSelectArr[key];
                            this.selectItemArr.push(item);
                            
                        }
                    }
                })
                if(Object.keys(this.mutiSelectArr).length==0){
                    flag=true;
                }else{
                    for(let key in this.mutiSelectArr){
                        if((this.mutiSelectArr[key]===0) || (this.selectedRight.length > Object.keys(this.mutiSelectArr).length)){
                            flag=true;
                        }
                    }
                }
                if(flag){//权限为空,进行提示
                    this.$Message.warning("所选数据“权限设置”不能为空");
                }else{
                    //console.log(this.selectItemArr);
                    if(!this.userId){//若没选择用户
                        this.$Message.warning("请选择要授权的用户！");
                    }else{//若已选择用户
                        this.$httpPost('/omm/savePageTPortO3MapManager',{"permisList":this.selectItemArr,"vcUserId":this.userId,"lPageId":this.pageName})
                            .then((res)=>{
                                if(res.data.actionResult==1){
                                    this.$Message.success(res.data.data);
                                    this.selectDataRightTable();
                                    this.selectDataHasRightTable();
                                    //this.selectUserRight('num');
                                    //this.selectUserHasRight('num');
                                    //this.btnDisabled=false;
                                }else{
                                    this.$Message.warning(res.data.data);
                                }
                            })
                            .catch(err => console.log('错误信息为:'+err))
                    }
                }
            }
        },       
        //获取右侧表格选中项
        getSelectedHasRight(selection){
            this.selectedHasRight=selection;
            console.log(selection);
        },
        //修改右侧权限
        editRight(){
            if(this.selectedHasRight.length<1){
                this.$Message.warning("请选择数据！");
            }else{
                let flag=false;//是否权限有空值
                //与触发表格中多选select匹配，id一致的提交
                this.selectItemArrHasRight=[];           
                this.selectedHasRight.forEach((item)=>{                
                    for(let key in this.mutiSelectArrHasRight){
                        if(item.id==key){
                            item.rights=this.mutiSelectArrHasRight[key];
                            this.selectItemArrHasRight.push(item);
                        }
                    }
                })
                if(Object.keys(this.mutiSelectArrHasRight).length==0){
                    flag=true;
                }else{
                    for(let key in this.mutiSelectArrHasRight){
                        if((this.mutiSelectArrHasRight[key]===0) || (this.selectedHasRight.length > Object.keys(this.mutiSelectArrHasRight).length)){
                            flag=true;
                        }
                    }
                }
                if(flag){//权限为空,进行提示
                    this.$Message.warning("所选数据“权限设置”不能为空");
                }else{
                    //console.log(this.selectItemArrHasRight);
                    if(!this.userId){//若没选择用户
                        this.$Message.warning("请选择要授权的用户！");
                    }else{//若已选择用户
                        this.$httpPost('/omm/updateUserPermissions',{"permisList":this.selectItemArrHasRight,"vcUserId":this.userId,"lPageId":this.pageName})
                            .then((res)=>{
                                if(res.data.actionResult==1){
                                    this.$Message.success(res.data.data);
                                    this.selectDataRightTable();
                                    this.selectDataHasRightTable();
                                    //this.selectUserRight('num');
                                    //this.selectUserHasRight('num');
                                    //this.btnDisabled=false;
                                }else{
                                    this.$Message.warning(res.data.data);
                                }
                            })
                            .catch(err => console.log('错误信息为:'+err))
                    }
                }
            }
        },
        //删除用户权限
        delRight(){
            if(this.selectedHasRight.length<1){
                this.$Message.warning("请选择数据！");
            }else{
                if(!this.userId){//若没选择用户
                    this.$Message.warning("请选择要授权的用户！");
                }else if(this.selectedHasRight.length<1){
                    this.$Message.warning("请选择要删除的数据！");
                }else{//若已选择用户
                    // this.$httpPost('/omm/savePageTPortO3MapManager',{"list":this.treeData,"tPortO3MapInfoVo":{"pageBranches":this.selectItemArr,"halfPageBranches":this.indeterminateItemArr,"vcUserId":this.userId}})
                    this.$httpPost('/omm/deletePageTPortO3MapManager',{"permisList":this.selectedHasRight,"vcUserId":this.userId,"lPageId":this.pageName})
                        .then((res)=>{
                            if(res.data.actionResult==1){
                                this.$Message.success(res.data.data);
                                this.selectDataRightTable();
                                this.selectDataHasRightTable();
                                //this.selectUserRight('num');
                                //this.selectUserHasRight('num');
                                //this.btnHasRightDisabled=false;
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
            this.userId=currentRow.id;
            //选中用户时,清空数据权限
            this.accountName='';
            this.treeData=[];
            this.treeHasRightData=[];
            //this.selectUserRight('num');
            //this.selectUserHasRight('num');
            this.pageName=-10;
            this.getPageList();
            this.selectDataRightTable('pageNum');
            this.selectDataHasRightTable('pageNum');
            //this.getRightPageList();
        },
          //页码改变时的回调
        pageNumChange (page){
            this.pageNum = page;
            this.selectUserInfo();
        },
        //每页数据条数改变时的回调
        pageSizeChange (pageSize){
            this.pageSize = pageSize;
            this.selectUserInfo();
        },
        //获取用户信息列表
        selectUserInfo(pageNum){
            let pageNumber=this.pageNum;
            if(pageNum){
                pageNumber=1
            }else{
                pageNumber=this.pageNum;
            }
            this.loading=true;   
            this.$httpGet(`/user/selectUsers`,{pageNum:pageNumber,pageSize:this.pageSize,vcDisplayName:this.userName},authBaseURL).then((res) => {          
                this.totalSize = res.data.total;
                this.tableData=res.data.list;
                this.loading=false;
            })
        },
        //页码改变时的回调
        pageNumChangeRight (page){
            this.pageNumRight = page;
            this.selectDataRightTable();
        },
        //每页数据条数改变时的回调
        pageSizeChangeRight (pageSize){
            this.pageSizeRight = pageSize;
            this.selectDataRightTable();
        },
        //获取"数据权限"表格
        selectDataRightTable(pageNum){
            if(!this.userId){
                this.$Message.warning("请选择用户！");
            }else{
                let pageNumber=this.pageNumRight;
                if(pageNum){
                    pageNumber=1
                }else{
                    pageNumber=this.pageNumRight;
                }
                this.loadingRight=true;
                //var url = `/user/selectUsers?pageNum=${pageNumber}&pageSize=${this.pageSize}&vcDisplayName=${this.userName}`;
                this.$httpGet(`/omm/selectUserNotHavePermissions`,{lPageId:this.pageName,pageNum:pageNumber,pageSize:this.pageSizeRight,vcFundName:this.accountName.toUpperCase(),vcUserId:this.userId}).then((res) => {          
                    this.totalSizeRight = res.data.total;
                    this.tableDataRight=res.data.list;
                    this.loadingRight=false;
                })
            }
        },
        //页码改变时的回调
        pageNumChangeHasRight (page){
            this.pageNumHasRight = page;
            this.selectDataHasRightTable();
        },
        //每页数据条数改变时的回调
        pageSizeChangeHasRight (pageSize){
            this.pageSizeHasRight = pageSize;
            this.selectDataHasRightTable();
        },
        //获取"已有数据权限"表格
        selectDataHasRightTable(pageNum){
            if(!this.userId){
                this.$Message.warning("请选择用户！");
            }else{
                let pageNumber=this.pageNumHasRight;
                if(pageNum){
                    pageNumber=1
                }else{
                    pageNumber=this.pageNumHasRight;
                }
                this.loadingHasRight=true;
                //this.$httpGet(`/omm/selectUserHavePermissions`,{lPageId:this.pageName,pageNum:pageNumber,pageSize:this.pageSizeHasRight,vcFundName:this.accountName,vcUserId:this.userId}).then((res) => {          
                this.$httpGet(`/omm/selectUserHavePermissions`,{lPageId:this.pageName,pageNum:pageNumber,pageSize:this.pageSizeHasRight,vcUserId:this.userId}).then((res) => {          
                    this.totalSizeHasRight = res.data.total;
                    this.tableDataHasRight=res.data.list;
                    this.loadingHasRight=false;
                })
            }
        },
        //查询用户权限
        // selectUserRight(num){
        //     console.log("左边"+this.treeData);
        //     console.log(this.treeData);
        //     //console.log("左边"+expandPageId);
        //     if(!this.userId){//若没选择用户
        //         this.$Message.warning("请选择要授权的用户！");
        //     }else{
        //         //this.showSpin=true;
        //         this.emptyText="";
                
        //         let str='';
        //         //如果是模糊搜索,则将展开的页面id传过去,如果没有展开的,则传默认页面Id=-100
        //         let expandPageId=-100;   
        //             this.treeData.forEach((item)=>{
        //                 if(item.expand){
        //                     expandPageId=item.id;
        //                     console.log(item);
        //                 }
        //             })
                    
        //             console.log("num");
        //             console.log(num);
        //             //如果是高亮表格时
        //             if(num && num!=2){
        //                 expandPageId=-100;
        //             }
        //             str=`&lPageId=${expandPageId}`;
                
        //         console.log("expandPageId");
        //         console.log(expandPageId);
                    
        //         this.$httpGet(`/omm/selectJurisdictionTree?vcFundName=${this.accountName.toUpperCase()}&vcUserId=${this.userId}` + str)
        //         //this.$httpGet(`/omm/selectJurisdictionTree?vcFundName=${this.accountName.toUpperCase()}&vcUserId=${this.userId}`)
        //             .then((res) => {
        //                 if(res.data){
        //                     // this.treeData=res.data;                        
        //                     //this.showSpin=false;
                            
        //                     //如果expandPageId=-100,则查询整体,整体替换treeData，否则,则查询部分,给展开项添加
        //                     if(expandPageId==-100){
        //                         this.treeData=res.data;                        
        //                         //this.showSpin=false;
        //                     }else{
        //                         this.treeData.forEach((item)=>{
        //                             if(item.id===expandPageId){
        //                                 item.expand=true;
        //                                 item.children=[];
        //                                 res.data.forEach((child)=>{
        //                                     item.children.push(child);
        //                                     //this.showSpin=false;
        //                                 })
        //                             }
        //                         })
        //                     }
        //                     if(this.treeData.length==0){
        //                         this.emptyText="该用户暂无权限";
        //                     }
        //                 }                
        //             })
        //     }
        // },
        // //查询用户已有权限
        // selectUserHasRight(num){
        //     console.log("right");
        //     console.log(this.treeHasRightData);
        //     //this.showHasRightSpin=true;
        //     this.emptyHasRightText="";

        //     let str='';
        //     //如果有展开的,则将展开的页面id传过去,如果没有展开的,则传默认页面Id=-100
        //     let expandPageId=-100;     
        //     this.treeHasRightData.forEach((item)=>{
        //         if(item.expand){
        //             expandPageId=item.id;
        //             console.log(item);
        //         }
        //     })
        //     //如果是高亮表格时
        //     if(num){
        //         expandPageId=-100;
        //     }
        //     str=`&lPageId=${expandPageId}`;
        //     console.log("右边"+expandPageId);
        //     this.$httpGet(`/omm/selectHaveJurisdictionTree?vcUserId=${this.userId}` + str)
        //         .then((res) => {
        //             if(res.data){
        //                 this.treeHasRightData=res.data;
        //                 //this.showHasRightSpin=false;

        //                 //如果expandPageId=-100,则查询整体,整体替换treeData，否则,则查询部分,给展开项添加
        //                 // if(expandPageId==-100){
        //                 //     this.treeHasRightData=res.data;                        
        //                 //     //this.showSpin=false;
        //                 // }else{
        //                 //     this.treeHasRightData.forEach((item)=>{
        //                 //         if(item.id===expandPageId){
        //                 //             item.expand=true;
        //                 //             item.children=[];
        //                 //             res.data.forEach((child)=>{
        //                 //                 item.children.push(child);
        //                 //                 //this.showSpin=false;
        //                 //             })
        //                 //         }
        //                 //     })
        //                 // }

        //                 if(this.treeHasRightData.length==0){
        //                     this.emptyHasRightText="该用户暂无权限";
        //                 }
        //             }                
        //         })
        // }        
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
        height:100%;
    }
    .tree-wrapper{
        overflow-y: auto;
    }
    .center-table{
        height:calc(100% - 71px);
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


