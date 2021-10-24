<template>
    <div class="bond-info ladder-wrapper">
        <div class="content-left">
            <div class="tree-wrapper">
                <div style="margin-top: 6px">
                    <Input size="small" :value="bondshortname" placeholder="债券简称" style="width: auto">
                        <Icon type="ios-search" slot="suffix" />
                    </Input>
                </div>
                <div>
                    <h3 style="margin-top:10px;">投标债券列表</h3>
                    <div class="align-left">
                        <Tree @on-select-change="treeSelectChange" :data="bondlist"></Tree>
                    </div>                   
                </div>
            </div>
        </div>
        <div class="content-right">
            <div class="content-top">
                <div class="content-top-left">
                    <div class="select-title">
                        <div class="sec-header">
                            <h3>投标信息</h3>
                            <!-- <span>{{selectedbond}}</span> -->
                        </div>
                        
                        <!--<div class="right-wrapper">-->
                            <Button class="marbot5" size="small" type="primary" v-if="userButtonRoles.updateBidConfirmInfos_11_4" @click="editBondInfoShow">编辑</Button>
                        <!--</div>-->
                    </div>
                    <Table class="table-height" stripe highlight-row 
                        @on-current-change="bidInfoRowChange"
                        :loading="bondLoading" height="140" 
                        :columns="bidInfoColumns" :data="bidInfoData" 
                        >
                    </Table>
                     <Modal v-model="EditBondInfoModal" width="500" :loading="editBondloading" @on-cancel="editBondInfoModalCancel" @on-ok="editBondInfoModalOk" title="投标信息编辑">
                        <EditBondInfoModal ref="editBondInfo" @cancelLoading="cancelLoading" v-if="EditBondInfoModal" @bidInfoSuccess="bidInfoSuccess" :lAddCount="amountData.lAddCount" :vcCode="vcCode"  :bidInfoRow="bidInfoRow"></EditBondInfoModal>
                    </Modal>   
                </div>
                <div class="content-top-right">
                     <Row :gutter="5" style="height:100%;">
                        <Col span="12" style="height:100%;">
                            <div class="sec-header">
                                <h3>债项评级</h3>
                            </div>
                            <!-- <h3 style="line-height:30px;">债项评级</h3> -->
                            
                            <Row class="bond-detail card-bg" style="height:calc(100% - 30px);padding:5px;">
                                <Col span="12"><span>外部评级</span><label class="elipse wid80" :title="bondDetail.vcCreditRating">{{bondDetail.vcCreditRating}}</label></Col>
                                <Col span="12"><span>评级机构</span><label class="elipse wid80" :title="bondDetail.vcRatingOrgan">{{bondDetail.vcRatingOrgan}}</label></Col>
                                <Col span="12"><span>内部评级</span><label class="elipse wid80" :title="bondDetail.vcCreditRatingTk">{{bondDetail.vcCreditRatingTk}}</label></Col>
                                <Col span="12"><span>内部评级人</span><label class="elipse wid80" :title="bondDetail.vcRatingOrganTk">{{bondDetail.vcRatingOrganTk}}</label></Col>
                                <Col span="12"><span>是否初评</span><label class="elipse wid80" :title="bondDetail.isFirRate">{{bondDetail.isFirRate}}</label></Col>
                                <Col span="12"><span>备选库</span><label class="elipse wid80" :title="bondDetail.vcPoolname">{{bondDetail.vcPoolname}}</label></Col>
                                <Col span="12"><span>推荐星级</span><label class="elipse wid80" :title="bondDetail.vcStarLevel">{{bondDetail.vcStarLevel}}</label></Col>
                                <Col span="12"><span>推荐价格范围</span><label class="elipse wid80" :title="bondDetail.vcAdviceRate">{{bondDetail.vcAdviceRate}}</label></Col>
                                <Col span="12"><span>最低价格</span><label class="elipse wid80" :title="bondDetail.vcFloorPrice">{{bondDetail.vcFloorPrice}}</label></Col>
                                <Col span="12"><span>能否超最低价</span><label class="elipse wid80" :title="bondDetail.isLessMinPrice">{{bondDetail.isLessMinPrice}}</label></Col>
                            </Row>                        
                        </Col>
                        <Col span="12" style="height:100%;">
                            <div class="sec-header">
                                <h3>发行主体</h3>
                            </div>
                            <!-- <h3 style="line-height:30px;">发行主体</h3> -->
                            <Row class="bond-detail card-bg" style="height:calc(100% - 30px);padding:5px;">
                                <Col span="24"><span>发行主体</span><label class="elipse" :title="bondDetail.vcIssueCompany">{{bondDetail.vcIssueCompany}}</label></Col>
                                <Col span="12"><span>主体行业</span><label class="elipse wid80" :title="bondDetail.vcIndustryName">{{bondDetail.vcIndustryName}}</label></Col>
                                <Col span="12"><span>主体属性</span><label class="elipse wid80" :title="bondDetail.vcInstType">{{bondDetail.vcInstType}}</label></Col>
                                <Col span="12"><span>主体评级</span><label class="elipse wid80" :title="bondDetail.vcCreditRank">{{bondDetail.vcCreditRank}}</label></Col>
                                <Col span="12"><span>主体评级日期</span><label class="elipse wid80" :title="bondDetail.creditRankDate">{{bondDetail.creditRankDate}}</label></Col>
                                <Col span="12"><span>发行规模</span><label class="elipse wid80" v-if="bondDetail.enIssueAmountAct" :title="bondDetail.enIssueAmountAct + '亿'">{{bondDetail.enIssueAmountAct}}亿</label></Col>
                                <Col span="12"><span>主体剩余授信</span><label class="elipse wid80" :title="bondDetail.enLeftCredit">{{bondDetail.enLeftCredit}}</label></Col>
                                <Col span="12"><span>担保人</span><label class="elipse wid80" :title="bondDetail.vcGuarantor">{{bondDetail.vcGuarantor}}</label></Col>
                            </Row>                        
                        </Col>
                    </Row>
                </div>
            </div>
            <div class="content-mid" style="margin-top:4px;">
                   <Row :gutter="10" type="flex" class="middle-wrapper" ref="middleWrapper">
                    <Col span="5">
                        <div class="sec-header">
                            <h3>泰康剩余授信:{{amountData.enLeftCreditTk}}万</h3>
                        </div>
                        <div>
                            <Table height="168" class="table-height" stripe highlight-row 
                                :loading="detailLoading" 
                                :columns="tkLeftCreditColumns" :data="tkStatisticals" 
                                >
                            </Table>
                            <div class="collect table-bottom-row">
                                <div class="collect-text">汇总：</div>
                                <div class="flex-item" :class="returnAmountClass">{{tkEnBidAmount}}</div>
                                <div class="flex-item" :class="returnAmountModClass">{{tkEnBidAmountModify}}</div>
                            </div>
                            <!--<Row type="flex" class-name="table-bottom-row">
                                <Col span="8" class-name="table-bottom-cell">汇总：</col>
                                <Col span="8" class-name="table-bottom-cell" :class="returnAmountClass">{{tkEnBidAmount}}</col>
                                <Col span="8" class-name="table-bottom-cell" :class="returnAmountModClass">{{tkEnBidAmountModify}}</col>
                            </Row>-->
                        </div>
                    </Col>
                    <Col span="5">
                        <div class="sec-header">
                            <h3>非泰康剩余授信:{{amountData.enLeftCreditNoTk}}万</h3>
                        </div>
                        <div class="marbot5">
                            <Table height="168" class="table-height" stripe highlight-row 
                                :loading="detailLoading" 
                                :columns="tkLeftCreditColumns" :data="noTkStatisticals" 
                                >
                            </Table>
                            <div class="collect table-bottom-row">
                                <div class="collect-text">汇总：</div>
                                <div class="flex-item" :class="returnNoTKAmountClass">{{noTkEnBidAmount}}</div>
                                <div class="flex-item" :class="returnNoTKAmountModClass">{{noTkEnBidAmountModify}}</div>
                            </div>
                            <!--<Row type="flex" class-name="table-bottom-row">
                                <Col span="8" class-name="table-bottom-cell">汇总：</col>
                                <Col span="8" class-name="table-bottom-cell" :class="returnNoTKAmountClass">{{noTkEnBidAmount}}</col>
                                <Col span="8" class-name="table-bottom-cell" :class="returnNoTKAmountModClass">{{noTkEnBidAmountModify}}</col>
                            </Row>-->
                        </div>
                    </Col>
                    <Col span="7">
                        <div class="sec-header">
                            <h3>我司个券集中度: {{amountData.enConcentraLimit}}%</h3>
                        </div>
                        <div class="marbot5">
                            <Table height="168" class="table-height" stripe highlight-row 
                                :loading="detailLoading" 
                                :columns="tkLeftCreditColumns" :data="alStatisticals" 
                                >
                            </Table>
                            <div class="collect table-bottom-row">
                                <div class="collect-text">汇总：</div>
                                <div class="flex-item" :class="returnLimitClass">{{allEnBidAmount}}&nbsp{{returnFocusLimit}}</div>
                                <div class="flex-item" :class="returnModifyLimitClass">{{allEnBidAmountModify}}&nbsp{{returnModifyFocusLimit}}</div>
                            </div>
                            <!--<Row type="flex" class-name="table-bottom-row">
                                <Col span="8" style="{width:60px}" class-name="table-bottom-cell">汇总：</col>
                                 <Col span="8" class-name="table-bottom-cell" :class="returnLimitClass">{{allEnBidAmount}}&nbsp&nbsp&nbsp{{returnFocusLimit}}</col>
                                <Col span="8" class-name="table-bottom-cell" :class="returnModifyLimitClass">{{allEnBidAmountModify}}&nbsp&nbsp&nbsp{{returnModifyFocusLimit}}</col>
                            </Row>-->
                        </div>
                    </Col>
                    <Col span="7">
                        <div class="sec-header">
                            <Row>
                                <Col span="16">
                                    <div class="sec-header">
                                        <h3>投标金额汇总</h3>
                                    </div>
                                </Col>
                                <Col span="8">
                                <!--@click="copyHandle"-->
                                    <Button class="copybtn" ref="copy" size="small" data-clipboard-text="你好你好" type="primary" >复制到剪贴板</Button>
                                </Col>
                            </Row>                            
                        </div>
                        <div class="marbot5">
                            <Table height="168" ref="alTable" class="table-height" stripe highlight-row 
                                :loading="detailLoading" 
                                :columns="castBidSumColumns" :data="alllStatisticals" 
                                >
                            </Table>
                            <div class="collect table-bottom-row">
                                <div class="collect-text">汇总：</div>
                                <div class="flex-item flex-item-perch"></div>
                                <div class="flex-item" :class="returnLimitClass">{{allEnBidAmount}}</div>
                                <div class="flex-item" :class="returnModifyLimitClass">{{allEnBidAmountModify}}</div>
                            </div>
                            <!--<Row type="flex" class-name="table-bottom-row">
                                <Col span="8" style="{width:60px}" class-name="table-bottom-cell">汇总：</col>
                                <Col span="8" class-name="table-bottom-cell" :class="returnAllBidAmoClass">{{allEnBidAmount}}</col>
                                <Col span="8" class-name="table-bottom-cell" :class="returnAllBidAmoModClass">{{allEnBidAmountModify}}</col>
                            </Row>-->
                        </div>
                    </Col>
                </Row>  
            </div>
            <div class="content-bottom" style="margin-top:4px;">
                 <div class="select-title">
                    <div class="sec-header"> 
                        <h3>投标决议明细</h3>
                    </div>
                    <div>
                        <label for="">账户类型</label>
                        <Select size="small" v-model="accountType" @on-change="accountTypeChange"  style="width:150px">
                            <Option v-for="item in accountList" :value="item.vcPortType" :key="item.vcPortType">{{ item.vcPortType }}</Option>
                        </Select>
                        <!--<label for="">账户分组</label>
                        <Select size="small" v-model="selfGroup" style="width:150px">
                            <Option v-for="item in selfGroupList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>-->
                        <!--@click="refreshBidDetail"-->
                        <Button size="small" type="primary" v-if="userButtonRoles.selectBidInstructDetails_11_3" @click="refreshDetails">刷新</Button>
                        <Button style="margin-left:20px;" v-if="userButtonRoles.saveLinkOrder_11_10" size="small" type="primary" @click="filedSettingModel = true">定制列</Button>
                        <Button size="small" type="primary" v-if="userButtonRoles.updateAddAndBidAmount_11_7" @click="editAddAmount">修改调整量</Button>
                        <Button size="small" type="primary" v-if="userButtonRoles.selectBidInstructDetails_11_3"  @click="bidDistribute">投标分配</Button>
                        <Button size="small" type="primary" v-if="userButtonRoles.submitBid_11_6" :loading="confirmLoading" @click="confirmBid">
                            <span v-if="!confirmLoading">确认投标</span>
                            <span v-else>正在提交...</span>
                        </Button>
                    </div>
                </div>
                <!-- @on-select="selectTableRow" -->
                 <div class="result-wrapper" ref="tableWrap">
                    <Table stripe highlight-row 
                        :height="returnTableHeight"
                        :loading="detailLoading" 
                        :columns="detailColumns"
                        @on-current-change="detailCurChange"
                        
                        @on-selection-change="rowSelectChange"
                        @on-select-cancel="rowSelectCancel"
                        :data="amountData.details.list" 
                        >
                    </Table>
                    <Page size="small" :total="amountData.details.total" :current="pageNumDetail" @on-page-size-change="pageSizeChangeDetail" @on-change="pageNumChangeDetail"
                        :page-size="pageSizeDetail" show-total show-elevator>
                    </Page>
                     <Modal v-model="filedSettingModel" width="302" footer-hide @on-ok="fieldsSave" scrollable title="定制列">
                        <FieldSetting ref="setField"  @setcancel="setCancel"  @fieldsetsuc="filedModelRes" v-if="filedSettingModel" 
                            :pageId="pageId" :lTableId="returnTableId" :lIssueCnt="lIssueCnt" :vcCode="vcCode">
                        </FieldSetting>
                    </Modal>
                    <Modal v-model="addAmountModal" class-name="vertical-center-modal" @on-ok="saveEditAddForm" :title="returnTitle">
                         <Form ref="editAddForm" :model="editAddForm" v-if="addAmountModal" :rules="editAddFormRule" :label-width="100">
                            <FormItem v-if="amountData.lAddCount == 0" label="调整数量" prop="enBidAmountModify">
                                <Input number v-model="editAddForm.enBidAmountModify">
                                    <span slot="append">万</span>
                                </Input>
                            </FormItem>
                            <FormItem v-if="amountData.lAddCount != 0" label="追加调整数量" prop="enAddModifyAmount">
                                <Input number v-model="editAddForm.enAddModifyAmount">
                                    <span slot="append">万</span>
                                </Input>
                            </FormItem>
                        </Form>
                    </Modal>
                    
                </div>
            </div>
        </div>
        <Refresh @refresh="refresh"></Refresh>
    </div>
</template>
<script>
import EditBondInfoModal from './BondCastConfirmModal/EditBondInfoModal'
import FieldSetting from '../InstructManage/BondTendInstruc/FieldSetting'
import Refresh from '../Refresh.vue'
import {validateNum} from '../../util/valide.js'
import Clipboard from 'clipboard';
import {selectUserAuth} from '../../Api/common.js'
import * as math from "mathjs"
import { throws } from 'assert';

// mathjs设置
math.config({
        number: 'BigNumber'  
    });
const RenderIsJoin =  (h, params) => {
        const row = params.row;
        const value = row.cJoin==0 ? false : true;
        return h('Checkbox', {
            props: {
                value: value
            }
        });
    }
    
export default {
    name: 'page_11',
    data(){
        const Render = (h, params) => {
            const row = params.row;
            if(parseFloat(row.enBidAmount) > parseFloat(row.enBidAmountModify)){
                return h('span', {
                    style:{
                        color:'red'
                    }
                }, row.enBidAmount)
            }else{
                return h('span', row.enBidAmount);
            }
        };
        return{
            RenderIsLock : (h, params) => {
                const row = params.row;
                return h('i', {
                    'class':{
                        iconfont:true,
                        'icon-suo':row.cIsLocked == 3,
                        'icon-suo1':row.cIsLocked != 3
                    },
                    style:{
                        cursor:"pointer",
                        color:row.cIsLocked == 3 ? '#ff9900' : '#19be6b',
                        fontSize:'16px'
                    },
                    on:{
                        click:() => {
                            // row.cIsLocked = row.cIsLocked == 1 ? 0 : 1; 
                            this.clickIsLock(row.id);
                        }
                    }
                });
            },
            RenderIsOverLimit : (h, params) => {
                const row = params.row;
                const color = row.transfinite === 1?'#ff9900':'#19be6b';
                const type =  row.transfinite === 1?'md-warning':'';
                // console.log(row.transfinite);
                return h('Icon', {
                    props: {
                        type: type,
                        color: color,
                        size: 18
                    }
                });
            },
            // 页面Id
            pageId:null,
            // 证券代码
            vcCode:'',
            // 证券内码
            vcScode:'',
            // 左侧债券列表
            bondlist: [],
            // 债券信息详情（包含债项评级和发行主体）
            bondDetail:{
                vcCreditRating:'',
                vcRatingOrgan:'',
                vcCreditRatingTk:'',
                vcRatingOrganTk:'',
                isFirRate:'',
                vcPoolname:'',
                vcStarLevel:'',
                vcAdviceRate:'',
                vcFloorPrice:'',
                isLessMinPrice:''
            },
            // 投标信息选中高亮行
            bidInfoRow:null,
            // 投标信息modal显示
            EditBondInfoModal:false,
            
            //分页数据"投标决议明细"
            pageSizeDetail:30,
            totalSizeDetail:0,
            pageNumDetail:1,
            pageOptsDetail:[30,40,50],
            //定制列modal
            filedSettingModel:false,

            
            show: true,
            tableHeight:300,
            confirmLoading:false,
            
            bondshortname:'可转债',
            cIsCheckCredit:1,

            lIssueCnt:null,
            lAddCount:null,
            detailData:{},
            accountList: [],
            accountType: '',
            selfGroupList: [],
            selfGroup: '',
            
            //投标信息
            detailLoading:false,
            bidInfoColumns:[
                {
                    title:'市场',
                    key:'vcMarketName',
                    minWidth:60
                },
                {
                    title:'投标截止时间',
                    key:'tsBidDeadline',
                    minWidth:100
                },
                {
                    title:'追加截止时间',
                    key:'tsAddBidDeadline',
                    minWidth:100
                },
                // {
                //     title:'发行规模',
                //     key:'enIssueAmountAct',
                //      minWidth:60
                // },
                {
                    title:'期限',
                    key:'enMaturity',
                     minWidth:60
                },
                {
                    title:'上市日期',
                    key:'lListDate', 
                    minWidth:75
                }
            ],
            bondLoading:false,
            bidInfoData:[],
            //泰康账户主体剩余授信额度
            tkLeftCreditLoading:false,
            tkLeftCreditColumns:[
                {
                    title:'标位',
                    width:60,
                    key:'enBidPrice'
                },
                {
                    title:'原指令数量',
                    key:'enBidAmount'
                    // render:Render
                },
                {
                    title:'调整数量',
                    key:'enBidAmountModify'
                }
            ],
            //非泰康账户主体剩余授信额度
            tkNLeftCreditLoading:false,
            //我司个券集中度控制
            focusControlLoading:false,
            //投标金额汇总
            castBidSumLoading:false,
            castBidSumColumns:[
                {
                    width:60,
                    title:'发行市场',
                    key:'vcMarketName'
                },
                {
                    title:'标位',
                    width:60,
                    key:'enBidPrice'
                },
                {
                    title:'原指令数量',
                    key:'enBidAmount'
                    // render:Render
                },
                {
                    title:'投标数量',
                    key:'enBidAmountModify'
                }
            ],
            alllStatisticals:[],
            noTkStatisticals:[],
            alStatisticals:[],
            tkStatisticals:[],
            tkEnBidAmount:null,//泰康原指令数量汇总
            tkEnBidAmountModify:null,//泰康原指令数量调整汇总
            noTkEnBidAmount:null,//非泰康原指令数量汇总
            noTkEnBidAmountModify:null,//非泰康原指令数量调整汇总
            allEnBidAmount:null,//个券原指令数量汇总
            allEnBidAmountModify:null,//个券原指令数量调整汇总

            amountData:{
                enLeftCreditTk:null,//泰康剩余授信额度
                enLeftCreditNoTk:null,//非泰康剩余授信额度
                enConcentraLimit:0,
                lAddCount:1,//追加轮数
                details:{},  //以下为中间四个表格和底部表格数据
                
            },
            // 编辑投标信息 异步提交
            editBondloading:true,
            //投标决议中标结果
            detailLoading:false,
            detailColumns:[],
            detailData:[],
            selection:[],
            // 修改追加量modal
            addAmountModal:false,
            // 详情表的高亮行
            currentRow:null,
            editAddForm:{
                enBidAmountModify:'', //首轮调整数量
                enAddModifyAmount:'',//次轮追加调整量
                id:'',
                lBidOrder:''
            },
            adjustTitle:'修改调整量',
            editAddFormRule:{
                'enBidAmountModify': [
                       {required:true,validator: validateNum, trigger: 'blur' }
                    ],
                'enAddModifyAmount': [
                    {required:true,validator: validateNum, trigger: 'blur' }
                ],
            },
            lTableId:1,
            userButtonRoles:{
                selectBidInstructDetails_11_3:false,//锁定指令(锁定按钮)
                lockInstruction_11_5:false,//锁定指令(锁定按钮)
                submitBid_11_6:false,//确认中标(确认中标按钮)
                updateBidConfirmInfos_11_4:false,//修改投标信息列表(投标信息编辑按钮)
                updateAddAndBidAmount_11_7:false,//修改调整数量或追加调整数量(明细编辑按钮)
                saveLinkOrder_11_10:false,//修改表格顺序(布局设置按钮)
                
            },
            btnCopy:null
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            // 在路由跳转之前获取pageId
            // console.log(to.query)
            // vm.pageId = to.query.pageId;
            var SelectUserAuth =  selectUserAuth.bind(vm);
            SelectUserAuth();
        })
    },
    created(){
        
        // 获取pageId
        this.pageId = this.$route.meta.id;
        this.selectBondInfos();
        this.selectDicFundType1s();
        // this.initTable();
        // this.selectBondDetailedInfo();
    },
    computed: {
        //返回table的动态高度
        returnTableHeight () {
            return this.tableHeight;
        },
        //计算tableId
        returnTableId(){
            
            return this.amountData.lAddCount <= 0 ? 1 : 2
        },
        // 计算泰康账户汇总样式
        returnAmountClass(){
            if(parseFloat(this.tkEnBidAmount) == 0 || this.tkEnBidAmount == ''){
                return '';
            }
            return (this.cIsCheckCredit<=0 || parseFloat(this.tkEnBidAmount) <= parseFloat(this.amountData.enLeftCreditTk))? 'text-passcolor' : 'text-warncolor'
        },
         returnAmountModClass(){
              if(parseFloat(this.tkEnBidAmountModify) == 0 || this.tkEnBidAmount == ''){
                return '';
            }
            return (this.cIsCheckCredit<=0 || parseFloat(this.tkEnBidAmountModify) <= parseFloat(this.amountData.enLeftCreditTk)) ? 'text-passcolor' : 'text-warncolor'
        },
        // 计算非泰康账户汇总样式
        returnNoTKAmountClass(){
            if(parseFloat(this.noTkEnBidAmount) == 0 || this.tkEnBidAmount == ''){
                return '';
            }
            return (this.cIsCheckCredit<=0 || parseFloat(this.noTkEnBidAmount) <= parseFloat(this.amountData.enLeftCreditNoTk)) ? 'text-passcolor' : 'text-warncolor'
        },
         returnNoTKAmountModClass(){
            if(parseFloat(this.noTkEnBidAmountModify) == 0|| this.tkEnBidAmount == ''){
                return '';
            }
            return (this.cIsCheckCredit<=0 || parseFloat(this.noTkEnBidAmountModify) <= parseFloat(this.amountData.enLeftCreditNoTk)) ? 'text-passcolor' : 'text-warncolor'
        },
        // 计算原指令集中度
        returnFocusLimit(){
            if(this.allEnBidAmount){
                return (parseFloat(this.allEnBidAmount) / (this.bondDetail.enIssueAmountAct*100)).toFixed(2) + '%';
            }else{
                return ''
            }
           
        },
        // 计算调整后指令集中度
        returnModifyFocusLimit(){
            if(this.allEnBidAmountModify){
                return (parseFloat(this.allEnBidAmountModify) / (this.bondDetail.enIssueAmountAct*100)).toFixed(2) + '%';
            }else{
                return ''
            }
        },
        // 计算指令集中度样式
        returnLimitClass() {
            if(this.returnFocusLimit == 0){
                return ''
            }
            return parseFloat(this.returnFocusLimit) <= parseFloat(this.amountData.enConcentraLimit) ? 'text-passcolor' : 'text-warncolor'
        },
        // 计算调整后指令集中度
        returnModifyLimitClass(){
            return parseFloat(this.returnModifyFocusLimit) <= parseFloat(this.amountData.enConcentraLimit) ? 'text-passcolor' : 'text-warncolor'
        },
        // 投标金额汇总计算
        returnAllBidAmoClass(){
            return parseFloat(this.allEnBidAmount) <= (this.amountData.enLeftCreditTk + this.amountData.enLeftCreditNoTk) ? 'text-passcolor' : 'text-warncolor'
        },
        returnAllBidAmoModClass(){
            return parseFloat(this.allEnBidAmountModify) <= (this.amountData.enLeftCreditTk + this.amountData.enLeftCreditNoTk) ? 'text-passcolor' : 'text-warncolor'
        },
        // 计算修改调整量的弹出框标题
        returnTitle(){
            return this.amountData.lAddCount <= 0 ? '修改首轮调整数量' : '修改次轮追加调整数量'
        }


    },
    mounted(){ 
        this.$nextTick(() => {
               this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height - 30;
            })
        window.addEventListener('resize', () => {//动态调整高度
            this.$nextTick(() => {
                this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height -30;
            })
            
        })
    },
    methods:{
        // 复制表格内容到粘贴板
        copyHandle() {
            var that = this;    
            var clipboard = new Clipboard('.copybtn', {
                text: function() {
                    //使用换行符将字符串切割成数组 
                    var textList =  that.$refs.alTable.$children[1].$el.innerText.split('\n')
                    // 去除最后一个元素（元素为空串）
                    textList.splice(textList.length-1, 1,'汇总：','\t', '\t' + that.allEnBidAmount,'\t'+that.allEnBidAmountModify);
                    // 
                    textList.forEach((item, index) => {
                        // 去两端空格
                        item.replace(/(^\s+) | (\s+$)/g, '');
                        //索引加一为4的倍数添加换行符
                        if(index != 0 && (index + 1)%4 == 0){
                            textList[index] = (item + '  \r\n');
                        }
                    });
                    var textStr = textList.join('');
                    return textStr
                }
            });
            clipboard.on('success', e => {
                this.$Message.success("复制成功！")
                // 释放内存
                clipboard.destroy()
            })
            clipboard.on('error', e => {
                // 不支持复制
                this.$Message.error("复制失败！")
                // 释放内存
                clipboard.destroy()
            })

        },
       
        //查询账户类型列表
        selectDicFundType1s(){
             this.$httpGet('/dic/selectDicFundType1s').then((res) => {
                this.accountList = res.data;
             })
        },
        accountTypeChange(value){
            this.selectBidInstructDetails();
        },
        
        //tree选中改变
        treeSelectChange(data){
            console.log(data);
            if(data[0].vcCode){
                this.selectedbond = data[0].title;
                this.cIsCheckCredit = data[0].cIsCheckCredit;
                this.lIssueCnt = data[0].lIssueCnt;
                this.lTableId = data[0].lAddCount <= 0 ? 1 : 2;
                this.vcCode = data[0].vcCode;
                // this.vcScode = data[0].vcScode;
                this.selectBidConfirmInfos();
                this.selectBondDetailedInfo();
                this.initTable();
                this.selectBidInstructDetails();
            }
        },
         // 请求左侧投标债券列表
        selectBondInfos(){
            this.$httpGet('/confirm/selectBondInfos').then((res) => {
                var data = res.data;
                if(data.length > 0 ){
                    console.log(data)
                    data[0].expand = true;
                    data[0].children[0].selected = true;
                    this.vcCode = data[0].children[0].vcCode;
                    // this.vcScode = data[0].children[0].vcScode;
                    this.cIsCheckCredit = data[0].children[0].cIsCheckCredit;
                    this.selectedbond = data[0].children[0].title;
                    this.lIssueCnt = data[0].children[0].lIssueCnt;
                    this.lTableId = data[0].children[0].lAddCount <= 0 ? 1 : 2;
                    this.bondlist = res.data;
                    this.selectBidConfirmInfos();
                    this.selectBondDetailedInfo();
                    this.initTable();
                    this.selectBidInstructDetails();   
                }else{
                    this.bondlist = res.data;
                    this.alllStatisticals=[],
                    this.noTkStatisticals=[],
                    this.alStatisticals=[],
                    this.tkStatisticals=[],
                    this.tkEnBidAmount=null,//泰康原指令数量汇总
                    this.tkEnBidAmountModify=null,//泰康原指令数量调整汇总
                    this.noTkEnBidAmount=null,//非泰康原指令数量汇总
                    this.noTkEnBidAmountModify=null,//非泰康原指令数量调整汇总
                    this.allEnBidAmount=null,//个券原指令数量汇总
                    this.allEnBidAmountModify=null,//个券原指令数量调整汇总
                    this.bidInfoData = [];
                    this.amountData={
                        enLeftCreditTk:null,//泰康剩余授信额度
                        enLeftCreditNoTk:null,//非泰康剩余授信额度
                        enConcentraLimit:0,
                        lAddCount:1,//追加轮数
                        details:{},  //以下为中间四个表格和底部表格数据
                
                    };
                    this.bondDetail = {};
                }
            })
        },
         // 查询投标信息列表
        selectBidConfirmInfos(){
            this.bondLoading = true;
            this.$httpGet(`/confirm/selectBidConfirmInfos?vcCode=${this.vcCode}&lIssueCnt=${this.lIssueCnt}`).then((res) => {
                this.bidInfoData = res.data
                this.bondLoading = false;
            })

        },
        // 请求债项评级和发行主体（债券发行信息详情）
        selectBondDetailedInfo(){
            this.$httpGet(`/bondIssue/selectBondDetailedInfo?vcCode=${this.vcCode}&lIssueCnt=${this.lIssueCnt}`).then((res) => {
                this.bondDetail = res.data
            })
        },
        // 投标信息高亮行改变
        bidInfoRowChange(currentRow,oldCurrentRow){
            this.bidInfoRow = currentRow;
            // this.selectBidInstructDetails();
        },
        editBondInfoShow(){
            if(!this.bidInfoRow){
               this.$Message.warning("请高亮一行后继续！") 
            }else{
                this.EditBondInfoModal = true;
            }
            
        },
        //投标信息提交成功
        editBondInfoModalOk(){
            this.$refs.editBondInfo.saveBid();
        },
        editBondInfoModalCancel(){
            this.$refs.editBondInfo.resetForm();
        },
        // 债券信息提交成功后
        bidInfoSuccess(){
            console.log("债券信息提交成功后!")
            this.selectBidConfirmInfos();
            // this.selectBidInstructDetails();
            this.EditBondInfoModal = false;
        },
        // 取消债券信息弹框loading
        cancelLoading(){
            this.editBondloading = false;
            this.$nextTick(() => {
                this.editBondloading = true;
            })
        },
        // 查询投标决议明细表格表头
        initTable(){
            this.$httpPost('/link/selectLinkInfo',{lPageId:11,lTableId:this.lTableId,vcCode:this.vcCode,lIssueCnt:this.lIssueCnt}).then((res) => {
                res.data.forEach((tableHeader) => {
                    if(tableHeader.key == "cIsLocked"){
                        tableHeader.render = this.RenderIsLock;
                    }
                    if(tableHeader.key == 'transfinite'){
                        tableHeader.render = this.RenderIsOverLimit;
                    }
                })
                this.detailColumns = res.data;
                // console.log(res.data)
            })
        },

        //查询投标决议明细列表
        selectBidInstructDetails(isAllot){
            
            var url = '';
            if(isAllot){
                
                url = `/confirm/selectBidInstructDetails?vcCode=${this.vcCode}&pageNum=1&pageSize=${this.pageSizeDetail}&isAllot=1&vcPortType1=${this.accountType}&lIssueCnt=${this.lIssueCnt}`
            }else{
                 url = `/confirm/selectBidInstructDetails?vcCode=${this.vcCode}&pageNum=${this.pageNumDetail}&pageSize=${this.pageSizeDetail}&isAllot=0&vcPortType1=${this.accountType}&lIssueCnt=${this.lIssueCnt}`
            }
            this.detailLoading = true;
            this.$httpGet(url).then((res) => {
                if(isAllot){
                    this.pageNumDetail = 1;
                }
                this.selection = [];    
                res.data.details.list.forEach(item => {
                    if(item.cJoin == 1){
                        item._checked = true;
                        this.selection.push(item)
                    }
                })                
                
                this.detailData = res.data.details.list;
                this.pageSizeDetail = res.data.details.pageSize;
                this.amountData = res.data;
                this.selectChangeHandle();
                this.lTableId = this.amountData.lAddCount <= 0 ? 1 : 2;
                // 根据投标轮数修改中间表格的表头
                if(res.data.lAddCount <= 0){
                    this.tkLeftCreditColumns[0].title = "标位"
                    this.castBidSumColumns[1].title = "标位"
                }else{
                    this.tkLeftCreditColumns[0].title = "中标价格"
                    this.castBidSumColumns[1].title = "中标价格"
                }
                this.detailLoading = false;
            }).catch(() => {
                this.detailLoading = false;
                this.$Message.error("请求失败！")
            })
        },
        //页码改变时的回调(投标决议明细)
        pageNumChangeDetail(page){
            this.pageNumDetail=page;
            this.selectBidInstructDetails();
        },
        //每页数据条数改变时的回调(投标决议明细)
        pageSizeChangeDetail(pageSize){
            this.pageSizeDetail=pageSize;
            this.selectBidInstructDetails();
        },

        // 点击字段修改弹框确定
        fieldsSave(){
            this.$refs.setField.saveLinkOrder();
        },
        // filedModelRes 字段设置成功后
        filedModelRes(){
            // console.log("64564646464564");
            this.filedSettingModel = false;
            this.initTable();
            this.selectBidInstructDetails();
        },
        setCancel(){
            this.filedSettingModel = false;
        },
       
       
       
        // 行选中状态被取消
        rowSelectCancel(selection,row){
            row.transfinite = 0;
             this.detailData.forEach(item => {
                 if(item.id == row.id && item.lBidOrder == row.lBidOrder){
                    //  this.$nextTick(() => {
                        item.transfinite = 0;
                        console.log(item)
                        item._checked = false;
                    //  })
                     
                 }
             });
        },
        
        
        /*合并行的方法*/
        mergeRow(list,num,isAll,hasMarket){
            var mergList = [];
            if(list.length == 0){
                // console.log(mergList)
                return mergList;
            }else{
                // console.log("数组不为空")
                // console.log(list)
                // console.log(this.amountData.lAddCount);
                list.forEach((element,index) => {
                    if(index == 0){
                        mergList.push({
                            vcMarketName:element.vcMarketName,
                            enBidPrice:!this.amountData.lAddCount ?  element.enBidPrice : element.enLotPrice,
                            enBidAmountModify: !this.amountData.lAddCount ? parseFloat(element.enBidAmountModify)+'万' : math.format(math.eval(parseFloat(element.enAddModifyAmount) +'+'+ parseFloat(element.enLotAmountModify))) + '万',
                            enBidAmount:!this.amountData.lAddCount ? parseFloat(element.enBidAmount)+'万' : math.format(math.eval(parseFloat(element.enAddAmount)+'+'+parseFloat(element.enLotAmountModify))) + '万'
                        })
                    }else{
                        var hasPrice = false;
                        mergList.forEach((mergeItem,index) => {
                            if(hasMarket){
                                 if(parseFloat(mergeItem.enBidPrice) == (!this.amountData.lAddCount ? parseFloat(element.enBidPrice) : parseFloat(element.enLotPrice)) && (mergeItem.vcMarketName == element.vcMarketName)){
                                    mergeItem.enBidAmount = math.format(math.eval(parseFloat(mergeItem.enBidAmount)
                                        +'+'+ (!this.amountData.lAddCount ?  parseFloat(element.enBidAmount) : math.format(math.eval(parseFloat(element.enAddAmount)+'+'+parseFloat(element.enLotAmountModify)))))) + '万';
                                    mergeItem.enBidAmountModify = math.format(math.eval(parseFloat(mergeItem.enBidAmountModify)
                                        + '+' + (!this.amountData.lAddCount ? parseFloat(element.enBidAmountModify)  : math.format(math.eval(parseFloat(element.enAddModifyAmount) +'+'+ parseFloat(element.enLotAmountModify)))))) + '万';
                                    console.log(math.format(math.eval(parseFloat(element.enAddModifyAmount) +'+'+ parseFloat(element.enLotAmountModify))))
                                    // 标记循环完成后是否找到相同标位
                                    hasPrice = true;
                                }
                            }else{
                                if(parseFloat(mergeItem.enBidPrice) == (!this.amountData.lAddCount ? parseFloat(element.enBidPrice) : parseFloat(element.enLotPrice))){
                                    mergeItem.enBidAmount = math.format(math.eval((parseFloat(mergeItem.enBidAmount)
                                        +'+'+ (!this.amountData.lAddCount ?  parseFloat(element.enBidAmount) : math.format(math.eval(parseFloat(element.enAddAmount)+'+'+parseFloat(element.enLotAmountModify))))))) + '万';
                                    mergeItem.enBidAmountModify = math.format(math.eval((parseFloat(mergeItem.enBidAmountModify)
                                        + '+'+ (!this.amountData.lAddCount ? parseFloat(element.enBidAmountModify)  : math.eval(parseFloat(element.enAddModifyAmount) +'+'+ parseFloat(element.enLotAmountModify)))))) + '万';
                                    // 标记循环完成后是否找到相同标位
                                    hasPrice = true;
                                }
                            }
                           
                        });
                        // 没有相同标位
                        if(!hasPrice){
                            mergList.push({
                                vcMarketName:element.vcMarketName,
                                enBidPrice:!this.amountData.lAddCount ?  element.enBidPrice : element.enLotPrice,
                                enBidAmountModify: !this.amountData.lAddCount  ? parseFloat(element.enBidAmountModify)+'万' : math.format(math.eval(parseFloat(element.enAddModifyAmount) +'+'+ parseFloat(element.enLotAmountModify))) + '万',
                                enBidAmount:!this.amountData.lAddCount  ? parseFloat(element.enBidAmount)+'万' : math.format(math.eval(parseFloat(element.enAddAmount)+'+'+parseFloat(element.enLotAmountModify))) + '万'
                            })
                        }

                    }
                    
                })
                
                
                for (var i = mergList.length-1;  i>=0; i--) {
                    var sum = 0;
                    var item = mergList[i];
                    for (var index = 0; index <= i; index++) {
                        var element =  mergList[index];
                        sum =  math.format(math.eval(sum +'+'+ parseFloat(element.enBidAmount)));
                    }
                    
                    if(isAll){
                        if((sum / (this.bondDetail.enIssueAmountAct*100)).toFixed(2) > num){
                            item.cellClassName = {
                                enBidAmount:'text-warncolor'
                            }
                        }    
                    }else{
                        if(this.cIsCheckCredit > 0 && sum > num){
                            item.cellClassName = {
                                enBidAmount:'text-warncolor'
                            }
                        }
                    }
                }
                // console.log("sumsumsumsumsum" + sum);
                return mergList;
            }
        },
        
        // 选中不选中后调用函数（抽取出来主要是为了其他地方调用方便可用来监听this.selection改变）
        selectChangeHandle(){
            if(this.selection.length > 0){
                // 遍历求出泰康和非泰康的数组 并求和
                var tkList = [];
                var noTkList = [];
                var sum1 = 0;
                var modifySum1 = 0;
                var sum2 = 0;
                var modifySum2 = 0;
                var sum3 = 0;
                // 求和
                this.selection.forEach(item => {
                    if(item.vcInvestSourceName == "泰康"){
                        tkList.push(item);
                        if(this.amountData.lAddCount == 0){
                            sum1 = math.format(math.eval(parseFloat(sum1) +'+'+ parseFloat(item.enBidAmount))) + '万';
                            modifySum1 = math.format(math.eval(parseFloat(modifySum1) +'+'+  parseFloat(item.enBidAmountModify))) + '万';
                        }else{
                            sum1 = math.format(math.eval(parseFloat(sum1) +'+'+ parseFloat(item.enAddAmount)+'+'+parseFloat(item.enLotAmountModify)))  + '万'
                            modifySum1 = math.format(math.eval(parseFloat(modifySum1) +'+'+  parseFloat(item.enAddModifyAmount) +'+'+ parseFloat(item.enLotAmountModify))) + '万';
                        }
                    }else{
                        noTkList.push(item);
                        if(this.amountData.lAddCount == 0){
                            sum2 = math.format(math.eval(parseFloat(sum2) + '+' + parseFloat(item.enBidAmount))) + '万';
                            modifySum2 = math.format(math.eval(parseFloat(modifySum2) + '+' +  parseFloat(item.enBidAmountModify))) + '万';
                        }else{
                            sum2 = math.format(math.eval(parseFloat(sum2) +'+'+ parseFloat(item.enAddAmount)+'+'+parseFloat(item.enLotAmountModify)))  + '万'
                            modifySum2 = math.format(math.eval(parseFloat(modifySum2) +'+'+  parseFloat(item.enAddModifyAmount) +'+'+ parseFloat(item.enLotAmountModify))) + '万';
                            // console.log(modifySum2)
                        }
                    }
                });


                // 是否超限检查
                this.isOverLimit(tkList,parseFloat(this.amountData.enLeftCreditTk),parseFloat(sum1));
                this.isOverLimit(noTkList,parseFloat(this.amountData.enLeftCreditNoTk),parseFloat(sum2));
                // 渲染表格的汇总数量
                this.tkEnBidAmount = sum1 + '万';
                this.tkEnBidAmountModify = modifySum1 + '万';
                this.noTkEnBidAmount = (sum2 == 0 ? '' : sum2) ;
                this.noTkEnBidAmountModify = (modifySum2 == 0 ? '' : modifySum2);
                // this.noTkEnBidAmount = sum2 + '万';
                // this.noTkEnBidAmountModify = modifySum2 + '万';
                this.allEnBidAmount = math.format(math.eval(parseFloat(sum1) +'+'+ parseFloat(sum2))) + '万';
                this.allEnBidAmountModify =math.format(math.eval(parseFloat(modifySum1) +'+'+ parseFloat(modifySum2))) + '万';
               
                // 合并行
                var baifenbi =  (parseFloat(this.allEnBidAmount) / (this.bondDetail.enIssueAmountAct*100)).toFixed(2);
                this.tkStatisticals = this.mergeRow(tkList,parseFloat(this.amountData.enLeftCreditTk));
                this.noTkStatisticals = this.mergeRow(noTkList,parseFloat(this.amountData.enLeftCreditNoTk));
                this.alStatisticals = this.mergeRow(this.selection,parseFloat(this.amountData.enConcentraLimit),true);
                // this.alllStatisticals = [];
                this.alllStatisticals = this.mergeRow(this.selection,parseFloat(this.amountData.enConcentraLimit),true,true);
               
            }else{
                //当选中的为空时
                this.tkStatisticals = [];
                this.noTkStatisticals = [];
                this.alStatisticals = [];
                this.alllStatisticals = [];
                this.tkEnBidAmount = '';
                this.tkEnBidAmountModify ='' ;
                this.noTkEnBidAmount = '';
                this.noTkEnBidAmountModify = '';
                this.allEnBidAmount = '';
                this.allEnBidAmountModify = '';
                this.amountData.details.list.forEach(tableItem => {
                        tableItem.transfinite = 0;
                        tableItem._checked=false;
                })
            }

        },
        
       
        /*选中不选中时触发的事件*/
        rowSelectChange(selection){
            this.selection = selection;
            this.selectChangeHandle();
        },
        // xuanz
        /*是否标识为超限*/
        isOverLimit(list,limit,count){
            // console.log("jinruchaoxianpanduan")
            for (var i = list.length-1; i >=0; i--) {
                // console.log(i)
                var element = list[i];
                // if(i == list.length-1){
                    if(count > limit){
                        element.transfinite = 1;
                        this.amountData.details.list.forEach(tableItem => {
                            if(element.id === tableItem.id && element.lBidOrder === tableItem.lBidOrder){
                                tableItem.transfinite=1;
                                tableItem._checked=true;
                            }
                        })
                    }else{
                        this.amountData.details.list.forEach(tableItem => {
                            if(element.id === tableItem.id && element.lBidOrder === tableItem.lBidOrder){
                                tableItem.transfinite=0;
                                tableItem._checked=true;
                            }
                        })
                    }
                   
                // }
                count = count - (parseFloat(element.enBidAmount) +parseFloat(element.enAddAmount)+parseFloat(element.enLotAmountModify))
            }
            // console.log(this.amountData.details.list)
            
        },
        
        
        //确认投标
        confirmBid(){
            if(this.selection.length <= 0){
                this.$Message.warning("请选择需要提交的指令！")
                return;
            }
            var submitData = {
                details:[],
                lAddCount:this.amountData.lAddCount
            };
            for (let i = 0; i < this.selection.length; i++) {
                const element = this.selection[i];
                // 选中项中的调整数量为0，不能提交！
                var floatModify = parseFloat(element.enBidAmountModify);
                var floatAmount = parseFloat(element.enBidAmount);
                var floatAddAmount = parseFloat(element.enAddAmount);
                var floatAddAmountModify = parseFloat(element.enAddModifyAmount);
                if((floatModify <= 0 || (floatModify > 0 && floatAmount<=0))  && this.amountData.lAddCount < 1){
                    this.$Message.warning("选中项中存在投标数量或投标调整数量为0，请先设置投标量！");
                    return;
                }else if((floatAddAmountModify <= 0 || (floatAddAmountModify > 0 && floatAddAmount<=0))  && this.amountData.lAddCount >= 1){
                    this.$Message.warning("选中项中存在追加投标数量或追加调整数量为0，请先设置投标量！");
                    return;
                }else{
                    submitData.details.push({
                        enBidAmountModify:parseFloat(element.enBidAmountModify),
                        id:element.id,
                        taskId:element.taskId,
                        lBidOrder:element.lBidOrder,
                        enAddModifyAmount:parseFloat(element.enAddModifyAmount)
                    })
                }
                
            }
            /* this.selection.forEach((item) => {
                submitData.details.push({
                    enBidAmountModify:parseFloat(item.enBidAmountModify),
                    id:item.id,
                    lBidOrder:item.lBidOrder
                })
            }) */
            this.confirmLoading = true;
            this.$httpPost('/confirm/submitBid',submitData).then((res) => {
                this.$Message.success('提交成功！')
                 this.confirmLoading = false;
                this.selectBondInfos();
                // this.selectBidInstructDetails();
            })
        }, 

        editAddAmount(){
            /* if(this.currentRow === null){
                this.$Message.warning("请高亮一行数据继续！")
                return;
            } */
            if(this.selection.length == 1){
                this.addAmountModal = true;
                this.editAddForm.id = this.selection[0].id;
                this.editAddForm.lBidOrder = this.selection[0].lBidOrder;
                this.editAddForm.enBidAmountModify = parseFloat(this.selection[0].enBidAmountModify);
                this.editAddForm.enAddModifyAmount =  parseFloat(this.selection[0].enAddModifyAmount);
            }else{
                this.$Message.warning("请选择单条指令！");
            }
            
        },
        detailCurChange(currentRow,oldCurrentRow){
            this.currentRow = currentRow;
           
        },
        

        // 点击锁定图标，提交是否锁定
        clickIsLock(id){
            this.$httpGet('/confirm/lockInstruction',{instId:id}).then((res) => {
                // 提交成功后将相同标位指令的锁定状态修改
                if(res.data.data.indexOf('成功') > -1){
                    this.amountData.details.list.forEach((item) => {
                        if(item.id == id){
                            item.cIsLocked = item.cIsLocked == 3 ? 0 : 3;
                        }
                    });
                }
            })
        },
        //投标分配
        bidDistribute(){
            if(this.amountData.details.list.length){
                this.selectBidInstructDetails('isAllot')
            }
        },
        // 修改调整数量
        saveEditAddForm(){
            console.log("nihaonihaonihao")
            this.$refs.editAddForm.validate((valid) => {
                if(valid){
                    this.editAddForm.lAddCount = this.amountData.lAddCount;
                    console.log("提交前")
                    console.log(this.editAddForm)
                    this.$httpPost('/confirm/updateAddAndBidAmount',this.editAddForm).then((res) => {
                        if(res.data.data.indexOf("修改成功") != -1){
                            this.amountData.details.list.forEach(tableItem => {
                                if( this.editAddForm.id === tableItem.id &&  this.editAddForm.lBidOrder === tableItem.lBidOrder){
                                    if(this.editAddForm.lAddCount <= 0){
                                        this.$nextTick(() => {
                                            tableItem.enBidAmountModify = this.editAddForm.enBidAmountModify + (this.editAddForm.enBidAmountModify ==0?'':'万');
                                        })
                                    }else{
                                        this.$nextTick(() => {
                                            tableItem.enAddModifyAmount = this.editAddForm.enAddModifyAmount + (this.editAddForm.enAddModifyAmount ==0?'':'万');
                                        })
                                    }
                                }
                            })

                            this.selection.forEach(selectItem => {
                                console.log(this.editAddForm.enBidAmountModify)
                                if( this.editAddForm.id === selectItem.id &&  this.editAddForm.lBidOrder === selectItem.lBidOrder){
                                    if(this.editAddForm.lAddCount <= 0){
                                        selectItem.enBidAmountModify = this.editAddForm.enBidAmountModify + (this.editAddForm.enAddModifyAmount ==0?'':'万');
                                    }else{
                                        selectItem.enAddModifyAmount = this.editAddForm.enAddModifyAmount + (this.editAddForm.enAddModifyAmount ==0?'':'万');
                                    }
                                }
                            })
                            console.log("提交后的selection")
                            console.log(this.selection)
                            this.selectChangeHandle();

                            // 
                            // console.log(this.selection)
                        }

                    })
                }
            })
        },
        refresh(){
            // 请求权限
            this.accountType = '';
            selectUserAuth.bind(this)();
            this.selectBondInfos();
            this.selectDicFundType1s();
        },
        refreshDetails(){
            this.accountType = '';
            // this.selectBidConfirmInfos();
            // this.selectBondDetailedInfo();
            this.initTable();
            this.selectBidInstructDetails(); 
        }
    },
    
    components:{
        EditBondInfoModal,
        FieldSetting,
        Refresh
    }
}
</script>
<style scoped>
.bond-info{
    height:100%;
    display: flex;
}
/*左侧区域*/
.content-left{
    width:200px;
}
/*右侧区域*/
.content-right{
    margin-left: 10px;
    width:calc(100% - 200px);
}
/*右侧内容区的上方部分*/
.content-top{
    height: 170px;
    display: flex;
}
.content-top-right{
    width:600px;
}
.content-top-left{
    margin-right: 10px;
    width: calc(100% - 600px)
}
.select-title{
    display: flex;
     justify-content:space-between;
}
.select-title div{
    /* line-height: 30px; */
}



.content-mid{
    height:222px;
}

.content-mid >>> .middle-wrapper{
    height: 100%;
}

.content-bottom{
    height:calc(100% - 406px);
}
.result-wrapper{
    height:calc(100% - 30px);
}
/*tree高度*/
.tree-wrapper{
    height:100%;
}
/*债券信息样式*/
.bond-detail{
    color: #FFEC8B;
}
.bond-detail span{
    display: inline-block;
    line-height: 26px;
    text-align: right;
    padding-right:3px;
    color: #fff;
}

.bond-detail >>>.align-center{
    width:100px; 
}

.table-bottom-row{
    height:24px;
    background:rgba(29,29,29,0.9);
   
}
.table-bottom-row:hover{
    background-color:rgba(103,36,3,1)
}
.table-bottom-cell{
    line-height:24px;
    padding-left:5px;
    color:#FFEC8B;
}


.text-passcolor{
    color:#fff;
    background-color:green;
}

.collect{
    display:flex; 
}
.collect-text{
    width:60px;
    height: 24px;
    line-height: 24px;
    color:#FFEC8B;
}

.flex-item{
    line-height: 24px;
    padding-left: 5px;
    height:24px;
    flex:1 0 auto;
}
.flex-item-perch{
    width:60px;
    flex:0 0 auto;
}

</style>


