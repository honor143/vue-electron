<template>
    <div class="bond-info padtop5 padright5">
        <div class="sec-header check-header">
            <div>
                <h3>投标指令审批<Badge :count="waitCheck"></Badge></h3>
            </div>
            <div class="align-center">
                <Checkbox v-model="ischecked" @on-change="selectCheck">显示已审批</Checkbox>
                &nbsp;<label for="">投标截止日期</label>
                <DatePicker clearable size="small" :value="lIssueEndDate" format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width:120px" @on-change="selectBidDate"></DatePicker>
                <!-- <Input search :value="vcSname" size="small" placeholder="债券简称" style="width: 120px" @on-search="selectBondShortName"/> -->
                <Input clearable v-model="vcSname" size="small" placeholder="债券简称" style="width: 120px" @on-change="selectBondName"/>
            </div>
            <div class="right-wrapper">
                <!-- <Button size="small" type="primary" @click="reject"  v-if="userButtonRoles.batchApprovalProcess_9_2">拒绝</Button>
                <Button size="small" type="primary" @click="agree"  v-if="userButtonRoles.batchApprovalProcess_9_2">同意</Button> -->
                <Button size="small" type="primary" @click="selectBidOrderCheck">刷新</Button>&nbsp;&nbsp;                
                <Icon type="md-alarm" size="26"/>
                <span>倒计时</span>
                <b class="waring-style">{{backtime}}</b>&nbsp;&nbsp;
                <span>投标截止</span>
                <b>{{bidendtime}}</b>
            </div>
        </div>
        <Row>
            <div class="table-wrapper table-wrapper-top" ref="tableWrap">
                <Table stripe highlight-row 
                    :loading="tableLoadingCheck" :height="tableHeight1" 
                    :columns="bidordercheck" :data="bidorderdata" 
                    @on-current-change="highlightRowCheck"
                    >
                </Table>
                <Page size="small" :total="totalSizeCheck" :current="pageNumCheck" @on-page-size-change="pageSizeChangeCheck" @on-change="pageNumChangeCheck"
                    :page-size="pageSizeCheck" :page-size-opts="pageOptsCheck" show-total show-elevator show-sizer>
                </Page>
            </div>
        </Row>
        <Row :gutter="5" class="bottom-height">
            <Col span="17" class="height100">
                <div class="sec-header">
                    <h3>投标指令明细</h3>
                    <Checkbox v-model="ischeckeddetail" @on-change="selectDetail" style="margin-left:58px;">显示已审批</Checkbox>
                    <div class="right-wrapper" style="top:1px;">
                        <Button size="small" type="primary" @click="reject('detail')"  v-if="userButtonRoles.approvalOfBiddingInstructions_9_1">拒绝</Button>
                        <Button size="small" type="primary" @click="agree('detail')"  v-if="userButtonRoles.approvalOfBiddingInstructions_9_1">同意</Button>
                    </div>
                </div>
                <div class="table-detail" ref="tableWrapSum">
                    <Table stripe highlight-row 
                        :height="tableHeight"
                        :loading="tableLoadingDetail" 
                        :columns="bidorderdetail" :data="bidorderdetaildata" 
                        @on-row-click="clickTableRowDetail"
                        @on-selection-change="selectedRow">
                    </Table>
                    <Page size="small" :total="totalSizeDetail" :current="pageNumDetail" @on-page-size-change="pageSizeChangeDetail" @on-change="pageNumChangeDetail"
                        :page-size="pageSizeDetail" :page-size-opts="pageOptsDetail" show-total show-elevator show-sizer>
                    </Page>
                </div>
            </Col>
            <Col span="7" class="height100">
                <div class="sec-header">
                    <h3>按投资经理汇总</h3>
                    <div class="right-wrapper" style="top:1px;">
                        <Button size="small" type="primary" @click="refreshSum">刷新</Button>
                    </div>                    
                </div>
                <div class="table-sum" ref="tableWrapSum">
                    <Table stripe
                        :height="tableHeight"
                        :row-class-name="rowClassName"
                        :loading="tableLoadingSum" 
                        :columns="managersum" :data="managersumdata" 
                        @on-row-click="clickTableRowSum"
                        >
                    </Table>
                    <Page size="small" :total="totalSizeSum" :current="pageNumSum" @on-page-size-change="pageSizeChangeSum" @on-change="pageNumChangeSum"
                        :page-size="pageSizeSum" :page-size-opts="pageOptsSum" show-total>
                    </Page>
                </div>
            </Col>
        </Row>
        <Modal
            width="300"
            v-model="modalShow"
            :title="modalTitle"
            :loading="modalLoading"
            @on-ok="ok('adviceObj')"
            @on-cancel="cancel('adviceObj')">
            <div class="modal-wraper" v-if="modalTitle==='提示'">
                <p :class="[adviceObj.title==='审批拒绝,意见如下'?'warning':'success']">{{adviceObj.title}}</p>
                <Form ref="adviceObj" :model="adviceObj">
                    <FormItem prop="text">
                        <Input v-model="adviceObj.text" type="textarea" placeholder="请输入审批意见" />
                    </FormItem>
                </Form>
                
            </div>
        </Modal>
        <Refresh @refresh="refresh"></Refresh>
    </div>
</template>
<script>
import Refresh from '../Refresh.vue'
import {setEndTime} from '../../util/backTime.js';
import {selectUserAuth} from '../../Api/common.js';
import {Debounce} from '../../util/throttle.js'
export default {
    name:'page_9',
    data(){
        return{
            //根据“投标指令审批”字段，切换“投标指令明细”表头
            vcBidTarget:null,//1或4利率下限,否则，价格上限
            //追加轮次
            lAddCount:0,
            //发行次数
            lIssueCnt:0,
            //权限对象
            userButtonRoles:{
                batchApprovalProcess_9_2:false,//批量审批
                approvalOfBiddingInstructions_9_1:false//审批
            },
            time:{
                D:'',
                h:'',
                m:'',
                s:''
            },
            //modal模块tip
            modalTip:'审批',
            modalShow:false,
            modalLoading:true,
            modalTitle:'提示',
            adviceObj:{
                title:'',
                text:''
            },
            orderStatus:1,
            detailStatus:1,
            fundType:'',
            lFundId:12,
            vcSname:'',
            vcCode:'',
            businessKey:'',
            //“投标指令明细”选中行的经理
            selectedMge:'',
            selectArr:[],
            selectRow:{},
            //table加载
            tableLoadingCheck:false,
            tableLoadingDetail:false,
            tableLoadingSum:false,
            //分页数据"投标指令审批"
            pageSizeCheck:30,
            totalSizeCheck:0,
            pageNumCheck:1,
            pageOptsCheck:[30,40,50],
            //分页数据"投标指令明细"
            pageSizeDetail:30,
            totalSizeDetail:0,
            pageNumDetail:1,
            pageOptsDetail:[30,40,50],
            //分页数据"按投资经理汇总"
            pageSizeSum:30,
            totalSizeSum:0,
            pageNumSum:1,
            pageOptsSum:[30,40,50],
            //table的height
            tableHeight1:278,
            tableHeight2:300,
            tableHeight:300,
            waitCheck:null,
            ischecked:true,
            ischeckeddetail:true,
            lIssueEndDate:'',
            interval:null, //定时器
            // isEnd:false,//倒计时是否结束
            //endTime:'2018-12-29 08:00:00',
            backtime:'',
            //bidendtime:'2019-11-30 15:30:12',/
            bidendtime:'',
            currentId:'',
            bidordercheck: [
                // {
                //     title:"选择",
                //     width: 50,
                //     render:(h,params)=>{
                //         let vcCode=params.row.vcCode;
                //         let defaults=false;
                //         if(this.currentId===vcCode){
                //             defaults=true;
                //         }else{
                //             defaults=false;
                //         }
                //         let self=this;
                //         return h("div",[
                //             h("radio",
                //                 {
                //                     props:{
                //                         value:defaults,
                //                         name:'bondRadio'
                //                     },
                //                     on:{
                //                         input:function(){
                //                             self.modalTip="审批";
                //                             self.currentId=vcCode;
                //                             console.log(self.currentId);
                //                         }
                //                     }
                //                 }
                //             )
                //         ])
                //     }
                // },
                {
                    title: '审批状态',
                    minWidth:60,
                    key: 'approvalStatus',
                    // render: (h, params) => {
                    //     const approvalStatus=params.row.approvalStatus===0?'已审批':'待审批';
                    //     return h('span', {
                    //         props: {
                    //             color: '#fff',
                    //             size: 18
                    //         }
                    //     },approvalStatus);
                    // }
                },
                {
                    title: '债券简称',
                    key: 'vcSname',
                    minWidth:80,
                },
                {
                    title: '债券类型',
                    key: 'vcBondTypeName',
                    minWidth:100,
                },
                {
                    title: '是否追加',
                    key: 'vcAddType',
                    minWidth:60,
                },
                {
                    title: '是否可投',
                    key: 'vcAdviceType',
                    minWidth:60,
                },
                {
                    title: '外部评级',
                    key: 'vcCreditRating',
                    minWidth:60,
                },
                {
                    title: '内部评级',
                    key: 'vcCreditRatingTk',
                    minWidth:60,
                },
                {
                    title: '账户类型',
                    key: 'vcFundType1',
                    minWidth:60,
                },
                // {
                //     title: '标位下限',
                //     key: 'enPriceFloor'
                // },
                {
                    title: '总量上限',
                    key: 'lAmountLimit',
                    minWidth:60,
                },
                // {
                //     title: '待审投标量',
                //     key: 'name10'
                // },
                {
                    title: '首轮投标量',
                    key: 'firstOrderScaler',
                    minWidth:80,
                },
                {
                    title: '中标价格',
                    key: 'enLotPrice',
                    minWidth:60,
                },
                {
                    title: '追加投标量',
                    key: 'enAddAmount',
                    minWidth:80
                }
            ],
            bidorderdata: [],
            bidorderdetail:[
                {
                    type: 'selection',
                    minWidth: 40
                    //minWidth: 50
                },
                {
                    title: '审批状态',
                    key: 'approvalStatus',
                    //minWidth: 80,
                    minWidth: 80,
                    // render: (h, params) => {
                    //     const approvalStatus=params.row.approvalStatus===0?'已审批':'待审批';
                    //     return h('span', {
                    //         props: {
                    //             color: '#fff',
                    //             size: 18
                    //         }
                    //     },approvalStatus);
                    // }
                },
                {
                    title: '审批节点',
                    key: 'name',
                    minWidth:120
                },
                {
                    title: '账户',
                    key: 'vcFundName',
                    minWidth:100
                },
                {
                    title: '组合',
                    key: 'vcCombiName',
                    minWidth:100
                },
                {
                    title: '发行市场',
                    key: 'vcMarketName',
                    minWidth:90
                },
                {
                    title: '经理',
                    key: 'vcDisplayName',
                    minWidth:60,
                    elipsis:true,
                    tooltip:true
                },
                {
                    title: '总量上限',
                    key: 'lAmountLimit',
                    minWidth:90
                },
                {
                    title: '追加总量上限',
                    key: 'lAddAmountLimit',
                    minWidth:120
                },
                {
                    title: '利率下限',
                    //key: 'rateFloor',
                    minWidth:90,
                    render: (h, params) => {
                        const row = params.row;
                        const color = 'red';
                        const enPriceFloor=row.enPriceFloor===null?'':row.enPriceFloor;
                        const target=row.target===null?'':row.target 
                        let bid=enPriceFloor+''+target;
                        return h('span', {
                            props: {
                                //color: color,
                                size: 18
                            }
                        },bid);
                    }
                },
                {
                    title: '首轮投标量',
                    key: 'enBidAmount',
                    minWidth:90
                },
                // {
                //     title: '中标价格',
                //     key: 'enLotPrice',
                //     minWidth:60
                // },
                {
                    title: '追加投标量',
                    key: 'enAddAmount',
                    minWidth:100
                },
                // {
                //     title: '备注',
                //     key: 'vcRemarks'
                // },
                {
                    title: '审批意见',
                    key: 'message',
                    minWidth:100
                }
            ],
            bidorderdetaildata:[],
            managersum:[
                {
                    title: '投资经理',
                    minWidth:60,
                    key: 'vcDisplayName'
                },
                {
                    title: '债券简称',
                    minWidth:60,
                    key: 'vcSname'
                },
                {
                    title: '投标总量',
                    minWidth:60,
                    key: 'enBidAmount'
                },
            ],
            managersumdata:[]
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
        this.selectBidOrderUncheckNum();
        this.selectBidOrderCheck();
        this.selectMgeBidSum();

        //this.selectBidOrderEndTime();
		//this.getBackTime();
    },
    mounted(){
        //if(this.$refs.tableWrap.getBoundingClientRect()){
            this.tableHeight=this.$refs.tableWrapSum.getBoundingClientRect().height - 30;
            window.addEventListener('resize', () => {//动态调整高度
                this.tableHeight=this.$refs.tableWrapSum.getBoundingClientRect().height - 30;
            })
        //}
    },
    methods:{
        // 组件数据刷新
        refresh(){
             this.selectBidOrderUncheckNum();
            this.selectBidOrderCheck();
            this.selectMgeBidSum();
        },
        selectBondName:Debounce(function(){
                this.selectBidOrderUncheckNum();
                this.selectMgeBidSum();
                this.selectBidOrderCheck();
            },500),
        
        
        //查询待审批个数
        selectBidOrderUncheckNum(){
            this.$httpGet(`/bondApproval/selectPendingApprovalCount?lIssueEndDate=${this.lIssueEndDate}&vcSname=${this.vcSname}`)
                .then((res) => {    
                    if(res.status===200){
                        this.waitCheck=res.data;                        
                    }                
                })
        },
        //查询投标指令审批
        selectBidOrderCheck(){
            this.tableLoadingCheck=true;
            this.$httpGet(`/bondApproval/selectBidOrderApproval?lIssueEndDate=${this.lIssueEndDate}&orderStatus=${this.orderStatus}&pageNum=${this.pageNumCheck}&pageSize=${this.pageSizeCheck}&vcSname=${this.vcSname}`)
                .then((res) => {            
                    if(res.status===200 && res.data){
                        this.tableLoadingCheck=false;
                        this.bidorderdata=res.data.list;
                        this.totalSizeCheck=res.data.total;

                        if(this.bidorderdata.length>0){
                            //默认第一行高亮,并查询相关信息
                            // this.bidorderdata[0]._highlight=true;
                            // this.vcCode=this.bidorderdata[0].vcCode;
                            // this.fundType=this.bidorderdata[0].vcFundType1;
                            // this.lIssueCnt=this.bidorderdata[0].lIssueCnt;
                            // this.lAddCount=this.bidorderdata[0].lAddCount;
                            // this.vcBidTarget=this.bidorderdata[0].vcBidTarget;
                            // this.selectBidOrderDetail();
                            // if(this.vcCode){
                            //     this.selectBidOrderEndTime();
                            // }
                             // 没有高亮行时默认选中第一行
                            if(!this.vcCode){
                                //默认第一行高亮,并查询相关信息
                                this.bidorderdata[0]._highlight=true;
                                this.vcCode=this.bidorderdata[0].vcCode;
                                this.fundType=this.bidorderdata[0].vcFundType1;
                                this.lIssueCnt=this.bidorderdata[0].lIssueCnt;
                                this.lAddCount=this.bidorderdata[0].lAddCount;
                                this.vcBidTarget=this.bidorderdata[0].vcBidTarget;
                            }else{
                                this.bidorderdata.forEach((item) => {
                                    if(item.vcCode == this.vcCode){
                                        item._highlight = true;
                                    }
                                })
                            }                           
                            this.selectBidOrderDetail();

                        }else{
                            console.log("this.bidendtime");
                            this.vcCode='';
                            //如果“投标指令审批”为空,则"投标指令明细"为空
                            this.bidorderdetaildata=[];
                            this.bidendtime='';
                            //console.log(this.bidendtime);
                            //this.backtime='';
                            this.getBackTime();
                        }
                        this.selectBidOrderEndTime();
                        console.log(this.bidendtime);
                    }                
                })
        },
        //查询投标指令明细
        selectBidOrderDetail(){
            this.tableLoadingDetail=true;
            this.$httpGet(`/bondApproval/selectBiddingInstructionsDetail?lIssueCnt=${this.lIssueCnt}&fundType=${this.fundType}&orderStatus=${this.detailStatus}&pageNum=${this.pageNumDetail}&pageSize=${this.pageSizeDetail}&vcCode=${this.vcCode}`)
                .then((res) => {            
                    if(res.status===200 && res.data){
                        this.tableLoadingDetail=false;
                        this.bidorderdetaildata=res.data.list;
                        this.totalSizeDetail=res.data.total;
                        this.selectedMge='';
                        console.log('this.lAddCount');
                        //追加轮次为首轮，将追加总量删掉
                        if(this.lAddCount==0 || this.lAddCount==null){
                            this.bidorderdetail.forEach((item,index)=>{
                                if(item.key=="lAddAmountLimit"){
                                    this.bidorderdetail.splice(index,1);
                                }
                                if(item.key=="enAddAmount"){
                                    this.bidorderdetail.splice(index,1);
                                }
                            })
                        }else{
                            let flag=false;
                            this.bidorderdetail.forEach((item,index)=>{
                                if(item.key=="lAddAmountLimit"){
                                    flag=true;
                                }
                            })
                            this.bidorderdetail.forEach((item,index)=>{
                                if(!flag){
                                    if(item.key=="lAmountLimit"){
                                        this.bidorderdetail.splice(index+1,0,{
                                            title: '追加总量上限',
                                            key: 'lAddAmountLimit',
                                            minWidth:120
                                        });
                                    }
                                    if(item.key=="enBidAmount"){
                                        this.bidorderdetail.splice(index+1,0,{
                                            title: '追加投标量',
                                            key: 'enAddAmount',
                                            minWidth:100
                                        });
                                    }

                                }
                            })
                        }
                        //根据“投标指令审批”字段，切换“投标指令明细”表头
                        if(this.vcBidTarget==1 || this.vcBidTarget==4){                           
                            this.bidorderdetail.forEach((item,index)=>{
                                if(item.title=="价格上限"){
                                    item.title="利率下限";
                                }
                            })
                        }else{
                            this.bidorderdetail.forEach((item,index)=>{
                                if(item.title=="利率下限"){
                                    item.title="价格上限";
                                }
                            })
                        }
                    }                
                })
        },
        //查询投标截止时间和倒计时
        selectBidOrderEndTime(){
            this.$httpGet(`/bondApproval/selectBidDeadlineDcountdown?lIssueCnt=${this.lIssueCnt}&vcCode=${this.vcCode}`)
                .then((res) => {            
                    if(res.status===200 && res.data){
                        this.bidendtime=res.data;
                        this.getBackTime();
                        //this.backtime=this.getBackTime();
                        // console.log('打印结果');
                        // console.log(res.data.bidDeadline);
                    }                
                })
        },
        //投资经理投标总量
        selectMgeBidSum(){
            this.tableLoadingSum=true;
            this.$httpGet(`/bondApproval/selectTotalInvestment?lIssueEndDate=${this.lIssueEndDate}&vcSname=${this.vcSname}&pageNum=${this.pageNumSum}&pageSize=${this.pageSizeSum}`)
                .then((res) => {            
                    if(res.status===200 && res.data){
                        this.tableLoadingSum=false;
                        this.managersumdata=res.data.list;
                        this.totalSizeSum=res.data.total;
                    }                
                })
        },
        //显示已审批(投标指令审批)
        selectCheck(val){
            if(val){
                this.orderStatus=1
            }else{
                this.orderStatus=0;
            }
            this.selectBidOrderCheck();
        },
        //显示已审批查询(投标指令明细)
        selectDetail(val){
            if(val){
                this.detailStatus=1
            }else{
                this.detailStatus=0;
            }
            this.selectBidOrderDetail();
        },
        //投标日期查询
        selectBidDate(val,type){
            this.lIssueEndDate=val;
            this.selectBidOrderUncheckNum();
            this.selectMgeBidSum();
            this.selectBidOrderCheck();
        },
        //债券简称查询
        selectBondShortName(val){
            this.vcSname=val;
            this.selectBidOrderCheck();
        },
        //“刷新”投标指令审批
        refreshCheck(){           
            this.selectBidOrderCheck();
        },
        //“刷新”按投资经理汇总
        refreshSum(){
            this.selectMgeBidSum();
        },
        //"同意"
        agree(detail){
            if(detail==='detail'){
                if(this.selectArr.length<1){
                    this.$Message.warning("请选择指令明细");
                }else{
                    this.modalShow=true;
                    this.adviceObj.title="审批通过,意见如下";
                }
            }else{
                if(this.currentId===''){
                    this.$Message.warning("请选择指令");
                }else{
                    this.modalShow=true;
                    this.adviceObj.title="审批通过,意见如下";
                }               
            }                         
        },
        //"拒绝"
        reject(detail){
            if(detail==='detail'){
                if(this.selectArr.length<1){
                    this.$Message.warning("请选择指令明细");
                }else{
                    this.modalShow=true;
                    this.adviceObj.title="审批拒绝,意见如下";
                }
            }else{
                if(this.currentId===''){
                    this.$Message.warning("请选择指令");
                }else{
                    this.modalShow=true;
                    this.adviceObj.title="审批拒绝,意见如下";
                }               
            }
            
        },
        //弹框中确认
        ok(name){
            if(this.modalTip==="审批"){//批量审批投标指令
                let bool=this.adviceObj.title==="审批拒绝,意见如下"?false:true;
                //console.log(typeof this.adviceObj.text);
                this.$httpGet(`/bondApproval/batchApprovalProcess?lFundId=${this.lFundId}
                    &auditStatus=${bool}&message=${this.adviceObj.text}&vcCode=${this.vcCode}`)
                    .then((res) => {            
                        if(res.status===200 && res.data){
                            this.$Message.success(res.data.data);
                            this.$refs[name].resetFields();
                            this.modalShow=false;
                        }else{
                            this.$Message.warning(res.data.data);
                        }                
                    })
            }else if(this.modalTip==="明细"){//审批投标指令
                let bool=this.adviceObj.title==="审批拒绝,意见如下"?false:true;
                // let idStr='';
                // for(let i=0;i<this.selectArr.length-1;i++){
                //     idStr+=this.selectArr[i]+',';
                // }
                // idStr+=this.selectArr[this.selectArr.length-1];
                this.$httpGet(`/bondApproval/approvalOfBiddingInstructions?taskId=${this.selectArr}&message=${this.adviceObj.text}&auditStatus=${bool}`)
                // this.$httpGet(`/bondApproval/approvalOfBiddingInstructions?taskId=${idStr}&message=${this.adviceObj.text}&auditStatus=${bool}`)
                    .then((res) => {            
                        if(res.status===200 && res.data){
                            this.$Message.success(res.data.data);
                            this.$refs[name].resetFields();
                            this.selectBidOrderCheck();
                            //this.selectBidOrderDetail();
                            this.selectBidOrderUncheckNum();
                            this.modalShow=false;
                        }else{
                            this.$Message.warning(res.data.data);
                            
                        }                
                    })
            }
        },
        cancel(name){
            this.$refs[name].resetFields();
        },
        //根据选中的“投标指令明细”改变“汇总”对应的行样式
        rowClassName (row, index) {
            //console.log(this.selectedMge == row.vcDisplayName);
            if (this.selectedMge.indexOf(row.vcDisplayName)>-1) {
                return 'waring-row';
            }else{
                return '';
            }
        },
        //页码改变时的回调(投标指令审批)
        pageNumChangeCheck (page){
            this.pageNumCheck = page;
            this.selectBidOrderCheck();
        },
        //每页数据条数改变时的回调(投标指令审批)
        pageSizeChangeCheck (pageSize){
            this.pageSizeCheck = pageSize;
            this.selectBidOrderCheck();
        },
        //页码改变时的回调(投标指令明细)
        pageNumChangeDetail (page){
            this.pageNumDetail = page;
            this.selectBidOrderDetail();
        },
        //每页数据条数改变时的回调(投标指令明细)
        pageSizeChangeDetail (pageSize){
            this.pageSizeDetail = pageSize;
            this.selectBidOrderDetail();
        },
        //页码改变时的回调(按投资经理汇总)
        pageNumChangeSum (page){
            this.pageNumSum = page;
            this.selectMgeBidSum();
        },
        //每页数据条数改变时的回调(按投资经理汇总)
        pageSizeChangeSum (pageSize){
            this.pageSizeSum = pageSize;
            this.selectMgeBidSum();
        },
        //高亮"投标指令审批"表格
        highlightRowCheck(row,oldRow){
            this.currentId=row.vcCode;
            this.modalTip="审批";
            this.vcCode=row.vcCode;
            this.fundType=row.vcFundType1;
            this.lIssueCnt=row.lIssueCnt;
            this.lAddCount=row.lAddCount;
            this.vcBidTarget=row.vcBidTarget;
            this.selectBidOrderEndTime();
            this.selectBidOrderDetail();
        },
        //单击""投标指令明细"表格
        clickTableRowDetail(row,index){
            this.modalTip="明细";
            this.businessKey=row.businessKey;
            this.selectedMge=row.vcDisplayName;
        },
        //选项改变时触发"投标指令明细"
        selectedRow(selection){
            this.modalTip="明细";
            this.selectArr=[];
            for(let i in selection){
                this.selectArr.push(selection[i].taskId); 
                if(this.selectArr.length==1){
                    this.selectRow={};
                    this.selectRow=selection[0];
                }
            }            
        },
        //单击""按投资经理汇总"表格
        clickTableRowSum(row,index){
            //console.log(index);
        },
        //倒计时
        getBackTime(){
            this.interval = setInterval(() => {
                this.backtime = setEndTime(this.bidendtime, this.interval)
            }, 1000);
        }
        
    },
    beforeDestroy () {
        if(this.interval) {
            clearInterval(this.interval);//在vue实例销毁钱，清除我们的定时器
        }
    },
    components:{
        Refresh
    },
}
</script>

<style scoped lang="scss">
@import './../../style/basevariable.scss';
/*拒绝、同意提示色*/
.success{
    color:$successcolor;
}
.warning{
    color:$waringcolor;
}
/*头部居中*/
 .check-header .align-center{
     left:160px;
     top:2px;
 }
/*时钟图标*/
.bond-info >>> .ivu-icon-md-alarm{
    margin-top:-3px;
}
/*倒计时*/
.sec-header b:nth-of-type(2){
    font-weight: 400;
    color: #FFEC8B!important;
}
/*底部表格行样式*/
.bottom-height{
    height:calc(100% - 360px);
}
.height100{
    height:100%;
}
.table-wrapper-top{
    min-height: 100px;
    padding-bottom: 4px;
}
.table-detail,.table-sum{
    height:calc(100% - 30px);
}
.table-detail .ivu-table-wrapper,.table-sum .ivu-table-wrapper{
    height:calc(100% - 30px)!important;
    
}
.table-detail .ivu-table,.table-sum .ivu-table{
    height:calc(100% - 30px);
}
.table-detail >>> .ivu-table .ivu-table-body,.table-sum >>> .ivu-table .ivu-table-body{
    height:calc(100% - 40px);
    overflow: auto;
    // overflow-x: hidden;
}
</style>

