<template>
    <div class="table-wrapper-height wrapper">
        <div class="func-wrapper bg-none">
            <label for="">&nbsp;筛选:&nbsp;</label>
            <Input class="section-search" size="small" v-model="branchName" :placeholder="placeholder" clearable @on-change="selectBranchInfo(pageNum)"/>
            <ButtonGroup>
                <Button type="primary" size="small" @click="create">新建</Button>
                <Button type="primary" size="small" @click="edit">编辑</Button>
                <Button type="primary" size="small" @click="del">删除</Button>
            </ButtonGroup>
        </div>
        <div class="table-wrapper" ref="tableWrap">
            <Table :loading="loading" strip ref="branchTable" 
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
                    <FormItem label="部门名称" prop="vcDepartName">
                        <Input v-model="formValidate.vcDepartName" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="上级部门" prop="lParentDepartId">
                        <Select v-model="formValidate.lParentDepartId">
                            <Option v-if="branchList.length>0" v-for="(item,index) in branchList" :value="item.id!=null?item.id:''" placeholder="请选择">{{item.vcDepartName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="部门类型" prop="lDepartType">
                        <Select v-model="formValidate.lDepartType">
                            <Option v-if="lDepartTypeArr.length>0" v-for="(item,index) in lDepartTypeArr" :value="item.id!=null?item.id:''" placeholder="请选择">{{item.vcDepartTypeName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="部门状态" prop="cStatus">
                        <Select v-model="formValidate.cStatus">
                            <Option v-if="data.length>0" v-for="(item,index) in dataRight" :value="item.cStatus!=null?item.cStatus:''" placeholder="请选择">{{item.vcStatusName}}</Option>
                        </Select>
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
                    <FormItem label="部门名称" prop="vcDepartName">
                        <Input v-model="updateFormValidate.vcDepartName" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="上级部门" prop="lParentDepartId">
                        <Select v-model="updateFormValidate.lParentDepartId">
                            <Option v-if="branchList.length>0" v-for="(item,index) in branchList" :value="item.id!=null?item.id:''" placeholder="请选择">{{item.vcDepartName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="部门类型" prop="lDepartType">
                        <Select v-model="updateFormValidate.lDepartType">
                            <Option v-if="lDepartTypeArr.length>0" v-for="(item,index) in lDepartTypeArr" :value="item.id!=null?item.id:''" placeholder="请选择">{{item.vcDepartTypeName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="部门状态" prop="cStatus">
                        <Select v-model="updateFormValidate.cStatus">
                            <Option v-if="data.length>0" v-for="(item,index) in dataRight" :value="item.cStatus!=null?item.cStatus:''" placeholder="请选择">{{item.vcStatusName}}</Option>
                        </Select>
                    </FormItem>
                </Form>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
    name:'page_184',
    data () {
        return {
            modalShow:false,
            loading:false,
            updateModalShow:false,
            updateModalLoading:true,
            modalLoading:true,
            tableHeight:0,
            pageSize:40,
            totalSize:0,
            pageNum:1,
            pageOpts:[10,30,40,50],
            branchName:'',
            placeholder:'请输入部门名称',
            dataRight:[{'cStatus':1,'vcStatusName':'有效'},{'cStatus':0,'vcStatusName':'无效'}],
            //部门类型
            lDepartTypeArr:[],
            formValidate:{
                vcDepartName:'',
                lParentDepartId:0,
                lDepartType:0,
                cStatus:0
            },
            ruleValidate: {
                vcDepartName: [
                    { required: true, message: '用户ID不能为空', trigger: 'blur' }
                ],
                lParentDepartId: [
                    { required: false}
                ],
                lDepartType:[
                    { required: false}
                ],
                cStatus: [
                    { required: true}
                ]
            },
            updateFormValidate:{
                vcDepartName:'',
                lParentDepartId:0,
                lDepartType:0,
                cStatus:0
            },
            updateRuleValidate: {
                vcDepartName: [
                    { required: true, message: '用户ID不能为空', trigger: 'blur' }
                ],
                lParentDepartId: [
                    { required: false}
                ],
                lDepartType:[
                    { required: false}
                ],
                cStatus: [
                    { required: true}
                ]
            },
            columns: [
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
                    title: '部门类型',
                    key: 'vcDepartTypeName'
                },
                {
                    title: '上级部门编号',
                    key: 'lParentDepartId'
                },
                {
                    title: '创建时间',
                    key: 'tsCreateTime'
                },
                {
                    title: '更新时间',
                    key: 'tsModifyTime'
                },
                {
                    title: '状态',
                    key: 'vcStatusName'
                }
            ],
            data: [],
            branchList:[]
        }
    },
    created(){
        this.selectBranchInfo();
        this.selectlDepartType();
        this.selectBranchList();
    },
    mounted(){
        this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height - 48;
        window.addEventListener('resize', () => {//动态调整高度
            this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height - 48;
        })
    },
    methods: {
        //查询部门类型
        selectlDepartType(){
            this.$httpGet(`/depart/selectDepartType`)
                .then((res) => {
                    console.log("返回结果"+res.data);                
                    if(res.data){
                        this.lDepartTypeArr=res.data;
                    }                
                })
        },
        //部门表格页码改变时的回调
        pageNumChange (page){
            this.pageNum = page;
            this.selectBranchInfo();
        },
        //部门表格每页数据条数改变时的回调
        pageSizeChange (pageSize){
            this.pageSize = pageSize;
            this.selectBranchInfo();
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
        //查询部门信息
        selectBranchInfo(pageNum){
            let pageNumber=this.pageNum;
            if(pageNum){
                pageNumber=1
            }else{
                pageNumber=this.pageNum;
            }
            this.loading=true;
            this.$httpGet(`/depart/selectTAuthDepartInfos?vcDepartName=${this.branchName}&pageNum=${pageNumber}&pageSize=${this.pageSize}`)
                .then((res) => {
                    console.log("返回结果"+res.data);                
                    if(res.data){
                        this.data=res.data.list;
                        this.totalSize=res.data.total;
                        this.timer=false;
                        this.loading=false;
                    }                
                })
        },
        //查询部门列表
        selectBranchList(){
            this.$httpGet(`/depart/selectDepartInfos`)
                .then((res) => {
                    console.log("返回结果"+res.data);                
                    if(res.data){
                        this.branchList=res.data;
                    }                
                })
        },
        create(){
            this.modalShow=true;
        },
        edit(){
            if(this.selectArr.length>1){
                this.$Message.warning("最多只能选中一条记录进行编辑");
            }else if(this.selectArr.length<1){
                this.$Message.warning("请选中一条记录进行编辑");
            }else{
                this.updateModalShow=true;
                this.updateFormValidate.id=this.selectRow.id;
                this.updateFormValidate.vcDepartName=this.selectRow.vcDepartName;
                this.updateFormValidate.lParentDepartId=this.selectRow.lParentDepartId;
                this.updateFormValidate.lDepartType=this.selectRow.lDepartType;
                this.updateFormValidate.cStatus=this.selectRow.cStatus;
            }
        },
        //删除部门
        del(){
            let ids=[];
            ids=this.selectArr;
            if(this.selectArr.length<1){
                this.$Message.warning("请选中要删除的记录");
            }else{
                this.$httpPost('/depart/deleteTAuthDepartInfo',{ids:ids})
                    .then((res)=>{
                        if(res.data.actionResult==1){
                            this.$Message.success(res.data.data);
                            this.selectBranchInfo();
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
                    this.$httpPost('/depart/saveTAuthDepartInfo',this.formValidate)
                        .then((res)=>{
                            if(res.data.actionResult==1){
                                this.$Message.success(res.data.data);
                                this.$refs[name].resetFields();
                                this.selectBranchInfo('1');
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
            this.$refs.userTable.selectAll(false);
            this.$refs[name].resetFields();
        },
        //"编辑"弹框中确认
        okUpdate(name) {              
            this.$refs[name].validate((valid) => {
                if (valid) {
                    //console.log("编辑form为"+this.formValidateUpdata);
                    this.$httpPost('/depart/saveTAuthDepartInfo',this.updateFormValidate)
                        .then((res)=>{
                            if(res.data.actionResult==1){
                                this.$Message.success(res.data.data);
                                this.selectArr=[];
                                this.selectRow={};
                                this.$refs[name].resetFields();
                                this.selectBranchInfo('1');
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
            this.$refs.branchTable.selectAll(false);
            this.$refs[name].resetFields();
        }
    }
}
</script>
<style scoped>

/*table相关样式*/
.table-wrapper-height{/*table高度*/
    height:100%
}
.table-wrapper{
    height: calc(100% - 30px);
}

</style>


