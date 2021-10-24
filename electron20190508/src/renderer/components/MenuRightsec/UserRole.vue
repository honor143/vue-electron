<template>
    <Row class="wrapper" :gutter="5">
        <Col span="9" class="table-wrapper-height">
            <div class="func-wrapper bg-none2">
                <span class="section-title">用户信息</span>
                <Button type="primary" size="small" @click="copyRight">复制权限</Button>
                <label for="">&nbsp;筛选:&nbsp;</label><Input class="section-search" size="small" v-model="userName" :placeholder="placeholder" clearable @on-change="selectUserInfo(pageNum)"/>
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
                <span class="section-title">用户对应角色</span>
            </div>
            <div class="table-wrapper">
                <Table :loading="userRoleloading" :height="tableHeight" strip ref="selection" :columns="isRoleColumns" :data="isRoleData" @on-selection-change="selectedIsRoleRow"></Table>
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
                <span class="section-title">用户非对应角色</span>
                <label for="">系统:&nbsp;</label>
                <Select size="small" v-model="sysName" style="width:60px;" @on-change="selectIsNotRoleInfo(pageNum)">
                    <Option v-for="item in sysList" :value="item.id" :key="item.id">{{ item.sysName }}</Option>
                </Select>
                <label for="">&nbsp;筛选:&nbsp;</label><Input class="section-search" size="small" v-model="roleName" :placeholder="roleNamePh" clearable @on-change="selectIsNotRoleInfo(pageNum)" style="width:80px;"/>
            </div>
            <div class="table-wrapper">
                <Table :loading="userNoRoleloading" :height="tableHeight" strip ref="selection" :columns="isNotRoleColumns" :data="isNotRoleData" @on-selection-change="selectedIsNotRoleRow"></Table>
                <!-- <Page size="small" :total="totalFSize" :current="pageFNum" 
                    @on-page-size-change="pageFSizeChange" @on-change="pageFNumChange" 
                    :page-size="pageFSize" :page-size-opts="pageFOpts" show-total show-sizer>
                </Page> -->
                <Page size="small" :page-size="40" :current="pageFNum" :total="totalFSize" @on-change="pageFNumChange" simple />
            </div>
        </Col>
        
                <!-- :operations="['授权','收权']" -->
        <Modal
            v-model="modalShow"
            title="复制权限">
            <!-- <Transfer
                :data="data3"
                :target-keys="targetKeys3"
                :list-style="listStyle"
                :titles="['用户列表','被复制用户列表']"
                :render-format="render3"
                filterable
                @on-selected-change="selectChange"
                @on-change="handleChange3">
                <div :style="{float: 'right', margin: '5px'}">
                    <Button size="small" @click="reloadMockData">Refresh</Button>
                    <span>已选:</span>{{selecUserArrStr}}
                </div>
            </Transfer> -->
            <div class="all-wrap"> 
                <div class="right-wrap">
                    <div>
                        <span class="user-title">复制用户列表</span>
                        <Input v-model="leftUserName" placeholder="用户名或用户ID" @on-keyup="filterLeftUser"></Input>
                    </div>
                    <Table :loading="tableLoadingLeft" :height="tableHeight2" strip :columns="userColumns22" :data="leftUserData" @on-selection-change="selectLeftUser"></Table>
                </div>
                <div class="btn-wrap">
                    <Button type="primary" size="small" @click="copyRightClick">复制</Button>
                </div>
                <div class="right-wrap">
                    <div>
                        <span class="user-title">被复制用户列表</span>
                        <Input></Input>
                    </div>
                    <Table :loading="tableLoadingRight" :height="tableHeight2" strip :columns="userColumns22" :data="rightUserData" @on-selection-change="selectRightUser"></Table>
                </div>               
            </div>
            <div slot="footer">
                <Button type="error" size="small" @click="modalShow=false">关闭</Button>
            </div>
        </Modal>
    </Row>
</template>
<script>
import { authBaseURL } from '../../ajax/config';
export default {
    name:'page_185',
    data () {
        return {
            //弹框穿梭框相关
            selectLeftArr:[],
            selectRightArr:[],
            baseLeftData:[],//过滤用
            tableHeight2:300,
            modalShow:false,
            tableLoadingLeft:false,
            leftUserName:'',
            leftUserData:[],
            tableLoadingRight:false,
            rightUserData:[],
            userColumns22: [
                {
                    type: 'selection',
                    width: 50,
                    align: 'left'
                },
                {
                    title:'用户编号',
                    render: (h, params) => {
                        const row = params.row;
                        const color = 'red';
                        const id=row.id===null?'':row.id;
                        const vcDisplayName=row.vcDisplayName===null?'':row.vcDisplayName 
                        let rate=vcDisplayName+'('+id+')';
                        return h('span', {
                            props: {
                                color: color,
                                size: 18
                            }
                        },rate);
                    }
                }
                // {
                //     title: '用户编号',
                //     key: 'id'
                // },
                // {
                //     title: '用户名称',
                //     key: 'vcDisplayName'
                // },
                // {
                //     title: '备注',
                //     key: 'vcRemark'
                // }
            ],
            //leftUserColumns:[]
            //弹框相关end
            userRoleloading:false,
            userNoRoleloading:false,
            //系统列表
            sysName:0,
            sysList:[],
            //角色分页
            pageSize:40,
            totalSize:0,
            pageNum:1,
            pageOpts:[30,40,50],
            //非用户对应角色分页
            pageFSize:40,
            totalFSize:0,
            pageFNum:1,
            pageFOpts:[30,40,50],
            //用户对应角色table
            selectArr:[],
            selectRow:{},
            //用户对应角色table
            selectNotArr:[],
            selectNotRow:{},
            timer:null,
            loading:false,
            tableHeight:0,
            userName:'',
            placeholder:'请输入用户名称',
            roleName:'',
            roleNamePh:'角色名称',
            userId:'',
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
            isRoleColumns: [
                {
                    type: 'selection',
                    width: 50,
                    align: 'left'
                },
                {
                    title: '角色名称',
                    key: 'vcName'
                },
                {
                    title: '备注',
                    key: 'vcRemark'
                }
            ],
            isRoleData: [],
            isNotRoleColumns: [
                {
                    type: 'selection',
                    width: 50,
                    align: 'left'
                },
                {
                    title: '角色名称',
                    key: 'vcName'
                },
                {
                    title: '备注',
                    key: 'vcRemark'
                }
            ],
            isNotRoleData: []
        }
    },
    created(){
        this.selectUserInfo();
        this.selectAllSysInfo();
    },
    mounted(){
        this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height -41;
        window.addEventListener('resize', () => {//动态调整高度
            this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height - 41;
        })
    },
    methods: { 
        selectLeftUser(selection){
            this.selectLeftArr=selection;
            console.log("selection");
            console.log(selection);
            selection.forEach(function(item){
                if(item._checked){
                    this.baseLeftData.forEach(function(obj){
                        if(item.id==obj.id){
                            obj._checked=true;
                        }
                    })
                }
            })
        },
        selectRightUser(selection){
            this.selectRightArr=selection;
        },
        filterLeftUser(){
            console.log(this.baseLeftData);
            let that=this;
            this.leftUserData=this.baseLeftData.filter(item=>item.vcDisplayName.indexOf(that.leftUserName.trim())!=-1 || item.id.indexOf(that.leftUserName.trim())!=-1);
        },
        copyRight(){
            this.modalShow=true;
            this.$httpGet(`/user/selectUsers`,{flag:0},authBaseURL)
                .then((res) => {
                    console.log("返回结果"+res.data);                
                    if(res.data){
                        this.leftUserData=res.data.list;
                        this.rightUserData=res.data.list;
                        this.baseLeftData=res.data.list;
                    }                
                })
        },
        copyRightClick(){
            this.$httpPost(`/user/copyUserRole`,{copyUsers:this.selectLeftArr,passiveCopyUsers:this.selectRightArr},authBaseURL)
                .then((res) => {
                    console.log("返回结果"+res.data);                
                    if(res.data.actionResult==1){
                        this.$Message.success(res.data.data);
                    }else{
                        this.$Message.warning(res.data.data);
                    }                
                })
                .catch(err => console.log('错误信息为:'+err))
        },
        //为用户赋予角色
        giveRight(){
            let ids=[];
            ids=this.selectNotArr;
            if(this.selectNotArr.length<1){
                this.$Message.warning("请选择要赋予的角色");
            }else{
                //this.$httpPost('/user/saveNoUserRoles',{userId:this.userId,roleIds:ids})
                this.$httpPost('/user/saveNoUserRoles',{userId:this.userId,roleIds:ids},authBaseURL)
                    .then((res)=>{
                        if(res.data.actionResult==1){
                            this.$Message.success(res.data.data);
                            this.selectIsNotRoleInfo();
                            this.selectIsRoleInfo();
                            this.selectNotArr=[];
                        }else{
                            this.$Message.warning(res.data.data);
                        }
                    })
                    .catch(err => console.log('错误信息为:'+err))
            }
        }, 
        //为用户回收角色
        cancleRight(){
            let ids=[];
            ids=this.selectArr;
            if(this.selectArr.length<1){
                this.$Message.warning("请选择要回收的角色");
            }else{
                //this.$httpPost('/user/saveUserRoles',{userId:this.userId,roleIds:ids})
                this.$httpPost('/user/saveUserRoles',{userId:this.userId,roleIds:ids},authBaseURL)
                    .then((res)=>{
                        if(res.data.actionResult==1){
                            this.$Message.success(res.data.data);
                            this.selectIsNotRoleInfo();
                            this.selectIsRoleInfo();
                            this.selectArr=[];
                        }else{
                            this.$Message.warning(res.data.data);
                        }
                    })
                    .catch(err => console.log('错误信息为:'+err))
            }
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
        //非用户对应角色表格页码改变时的回调
        pageFNumChange (page){
            this.pageFNum = page;
            this.selectFBranchInfo();
        },
        //非用户对应角色表格每页数据条数改变时的回调
        pageFSizeChange (pageSize){
            this.pageFSize = pageSize;
            this.selectFBranchInfo();
        },
        //单选用户行高亮时，获取userID
        singleSelect(currentRow,oldCurrentRow){
            console.log("当前选中行"+currentRow.id);
            this.userId=currentRow.id;
            this.selectIsNotRoleInfo('pageNum');
            this.selectIsRoleInfo();
        },
        //‘用户对应角色’选项改变时触发
        selectedIsRoleRow(selection){
            this.selectArr=[];
            for(let i in selection){
                this.selectArr.push(selection[i].id); 
            }
        },
        //‘非用户对应角色’选项改变时触发
        selectedIsNotRoleRow(selection){
            this.selectNotArr=[];
            for(let i in selection){
                this.selectNotArr.push(selection[i].id); 
            }            
        },
        //查询所有系统
        selectAllSysInfo(){
            this.$httpGet('/dic/selectTSysClassify')
                .then((res) => {                
                    if(res.data){
                        this.sysList=res.data;
                    }                
                })
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
                        this.timer=false;
                        this.loading=false;
                        //置空右侧表格
                        this.isRoleData=[];
                        this.isNotRoleData=[];
                    }                
                })
        },
        //查询非用户角色信息
        selectIsNotRoleInfo(pageNum){
            if(this.userId==='' || this.userId===null || this.userId===undefined){
                this.$Message.warning('请选择用户');
            }else{
                let pageNumber=this.pageNum;
                if(pageNum){
                    pageNumber=1
                }else{
                    pageNumber=this.pageNum;
                }
                this.userNoRoleloading=true;
                //this.$httpGet(`/user/selectRolesByUserId?type=0&sysId=${this.sysName}&pageNum=${pageNumber}&pageSize=${this.pageSize}&vcName=${this.roleName}&userId=${this.userId}`)
                this.$httpGet(`/user/selectRolesByUserId`,{type:0,sysId:this.sysName,pageNum:pageNumber,pageSize:this.pageSize,vcName:this.roleName,userId:this.userId},authBaseURL)
                    .then((res) => {
                        console.log("返回角色结果"+res.data);                
                        if(res.data){
                            this.isNotRoleData=res.data.list;
                            this.userNoRoleloading=false;
                        }                
                    })
            }
        },
        //查询用户角色信息
        selectIsRoleInfo(){
            this.userRoleloading=true;
            //this.$httpGet(`/user/selectRolesByUserId?type=1&userId=${this.userId}`)
            this.$httpGet(`/user/selectRolesByUserId`,{type:1,userId:this.userId},authBaseURL)
                .then((res) => {
                    console.log("返回角色结果"+res.data);                
                    if(res.data){
                        this.isRoleData=res.data;
                        this.userRoleloading=false;
                    }                
                })
        },
    }
}
</script>
<style scoped>

/*table相关样式*/
.wrapper{
    height:100%;
}
.table-wrapper-height{/*table高度*/
    /* height:calc(100vh - 165px); */
    height: 100%;
}
.table-wrapper{
    height: calc(100% - 30px);
}
.table-wrapper .ivu-table-wrapper{
    height: calc(100% - 33px);
}

.all-wrap{
    display: flex;
    justify-content: space-between;
}
.right-wrap{
    flex:1;
}
.btn-wrap{
    width:60px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.user-title{
    color: rgb(245,173,3);
    line-height: 30px;
}
</style>


