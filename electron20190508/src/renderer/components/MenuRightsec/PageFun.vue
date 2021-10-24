<template>
    <div class="table-wrapper-height wrapper">
        <div class="func-wrapper bg-none">
            <label for="">系统:&nbsp;</label>
            <Select size="small" v-model="sysName" style="width:60px;" @on-change="selectPageFunc(pageNum)">
                <Option v-for="item in sysList" :value="item.id" :key="item.id">{{ item.sysName }}</Option>
            </Select>
            <label for="">&nbsp;筛选:&nbsp;</label>
            <Input class="section-search" size="small" v-model="userName" :placeholder="placeholder" clearable @on-change="selectPageFunc(pageNum)"/>
            <ButtonGroup>
                <Button type="primary" size="small" @click="create">新建</Button>
                <Button type="primary" size="small" @click="edit">编辑</Button>
                <Button type="primary" size="small" @click="del">删除</Button>
            </ButtonGroup>
        </div>
        <div class="table-wrapper" ref="tableWrap">
            <Table :loading="loading" strip ref="pageFuncTable" 
                :height="tableHeight" :columns="columns" 
                :data="data" @on-select="selectTableRow"
                @on-selection-change="selectedRow">
            </Table>
            <Page size="small" :total="totalSize" :current="pageNum" 
                @on-page-size-change="pageSizeChange" @on-change="pageNumChange" 
                :page-size="pageSize" :page-size-opts="pageOpts" show-total show-elevator show-sizer>
            </Page>
        </div>       
        <Modal
            v-model="modalShow"
            title="新建"
            :loading="modalLoading"
            @on-ok="ok('formValidate')"
            @on-cancel="cancel('formValidate')">
            <div class="dialog-form-wrapper">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">                    
                    <FormItem label="系统" prop="lSysId">
                        <Select v-model="formValidate.lSysId" @on-change="selectParentId">
                            <Option number v-if="sysData.length>0" v-for="(item,index) in sysData" :value="item.id" placeholder="请输入系统名称">{{item.sysName}}</Option>
                        </Select>
                    </FormItem>                    
                    <FormItem label="排序依据" prop="lOrder">
                        <Input number v-model="formValidate.lOrder" placeholder="请输入排序依据"></Input>
                    </FormItem>
                    <FormItem label="权限类型" prop="lRestype">
                        <Select v-model="formValidate.lRestype" @on-change="selectParentId">
                            <Option v-if="data.length>0" v-for="(item,index) in rightType" :value="item.id!=null?item.id:''" placeholder="请选择权限类型">{{item.vcName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="父级" prop="lPid">
                        <Select v-model="formValidate.lPid">
                            <Option v-if="data.length>0" v-for="(item,index) in dataParent" :value="item.id" placeholder="请选择父级ID">{{item.vcName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="KEY" prop="vcElementkey">
                        <Input v-model="formValidate.vcElementkey" placeholder="请输入KEY"></Input>
                    </FormItem>
                    <FormItem label="图标名称" prop="vcIcon">
                        <Input v-model="formValidate.vcIcon" placeholder="请输入图标名称"></Input>
                    </FormItem>
                    <FormItem label="资源名称" prop="vcName">
                        <Input v-model="formValidate.vcName" placeholder="请输入资源名称"></Input>
                    </FormItem>
                    <FormItem label="URL资源" prop="vcUrl">
                        <Input v-model="formValidate.vcUrl" placeholder="请输入URL资源"></Input>
                    </FormItem>
                    <FormItem label="请求状态" prop="lStatusId">
                        <Select v-model="formValidate.lStatusId">
                            <Option number v-if="statusData.length>0" v-for="(item,index) in statusData" :value="item.id" placeholder="请选择">{{item.vcStatus}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="是否缓存" prop="keepAlive">
                        <Select v-model="formValidate.keepAlive">
                            <Option :value="1">是</Option>
                            <Option :value="0">否</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="是否显示" prop="lNotShow">
                        <Select v-model="formValidate.lNotShow">
                            <Option :value="1">是</Option>
                            <Option :value="0">否</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="集成方式" prop="lIntegrationId">
                        <Select v-model="formValidate.lIntegrationId">
                            <Option number v-if="lIntegrationData.length>0" v-for="(item,index) in lIntegrationData" :value="item.id" placeholder="请选择">{{item.vcIntegration}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="备注" prop="vcRemark">
                        <Input v-model="formValidate.vcRemark" placeholder="请输入备注"></Input>
                    </FormItem>
                </Form>
            </div>
        </Modal>
        <Modal
            v-model="updateModalShow"
            title="编辑"
            :loading="updateModalLoading"
            @on-ok="okUpdate('updateFormValidate')"
            @on-cancel="cancelUpdate('updateFormValidate')">
            <div class="dialog-form-wrapper">
                <Form ref="updateFormValidate" :model="updateFormValidate" :rules="updateRuleValidate" :label-width="80">
                    <FormItem label="系统" prop="lSysId">
                        <Select v-model="updateFormValidate.lSysId" @on-change="selectParentIdByEdit">
                            <Option number v-if="sysData.length>0" v-for="(item,index) in sysData" :value="item.id" placeholder="请输入系统名称">{{item.sysName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="排序依据" prop="lOrder">
                        <Input number v-model="updateFormValidate.lOrder" placeholder="请输入排序依据"></Input>
                    </FormItem>
                    <FormItem label="权限类型" prop="lRestype">
                        <Select v-model="updateFormValidate.lRestype" @on-change="selectParentIdByEdit">
                            <Option v-if="data.length>0" v-for="(item,index) in rightType" :value="item.id!=null?item.id:''" placeholder="请选择权限类型">{{item.vcName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="父级" prop="lPid">
                        <Select v-model="updateFormValidate.lPid">
                            <Option v-if="data.length>0" v-for="(item,index) in dataParent" :value="item.id" placeholder="请选择父级ID">{{item.vcName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="KEY" prop="vcElementkey">
                        <Input v-model="updateFormValidate.vcElementkey" placeholder="请输入KEY"></Input>
                    </FormItem>
                    <FormItem label="图标名称" prop="vcIcon">
                        <Input v-model="updateFormValidate.vcIcon" placeholder="请输入图标名称"></Input>
                    </FormItem>
                    <FormItem label="资源名称" prop="vcName">
                        <Input v-model="updateFormValidate.vcName" placeholder="请输入资源名称"></Input>
                    </FormItem>
                    <FormItem label="URL资源" prop="vcUrl">
                        <Input v-model="updateFormValidate.vcUrl" placeholder="请输入URL资源"></Input>
                    </FormItem>                    
                    <FormItem label="请求状态" prop="lStatusId">
                        <Select v-model="updateFormValidate.lStatusId">
                            <Option number v-if="statusData.length>0" v-for="(item,index) in statusData" :value="item.id" placeholder="请输入系统名称">{{item.vcStatus}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="是否缓存" prop="keepAlive">
                        <Select v-model="updateFormValidate.keepAlive">
                            <Option :value="1">是</Option>
                            <Option :value="0">否</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="是否显示" prop="lNotShow">
                        <Select v-model="updateFormValidate.lNotShow">
                            <Option :value="1">是</Option>
                            <Option :value="0">否</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="集成方式" prop="lIntegrationId">
                        <Select v-model="updateFormValidate.lIntegrationId">
                            <Option number v-if="lIntegrationData.length>0" v-for="(item,index) in lIntegrationData" :value="item.id" placeholder="请选择">{{item.vcIntegration}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="备注" prop="vcRemark">
                        <Input v-model="updateFormValidate.vcRemark" placeholder="请输入备注"></Input>
                    </FormItem>
                </Form>
            </div>
        </Modal>
    </div>
</template>
<script>
import { authBaseURL } from '../../ajax/config';
export default {
    name:'page_183',
    data () {
        return {
            //系统列表
            sysName:0,
            sysList:[],
            //系统数组
            sysData:[],
            //请求状态
            statusData:[],
            //集成方式
            lIntegrationData:[],
            pageSize:40,
            totalSize:null,
            pageNum:1,
            pageOpts:[30,40,50],
            loading:false,
            modalShow:false,
            modalLoading:true,
            updateModalShow:false,
            updateModalLoading:true,
            selectArr:[],
            selectRow:{},
            tableHeight:0,
            userName:'',
            placeholder:'请输入资源名称',
            //“新建”对应数据对象
            formValidate: {
                lSysId:1,
                lOrder:0,
                lPid:0,
                lRestype:0,
                vcElementkey: '',
                vcIcon:'',
                vcName:'',
                vcUrl:'',
                lStatusId:1,
                keepAlive:0,
                lNotShow:1,
                lIntegrationId:'',
                vcRemark:''
            },
            ruleValidate:{
                lSysId: [
                    { required: true, type: 'number', trigger: 'blur' }
                ],
                lOrder: [
                    { required: false, type: 'number', message: '请输入数值型排序依据', trigger: 'blur' }
                ],
                lPid:[
                    { required: false, type: 'number', message: '请选择父级ID', trigger: 'change' }
                ],
                lRestype:[
                    { required: true, type: 'number', message: '请选择权限类型', trigger: 'change' }
                ],
                vcElementkey:[
                    { required: false, type: 'string', message: '请输入KEY', trigger: 'blur' }
                ],
                vcIcon:[
                    { required: false, type: 'string', message: '请输入图标名称', trigger: 'blur' }
                ],
                vcName:[
                    { required: false, type: 'string', message: '请输入资源名称', trigger: 'blur' }
                ],
                vcUrl:[
                    { required: false, type: 'string', message: '请输入URL资源', trigger: 'blur' }
                ],
                lStatusId: [
                    { required: false, type: 'number', trigger: 'blur' }
                ],
                keepAlive: [
                    { required: false, type: 'number', trigger: 'change' }
                ],
                lNotShow: [
                    { required: false, type: 'number', trigger: 'change' }
                ],
                lIntegrationId: [
                    { required: false, type: 'number', trigger: 'change' }
                ],
                vcRemark:[
                    { required: false, type: 'string', message: '请输入备注', trigger: 'blur' }
                ],
            },
            //“编辑”对应数据对象
            updateFormValidate: {
                lSysId:1,
                id:0,
                lOrder:0,
                lPid:0,
                lRestype:0,
                vcElementkey: '',
                vcIcon:'',
                vcName:'',
                vcUrl:'',
                lStatusId:1,
                keepAlive:0,
                lNotShow:1,
                lIntegrationId:'',
                vcRemark:''
            },
            updateRuleValidate:{
                lSysId: [
                    { required: true, type: 'number', trigger: 'blur' }
                ],
                lOrder: [
                    { required: false, type: 'number', message: '请输入数值型排序依据', trigger: 'blur' }
                ],
                lPid:[
                    { required: false, type: 'number', message: '请选择父级ID', trigger: 'change' }
                ],
                lRestype:[
                    { required: true, type: 'number', message: '请选择权限类型', trigger: 'change' }
                ],
                vcElementkey:[
                    { required: false, type: 'string', message: '请输入KEY', trigger: 'blur' }
                ],
                vcIcon:[
                    { required: false, type: 'string', message: '请输入图标名称', trigger: 'blur' }
                ],
                vcName:[
                    { required: false, type: 'string', message: '请输入资源名称', trigger: 'blur' }
                ],
                vcUrl:[
                    { required: false, type: 'string', message: '请输入URL资源', trigger: 'blur' }
                ],
                lStatusId: [
                    { required: false, type: 'number', trigger: 'blur' }
                ],
                keepAlive: [
                    { required: false, type: 'number', trigger: 'change' }
                ],
                lNotShow: [
                    { required: false, type: 'number', trigger: 'change' }
                ],
                lIntegrationId: [
                    { required: false, type: 'number', trigger: 'change' }
                ],
                vcRemark:[
                    { required: false, type: 'string', message: '请输入备注', trigger: 'blur' }
                ],
            },
            columns: [
                {
                    type: 'selection',
                    width: 50,
                    align: 'left'
                },
                // {
                //     title: '主键',
                //     key: 'id'
                // },
                {
                    title: '排序依据',
                    key: 'lOrder',
                    width:60
                },
                // {
                //     title: '父级ID',
                //     key: 'lPid'
                // },
                {
                    title: '父级',
                    key: 'vcPname',
                    width:120
                },
                {
                    title: '权限类型',
                    key: 'lRestypeName',
                    width:100
                },
                // {
                //     title: '权限类型',
                //     key:'lRestype'
                // },
                {
                    title: 'KEY',
                    key:'vcElementkey',
                    minWidth:100,
                    ellipsis:true,
                    tooltip:true
                },{
                    title: '图标',
                    key:'vcIcon',
                    minWidth:100,
                    ellipsis:true,
                    tooltip:true
                },{
                    title: '资源',
                    key:'vcName',
                    minWidth:150,
                    ellipsis:true,
                    tooltip:true
                },{
                    title: 'URL资源',
                    key:'vcUrl',
                    minWidth:150,
                    ellipsis:true,
                    tooltip:true
                },{
                    title: '系统',
                    key:'sysName',
                    width:80
                },{
                    title: '请求状态',
                    key:'vcStatus',
                    width:80
                },{
                    title: '是否缓存',
                    key:'vcKeepAlive',
                    width:80
                },{
                    title: '是否显示',
                    key:'vcNotShow',
                    width:80
                },{
                    title: '集成方式',
                    key:'vcIntegration',
                    width:80
                },{
                    title: '备注',
                    key:'vcRemark',
                    minWidth:100,
                    ellipsis:true,
                    tooltip:true
                }
            ],
            data: [],
            //资源类型
            rightType:[],
            //父级
            dataParent:[]
        }
    },
    created(){
        this.selectPageFunc();
        this.selectRightType();
        this.selectAllSysInfo();
        this.selectSysInfo();
        this.selectStatusInfo();
        this.selectIntegrationInfo();
    },
    mounted(){
        this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height - 41;
        window.addEventListener('resize', () => {//动态调整高度
            this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height - 41;
        })
    },
    methods: {  
        getTableHeight(){
            this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height;
        },       
        //页码改变时的回调
        pageNumChange (page){
            this.pageNum = page;
            this.selectPageFunc();
        },
        //每页数据条数改变时的回调
        pageSizeChange (pageSize){
            this.pageSize = pageSize;
            this.selectPageFunc();
        },     
        //选项改变时触发
        selectedRow(selection){
            this.selectArr=[];
            for(let i in selection){
                this.selectArr.push(selection[i].id); 
                if(this.selectArr.length==1){
                    this.selectRow={};
                    this.selectRow=selection[0];
                }
            }
            
        },
        //选中表格某一行时，获取所有的选中项
        selectTableRow(selection,row){
            this.selectRow={};
            this.selectRow=row;
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
        //查询系统
        selectSysInfo(){
            //this.$httpGet('/role/selectSysClassify')
            this.$httpGet('/role/selectSysClassify',null,authBaseURL)
                .then((res) => {            
                    if(res.data){
                        this.sysData=res.data;
                    }                
                })
        },
        //请求状态
        selectStatusInfo(){
            //this.$httpGet('/res/selectResStatus')
            this.$httpGet('/res/selectResStatus',null,authBaseURL)
                .then((res) => {               
                    if(res.data){
                        this.statusData=res.data;
                    }                
                })
        },
        //集成方式
        selectIntegrationInfo(){
            //this.$httpGet('/res/selectResIntegration')
            this.$httpGet('/res/selectResIntegration',null,authBaseURL)
                .then((res) => {               
                    if(res.data){
                        this.lIntegrationData=res.data;
                    }                
                })
        },
        //查询页面功能信息
        selectPageFunc(pageNum){
            let pageNumber=this.pageNum;
            if(pageNum){
                pageNumber=1
            }else{
                pageNumber=this.pageNum;
            }
            this.loading=true;
            //this.$httpGet(`/res/selectRess?lSysId=${this.sysName}&pageNum=${pageNumber}&pageSize=${this.pageSize}&vcName=${this.userName}`)
            this.$httpGet(`/res/selectRess`,{lSysId:this.sysName,pageNum:pageNumber,pageSize:this.pageSize,vcName:this.userName},authBaseURL)
                .then((res) => {              
                    if(res.data){
                        this.data=res.data.list;
                        this.timer=false;
                        this.loading=false;
                        this.totalSize = res.data.total;
                        this.updateFormValidate.lPid=this.selectRow.id;
                    }                
                })
        },
        //查询资源类型
        selectRightType(){
            //this.$httpGet('/res/selectResTypes')
            this.$httpGet('/res/selectResTypes',null,authBaseURL)
                .then((res) => {              
                    if(res.data){
                        this.rightType=res.data;
                    }                
                })
        },
        //查询父级权限
        selectParentId(){
            if(this.formValidate.lRestype==1){
                this.dataParent.push({'id':0,'vcName':'无父级'});
            }else{  
                this.dataParent=[]; 
                //this.$httpGet('/res/selectParentRes',{lRestype:this.formValidate.lRestype,lSysId:this.formValidate.lSysId})
                this.$httpGet('/res/selectParentRes',{lRestype:this.formValidate.lRestype,lSysId:this.formValidate.lSysId},authBaseURL)
                    .then((res) => {
                        //console.log("返回结果"+res.data);                
                        if(res.data){    
                            this.formValidate.lPid=0;                        
                            this.dataParent=res.data;
                            //若有选中的行ID
                            if(this.selectRow.id){
                                //this.updateFormValidate.lPid=this.selectRow.lPid;
                                this.formValidate.lPid=this.selectRow.lPid;
                                console.log("this.updateFormValidate.lPid"+this.updateFormValidate.lPid);
                                console.log("this.selectRow.id"+this.selectRow.id);
                            }
                        }                
                    })
            }
        },
        //"编辑"弹框中查询父级权限
        // selectParentIdByEdit(val){
        //     this.dataParent=[];
        //     this.formValidate.lRestype=val;
        //     this.updateFormValidate.lPid=null;
        //     if(this.formValidate.lRestype==1){
        //         this.dataParent.push({'id':0,'vcName':'无父级'});
        //     }else{  
        //         this.dataParent=[]; 
        //         this.$httpGet('/res/selectParentRes',{lRestype:this.formValidate.lRestype})
        //             .then((res) => {
        //                 //console.log("返回结果"+res.data);                
        //                 if(res.data){   
        //                     this.updateFormValidate.lPid=0;                         
        //                     this.dataParent=res.data;
        //                 }                
        //             })
        //     }
        // },
        //"编辑"弹框中查询父级权限
        selectParentIdByEdit(){
            // this.dataParent=[];
            // this.formValidate.lRestype=val;
            // this.updateFormValidate.lPid=null;
            if(this.formValidate.lRestype==1){
                this.dataParent.push({'id':0,'vcName':'无父级'});
            }else{  
                this.dataParent=[]; 
                //this.$httpGet('/res/selectParentRes',{lRestype:this.updateFormValidate.lRestype,lSysId:this.updateFormValidate.lSysId})
                this.$httpGet('/res/selectParentRes',{lRestype:this.updateFormValidate.lRestype,lSysId:this.updateFormValidate.lSysId},authBaseURL)
                    .then((res) => {
                        //console.log("返回结果"+res.data);                
                        if(res.data){   
                            //this.updateFormValidate.lPid=0;                         
                            this.dataParent=res.data;
                        }                
                    })
            }
        },
        create(){
            this.modalShow=true;
        },
        //编辑资源
        edit(){
            this.updateFormValidate.lPid=null;
            if(this.selectArr.length>1){
                this.$Message.warning("最多只能选中一条记录进行编辑");
            }else if(this.selectArr.length<1){
                this.$Message.warning("请选中一条记录进行编辑");
            }else{
                this.updateModalShow=true;

                //请求编辑对象
                //this.$httpGet('/res/selectResById',{resId:this.selectRow.id})
                this.$httpGet('/res/selectResById',{resId:this.selectRow.id},authBaseURL)
                    .then((res) => {
                        //console.log("返回结果"+res.data);                
                        if(res.status==200 && res.data){   
                            this.updateFormValidate=res.data;
                            //渲染父级
                            this.selectParentIdByEdit();
                        }                
                    })
            }
        },
        //删除权限
        del(){
            let ids=[];
            ids=this.selectArr;
            if(this.selectArr.length<1){
                this.$Message.warning("请选中要删除的记录");
            }else{
                //this.$httpPost('/res/deleteRess',{ids:ids})
                this.$httpPost('/res/deleteRess',{ids:ids},authBaseURL)
                    .then((res)=>{
                        if(res.data.actionResult==1){
                            this.$Message.success(res.data.data);
                            this.selectPageFunc();
                            this.selectArr=[];
                        }else{
                            this.$Message.warning(res.data.data);
                        }
                    })
                    .catch(err => console.log('错误信息为:'+err))
            }
        },
        //"新建"弹框中确认
        ok(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    //this.$httpPost('/res/insertRes',this.formValidate)
                    this.$httpPost('/res/insertRes',this.formValidate,authBaseURL)
                        .then((res)=>{
                            if(res.data.actionResult==1){
                                this.$Message.success(res.data.data);
                                this.$refs[name].resetFields();
                                this.selectPageFunc();
                                this.modalLoading=false;
                                this.modalShow=false;
                            }else{
                                this.$Message.warning(res.data.data);
                                this.modalLoading=false;
                            }
                        })
                        .catch(err => console.log('错误信息为:'+err))
                }else{                    
                    this.$Message.error('表单信息填写不符合规则!');
                    this.modalLoading=false;
                }
            })
            
        },
        //"新建"弹框中取消
        cancel(name) {
            //this.$Message.info('Clicked cancel');
            this.$refs.pageFuncTable.selectAll(false);
            this.$refs[name].resetFields();
        },
        //"编辑"弹框中确认
        okUpdate(name) {              
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$httpPost('/res/updateRes',this.updateFormValidate,authBaseURL)
                        .then((res)=>{
                            if(res.data.actionResult==1){
                                this.$Message.success(res.data.data);
                                this.selectArr=[];
                                this.selectRow={};
                                this.$refs[name].resetFields();
                                this.selectPageFunc();
                                this.updateModalShow=false;
                                this.updateModalLoading=false;
                            }else{
                                this.$Message.warning(res.data.data);
                                this.updateModalLoading=false;
                            }
                        })
                        .catch(err => console.log('错误信息为:'+err))
                }else{                        
                    this.$Message.error('表单信息填写不符合规则!');
                    this.updateModalLoading=false;
                }
            })
        },
        //"编辑"弹框中取消
        cancelUpdate(name) {
            this.$refs.pageFuncTable.selectAll(false);
            this.$refs[name].resetFields();
        }
    }
}
</script>
<style scoped>

/*table相关样式*/
.table-wrapper-height{/*table高度*/
    height:100%;
}
.table-wrapper,.table-wrapper .ivu-table-wrapper{
    height: calc(100% - 39px)!important;
}

</style>


