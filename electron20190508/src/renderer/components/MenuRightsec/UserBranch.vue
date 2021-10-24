<template>
    <Row class="wrapper" :gutter="5">
        <Col span="9" class="table-wrapper-height">
            <div class="func-wrapper bg-none2">
                <span class="section-title">用户信息</span>
                <label for="">&nbsp;筛选:&nbsp;</label><Input class="section-search" size="small" v-model="userName" :placeholder="userNamePh" clearable @on-change="selectUserInfo(pageNum)"/>
            </div>
            <div class="table-wrapper" ref="tableWrap">
                <Table :loading="loading" strip highlight-row ref="userTable" 
                    :height="tableHeight" :columns="userColumns" 
                    :data="userData" @on-current-change="singleSelect" 
                    >
                </Table>
                <!-- <Page size="small" :total="totalSize" :current="pageNum" 
                    @on-page-size-change="pageSizeChange" @on-change="pageNumChange" 
                    :page-size="pageSize" :page-size-opts="pageOpts" show-total show-elevator show-sizer>
                </Page> -->
                <Page size="small" :page-size="40" :current="pageNum" :total="totalSize" @on-change="pageNumChange" simple />
            </div>
        </Col>
        <Col span="7" class="table-wrapper-height">
            <div class="func-wrapper bg-none2">
                <span class="section-title">用户对应部门</span>
            </div>
            <div class="table-wrapper">
                <Table :loading="userBranchLoading" :height="tableHeight" strip ref="selection" :columns="userHasColumns" :data="userHasData" @on-selection-change="selectedIsRoleRow"></Table>
            </div>
        </Col>
        <Col span="1" class="table-wrapper-height">
            <div class="transfer-btn-wrapper">
                <Button type="primary" @click="giveRight"><</Button>
                <br><br>
                <Button type="primary" @click="cancleRight">></Button>
            </div>
        </Col>
        <Col span="7" class="table-wrapper-height">
            <div class="func-wrapper bg-none2">
                <span class="section-title">非用户对应部门</span>
                <label for="">&nbsp;筛选:&nbsp;</label><Input class="section-search" size="small" v-model="fDepartName" :placeholder="branchNamePh" clearable @on-change="selectFBranchInfo(pageNum)"/>
            </div>
            <div class="table-wrapper">
                <Table :loading="nouserBranchLoading" :height="tableHeight" stripe ref="selection" :columns="userHasNotColumns" :data="userHasNotData" @on-selection-change="selectedIsNotRoleRow"></Table>
                <!-- <Page size="small" :total="totalFSize" :current="pageFNum" 
                    @on-page-size-change="pageFSizeChange" @on-change="pageFNumChange" 
                    :page-size="pageFSize" :page-size-opts="pageFOpts" show-total show-sizer>
                </Page> -->
                <Page size="small" :page-size="40" :current="pageFNum" :total="totalFSize" @on-change="pageFNumChange" simple />
            </div>
        </Col>
    </Row>
</template>
<script>
import { authBaseURL } from '../../ajax/config';
export default {
    name:'page_187',
    data () {
        return {
            userBranchLoading:false,
            nouserBranchLoading:false,
            isSelectPos:1,
            managerTypeList:[],
            tableHeight:0,
            //用户分页
            pageSize:40,
            totalSize:0,
            pageNum:1,
            pageOpts:[30,40,50],
            //非用户对应部门分页
            pageFSize:40,
            totalFSize:0,
            pageFNum:1,
            pageFOpts:[30,40,50],
            userId:0,
            userName:'',
            userNamePh:'请输入用户名称',
            fDepartName:'',
            branchNamePh:'请输入部门名称',
            selectArr:[],
            selectNotArr:[],
            userId:0,
            userColumns: [
                {
                    title: '用户编号',
                    key: 'id'
                },
                {
                    title: '用户名称',
                    key: 'vcDisplayName'
                },
                {
                    title: '备注',
                    key: 'vcRemark'
                }
            ],
            userData: [],
            userHasColumns:[
                {
                    type: 'selection',
                    width: 50,
                    align: 'left'
                },
                {
                    title: '部门编号',
                    key: 'id'
                },
                {
                    title: '部门名称',
                    key: 'vcDepartName'
                },
                {
                    title:'职位',
                    key:'vcManagerType'
                }
            ],
            userHasData:[],
            userHasNotColumns:[
                {
                    type: 'selection',
                    width: 50,
                    align: 'left'
                },
                {
                    title: '部门编号',
                    key: 'id'
                },
                {
                    title: '部门名称',
                    key: 'vcDepartName'
                },
                {
                    title:'设置职位',
                    key:'vcManagerType',
                    render: (h, params) => {
                        const posList=params.row.children;
                        return h('Select',{
                                props:{
                                    value:params.row.vcManagerType,
                                    size: 'small',
                                    clearable:true
                                },
                                on: {
                                    'on-change':(value) => {
                                        this.userHasNotData[params.index].vcManagerType=value;                                       
                                        for(let i=0;i<this.selectNotArr.length;i++){
                                            //选中项的部门id与当前id比较,若相等将select的值付给选中项，并选中
                                            if(this.selectNotArr[i].departId===params.row.id){
                                                this.selectNotArr[i].managerId=value;
                                                this.userHasNotData[params.index]._checked=true;
                                            }
                                            //与整体数据比较，部门id与该id相同，选中
                                            for(let j=0;j<this.userHasNotData.length;j++){
                                                if(this.selectNotArr[i].departId==this.userHasNotData[j].id){
                                                    this.userHasNotData[j]._checked=true;
                                                }
                                            }
                                        }
                                    }
                                },
                            },
                            posList.map((item) => {
                                return h('Option',{
                                    props: {
                                        value: item.id
                                    }
                                },item.vcManagerType);
                            })                       
                        );
                    }
                }
            ],
            userHasNotData:[]
        }
    },
    created(){
        this.selectUserInfo();
    },
    mounted(){
        this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height -41;
        window.addEventListener('resize', () => {//动态调整高度
            this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height -41;
        })
    },
    methods: {
        //为用户赋予部门
        giveRight(){
            let ids=[];
            ids=this.selectNotArr;
            if(this.selectNotArr.length<1){
                this.$Message.warning("请选择要赋予的部门");
            }else{
                let flag=true;
                for(let i=0;i<this.selectNotArr.length;i++){
                    if(this.selectNotArr[i].managerId==='' || this.selectNotArr[i].managerId===null || this.selectNotArr[i].managerId===undefined){                      
                        flag=false;
                    }
                }
                if(flag){
                    this.$httpPost('/departUser/saveTPortDepartMapUser',{vcUserId:this.userId,branches:ids})
                        .then((res)=>{
                            if(res.data.actionResult==1){
                                this.$Message.success(res.data.data);
                                this.selectTBranchInfo();
                                this.selectFBranchInfo();
                                this.selectNotArr=[];
                            }else{
                                this.$Message.warning(res.data.data);
                            }
                        })
                        .catch(err => console.log('错误信息为:'+err))                    
                }else{
                    this.$Message.warning("请设置职位");
                }
            }
        }, 
        //为用户回收部门
        cancleRight(){
            let ids=[];
            ids=this.selectArr;
            if(this.selectArr.length<1){
                this.$Message.warning("请选择要回收的部门");
            }else{
                this.$httpPost('/departUser/deleteTPortDepartMapUser',{vcUserId:this.userId,branches:ids})
                    .then((res)=>{
                        if(res.data.actionResult==1){
                            this.$Message.success(res.data.data);
                            this.selectTBranchInfo();
                            this.selectFBranchInfo();
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
            this.userId=currentRow.id;
            this.selectTBranchInfo();
            //this.selectFBranchInfo();
            this.selectFBranchInfo('pageNum');
        },
        //用户表格页码改变时的回调
        pageNumChange (page){
            this.pageNum = page;
            this.selectUserInfo();
        },
        //用户表格每页数据条数改变时的回调
        pageSizeChange (pageSize){
            this.pageSize = pageSize;
            this.selectUserInfo();
        },
        //非用户对应部门表格页码改变时的回调
        pageFNumChange (page){
            this.pageFNum = page;
            this.selectFBranchInfo();
        },
        //非用户对应部门表格每页数据条数改变时的回调
        pageFSizeChange (pageSize){
            this.pageFSize = pageSize;
            this.selectFBranchInfo();
        },
        //‘用户对应部门’选项改变时触发
        selectedIsRoleRow(selection){
            this.selectArr=[];
            for(let i in selection){
                let obj={};
                obj.managerId=selection[i].managerId;
                obj.departId=selection[i].id;
                this.selectArr.push(obj); 
            }
        },
        //‘非用户对应部门’选项改变时触发
        selectedIsNotRoleRow(selection){            
            this.selectNotArr=[];
            for(let i in selection){
                let obj={};
                obj.managerId=selection[i].vcManagerType;
                obj.departId=selection[i].id;
                this.selectNotArr.push(obj);                
            }
        },
        //查询用户信息
        selectUserInfo(pageNum){
            let pageNumber=this.pageNum;
            if(pageNum){
                pageNumber=1
            }else{
                pageNumber=this.pageNum;
            }
            this.loading=true;
            //this.$httpGet(`/user/selectUsers?pageNum=${pageNumber}&pageSize=${this.pageSize}&vcDisplayName=${this.userName}`)
            this.$httpGet(`/user/selectUsers`,{pageNum:pageNumber,pageSize:this.pageSize,vcDisplayName:this.userName},authBaseURL)
                .then((res) => {
                    console.log("返回结果"+res.data);                
                    if(res.data){
                        this.userData=res.data.list;
                        this.totalSize = res.data.total;
                        this.loading=false;
                    }                
                })
        },
        //查询用户对应的部门信息
        selectTBranchInfo(){
            this.userBranchLoading=true;
            this.$httpGet(`/departUser/selectTPortDepartMapUser?vcUserId=${this.userId}&fDepartName=${this.fDepartName}`)
                .then((res) => {               
                    if(res.data){
                        this.userHasData=res.data;
                        this.userBranchLoading=false;
                    }                
                })
        },
        //查询用户未拥有的部门        
        selectFBranchInfo(pageNum){
            let pageNumber=this.pageFNum;
            if(pageNum){
                pageNumber=1
            }else{
                pageNumber=this.pageFNum;
            }
            this.nouserBranchLoading=true;
            this.$httpGet(`/departUser/selectFAuthDepartInfo?vcUserId=${this.userId}&fDepartName=${this.fDepartName}&pageNum=${pageNumber}&pageSize=${this.pageFSize}`)
                .then((res) => {
                    console.log("返回结果"+res.data);                
                    if(res.data){
                        this.userHasNotData=res.data.list;
                        this.totalFSize = res.data.total;
                        this.nouserBranchLoading=false;
                    }                
                })
        },
        //查询用户该部门未拥有的职位
        selectNotHadPos(departId){
            this.$httpGet(`/departUser/selectFAuthManagerInfo?vcUserId=${this.userId}&departId=${departId}`)
                .then((res) => {                
                    if(res.data){
                        this.managerTypeList=res.data;
                    }                
                })
        }
    }
}
</script>
<style scoped>

.wrapper{
    height:100%;
}
/*table相关样式*/
.table-wrapper-height{/*table高度*/
    height:100%;
}
.table-wrapper{
    height: calc(100% - 30px);
}

/* 表格中的select */
.table-wrapper >>> .ivu-table .ivu-table-cell .ivu-select{
    margin: 1px!important;
}
</style>


