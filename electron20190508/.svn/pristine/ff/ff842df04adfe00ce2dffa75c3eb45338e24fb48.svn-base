<template>
    <Row class="wrapper" :gutter="5">        
        <Col span="6" class="tree-wrapper-height">
            <div class="func-wrapper bg-none2">
                <span class="section-title">数据权限</span>
                <label for="">&nbsp;筛选:&nbsp;</label>
                <Input class="section-search" size="small" @on-change="selectUserDefineRight" v-model="accountName" placeholder="账户名或首字母" clearable style="width:100px;"/>
                <Button type="primary" size="small" @click="saveRight">保存</Button>
            </div>
            <!-- <div class="table-wrapper tree-wrapper">
                <DatarightTree ref="tree" :load-data="addContent" :data="treeData" show-checkbox :empty-text="emptyText" :height="tableHeight"></DatarightTree>
                <Spin size="large" fix v-if="showSpin"></Spin>
            </div> -->
            <Scroll :height='treeHeight' :loading-text="treeLoadingText" :on-reach-bottom="handleReachBottom" class="table-wrapper tree-wrapper" style="height:calc(100% - 36px);">
                <DatarightTree ref="tree" :load-data="addContent" :data="treeData" show-checkbox :empty-text="emptyText" :height="tableHeight"></DatarightTree>
            </Scroll>
            <Spin size="large" fix v-if="showSpin"></Spin>
        </Col>
        <Col span="12" class="table-wrapper-height">
            <div class="func-wrapper bg-none2">
                <span class="section-title">自定义分组</span>
                <label for="">&nbsp;筛选:&nbsp;</label>
                <Input class="section-search" size="small" v-model="userName" :placeholder="placeholder" @on-change="selectTPortInfofo" clearable/>
                <!-- <ButtonGroup>
                    <Button type="primary" size="small" @click="add">新建</Button>
                    <Button type="primary" size="small" @click="del">删除</Button>
                </ButtonGroup> -->
                <!--<ButtonGroup>
                    <Button type="primary" size="small" @click="refresh">刷新</Button>
                    <Button type="primary" size="small" @click="edit">编辑</Button>
                    <Button type="primary" size="small" @click="save">保存</Button>
                    <Button type="primary" size="small" @click="cancel">取消</Button>
                </ButtonGroup>-->
            </div>
            <div class="table-wrapper center-table" ref="tableWrap">
                <Table  stripe highlight-row ref="selection" :columns="tableColumns" :data="tableData" @on-current-change="singleSelect" :height="tableHeight"></Table>
            </div>
            <Page size="small" :total="totalSize" :current="pageNum" @on-page-size-change="pageSizeChange" @on-change="pageNumChange" :page-size="pageSize" :page-size-opts="pageOpts" show-total show-elevator show-sizer></Page>
        </Col>
        <Col span="6" class="tree-wrapper-height">
            <div class="func-wrapper bg-none2">
                <span class="section-title">已有数据权限</span>
                <Button type="primary" size="small" @click="delRight">删除</Button>
            </div>
            <div class="table-wrapper tree-wrapper right-tree">
                <DatarightTreeTwo ref="hasRightTree" :load-data="addHasRightContent" :data="treeHasRightData" show-checkbox :empty-text="emptyHasRightText" :height="tableHeight"></DatarightTreeTwo>
                <Spin size="large" fix v-if="showHasRightSpin">
                    <!-- <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                    <div>加载中...</div> -->
                </Spin>
            </div>
        </Col>
        <!-- <Modal
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
                    <FormItem label="父ID" prop="lPid">
                        <Select v-model="formValidate.lPid">
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
        </Modal> -->
    </Row>
</template>
<script>
//import UpdateTree from '../busitree/index.js'
import DatarightTree from '../datarighttree/index.js'
import DatarightTreeTwo from '../datarighttree2/index.js'
import DefineGroExpand from './DefineGroupComponent/DefineGroExpand.vue'
export default {
    name:'page_196',
    data () {
        return {
            //modal相关状态
            // modalShow:true,
            // modalLoading:true,

            portTypeInfos:[],
            //tree加载状态
            accountName:'',
            treeLoadingText:'加载中',
            leftTreePageNum:1,
            //tree加载状态
            showSpin:false,
            showHasRightSpin:false,
            emptyText:'请选择自定义分组',
            emptyHasRightText:'请选择自定义分组',
            //半选数组
            indeterminateItemArr:[],
            //全选数组
            selectItemArr:[],
            //自定义分组id
            userDefineId:-100,
            //分页数据
            pageSize:30,
            totalSize:null,
            pageNum:1,
            pageOpts:[30,40,50],
            tableHeight:500,
            userName:'',
            placeholder:'请输入分组名称',
            tableColumns: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(DefineGroExpand, {
                            props: {
                                row: params.row,
                                portTypeInfos:this.portTypeInfos
                            },
                            on: {
                                    sumbitSuccess: () => {
                                            this.selectTPortInfofo()
                                        }
                                    }
                        })
                    }
                },
                {
                    title: '分组编号',
                    key: 'id',
                    minWidth:120
                },
                {
                    title: '分组名称',
                    key: 'vcPortName',
                    minWidth:160
                },
                {
                    title: '分组类型',
                    key: 'vcTypeName',
                    minWidth:120
                },
                {
                    title: '分组层级',
                    key: 'lPortLevel',
                    minWidth:120
                },
                {
                    title: '考核基准类型',
                    key: 'lBenchmarkType',
                    minWidth:120
                },
                {
                    title: '基准规模',
                    key: 'enBaseScala',
                    minWidth:120
                },
                {
                    title: '创建时间',
                    key: 'tsCreateTime',
                    minWidth:160
                },
                {
                    title: '修改时间',
                    key: 'tsModifyTime',
                    minWidth:160
                }
            ],
            tableData: [],
            treeData: [],
            treeHasRightData:[]
        }
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
    created(){
        this.selectTPortInfofo();
        this.selectTPortTypeInfos();
    },
    methods: {
        // //"新增"自定义分组
        // add(){
        //     this.modalShow=true;
        // },
        // //"删除"自定义分组
        // del(){

        // },
        // //弹框"确定"
        // ok(name){

        // },
        // //弹框"取消"
        // cancel(name){

        // },
        //tree到达底部时触发懒加载
        handleReachBottom(){
            return new Promise(resolve => {
                //setTimeout(() => {
                    this.emptyText="";
                    this.leftTreePageNum++;
                    //this.$httpGet(`/man/selectJurisdictionTree?vcFundName=${this.accountName}&pageNum=${this.leftTreePageNum}&vcUserId=${this.userId}&cManagerId=${this.cManagerId}`)
                    this.$httpGet(`/pmo/selectJurisdictionTree?vcFundName=${this.accountName.toUpperCase()}&lPortId=${this.userDefineId}&pageNum=${this.leftTreePageNum}`) 
                        .then((res) => {
                            if(res.data && res.data.length>0){
                                res.data.forEach((item) => {
                                    this.treeData.push(item);
                                })                                                               
                            }   
                            if(res.data.length<30){
                                this.treeLoadingText="已加载完毕";
                            }             
                        })
                    resolve();
                //}, 2000);
            });           
        },
        //异步加载tree
        addContent(item,callback){
            //this.types=item.type;
            //this.selectedId=item.id;
            let combiType=item.type;
            //if(this.types==1 || this.types==2){
                this.$httpGet(`/pmo/selectJurisdictionTree?lPortId=${this.userDefineId}&type=${item.type}&id=${item.id}`)
                    .then((res) => {             
                        if(res.data){
                            callback(res.data);
                            //若父级选中，则子级都选中
                            if(item.checked){
                                for(let j=0;j<item.children.length;j++){
                                    item.children[j].checked=true;
                                }
                            }
                            //如果是资产单元,删除其子级组合的loading
                            if(combiType==2){
                                for(let j=0;j<item.children.length;j++){
                                    delete item.children[j].loading;
                                }
                            }
                        }                
                    })
            //}
        },
        //异步加载已有权限tree
        addHasRightContent(item,callback){
            //this.types=item.type;
            //this.selectedId=item.id;
            let combiType=item.type;
            //if(this.types==1 || this.types==2){
                this.$httpGet(`/pmo/selectHaveJurisdictionTree?lPortId=${this.userDefineId}&type=${item.type}&id=${item.id}`)
                    .then((res) => {             
                        if(res.data){
                            callback(res.data);
                            //若父级选中，则子级都选中
                            if(item.checked){
                                for(let j=0;j<item.children.length;j++){
                                    item.children[j].checked=true;
                                }
                            }
                            //如果是资产单元,删除其子级组合的loading
                            if(combiType==2){
                                for(let j=0;j<item.children.length;j++){
                                    delete item.children[j].loading;
                                }
                            }
                        }                
                    })
            //}
        },
        //保存部门权限
        saveRight(){
            //获取半选状态
            // this.indeterminateItemArr=[];
            // let halfItems=this.$refs.tree.getIndeterminateNodes();
            // for(let j=0;j<halfItems.length;j++){
            //     let objHalf={};
            //     objHalf.id=halfItems[j].id;
            //     objHalf.pId=halfItems[j].pId;
            //     objHalf.type=halfItems[j].type;
            //     this.indeterminateItemArr.push(objHalf);
            // }
            //获取所有选中的
            this.selectItemArr=[];
            let selectedItems=this.$refs.tree.getCheckedNodes();
            for(let i=0;i<selectedItems.length;i++){
                let obj={};
                obj.id=selectedItems[i].id;
                obj.type=selectedItems[i].type;
                obj.pId=selectedItems[i].pId;
                this.selectItemArr.push(obj);     
            }
            if(this.userDefineId==-100){
                this.$Message.warning("请选择要授权的自定义分组！");
            }else{
                //this.$httpPost('/port/saveTPortMapO3',{"list":this.treeData,"tPortO3MapInfoVo":{"branches":this.selectItemArr,"halfBranches":this.indeterminateItemArr,"lPortId":this.userDefineId}})
                this.$httpPost('/pmo/saveTPortMapO3',{"list":this.treeData,"tPortO3MapInfoVo":{"branches":this.selectItemArr,"lPortId":this.userDefineId}})
                    .then((res)=>{
                        if(res.data.actionResult==1){
                            this.$Message.success(res.data.data);
                            this.selectUserDefineRight();
                            this.selectUserHasDefineRight();
                        }else{
                            this.$Message.warning(res.data.data);
                        }
                    })
                    .catch(err => console.log('错误信息为:'+err))
            }
        },
        //删除部门权限
        delRight(){
            //获取所有选中的
            let selectItemArr=[];
            let selectedItems=this.$refs.hasRightTree.getCheckedNodes();
            for(let i=0;i<selectedItems.length;i++){
                let obj={};
                obj.id=selectedItems[i].id;
                obj.type=selectedItems[i].type;
                obj.pId=selectedItems[i].pId;
                selectItemArr.push(obj);     
            }
            if(this.userDefineId==-100){
                this.$Message.warning("请选择要授权的自定义分组！");
            }else{
                //this.$httpPost('/port/saveTPortMapO3',{"list":this.treeData,"tPortO3MapInfoVo":{"branches":this.selectItemArr,"halfBranches":this.indeterminateItemArr,"lPortId":this.userDefineId}})
                this.$httpPost('/pmo/deleteTPortMapO3',{"list":this.treeHasRightData,"tPortO3MapInfoVo":{"branches":selectItemArr,"lPortId":this.userDefineId}})
                    .then((res)=>{
                        if(res.data.actionResult==1){
                            this.$Message.success(res.data.data);
                            this.selectUserDefineRight();
                            this.selectUserHasDefineRight();
                        }else{
                            this.$Message.warning(res.data.data);
                        }
                    })
                    .catch(err => console.log('错误信息为:'+err))
            }
        },
         //单选自定义分组行高亮时，获取userID
        singleSelect(currentRow,oldCurrentRow){
            this.userDefineId=currentRow.id;
            this.selectUserDefineRight();
            this.selectUserHasDefineRight();
        },
        //查询自定义分组权限
        selectUserDefineRight(){
            if(this.userDefineId==-100){//若没选择用户
                this.$Message.warning("请选择要授权的分组！");
            }else{
                this.emptyText="";
                this.showSpin=true;
                this.$httpGet(`/pmo/selectJurisdictionTree?vcFundName=${this.accountName.toUpperCase()}&lPortId=${this.userDefineId}`)
                    .then((res) => {
                        if(res.data){
                            this.treeData=res.data;
                            this.showSpin=false;
                            if(this.emptyText.length==0){
                                this.emptyText="该自定义分组暂无权限";
                            }
                        }                
                    })
            }
        },
        //查询自定义分组已有权限
        selectUserHasDefineRight(){
            this.emptyHasRightText="";
            this.showHasRightSpin=true;
            this.$httpGet(`/pmo/selectHaveJurisdictionTree?lPortId=${this.userDefineId}`)
                .then((res) => {
                    if(res.data){
                        this.treeHasRightData=res.data;
                        this.showHasRightSpin=false;
                        console.log(this.treeHasRightData.length==0);
                        if(this.treeHasRightData.length==0){
                            this.emptyHasRightText="该自定义分组暂无权限";
                        }
                    }                
                })
        },
        //请求自定义分组数据
        selectTPortInfofo(){
            this.loading=true;
            this.$httpGet(`/port/selectTPortInfos?vcPortName=${this.userName}&pageNum=${this.pageNum}&pageSize=${this.pageSize}`).then((res) => {
                this.tableData=res.data.list;
                this.totalSize=res.data.total;
                console.log("hjglkhfkdh" + res.data)
                this.loading=false;
            })
        },
          //页码改变时的回调
        pageNumChange (page){
            this.pageNum = page;
            this.selectTPortInfofo();
        },
        //每页数据条数改变时的回调
        pageSizeChange (pageSize){
            this.pageSize = pageSize;
            this.selectTPortInfofo();
        },
        refresh(){
            this.selectTPortInfofo();
        },
        // 请求分组类型
         selectTPortTypeInfos(){
            this.$httpGet('/pti/selectTPortTypeInfos').then((res) => {
                console.log("分组类型")
                console.log(res.data)
                this.portTypeInfos= res.data;
            })
        },
       
    },
    components:{
        DatarightTree,
        DatarightTreeTwo,
        DefineGroExpand
    }
}
</script>
<style scoped>
.wrapper{
    height: 100%;
}
 /*table、tree相关样式*/
.table-wrapper-height,.tree-wrapper-height{
    height:100%;
}
.center-table{
    height:calc(100% - 72px);
} 
.center-table .ivu-table-wrapper{
    height: 100%;
}
.tree-wrapper{
    overflow-y: auto;
}
/* 右侧tree的高度 */
.right-tree{
    height: calc(100% - 37px);
}
</style>


