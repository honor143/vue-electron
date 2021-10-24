<template>
    <div class="content-info">
        <div class="tree-wrapper">
            <!-- <div style="margin-top: 6px">
                <Input size="small" :value="bondshortname" placeholder="债券简称" style="width: auto">
                    <Icon type="ios-search" slot="suffix" />
                </Input>
            </div> -->
            <div>
                <h3 style="margin-top:10px;">交易员列表</h3>
                <div  class="align-left">
                    <!-- <Tree :data="traderlisttree" @on-select-change="getSelectedTreeItem"></Tree> -->
                    <DbclickTree :data="traderlisttree" @on-dbclick-change="dbclickTree"></DbclickTree>
                </div>                   
            </div>
        </div>
        <div class="content-wrapper" style="margin-top:5px;">
            <div class="header-right" style="position:absolute;z-index:22;top:0px;right:260px;">
                <Button size="small" type="primary" @click="selectBondInfo">刷新</Button>
                <Dropdown trigger="custom" v-if="userButtonRoles.updateBondTraders_10_16" :visible="visible" style="margin-right: 20px">
                    <b @click="handleOpen" style="cursor:pointer;">
                        选择交易员
                        <Icon type="ios-arrow-down"></Icon>
                    </b>
                    <DropdownMenu slot="list">
                        <Select v-model="traderSelected" placeholder="请选择">
                            <Option v-for="item in traderlist" :value="item.id" :key="item.id">{{ item.vcDisplayName }}</Option>
                        </Select>
                        <div style="text-align: right;margin-top:10px;">
                            <Button type="primary" size="small" @click="visible=false">关闭</Button>
                            <Button type="primary" size="small" @click="handleConfirm">确定</Button>
                        </div>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <Tabs :animated="true" type="card">               
                <TabPane label="债券招投标">
                    <!-- <div class="info-header"> -->
                        <!-- <div class="header-left">债券招投标 | 新股申购</div> -->
                    <!-- </div> -->
                    <Table :loading="bondTableLoading" stripe highlight-row  :height="258" :columns="bondInfoColumns" :data="bondInfoData" @on-selection-change="bondInfoSelection"></Table>
                    <Page style="margin-bottom:5px;" size="small" :total="totalSize" :current="pageNum" @on-page-size-change="pageSizeChange" @on-change="pageNumChange"
                        :page-size="pageSize" :page-size-opts="pageOpts" show-total show-elevator show-sizer>
                    </Page>
                </TabPane>
                <TabPane label="新股申购"></TabPane>
            </Tabs>
            <div style="position:absolute;z-index:22;top:326px;right:260px;">
                <label for="">账户类型</label>
                <Select size="small" v-model="dicFund" style="width:80px;" @on-change="selectFund">
                    <Option v-for="item in dicFundList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <label for="">投资经理</label>
                <Select size="small" v-model="dicManager" style="width:80px;" @on-change="selectManager">
                    <Option v-for="item in dicManagerList" :value="item.id" :key="item.id">{{ item.vcDisplayName }}</Option>
                </Select>
                <Button size="small" type="primary" @click="clearSelect">清空筛选</Button>
                <Button size="small" type="primary" @click="selectingRule">查询</Button>
                <!-- <ButtonGroup>
                    <Button size="small" type="primary" v-if="userButtonRoles.distributeInstruct_10_2" @click="back">退回</Button>
                    <Button size="small" type="primary" v-if="userButtonRoles.distributeInstruct_10_2" @click="distributing">分发</Button>
                </ButtonGroup> -->
            </div>

            <Tabs :animated="true" class="rule-tab" type="card">               
                <TabPane label="待分发指令">
                    <div class="table-wrapper" ref="tableWrap">
                        <Table stripe highlight-row :loading="issueOrderLoading" :height="returnTableHeight" :columns="distributColumns" :data="waitDistributData" @on-selection-change="waitSelection"></Table>
                        <Page size="small" :total="totalSizeWait" :current="pageNumWait" @on-page-size-change="pageSizeChangeWait" @on-change="pageNumChangeWait"
                            :page-size="pageSizeWait" :page-size-opts="pageOptsWait" show-total show-elevator show-sizer>
                        </Page>
                    </div>
                </TabPane>
                <TabPane label="已分发指令">
                    <div class="table-wrapper" ref="tableWrap">
                        <Table stripe highlight-row :loading="issueOrderLoading" :height="returnTableHeight" :columns="distributedColumns" :data="hasDistributData" @on-selection-change="hadSelection"></Table>
                        <Page size="small" :total="totalSizeWaited" :current="pageNumWaited" @on-page-size-change="pageSizeChangeWaited" @on-change="pageNumChangeWaited"
                            :page-size="pageSizeWaited" :page-size-opts="pageOptsWaited" show-total show-elevator show-sizer>
                        </Page>
                    </div>
                </TabPane>
            </Tabs>
        </div>
        <div class="right-wrapper" style="overflow-y:hidden;height:100%;">
            <div class="info-header" style="height:29px;">
                <div style="padding-left:5px;">分发规则
                    <Input type="text" clearable v-model="disrule" size="small" placeholder="请输入" @on-change="selectDisRule" style="width:120px"></Input>
                </div>               
            </div>
            <Table stripe highlight-row
                @on-row-click="clickRowRule"
                @on-current-change="highLightRowRule"
                :height="259" 
                :columns="distributRulesColumns" :data="distributRulesData">
            </Table>
            <div class="info-header" style="height:36px;padding:5px;background:rgba(66, 66, 66, 0.1);">
                <div>
                    <ButtonGroup>
                        <Button size="small" type="primary" v-if="userButtonRoles.distributeRuleSorting_10_3" @click="upRule">上移</Button>
                        <Button size="small" type="primary" v-if="userButtonRoles.distributeRuleSorting_10_3" @click="downRule">下移</Button>
                    </ButtonGroup>
                </div>
                <div>
                    <ButtonGroup>
                        <Button size="small" type="primary" v-if="userButtonRoles.insertDistributionRule_10_4" @click="addDisRule">新增</Button>
                        <Button size="small" type="primary" v-if="userButtonRoles.updateDistributionRule_10_17" @click="editRule">修改</Button>
                        <Button size="small" type="primary" v-if="userButtonRoles.deleteDistributionRule_10_1" @click="delDisRule">删除</Button>
                    </ButtonGroup>
                </div>
            </div>
            <!-- <div class="info-header">自动分发规则描述</div> -->
            <!-- <h3 class="align-left">自动分发规则描述</h3> -->
            <div class="sec-header align-left">
                <h3 style="padding-top:0;top:4px;">自动分发规则描述</h3>
            </div>
            <div class="rule-descrip card-bg" style="height:calc(100% - 361px);">
                <p>指令到达后应用如下规则：</p>
                <div>如果指令：</div>
                <div class="descrip-text">
                    <!-- <p>交易类型：<span>{{item.vcDicName==='交易类型'?item.vcValueName:'不限'}}</span></p>
                    <p>账户类型：<span>{{item.vcDicName==='账户类型'?item.vcValueName:'不限'}}</span></p>
                    <p>来自账户：<span>{{item.vcDicName==='交易类型'?item.vcValueName:'不限'}}</span></p>
                    <p>交易场所：<span>{{item.vcDicName==='交易场所'?item.vcValueName:'不限'}}</span></p>
                    <p>证券大类：<span>{{item.vcDicName==='证券大类'?item.vcValueName:'不限'}}</span></p>
                    <p>证券细类：<span>{{item.vcDicName==='证券细类'?item.vcValueName:'不限'}}</span></p> -->

                    <p>交易类型：<span>{{ruleDesc.tradeType}}</span></p>
                    <p>账户类型：<span>{{ruleDesc.fundType}}</span></p>
                    <!-- <p>来自账户：<span>{{item.vcDicName==='交易类型'?item.vcValueName:'不限'}}</span></p> -->
                    <p>交易场所：<span>{{ruleDesc.tradeMarket}}</span></p>
                    <p>证券大类：<span>{{ruleDesc.bondType1}}</span></p>
                    <p>证券细类：<span class="elipse wid130" :title="ruleDesc.bondType2">{{ruleDesc.bondType2}}</span></p>

                    <!-- <p v-for="(item,index) in distributRulesDescData">交易类型：<span>{{item.vcDicName==='交易类型'?item.vcValueName:'不限'}}</span></p> -->
                </div>
                <div>分发给：</div>
                <div class="descrip-text">
                    <p>交易员：<span>{{ruleDesc.trader}}</span></p>
                </div>

            </div>
        </div>

        <Modal
            width="600"
            v-model="modalShow"
            :title="modalTitle"
            :loading="modalLoading"
            @on-ok="ok('addRuleForm')"
            @on-visible-change="cancel"
            >
            <div class="modal-wraper" v-if="modalTitle==='修改'|| modalTitle==='新增'">
                <Form ref="addRuleForm" :model="addRuleForm" :rules="addRuleFormValidate" :label-width="100" label-position="right">
                    <FormItem label="规则名称" prop="rulename">
                        <Input v-model="addRuleForm.rulename" placeholder="请输入" />
                    </FormItem>
                    <div v-for="(items,index) in ruleDictionary">
                        <FormItem :label="items.vcName" :prop="propsArr[index]">
                            <!-- <Select v-model="items.vcValue" :multiple="items.vcName=='证券细类'" @on-change="items.vcName=='证券大类'?selectSubclass(items.vcValue):''" placeholder="不限" clearable> -->
                            <Select v-model="items.vcValue" :multiple="items.vcName=='证券细类'" placeholder="不限" clearable>
                                <Option v-for="item in items.children" :value="item.id" :key="item.id">{{ item.vcName }}</Option>
                            </Select>
                        </FormItem>
                    </div>
                    <FormItem label="分发给"></FormItem>
                    <FormItem label="交易员" prop="trader">
                        <Select v-model="addRuleForm.trader" placeholder="请选择">
                             <Option v-for="(item,index) in traderlist" :value="item.id" :key="item.id" v-if="index>0">{{ item.vcDisplayName }}</Option>
                        </Select>
                    </FormItem>
                </Form>                
            </div>
        </Modal>  
         <Refresh @refresh="refresh"></Refresh>      
    </div>
</template>
<script>
import Refresh from '../Refresh.vue'
import {selectUserAuth} from '../../Api/common.js';
import DbclickTree from './dbclicktree/index.js';
export default {
    name:'page_10',
    data(){
        return{
            issueOrderLoading:false,
            //规则描述
            ruleDesc:{
                tradeType:'不限',
                fundType:'不限',
                tradeMarket:'不限',
                bondType1:'不限',
                bondType2:'不限',
                trader:''
            },
            //"债券招投标"分页数据
            pageSize:30,
            totalSize:0,
            pageNum:1,
            pageOpts:[10,20,30],
            //“待分发指令”分页数据
            pageSizeWait:30,
            totalSizeWait:0,
            pageNumWait:1,
            pageOptsWait:[10,20,30],
            //“已分发指令”分页数据
            pageSizeWaited:30,
            totalSizeWaited:0,
            pageNumWaited:1,
            pageOptsWaited:[10,20,30],
            //高亮回显
            highlightSign:'',
            //权限‘按钮’控制
            userButtonRoles:{
                updateBondTraders_10_16:false,//设置债券交易员
                distributeInstruct_10_2:false,//分发
                distributeRuleSorting_10_3:false,//上、下移 
                insertDistributionRule_10_4:false,//新增
                updateDistributionRule_10_17:false,//修改
                deleteDistributionRule_10_1:false//删除
            },
            bondTableLoading:false,
            //下拉菜单
            visible:false,
            traderSelected:'',

            //要修改的属性集合
            editSelectArr:[],
            //弹框的验证属性
            propsArr:['val0','val1','val2'],
            //规则字典
            ruleDictionary:[],

            hidelOrder:0,
            hidelStatus:0,
            addRuleForm:{
                rulename:'',
                trader:''
            },
            addRuleFormValidate:{
                rulename:[{ required: true,message:'请输入交易规则'}],
                val0:[{ required: false,triger:'change'}],
                val1:[{ required: false}],
                val2:[{ required: false}],
                trader:[{ required: true,message:'请选择交易员'}]
            },
            rulenamelist:[],
            tradetypelist:[],
            fundtypelist:[],
            fromfundlist:[],
            tradesitelist:[],
            bondtypelist:[],
            bonddetailtypelist:[],

            bondInfoSelectionArr:[],
            waitSelectionArr:[],
            hadSelectionArr:[],
            //模态框
            modalShow:false,
            modalTitle:'',
            modalLoading:true,
            //账户类型
            dicFund:'',
            dicFundList:[],
            dicManager:'',
            dicManagerList:[],
            state1:0,//待发
            state2:1,//已发
            //分发规则
            selectedRow:[],
            selectRuleName:'',
            lOrder:0,
            disrule:'',
            bondshortname:'',
            bondInfoColumns:[
                {
                    type:'selection',
                    width:40
                },
                {
                    title: '债券代码',
                    width:70,
                    key: 'vcCode'
                },
                {
                    title: '债券名称',
                    minWidth:120,
                    ellipsis:true,
                    tooltip:true,
                    key: 'vcSname'
                },
                // {
                //     title: '市场',
                //     key: 'vcMarketName'
                // },
                {
                    title: '债券类别',
                    minWidth:60,
                    key: 'vcBondTypeName'
                },
                {
                    title: '投标截止时间',
                    key: 'tsBidDeadline',
                    width:140,
                },
                {
                    title: '追加投标截止时间',
                    key: 'tsAddBidDeadline',
                    width:140,
                },
                {
                    title: '外部评级',
                    key: 'vcCreditRating',
                    width:80,
                },
                {
                    title: '交易员',
                    key: 'vcDisplayname',
                    width:60,
                }

            ],
            bondInfoData:[],
            tableHeight:300,
            distributColumns:[
                {
                    type:'selection',
                    minWidth:40
                },
                 {
                    title: '交易类型',
                    key: 'vcTypeName',
                    minWidth:60
                },
                {
                    title: '账户名称',
                    key: 'vcFundName',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:60
                   
                },
                {
                    title: '组合名称',
                    key: 'vcCombiName',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:60
                },
                {
                    title: '证券名称',
                    key: 'vcSname',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:60
                },
                {
                    title: '证券代码',
                    key: 'vcCode',
                    minWidth:60
                },
                {
                    title: '市场',
                    key: 'vcMarketName',
                    minWidth:60
                },
                {
                    title: '指令数量',
                    key: 'lAmount',
                    minWidth:60
                },
                // {
                //     title: '指令价格',
                //     key: 'enPrice',
                //     minWidth:60
                // },
                {
                    title: '下达人',
                    key: 'vcDisplayName',
                    minWidth:60
                }
            ],
            distributedColumns:[
                // {
                //     type:'selection',
                //     minWidth:40
                // },
                 {
                    title: '交易类型',
                    key: 'vcTypeName',
                    minWidth:60
                },
                {
                    title: '账户名称',
                    key: 'vcFundName',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:60
                   
                },
                {
                    title: '组合名称',
                    key: 'vcCombiName',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:60
                },
                {
                    title: '证券名称',
                    key: 'vcSname',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:60
                },
                {
                    title: '证券代码',
                    key: 'vcCode',
                    minWidth:60
                },
                {
                    title: '市场',
                    key: 'vcMarketName',
                    minWidth:60
                },
                {
                    title: '指令数量',
                    key: 'lAmount',
                    minWidth:60
                },
                // {
                //     title: '指令价格',
                //     key: 'enPrice',
                //     minWidth:60
                // },
                {
                    title: '下达人',
                    key: 'vcDisplayName',
                    minWidth:60
                }
            ],
            waitDistributData:[],
            hasDistributData:[],

            traderlist:[],
            traderlisttree:[],
            selectedTrader:'',
            distributRulesColumns:[
                {
                    title:'是否生效',
                    align: 'left',
                    width:60,
                    render: (h, params) => {
                        const row = params.row;
                        const color = row.lStatus === null ?'' : row.lStatus === 1?'green':'red';
                        const type = row.lStatus === null ?'' : row.lStatus === 1?'ios-checkmark-circle':'ios-close-circle';
                        return h('Icon', {
                            props: {
                                type: type,
                                color: color,
                                size: 18
                            },
                            on:{
                                click: (val) => {
                                    let status;
                                    if(row.lStatus===0){
                                        status=1;
                                    }else if(row.lStatus===1){
                                        status=0;
                                    }
                                    this.setRuleStatus(row.vcName,status);
                                }

                            }
                        });
                    }
                },
                {
                    title: '分发规则',
                    align: 'left',
                    key: 'vcName',
                    minWidth:60
                }
            ],
            distributRulesData:[],
            //分发规则描述
            distributRulesDescData:[]    
        }
    },
    computed: {
        //返回table的动态高度
        returnTableHeight () {
            return this.tableHeight;
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            // 在路由跳转之前获取pageId
            console.log(to.query)
            vm.pageId = to.query.pageId;
            var SelectUserAuth =  selectUserAuth.bind(vm);
            SelectUserAuth();
        })
    },
    created(){
        this.selectTraderListTree();
        this.selectTraderList();
        this.selectBondInfo();
        this.selectdicFundList();
        this.selectdicManagerList();
        this.selectDisRule(); 
        // if(this.distributRulesData.length>0){
        //     this.distributRulesData[0]._highlight=true;
        //     this.selectDisRuleDesc(this.distributRulesData[0].vcName);
        // }       
        this.selectRuleDictionary();
        this.selectWaitDisRule();
        this.selectHadDisRule();
    },
    mounted(){
        //查询后保持回显
        if(this.distributRulesData.length>0){
            this.distributRulesData.forEach((item)=>{
                if(item._highlight===true){
                    this.selectRuleName=item.vcName;
                    ///item._highlight=true;
                }
            })
        }
        this.$nextTick(() => {
               this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height - 36;
               
            })
        window.addEventListener('resize', () => {//动态调整高度
            this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height - 36;
        })
    },
    methods:{
        //根据证券大类
        // selectSubclass(val){
        //     console.log(val);
        // },
        // 组件数据刷新
        refresh(){
            this.dicFund='';
            this.dicManager='';
            this.disrule='';
            this.selectTraderListTree();
            this.selectTraderList();
            
            this.selectBondInfo();
            this.selectdicFundList();
            this.selectdicManagerList();
            this.selectDisRule();        
            this.selectRuleDictionary();
            this.selectWaitDisRule();
            this.selectHadDisRule();
        },       
        selectFund(val){
            this.dicFund=val;
            console.log(val);
        },
        selectManager(val){
            this.dicManager=val;
        },
        //“债权招投标”页码改变时的回调
        pageNumChange (page){
            this.pageNum = page;
            this.selectBondInfo();
        },
        //“债权招投标”每页数据条数改变时的回调
        pageSizeChange (pageSize){
            this.pageSize = pageSize;
            this.selectBondInfo();
        },
          //“待分发指令”页码改变时的回调
        pageNumChangeWait (page){
            this.pageNumWait = page;
            this.selectWaitDisRule();
        },
        //“待分发指令”每页数据条数改变时的回调
        pageSizeChangeWait (pageSize){
            this.pageSizeWait = pageSize;
            this.selectWaitDisRule();
        },
          //“已分发指令”页码改变时的回调
        pageNumChangeWaited (page){
            this.pageNumWaited = page;
            this.selectHadDisRule();
        },
        //“已分发指令”每页数据条数改变时的回调
        pageSizeChangeWaited (pageSize){
            this.pageSizeWaited = pageSize;
            this.selectHadDisRule();
        },
        //选择交易员“打开”
        handleOpen () {
            if(this.bondInfoSelectionArr.length<1){
                this.$Message.warning('请选择债券');
            }else{
                this.visible = true;
            }            
        },
        //选择交易员“确定”
        handleConfirm () {                        
            let codeArr=[];
            for(let i=0;i<this.bondInfoSelectionArr.length;i++){
                codeArr.push(this.bondInfoSelectionArr[i].vcCode);
            }
            this.$httpGet(`/instructDis/updateBondTraders?vcCode=${codeArr}&vcUserId=${this.traderSelected}`)
            .then((res) => {            
                if(res.status===200 && res.data.actionResult===1){
                    this.$Message.success(res.data.data);
                    this.visible = false;
                    this.selectBondInfo();
                }else{
                    this.$Message.warning(res.data.data);
                }                
            })
        },
        //查询待分发
        selectWaitDisRule(){
            this.dicFund=this.dicFund==undefined?'':this.dicFund;
            this.dicManager=this.dicManager==undefined?'':this.dicManager;
            this.issueOrderLoading=true;
            this.$httpGet(`/instructDis/selectInstructionsDistribute?dicFund=${this.dicFund}&dicManager=${this.dicManager}&state=${this.state1}&pageNum=${this.pageNumWait}&pageSize=${this.pageSizeWait}`)
                .then((res) => {            
                    if(res.status===200 && res.data){
                        this.waitDistributData=res.data.list;
                        this.totalSizeWait=res.data.total;
                        this.issueOrderLoading=false;
                    }                
                })
        },
        //查询已分发
        selectHadDisRule(){
            this.dicFund=this.dicFund==undefined?'':this.dicFund;
            this.dicManager=this.dicManager==undefined?'':this.dicManager;
            this.issueOrderLoading=true;
            this.$httpGet(`/instructDis/selectInstructionsDistribute?dicFund=${this.dicFund}&dicManager=${this.dicManager}&state=${this.state2}&pageNum=${this.pageNumWaited}&pageSize=${this.pageSizeWaited}`)
                .then((res) => {            
                    if(res.status===200 && res.data){
                        this.hasDistributData=res.data.list;
                        this.totalSizeWaited=res.data.total;
                        this.issueOrderLoading=false;
                    }                
                })
        },
        //查询账户大类
        selectdicFundList(){
            this.$httpGet(`/bondBid/selecDicFundType`)
                .then((res) => {            
                    if(res.status===200 && res.data){  
                        this.dicFundList = [];                   
                        for(let i=0;i<res.data.length;i++){
                            let obj={};
                            obj.label=res.data[i];
                            obj.value=res.data[i];
                            this.dicFundList.push(obj);
                        }
                        
                    }                
                })
        },
        //查询投资经理
        selectdicManagerList(){
            this.$httpGet(`/bondBid/selecDicManager`)
                .then((res) => {            
                    if(res.status===200 && res.data){  
                        this.dicManagerList=res.data;                       
                    }                
                })
        },
        //查询交易员列表
        selectTraderList(){
            this.$httpGet(`/instructDis/selectTraders`)
                .then((res) => {            
                    if(res.status===200 && res.data){
                        this.traderlist=res.data;
                    }                
                })
        },
        //查询交易员列表树
        selectTraderListTree(){
            this.$httpGet(`/instructDis/selectTradersTree`)
                .then((res) => {            
                    if(res.status===200 && res.data){
                        this.traderlisttree=res.data;
                    }                
                })
        },
        //查询债券信息
        selectBondInfo(){
            this.bondTableLoading=true;
            this.$httpGet(`/instructDis/selectBondInfo?pageNum=${this.pageNum}&pageSize=${this.pageSize}`)
                .then((res) => {            
                    if(res.status===200 && res.data){
                        console.log("res.data.list");
                        console.log(res.data.list);
                        
                        this.bondInfoData=res.data.list;
                        this.totalSize=res.data.total;
                        this.bondTableLoading=false;

                        console.log(this.bondInfoData);
                    }                
                })
        },
        //查询分发规则
        selectDisRule(){
            this.$httpGet(`/instructDis/selectDistributionRule?vcName=${this.disrule}`)
                .then((res) => {            
                    if(res.status===200 && res.data){
                        this.distributRulesData=res.data;}                
                })
        },
        //查询自动分发规则描述
        selectDisRuleDesc(ruleName){
            this.$httpGet(`/instructDis/selectRuleDescribeByName?vcName=${ruleName}`)
                .then((res) => {            
                    if(res.status===200 && res.data){
                        
                        this.distributRulesDescData=res.data;
                        if(this.distributRulesDescData.length>0){
                            console.log(this.distributRulesDescData);
                            if(this.distributRulesDescData.length===1 && this.distributRulesDescData[0].vcDicName===null){
                                this.ruleDesc.tradeType='不限';
                                this.ruleDesc.fundType='不限';
                                this.ruleDesc.tradeMarket='不限';
                                this.ruleDesc.bondType1='不限';
                                this.ruleDesc.bondType2='不限';
                            }
                            this.distributRulesDescData.forEach((item,index)=>{
                                if(item.vcDicName==="交易类型"){
                                    this.ruleDesc.tradeType=item.vcValueName;
                                }else if(item.vcDicName==="账户类型"){
                                    this.ruleDesc.fundType=item.vcValueName;
                                }else if(item.vcDicName==="交易场所"){
                                    this.ruleDesc.tradeMarket=item.vcValueName;
                                }else if(item.vcDicName==="证券大类"){
                                    this.ruleDesc.bondType1=item.vcValueName;
                                }else if(item.vcDicName==="证券细类"){
                                    this.ruleDesc.bondType2=item.vcValueName;
                                }
                                if(index===0){
                                    this.ruleDesc.trader=item.vcDisplayname;
                                }
                            })
                        }
                    }                
                })
        },
        //查询分发规则字典表
        selectRuleDictionary(){
            this.$httpGet(`/instructDis/selectDistributionRuleDictionary`)
                .then((res) => {            
                    if(res.status===200 && res.data){
                        this.ruleDictionary=res.data;
                    }                
                })            
        },
        //单击规则行时
        clickRowRule(currentRow,index){
            this.distributRulesData.forEach((item)=>{
                item._highlight=false;
            })
            this.distributRulesData[index]._highlight=true;
        },
        //分发规则高亮行数据
        highLightRowRule(currentRow,oldCurrentRow){
            this.selectedRow=currentRow;
            this.selectRuleName=currentRow.vcName;
            this.lOrder=currentRow.lOrder;
            //高亮时请求'规则描述'
            this.ruleDesc={
                tradeType:'不限',
                fundType:'不限',
                tradeMarket:'不限',
                bondType1:'不限',
                bondType2:'不限',
                trader:''
            };
            this.selectDisRuleDesc(currentRow.vcName);
            //高亮回显使用
            this.highlightSign=currentRow.vcName;

            
        },
        //债券信息(已选项)
        bondInfoSelection(selection){
            this.bondInfoSelectionArr=selection;
        },
        //待分发指令(已选项)
        waitSelection(selection){
            this.waitSelectionArr=selection;
        },
        //已分发指令(已选项)
        hadSelection(selection){
            this.hadSelectionArr=selection;
        },
        //清空筛选
        clearSelect(){
            this.dicFund='';
            this.dicManager='';
            this.selectWaitDisRule();
            this.selectHadDisRule();
        },
        //查询
        selectingRule(){
            this.selectWaitDisRule();
            this.selectHadDisRule();
        },
        //双击tree选择交易员并分发
        dbclickTree(obj){
            if(obj.length>0){
                this.selectedTrader=obj[0].id;
                this.distributing();
            }
        },
        //回退
        // back(){
        //     if(this.selectedTrader===''||this.selectedTrader===null||this.selectedTrader===undefined){
        //         this.$Message.warning('请选择交易员');
        //     }else{
        //         if(this.waitSelectionArr.length<1){
        //             this.$Message.warning('请选择待分发指令');
        //         }else{
        //             let stockIdArr=[];
        //             for(let i=0;i<this.waitSelectionArr.length;i++){
        //                 stockIdArr.push(this.waitSelectionArr[i].id);
        //             }
        //             this.$httpGet(`/instructDis/distributeInstruct?stockIds=${stockIdArr}&vcUserId=${this.selectedTrader}&status=false`)
        //             .then((res) => {            
        //                 if(res.status===200 && res.data.actionResult===1){
        //                     this.$Message.success(res.data.data);
        //                     this.selectWaitDisRule();
        //                     this.selectHadDisRule();
        //                 }else{
        //                     this.$Message.warning(res.data.data);
        //                 }                
        //             })
        //         }
        //     }           
        // },
        // //选择交易员tree
        // getSelectedTreeItem(obj){
        //     this.selectedTrader=obj[0].id;
        // },
        //分发
        distributing(){
            if(this.selectedTrader===''||this.selectedTrader===null||this.selectedTrader===undefined){
                this.$Message.warning('请选择交易员');
            }else{
                if(this.waitSelectionArr.length<1){
                    this.$Message.warning('请选择待分发指令');
                }else{
                    this.$Modal.confirm({
                        title: '确定要分发指令吗？',
                        // content: '<p>The dialog box will be closed after 2 seconds</p>',
                        loading: true,
                        onOk: () => {
                            let stockIdArr=[];
                            for(let i=0;i<this.waitSelectionArr.length;i++){
                                stockIdArr.push(this.waitSelectionArr[i].id);
                            }
                            this.$httpGet(`/instructDis/distributeInstruct?stockIds=${stockIdArr}&vcUserId=${this.selectedTrader}&status=true`)
                            .then((res) => {            
                                if(res.status===200 && res.data.actionResult===1){
                                    this.waitSelectionArr=[];
                                    this.$Message.success(res.data.data);
                                    this.selectWaitDisRule();
                                    this.selectHadDisRule();
                                    this.$Modal.remove();
                                }else{
                                    this.$Message.warning(res.data.data);
                                }                
                            })

                        }
                    });

                    
                }
            }
        },
        //设置规则是否生效
        setRuleStatus(val,status){
            this.$httpGet(`/instructDis/updateRuleStatus?vcName=${val}&status=${status}`)
                .then((res) => {            
                    if(res.status===200 && res.data.actionResult===1){
                        this.$Message.success(res.data.data);
                        this.selectDisRule();
                        this.selectRuleName='';
                    }else{
                        this.$Message.warning(res.data.data);
                    }                
                })
        },
        //上移
        upRule(){
            let flag=false;
            this.distributRulesData.forEach((item)=>{
                if(item._highlight==true){
                    this.lOrder=item.lOrder;
                    this.selectRuleName=item.vcName;
                    flag=true;
                }               
            })
            if(flag){
                this.$httpGet(`/instructDis/distributeRuleSorting?vcName=${this.selectRuleName}&tag=1&lOrder=${this.lOrder}`)
                    .then((res) => {
                        if(res.status===200 && res.data.msg.actionResult===1){
                            this.$Message.success(res.data.msg.data);
                            this.distributRulesData=res.data.data;
                        }else{
                            this.$Message.warning(res.data.msg.data);
                        }                
                    })
            }else{
                this.$Message.warning('请选中规则');
            }
        },
        //下移
        downRule(){
            let flag=false;
            this.distributRulesData.forEach((item)=>{
                if(item._highlight==true){
                    this.lOrder=item.lOrder;
                    this.selectRuleName=item.vcName;
                    flag=true;
                }
                
            })
            if(flag){
                this.$httpGet(`/instructDis/distributeRuleSorting?vcName=${this.selectRuleName}&tag=2&lOrder=${this.lOrder}`)
                    .then((res) => {                               
                        if(res.status===200 && res.data.msg.actionResult===1){
                            this.$Message.success(res.data.msg.data);
                            this.distributRulesData=res.data.data;
                        }else{
                            this.$Message.warning(res.data.msg.data);
                        }                    
                    })
            }else{
                this.$Message.warning('请选中规则');
            }
        },
        //新增分发规则
        addDisRule(){
            this.modalShow=true;
            this.modalTitle="新增";            
        },
        //修改规则
        editRule(){
            if(this.selectRuleName===''||this.selectRuleName===undefined || this.selectRuleName===null){
                this.$Message.warning('请选择规则');
            }else{
                this.modalShow=true;
                this.modalTitle="修改";
                this.$httpGet(`/instructDis/selectDistributionRuleByName?vcName=${this.selectRuleName}`)
                    .then((res) => {            
                        if(res.status===200 && res.data){
                            console.log('字典表');
                            console.log(this.ruleDictionary);
                            console.log('请求数据');
                            console.log(res.data);
                            //查找label的id相同项，进行赋值
                            for(let i=0;i<this.ruleDictionary.length;i++){
                                for(let j=0;j<res.data.length;j++){
                                    this.addRuleForm.rulename=res.data[0].vcName;
                                    this.addRuleForm.trader=res.data[0].vcUserId;
                                    this.hidelOrder=res.data[0].lOrder;
                                    this.hidelStatus=res.data[0].lStatus;
                                    if(this.ruleDictionary[i].id===res.data[j].vcDistributeRuleId){
                                        if(res.data[j].vcDistributeRuleId==="5"){
                                            this.ruleDictionary[i].vcValue=res.data[j].vcValues;
                                        }else{
                                            this.ruleDictionary[i].vcValue=res.data[j].vcValue;                                        
                                        }
                                    }
                                    
                                }
                            }
                        }                
                    })
            }            
        },
        //删除分发规则
        delDisRule(){
            if(this.selectRuleName===''||this.selectRuleName===undefined || this.selectRuleName===null){
                this.$Message.warning('请选择规则');
            }else{
                this.$httpGet(`/instructDis/deleteDistributionRule?vcName=${this.selectRuleName}`)
                    .then((res) => {            
                        if(res.status===200 && res.data.actionResult===1){
                            this.$Message.success(res.data.data);
                            this.selectDisRule();
                            this.selectRuleName='';
                        }                
                    })
            }
        },
        //弹框“取消”
        cancel(bol){
            if(!bol){
                this.$refs.addRuleForm.resetFields();
                this.ruleDictionary.forEach((item,index)=>{    
                    item.vcValue='';     
                })
            }
        },
        //弹框“确认”
        ok(name){
            if(this.modalTitle==='新增'){
                let inserObj={};
                let arr=[];
                this.ruleDictionary.forEach((item,index)=>{    

                    if(item.vcValue!==null && item.vcValue!==undefined && item.vcValue!==''){                        
                        if(item.vcName==="证券细类"){
                            item.vcValue.forEach((child,ind)=>{
                                let obj={};
                                obj.vcDistributeRuleId=item.id;
                                obj.vcValue=child;
                                //obj.
                                item.children.forEach((res,ins)=>{
                                    if(res.id===child){
                                        obj.vcValueName=res.vcName;
                                    }
                                })
                                arr.push(obj);
                            })
                        }else{
                            let obj={};
                            item.children.forEach((res,ins)=>{
                                if(res.id===item.vcValue){
                                    obj.vcValueName=res.vcName;
                                }
                            })
                            obj.vcDistributeRuleId=item.id;
                            obj.vcValue=item.vcValue;
                            arr.push(obj);
                        }                        
                    }                    
                })
                inserObj.distributionRule=arr;
                inserObj.vcName=this.addRuleForm.rulename;
                inserObj.vcUserId=this.addRuleForm.trader;
                console.log("ruleDictionary");
                console.log(this.ruleDictionary);
                this.$httpPost(`/instructDis/insertDistributionRule`,inserObj)
                    .then((res) => {            
                        if(res.status===200 && res.data.actionResult===1){
                            //将form数据清空
                            this.$refs[name].resetFields();
                            this.ruleDictionary.forEach((item,index)=>{    
                                item.vcValue='';     
                            })                            
                            this.$Message.success(res.data.data);
                            this.selectDisRule();
                            this.modalShow=false;
                        }else{
                            this.$Message.warning(res.data.data);
                            //this.modalLoading=false;
                            setTimeout(() => {
                                this.modalLoading = false; //改变loading状态
                                this.$nextTick(() => {  //在数据修改之后立即使用这个方法，使用此方法可以避免出现的问题
                                    this.modalLoading = true;
                                });
                            });
                            
                        }                
                    })
            }else if(this.modalTitle==='修改'){

                //封装需要修改的组合属性
                this.editSelectArr=[];
                for(let i=0;i<this.ruleDictionary.length;i++){
                    if(this.ruleDictionary[i].vcValue!==null && this.ruleDictionary[i].vcValue!==undefined && this.ruleDictionary[i].vcValue!==''){
                        // let obj={};
                        // obj.vcDistributeRuleId=this.ruleDictionary[i].id;
                        // obj.vcValue=this.ruleDictionary[i].vcValue;
                        // this.editSelectArr.push(obj);

                        if(this.ruleDictionary[i].vcName==="证券细类"){
                            this.ruleDictionary[i].vcValue.forEach((child,ind)=>{
                                let obj={};
                                obj.vcDistributeRuleId=this.ruleDictionary[i].id;
                                obj.vcValue=child;
                                this.ruleDictionary[i].children.forEach((res,ins)=>{
                                    if(res.id===child){
                                        obj.vcValueName=res.vcName;
                                    }
                                })
                                this.editSelectArr.push(obj);
                            })
                        }else{
                            let obj={};
                            this.ruleDictionary[i].children.forEach((res,ins)=>{
                                if(res.id===this.ruleDictionary[i].vcValue){
                                    obj.vcValueName=res.vcName;
                                }
                            })
                            obj.vcDistributeRuleId=this.ruleDictionary[i].id;
                            obj.vcValue=this.ruleDictionary[i].vcValue;
                            this.editSelectArr.push(obj);
                        }
                    }
                }
                //封装总体需要保存的信息
                let editObj={};
                editObj.distributionRule=this.editSelectArr;
                editObj.lOrder=this.hidelOrder;
                editObj.lStatus=this.hidelStatus;
                editObj.vcName=this.addRuleForm.rulename;
                editObj.vcUserId=this.addRuleForm.trader;

                console.log(editObj);
                this.$httpPost(`/instructDis/updateDistributionRule`,editObj)
                    .then((res) => {            
                        if(res.status===200 && res.data.actionResult===1){
                            //将form数据清空
                            this.$refs[name].resetFields();
                            this.ruleDictionary.forEach((item,index)=>{    
                                item.vcValue='';     
                            })
                            this.modalShow=false;
                            this.$Message.success(res.data.data);
                            this.selectDisRule();
                            this.selectDisRuleDesc(this.selectRuleName);
                        }else{
                            this.$Message.warning(res.data.data);
                            //this.modalLoading=false;
                            setTimeout(() => {
                                this.modalLoading = false; //改变loading状态
                                this.$nextTick(() => {  //在数据修改之后立即使用这个方法，使用此方法可以避免出现的问题
                                    this.modalLoading = true;
                                });
                            });
                        }                
                    })
            }
        }


    },
    components:{
        DbclickTree,
        Refresh
    }
    
}
</script>
<style scoped>
.content-info {
    height:100%;
    overflow:hidden;
    display:flex;
}
.tree-wrapper{
    /*height:100%;*/
    width:150px;
    float:left
}
.content-wrapper{
    /*height:100%;*/
    margin: 0 5px;
    width:calc(100% - 405px);
    /*margin-left:150px;*/
}
.right-wrapper{
    /*height:100%;*/
    width:240px;
    right: 5px;
}
.info-header{   
    height:30px;
    display:flex;
    justify-content:space-between;
}
.header-left{
    line-height:30px;
}
.rule-tab{
    height:calc(100% - 330px);
}
.table-wrapper{
    height:100%;
}
.rule-tab >>> .ivu-tabs-content{
    height:calc(100% - 25px);
}   
.rule-descrip{
    text-align: left;
    padding-left:20px;

}
.rule-descrip span{
    color: #FFEC8B;
}
.rule-descrip p{
    line-height: 26px;
}
.descrip-text{
    margin-left: 30px;
}

.wid130{
    width:130px;
}

/* 调整后样式 */
/* .content-info >>>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active,
.content-info >>>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-focused,
.content-info >>>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab{
    background: none; 
    border: none;
}
.content-info >>> .ivu-tabs>.ivu-tabs-bar .ivu-tabs-nav{
    margin-left:5px!important;
}
.content-info >>> .ivu-tabs-tab{
    position: relative;
    display: inline-block;
    padding: .2em 2em 0;
    transform: translateZ(0);
    background: none;
    border: none;
    color: rgb(255,235,200)!important;
    font-weight: bold;
}
.content-info >>>.ivu-tabs-tab::before{
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: #383838;
    border: 1px solid rgba(0,0,0,.4);
    border-bottom: none;
    transform:scaleY(1.1) perspective(.5em) rotateX(5deg) translateZ(0);
    -webkit-transform:scaleY(1.1) perspective(.9em) rotateX(4deg) translateZ(0);
    transform-origin:left;
}
.content-info >>>.ivu-tabs-tab:hover{
    color: #000!important;
}
.content-info >>>.ivu-tabs-tab:hover::before{
    background:#EE8400;    
}

.content-info >>>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active::before,
.content-info >>>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-focused::before{
    background:#EE8400;
} */
</style>


