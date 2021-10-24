<template>
    <div class="table-wrapper-height wrapper">
        <div class="func-wrapper bg-none">
            <label for="">系统:&nbsp;</label>
            <Select size="small" v-model="sysName" style="width:60px;" @on-change="selectRoleInfo(pageNum)">
                <Option v-for="item in sysList" :value="item.id" :key="item.id">{{ item.sysName }}</Option>
            </Select>
            <label for="">&nbsp;筛选:&nbsp;</label>
            <Input class="section-search" size="small" v-model="roleName" :placeholder="placeholder" clearable @on-change="selectRoleInfo(pageNum)"/>
            <ButtonGroup>
                <Button type="primary" size="small" @click="add">新建</Button>
                <Button type="primary" size="small" @click="edit">编辑</Button>
                <Button type="primary" size="small" @click="del">删除</Button>
            </ButtonGroup>
        </div>
        <div class="table-wrapper" ref="tableWrap">
            <Table strip ref="roleTable" :loading="loading" :height="tableHeight" :columns="columns" :data="data" 
             @on-select="selectTableRow"
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
                <Form ref="formValidate" :model="formValidate" :rules="roleValidate" :label-width="80">
                    <FormItem label="角色名称" prop="vcName">
                        <Input v-model="formValidate.vcName" placeholder="请输入角色名称"></Input>
                    </FormItem>
                    <FormItem label="父级" prop="lPid">
                        <Select v-model="formValidate.lPid" clearable>
                            <Option v-if="data.length>0" v-for="(item,index) in data" :value="item.id">{{item.vcName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="排序依据" prop="lOrder">
                        <Input v-model="formValidate.lOrder" number placeholder="请输入排序依据"></Input>
                    </FormItem>
                    <FormItem label="系统" prop="sysId">
                        <Select v-model="formValidate.sysId">
                            <Option number v-if="sysData.length>0" v-for="(item,index) in sysData" :value="item.id" placeholder="请输入系统名称">{{item.sysName}}</Option>
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
                <Form ref="updateFormValidate" :model="updateFormValidate" :rules="updateRoleValidate" :label-width="80">
                    <FormItem label="角色名称" prop="vcName">
                        <Input v-model="updateFormValidate.vcName" placeholder="请输入角色名称"></Input>
                    </FormItem>
                    <FormItem label="父级" prop="lPid">
                        <Select v-model="updateFormValidate.lPid" clearable>
                            <Option v-if="data.length>0" v-for="(item,index) in data" :value="item.id">{{item.vcName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="排序依据" prop="lOrder">
                        <Input v-model="updateFormValidate.lOrder" number placeholder="请输入排序依据"></Input>
                    </FormItem>                    
                    <FormItem label="系统" prop="sysId">
                        <Select v-model="updateFormValidate.sysId">
                            <Option number v-if="sysData.length>0" v-for="(item,index) in sysData" :value="item.id" placeholder="请输入系统名称">{{item.sysName}}</Option>
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
    name:'page_182',
    data () {
        return {
            loading:false,
            //系统列表
            sysName:0,
            sysList:[],
            //系统数据
            sysData:[],
            selectArr:[],
            selectRow:{},
            updateModalShow:false,
            updateModalLoading:true,
            modalShow:false,
            modalLoading:true,
            tableHeight:0,
            pageSize:40,
            totalSize:0,
            pageNum:1,
            pageOpts:[30,40,50],
            roleName:'',
            placeholder:'请输入角色名称',
            //“新建”对应数据对象
            formValidate: {
                vcName: '',
                lPid:-1,
                lOrder:0,
                sysId:1,
                vcRemark: ''
            },
            roleValidate: {
                vcName: [
                    { required: true, message: '角色名称不能为空', trigger: 'blur' }
                ],
                lPid: [
                    { required: false}
                ],
                lOrder:[
                    { required: true, type: 'number', message: '请输入数字', trigger: 'blur' }
                ],
                sysId: [
                    { required: false, type: 'number', trigger: 'blur' }
                ],
                vcRemark: [
                    { required: false, trigger: 'blur' }
                ]
            },
            //“编辑”对应数据对象
            updateFormValidate: {
                id:0,
                vcName: '',
                lPid:-1,
                vcPname:'',
                lOrder:0,
                sysId:1,
                vcRemark: '',
                dCreateTime:'',
                dUpdateTime:''
            },
            updateRoleValidate: {
                vcName: [
                    { required: true, message: '角色名称不能为空', trigger: 'blur' }
                ],
                lPid: [
                    { required: false}
                ],
                lOrder:[
                    { required: true, type: 'number', message: '请输入数字', trigger: 'blur' }
                ],
                sysId: [
                    { required: false, type: 'number', trigger: 'blur' }
                ],
                vcRemark: [
                    { required: false, trigger: 'blur' }
                ]
            },
            columns: [
                {
                    type: 'selection',
                    width: 50,
                    align: 'left'
                },
                // {
                //     title: '主键ID',
                //     key: 'id'
                // },
                {
                    title: '角色名称',
                    key: 'vcName'
                },
                {
                    title: '角色父名称',
                    key: 'vcPname'
                },
                {
                    title: '排序依据',
                    key: 'lOrder'
                },
                {
                    title: '创建时间',
                    key: 'dCreateTime'
                },
                {
                    title: '最后修改时间',
                    key: 'dUpdateTime'
                },
                {
                    title: '系统',
                    key: 'sysName'
                },
                {
                    title: '备注',
                    key: 'vcRemark'
                }
            ],
            data: []
        }
    },
    created(){
        this.selectRoleInfo();
        this.selectAllSysInfo();
        this.selectSysInfo();
    },
    mounted(){
        this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height - 33;
        window.addEventListener('resize', () => {//动态调整高度
            this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height -33;
        })
    },
    methods: {
        //部门表格页码改变时的回调
        pageNumChange (page){
            this.pageNum = page;
            this.selectRoleInfo();
        },
        //部门表格每页数据条数改变时的回调
        pageSizeChange (pageSize){
            this.pageSize = pageSize;
            this.selectRoleInfo();
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
        //查询角色
        selectRoleInfo(pageNum){
            let pageNumber=this.pageNum;
                if(pageNum){
                    pageNumber=1
                }else{
                    pageNumber=this.pageNum;
                }
            this.loading=true;
            //this.$httpGet(`/role/selectRoles?type=1&sysId=${this.sysName}&vcName=${this.roleName}&pageNum=${pageNumber}&pageSize=${this.pageSize}`)
            this.$httpGet(`/role/selectRoles`,{type:1,sysId:this.sysName,vcName:this.roleName,pageNum:pageNumber,pageSize:this.pageSize},authBaseURL)
                .then((res) => {
                    console.log("返回角色结果"+res.data);                
                    if(res.data){
                        this.data=res.data.list;
                        this.totalSize=res.data.total;
                        this.timer=false;
                        this.loading=false;
                    }                
                })
        },
        add(){
            this.modalShow=true;
        },
        //编辑角色
        edit(){
            if(this.selectArr.length>1){
                this.$Message.warning("最多只能选中一个角色进行编辑");
            }else if(this.selectArr.length<1){
                this.$Message.warning("请选中一个角色进行编辑");
            }else{
                this.updateModalShow=true;
                this.updateFormValidate.id=this.selectRow.id;
                this.updateFormValidate.vcName=this.selectRow.vcName;
                this.updateFormValidate.lPid=this.selectRow.lPid;
                this.updateFormValidate.vcPname=this.selectRow.vcPname;
                this.updateFormValidate.lOrder=this.selectRow.lOrder;
                this.updateFormValidate.sysId=this.selectRow.sysId;
                this.updateFormValidate.vcRemark=this.selectRow.vcRemark;
                this.updateFormValidate.dCreateTime=this.selectRow.dCreateTime;
                this.updateFormValidate.dUpdateTime=this.selectRow.dUpdateTime;
            }
        },
        //删除角色
        del(){
            let ids=[];
            ids=this.selectArr;
            if(this.selectArr.length<1){
                this.$Message.warning("请选中要删除的角色");
            }else{
                //this.$httpPost('/role/deletetRoles',{ids:ids})
                this.$httpPost('/role/deletetRoles',{ids:ids},authBaseURL)
                    .then((res)=>{
                        if(res.data.actionResult==1){
                            this.$Message.success(res.data.data);
                            this.selectRoleInfo();
                            this.selectArr=[];
                        }else{
                            this.$Message.warning(res.data.data);
                        }
                    })
                    .catch(err => console.log('错误信息为:'+err))
            }
        },
        //"新建角色"弹框中确认
        ok(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    //this.$httpPost('/role/insertRole',this.formValidate)
                    this.$httpPost('/role/insertRole',this.formValidate,authBaseURL)
                        .then((res)=>{
                            if(res.data.actionResult==1){
                                this.$Message.success(res.data.data);
                                this.$refs[name].resetFields();
                                this.selectRoleInfo();
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
        //"新建角色"弹框中取消
        cancel(name) {
            //this.$Message.info('Clicked cancel');
            this.$refs.roleTable.selectAll(false);
            this.$refs[name].resetFields();
        },
        //"编辑角色"弹框中确认
        okUpdate(name) {              
            this.$refs[name].validate((valid) => {
                if (valid) {
                    console.log("编辑form为"+this.formValidateUpdata);
                    //this.$httpPost('/role/updateRole',this.updateFormValidate)
                    this.$httpPost('/role/updateRole',this.updateFormValidate,authBaseURL)
                        .then((res)=>{
                            if(res.data.actionResult==1){
                                this.$Message.success(res.data.data);
                                this.selectArr=[];
                                this.selectRow={};
                                this.$refs[name].resetFields();
                                this.selectRoleInfo();
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
        //"编辑角色"弹框中取消
        cancelUpdate(name) {
            this.$refs.roleTable.selectAll(false);
            this.$refs[name].resetFields();
        }

    }
}
</script>
<style scoped>

/*table相关样式*/
.table-wrapper-height{/*table高度*/
    /* height:calc(100vh - 135px); */
    height: 100%;
}
.table-wrapper,.table-wrapper .ivu-table-wrapper{
    height: calc(100% - 39px)!important;
}

</style>


