<template>
    <div class="table-wrapper-height wrapper">
        <div class="func-wrapper bg-none">
            <label for="">&nbsp;筛选:&nbsp;</label>
            <Input class="section-search" size="small" v-model="userName" :placeholder="placeholder" clearable @on-change="selectUserInfo(pageNum)"/>
            <ButtonGroup>
                <Button type="primary" size="small" @click="add">新建</Button>
                <Button type="primary" size="small" @click="edit">编辑</Button>
                <Button type="primary" size="small" @click="editPw">修改密码</Button>
                <Button type="primary" size="small" @click="del">删除</Button>
            </ButtonGroup>
        </div>
        <div class="table-wrapper" ref="tableWrap">
            <Table :loading="loading" strip ref="userTable" 
                :height="tableHeight" :columns="columns" 
                :data="userData" v-if="userData" @on-select="selectTableRow"
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
                    <FormItem label="用户ID" prop="id">
                        <Input v-model="formValidate.id" placeholder="请输入用户ID"></Input>
                    </FormItem>
                    <FormItem label="用户名称" prop="vcDisplayName">
                        <Input v-model="formValidate.vcDisplayName" placeholder="请输入用户名称"></Input>
                    </FormItem>
                    <FormItem label="邮箱" prop="vcEmail">
                        <Input v-model="formValidate.vcEmail" placeholder="请输入邮箱"></Input>
                    </FormItem>
                    <FormItem label="密码" prop="vcPassword">
                        <Input type="password" v-model="formValidate.vcPassword" placeholder="请输入密码"></Input>
                    </FormItem>
                    <FormItem label="备注" prop="vcRemark">
                        <Input v-model="formValidate.vcRemark" placeholder="请输入备注"></Input>
                    </FormItem>
                </Form>
            </div>
        </Modal>       
        <Modal
            v-model="modalShowPw"
            title="修改密码"
            :loading="modalLoadingPw"
            @on-ok="okUpdatePw('formValidatePw')"
            @on-cancel="cancelUpdatePw('formValidatePw')">
            <div class="dialog-form-wrapper">
                <Form ref="formValidatePw" :model="formValidatePw" :rules="ruleValidatePw" :label-width="80">
                    <FormItem label="新密码" prop="vcPassword">
                        <Input type="password" v-model="formValidatePw.vcPassword" placeholder="请输入密码"></Input>
                    </FormItem>
                    <FormItem label="确认密码" prop="pwConfirm">
                        <Input type="password" v-model="formValidatePw.pwConfirm" placeholder="请再次输入密码"></Input>
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
                <Form ref="updateFormValidate" :model="formValidateUpdata" :rules="ruleValidateUpdate" :label-width="80">
                    <FormItem label="用户ID" prop="id">
                        <Input :readonly="true" v-model="formValidateUpdata.id" placeholder="请输入用户ID"></Input>
                    </FormItem>
                    <FormItem label="用户名称" prop="vcDisplayName">
                        <Input v-model="formValidateUpdata.vcDisplayName" placeholder="请输入用户名称"></Input>
                    </FormItem>
                    <FormItem label="邮箱" prop="vcEmail">
                        <Input v-model="formValidateUpdata.vcEmail" placeholder="请输入邮箱"></Input>
                    </FormItem>
                    <FormItem label="备注" prop="vcRemark">
                        <Input v-model="formValidateUpdata.vcRemark" placeholder="请输入备注"></Input>
                    </FormItem>
                </Form>
            </div>
        </Modal>
    </div>
</template>
<script>
import { authBaseURL } from '../../ajax/config';
export default {
    name:'page_181',
    data () {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            }else if(value.length<6) {
                callback(new Error('密码长度不能少于六位'));
            } else {
                if (this.formValidatePw.pwConfirm !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formValidatePw.validateField('pwConfirm');
                }
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.formValidatePw.vcPassword) {
                callback(new Error('两个密码不匹配'));
            } else {
                callback();
            }
        };
        return {
            pageSize:40,
            totalSize:null,
            pageNum:1,
            pageOpts:[30,40,50],
            selectArr:[],
            selectRow:{},
            timer:null,
            //修改密码弹框
            modalShowPw:false,
            modalLoadingPw:true,
            formValidatePw: {
                vcPassword: '',
                pwConfirm: '',
                id: ''
            },
            ruleValidatePw: {
                vcPassword: [
                    { validator: validatePass, trigger: 'blur' }
                    // { required: true,message: '密码不能为空', trigger: 'blur' },
                    // {type:'string',min:6,message:'密码长度不能小于六位'}
                ],
                pwConfirm: [
                    { validator: validatePassCheck, trigger: 'blur' }
                ]
            },
            //新建弹框
            loading:false,
            updateModalLoading:true,
            modalLoading:true,
            //“新建”对应数据对象
            formValidate: {
                id: '',
                vcDisplayName: '',
                vcEmail: '',
                vcPassword: '',
                vcRemark: ''
            },
            //“编辑”对应数据对象
            formValidateUpdata:{
                id: '',
                vcDisplayName: '',
                vcEmail: '',
                vcRemark: '',
                dCreateTime:'',
                dUpdateTime:'',
                vcPassword:''
            },
            ruleValidate: {
                id: [
                    { required: true, message: '用户ID不能为空', trigger: 'blur' }
                ],
                vcDisplayName: [
                    { required: true, message: '用户名称不能为空', trigger: 'blur' }
                ],
                vcEmail: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                ],
                vcPassword: [
                    { required: true,message: '密码不能为空', trigger: 'blur' },
                    {type:'string',min:6,message:'密码长度不能小于六位'}
                ],
                vcRemark: [
                    { required: false, trigger: 'blur' }
                ]
            },
            ruleValidateUpdate: {
                id: [
                    { required: true, message: '用户ID不能为空', trigger: 'blur' }
                ],
                vcDisplayName: [
                    { required: true, message: '用户名称不能为空', trigger: 'blur' }
                ],
                vcEmail: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                ],
                vcRemark: [
                    { required: false, trigger: 'blur' }
                ]
            },
            updateModalShow:false,
            modalShow: false,
            tableHeight:0,
            userName:'',
            placeholder:'用户名称或编号',
            columns: [
                {
                    type: 'selection',
                    width: 50,
                    align: 'left'
                },
                {
                    title: '用户编号',
                    key: 'id'
                },
                {
                    title: '用户名称',
                    key: 'vcDisplayName'
                },
                {
                    title: '邮箱',
                    key: 'vcEmail'
                },
                {
                    title: '备注',
                    key: 'vcRemark'
                }
            ],
            userData: []
        }
    },
    created(){
        this.selectUserInfo();
    },
    mounted(){
        if(this.$refs.tableWrap.getBoundingClientRect()){
            this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height - 33;
            window.addEventListener('resize', () => {//动态调整高度
                this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height - 33;
            })
        }
    },
    methods: {
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
        //"新建"用户
        add(){
            this.modalShow=true;
        },
        //编辑用户
        edit(){   
            if(this.selectArr.length>1){
                this.$Message.warning("最多只能选中一个用户进行编辑");
            }else if(this.selectArr.length<1){
                this.$Message.warning("请选中一个用户进行编辑");
            }else{
                this.updateModalShow=true;
                this.formValidateUpdata.id=this.selectRow.id;
                this.formValidateUpdata.vcDisplayName=this.selectRow.vcDisplayName;
                this.formValidateUpdata.vcEmail=this.selectRow.vcEmail;
                this.formValidateUpdata.vcRemark=this.selectRow.vcRemark;

                this.formValidateUpdata.dCreateTime=this.selectRow.dCreateTime;
                this.formValidateUpdata.dUpdateTime=this.selectRow.dUpdateTime;
                this.formValidateUpdata.vcPassword=this.selectRow.vcPassword;
            }
        },
        //修改密码
        editPw(){   
            if(this.selectArr.length>1){
                this.$Message.warning("只能修改一个用户密码");
            }else if(this.selectArr.length<1){
                this.$Message.warning("请选中一个用户进行密码修改");
            }else{
                this.modalShowPw=true;
                this.formValidatePw.id=this.selectRow.id;
            }
        },
        //删除用户
        del(){            
            let ids=[];
            ids=this.selectArr;
            //this.$httpPost('/user/deleteUsers',{ids:ids})
            this.$httpPost('/user/deleteUsers',{ids:ids},authBaseURL)
                .then((res)=>{
                    if(res.data.actionResult==1){
                        this.$Message.success(res.data.data);
                        this.selectUserInfo();
                    }else{
                        this.$Message.warning(res.data.data);
                    }
                })
                .catch(err => console.log('错误信息为:'+err))
        },
        //"新建"弹框中确认
        ok(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    //this.$httpPost('/user/insertUser',this.formValidate)
                    this.$httpPost('/user/insertUser',this.formValidate,authBaseURL)
                        .then((res)=>{
                            if(res.data.actionResult==1){
                                this.$Message.success(res.data.data);
                                this.$refs[name].resetFields();
                                this.selectUserInfo();
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
            this.$refs.userTable.selectAll(false);
            this.$refs[name].resetFields();
        },
        //"编辑"弹框中确认
        okUpdate(name) {              
            this.$refs[name].validate((valid) => {
                if (valid) {
                    console.log("编辑form为"+this.formValidateUpdata);
                    //this.$httpPost('/user/updateUser',this.formValidateUpdata)
                    this.$httpPost('/user/updateUser',this.formValidateUpdata,authBaseURL)
                        .then((res)=>{
                            if(res.data.actionResult==1){
                                this.$Message.success(res.data.data);
                                this.selectArr=[];
                                this.selectRow={};
                                this.$refs[name].resetFields();
                                this.selectUserInfo();
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
        //"修改"弹框中取消
        cancelUpdate(name) {
            //this.$Message.info('Clicked cancel');
            this.$refs.userTable.selectAll(false);
            this.$refs[name].resetFields();
        },
        //"修改密码"确认
        okUpdatePw(name) {              
            this.$refs[name].validate((valid) => {
                if (valid) {
                    //this.$httpPost('/user/updateUser',this.formValidateUpdata)
                    delete this.formValidatePw.pwConfirm;
                    this.$httpPost('/user/adminUpdateUserPassword',this.formValidatePw,authBaseURL)
                        .then((res)=>{
                            if(res.data.actionResult==1){
                                this.$Message.success(res.data.data);
                                this.selectArr=[];
                                this.selectRow={};
                                this.$refs[name].resetFields();
                                this.selectUserInfo();
                                this.modalShowPw=false;
                                this.modalLoadingPw=false;
                                
                            }else{
                                this.$Message.warning(res.data.data);
                                this.modalLoadingPw=false;
                            }
                        })
                        .catch(err => console.log('错误信息为:'+err))
                }else{                        
                    this.$Message.error('表单信息填写不符合规则!');
                    this.modalLoadingPw=false;
                }
            })
        },
        //"修改密码"取消
        cancelUpdatePw(name) {
            this.$refs[name].resetFields();
        },
    }
}
</script>
<style scoped>

/*table相关样式*/
.table-wrapper-height{/*table高度*/
    /* height:calc(100vh - 130px);    */
    height: 100%;
}
.table-wrapper,.table-wrapper .ivu-table-wrapper{
    height: calc(100% - 39px)!important;    
}

</style>


