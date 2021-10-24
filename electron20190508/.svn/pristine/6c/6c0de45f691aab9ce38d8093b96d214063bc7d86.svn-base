<template>
    <Row class="wrapper" :gutter="5">
        <Col span="8" class="table-wrapper-height">
            <div class="func-wrapper bg-none2">
                <span class="section-title">用户信息</span>
                <label for="">&nbsp;筛选:&nbsp;</label><Input class="section-search" size="small" v-model="userName" :placeholder="userNamePh" clearable @on-change="selectUserInfo(pageNum)"/>
            </div>
            <div class="table-wrapper" ref="tableWrap">
                <Table ref="userInfoTable" stripe highlight-row :loading="userLoading" :columns="userInfoColumns" :data="userInfoData" @on-current-change="singleSelect" :height="tableHeight"></Table>
            </div>
            <!-- <Page size="small" :total="totalSize" :current="pageNum" @on-page-size-change="pageSizeChange" @on-change="pageNumChange" :page-size="pageSize" :page-size-opts="pageOpts" show-total show-elevator></Page> -->
            <Page size="small" :page-size="40" :current="pageNum" :total="totalSize" @on-change="pageNumChange" simple />
        </Col>
        <Col span="7" class="tree-wrapper-height">
            <div class="func-wrapper bg-none2">
                <span class="section-title">用户-恒生O3用户</span>
            </div>
            <div class="table-wrapper">
                <Table stripe highlight-row ref="userToO32Table" :loading="o3Loading" :columns="userToO32Columns" :data="userToO32Data" @on-selection-change="selectedUserRow" :height="tableHeight"></Table>
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
                <span class="section-title">非用户-恒生O3用户</span>
                <label for="">&nbsp;筛选:&nbsp;</label><Input class="section-search" size="small" v-model="branchName" :placeholder="branchNamePh" clearable @on-change="selectNoHasO32User"/>
            </div>
            <div class="table-wrapper">
                <Table stripe highlight-row ref="noUserToO32Table" :loading="notO3Loading" :columns="noUserToO32Columns" :data="noUserToO32Data" @on-selection-change="selectedNotUserRow" :height="tableHeight"></Table>
            </div>
            <!-- <Page size="small" :total="O32totalSize" :current="O32pageNum" @on-page-size-change="O32pageSizeChange" @on-change="O32pageNumChange" :page-size="O32pageSize" :page-size-opts="O32pageOpts" show-total show-elevator ></Page> -->
            <Page size="small" :page-size="40" :current="O32pageNum" :total="O32totalSize" @on-change="O32pageNumChange" simple />
        </Col>
    </Row>
</template>
<script>

import { authBaseURL } from '../../ajax/config';
export default {
    name:'page_191',
    data () {
        return {
            tableHeight:500,
            notO3Loading:false,
            //userInfo分页数据
            userLoading:false,
            pageSize:40,
            totalSize:null,
            pageNum:1,
            pageOpts:[30,40,50],
             //O32用户分页数据
            o3Loading:false,
            O32pageSize:40,
            O32totalSize:0,
            O32pageNum:1,
            O32pageOpts:[30,40,50],

            userId:'',

            //用户对应角色table
            selectArr:[],
            //用户对应角色table
            selectNotArr:[],


            userName:'',
            userNamePh:'用户名称',
            branchName:'',
            branchNamePh:'恒生O3用户名称',
            userInfoColumns: [
                
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
            userInfoData: [
                
            ],
            userToO32Columns: [
                {
                    type: 'selection',
                    width: 50,
                    align: 'left'
                },
                {
                    title: '恒生O3用户编号',
                    key: 'lOperatorNo'
                },
                {
                    title: '恒生O3用户名称',
                    key: 'vcOperatorName'
                },
                {
                    title: '备注',
                    key: 'vcRemarks'
                }
            ],
            userToO32Data: [
               
            ], 
            noUserToO32Columns: [
                 {
                    type: 'selection',
                    width: 50,
                    align: 'left'
                },
                {
                    title: '恒生O3用户编号',
                    key: 'lOperatorNo'
                },
                {
                    title: '恒生O3用户名称',
                    key: 'vcOperatorName'
                },
                {
                    title: '备注',
                    key: 'vcRemarks'
                }
            ],
            noUserToO32Data: [
               
            ]
        }
    },
    created(){
        this.selectUserInfo();
    },
    mounted(){
        this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height;
        window.addEventListener('resize', () => {//动态调整高度
            this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height;
        })
    },
    methods: {
        //‘用户对应部门’选项改变时触发
        selectedUserRow(selection){
            this.selectArr=[];
            for(let i in selection){
                this.selectArr.push(selection[i].lOperatorNo); 
            }
        },
        //‘非用户对应部门’选项改变时触发
        selectedNotUserRow(selection){
            console.log(selection)
            this.selectNotArr=[];
            for(let i in selection){
                this.selectNotArr.push(selection[i].lOperatorNo); 
            }   
            console.log(this.selectNotArr)         
        },
        //添加对应恒生用户
        giveRight(){
            let ids=[];
            ids=this.selectNotArr;
            if(this.selectNotArr.length<1){
                this.$Message.warning("请选择要对应的GP3组合");
            }else{
                this.$httpPost('/umo/saveTAuthUserMapO3User',{vcUserId:this.userId,branches:ids})
                    .then((res)=>{
                        if(res.data.actionResult==1){
                            this.$Message.success(res.data.data);
                            this.selectHasO32User();
                            this.selectNoHasO32User();
                            this.selectNotArr=[];
                        }else{
                            this.$Message.warning(res.data.data);
                        }
                    })
                    .catch(err => console.log('错误信息为:'+err))
            }
        }, 
         //删除对应恒生用户
        cancleRight(){
            let ids=[];
            ids=this.selectArr;
            if(this.selectArr.length<1){
                this.$Message.warning("请选择要取消对应关系的GP3组合");
            }else{
                this.$httpPost('/umo/deleteTAuthUserMapO3User',{vcUserId:this.userId,branches:ids})
                    .then((res)=>{
                        if(res.data.actionResult==1){
                            this.$Message.success(res.data.data);
                            this.selectHasO32User();
                            this.selectNoHasO32User();
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
            this.selectNoHasO32User();
            this.selectHasO32User();
        },
         //查询非用户对应恒生O3用户
        selectNoHasO32User(){
            this.notO3Loading=true;
            this.$httpGet(`/umo/selectFAuthUserMapO3Users?vcUserId=${this.userId}&pageNum=${this.O32pageNum}&pageSize=${this.O32pageSize}&fOperatorName=${this.branchName}`)
                .then((res) => {
                    console.log(res.data);                
                    if(res.data){
                        this.O32totalSize = res.data.total;
                        this.noUserToO32Data=res.data.list;
                        this.notO3Loading=false;
                    }                
                })
        },
        //查询用户对应恒生O3用户
        selectHasO32User(){
            this.o3Loading=true;
            this.$httpGet(`/umo/selectTAuthUserMapO3Users?vcUserId=${this.userId}`)
                .then((res) => {
                    if(res.data){
                        this.userToO32Data=res.data;
                        this.o3Loading=false;
                    }                
                })
        },


       
         //O32页码改变时的回调
        O32pageNumChange (page){
            this.O32pageNum = page;
            //this.selectIsNotRoleInfo();
            this.selectNoHasO32User();
        },
        //O32每页数据条数改变时的回调
        O32pageSizeChange (pageSize){
            this.O32pageSize = pageSize;
            //this.selectIsNotRoleInfo();
            this.selectNoHasO32User();
        },

        
         //user页码改变时的回调
        pageNumChange (page){
            this.pageNum = page;
            this.selectUserInfo();
        },
        //user每页数据条数改变时的回调
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
            this.userLoading=true;
            //var url = `/user/selectUsers?pageNum=${pageNumber}&pageSize=${this.pageSize}&vcDisplayName=${this.userName}`;
            //this.$httpGet(url).then((res) => {     
            this.$httpGet(`/user/selectUsers`,{pageNum:pageNumber,pageSize:this.pageSize,vcDisplayName:this.userName},authBaseURL).then((res) => {          
                this.totalSize = res.data.total;
                this.userInfoData=res.data.list;
                this.userLoading=false;
            })
        }
    }
}
</script>
<style scoped>
.wrapper{
        height:100%;
    }
.table-wrapper-height{
    height:100%;
}
/*tree高度*/
.tree-wrapper-height{
    height:100%;
}
.table-wrapper{
    height:calc(100% - 71px);
}

</style>


