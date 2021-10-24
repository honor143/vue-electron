<template>
    <div class="bond-info">
        <Row class="filter-bar">
            <span>债券名称:</span>
            <Input @keyup.enter.native="selectBondInfo" clearable v-model="vcSname" size="small" style="width: 100px"  placeholder="不限"/>
            <span>投标开始日:</span>
            <DatePicker @keyup.enter.native="selectBondInfo" :editable="false" type="date" @on-change="getStartDate" :value="lIssueBeginDate" placeholder="选择日期" format="yyyy-MM-dd" style="width: 110px" size="small"></DatePicker>
            <span>投标截止日:</span> 
            <DatePicker @keyup.enter.native="selectBondInfo" :editable="false" type="date" @on-change="getEndDate" :value="lIssueEndDate" placeholder="选择日期" style="width: 110px" size="small"></DatePicker>
            <Checkbox v-show="isShowCheckbox" v-model="ischecked" style="margin-right:0;">包含未生效</Checkbox>
            <Button type="primary" size="small" @click="defaultSelectBondInfo">默认</Button>
            <Button type="primary" size="small" @click="selectBondInfo('num')">查询</Button>
            
            <Button type="primary" size="small" v-if="userButtonRoles.updateBondTsBidDeadline_6_4" @click="editEndTime">维护截止时间</Button>
            <Button type="primary" size="small" v-if="userButtonRoles.updateInterestRateRange_6_5" @click="editRateArea">维护利率区间</Button>
            <Button type="primary" size="small" v-if="userButtonRoles.updateBondBit_6_3" @click="editBid">维护标位</Button>
            <Button type="primary" size="small" v-if="userButtonRoles.updateSingleBondConcentration_6_6" @click="editBondFocus">维护单券集中度</Button>
        </Row>
        <Layout class="bond-layout">
            <Content>                
                <div class="table-wrapper" ref="tableWrap">
                    <Table class="table-height" stripe highlight-row 
                        :loading="tableLoading" :height="tableHeight" 
                        :columns="tableColumns" :data="tableData" 
                        @on-current-change="clickTableRow"
                        @on-row-dblclick="dbClickTableRow"
                        @on-sort-change="changeSort"
                        >
                    </Table>
                    <Page size="small" :total="totalSize" :current="pageNum" @on-page-size-change="pageSizeChange" @on-change="pageNumChange"
                     :page-size="pageSize" :page-size-opts="pageOpts" show-total show-elevator show-sizer>
                    </Page>
                </div>
                <div @click="collapsedSider" class="show-hide-side-rt">
                    <Icon :class="rotateIcon" type="md-arrow-dropleft" size="14"/>
                </div>
            </Content>
            <Sider class="info-sider" ref="side1" hide-trigger collapsible :width="sideWidth" :collapsed-width="0" v-model="isCollapsed">
                    <!-- <div class="marbot5 align-right">
                        <Button type="primary" size="small" v-if="userButtonRoles.updateSingleBondConcentration_6_6" @click="editBondFocus" style="margin:5px 5px 0 0;">维护单券集中度</Button>
                    </div> -->
                    <div class="info-sider-right">
                        <BondDetail ref="detailTab" :lIssueCnt="lIssueCnt"  :vcCode="vcCodeSelected" :bondDetail="bondDetail"></BondDetail>
                    </div>                    
            </Sider>
        </Layout>
        <Modal
            :width="modalWidth"
            v-model="modalShow"
            :title="modalTitle"
            :loading="endTimeLoading"
            @on-visible-change="modalChange"
            @on-ok="ok">
            <div class="modal-wraper" v-if="modalTitle==='维护截止时间'">
                <div class="marbot5" v-if="lAddCount==0 || lAddCount==null">
                    <span>投标截止时间:</span>
                    <DatePicker type="date" @on-change="getEndDateModal"  :value="endDate.date" format="yyyy-MM-dd" placeholder="请选择" style="width: 120px"></DatePicker>
                    <TimePicker type="time" @on-change="getEndTimeModal"  :value="endDate.time" format="HH:mm:ss" placeholder="请选择" style="width: 120px"></TimePicker>
                </div>
                <div v-if="lAddCount>0">
                    <span>追加截止时间:</span>
                    <DatePicker type="date" @on-change="getAddEndDateModal"  :value="addEndDate.date" format="yyyy-MM-dd" placeholder="请选择" style="width: 120px"></DatePicker>
                    <TimePicker type="time" @on-change="getAddEndTimeModal"  :value="addEndDate.time" format="HH:mm:ss" placeholder="请选择" style="width: 120px"></TimePicker>
                </div>
            </div>
            <div class="modal-wraper" v-if="modalTitle==='维护利率区间'">
                <span>利率区间:</span>
                <InputNumber size="small" :min="0" :step="1" v-model="rateForm.enRateCeil" style="width:100px"></InputNumber><span>&nbsp;%</span>
                <!-- <Input size="small" number v-model="rateForm.enRateCeil" style="width:100px"></Input><span>&nbsp;%</span> -->
                <b>&nbsp;&nbsp;至&nbsp;&nbsp;</b>
                <InputNumber size="small" :min="0" :step="1" v-model="rateForm.enRateFloor" style="width:100px"></InputNumber><span>&nbsp;%</span>
                <!-- <Input size="small" number v-model="rateForm.enRateFloor" style="width:100px"></Input><span>&nbsp;%</span> -->
            </div>
            <div class="modal-wraper" v-if="modalTitle==='维护标位'">
                <!-- <Form ref="editBid" :model="editBidForm" :label-width="120" :label-position="labelPos">
                    <FormItem 
                        v-for="(item,index) in editBidForm.bidsArr" :key="index"
                        :label="'标位'+(index+1)" 
                        :prop="'enFixbit' + ( index + 1)">
                        <Input type="number" v-model="editBidForm.bidsArr[index]" placeholder="" style="width: 300px;margin-left:3px;" />                               
                        <span v-if="bidsType===1 || bidsType===4">%</span>
                        <span v-if="bidsType!==1 && bidsType!==4">元</span>
                        <Icon class="input-after-icon"  @click="deleteBit(index)" size="16" color="#ed4014" type="ios-close-circle" />
                    </FormItem> 
                    <FormItem>
                        <Button type="primary" @click="addBit" shape="circle" icon="md-add"></Button>                                
                    </FormItem>
                </Form> -->
                <Form ref="editBid" :model="editBidForm" :label-width="120" :label-position="labelPos">
                    <FormItem 
                        v-for="(item,index) in editBidForm.bidsArr" 
                        :key="index"
                        :label="'标位'+(index+1)" 
                        :rules="{required: true,validator:(bidsType===1 || bidsType===4)?validatePercent:validateYuan, trigger: 'blur'}"
                        :prop="'bidsArr.' + index"
                        >
                        <Input v-model="editBidForm.bidsArr[index]" placeholder="请输入标位" style="width: 300px;margin-left:18px;">
                            <span slot="append">{{(bidsType===1 || bidsType===4)?'%':'元'}}</span>
                        </Input>                             
                        
                        <Icon class="input-after-icon"  @click="deleteBit(index)" size="16" color="#ed4014" type="ios-close-circle" />
                    </FormItem> 
                    <FormItem>
                        <Button type="primary" @click="addBit" shape="circle" icon="md-add"></Button>                                
                    </FormItem>
                </Form>
            </div>
        </Modal>
        <!--刷新页面数据的组件-->
        <Refresh @refresh="refresh"></Refresh>
    </div>
</template>
<script>
import {validatePercent,validateYuan} from '../../util/valide.js'
import BondDetail from './module/BondDetail.vue';
import Refresh from '../Refresh.vue'
import {addDate} from './../../util/base.js';
import {selectUserAuth} from '../../Api/common.js'
import { constants } from 'fs';
  export default {
    name:'page_6',
    data () {
        return {
            validateYuan:validateYuan,
            validatePercent:validatePercent,
            //排序对象
            orderList:{},
            //是否过期(1)
            ischecked:false,
            //标位数组
            //bidsArr:[]
            bidsType:0,
            //追加次数
            lAddCount:0,
            //发行次数
            lIssueCnt:0,
            //权限‘按钮’控制
            userButtonRoles:{
                //defaultBtn:false,//默认按钮
                //searchBtn:false,//查询
                updateBondTsBidDeadline_6_4:false,//维护截止时间
                updateInterestRateRange_6_5:false,//维护利率区间
                updateBondBit_6_3:false,//维护标位)
                updateSingleBondConcentration_6_6:false,//维护单券集中度
            },
            //分页数据
            pageSize:30,
            totalSize:0,
            pageNum:1,
            pageOpts:[30,40,50],
            //投标中截止时间
            endDate:{
                date:'',
                time:''
            },
            //追加投标截止时间
            addEndDate:{
                date:'',
                time:''
            },
            //选中的行
            selectedRow:{},
            //选中的债券
            vcCodeSelected:'',
            tableLoading:false,
            tableHeight:500,
            labelPos:'right',
            modalWidth:420,
            activeChange:false,
            editBidForm:{   
                bidsArr:[]             
                // enFixbit1:0,
                // enFixbit2:0,
                // enFixbit3:0,
                // enFixbit4:0,
                // enFixbit5:0,
                // enFixbit6:0,
                // enFixbit7:0,
                // enFixbit8:0,
                // enFixbit9:0,
                // enFixbit10:0
            },
            rateForm:{
                enRateCeil:0,
                enRateFloor:0
            },
            ruleEditBid:{

            },
            modalTitle:'维护截止时间',
            //投标开始日
            lIssueBeginDate:'',
            //投标截止日
            lIssueEndDate:'',
            //截止时间弹框显示
            modalShow:false,
            endTimeLoading:true,
            //利率区间显示
            rateAreaShow:false,
            //标位弹框显示
            bidShow:false,
            sideWidth:360,
            isCollapsed: false,
            vcSname:"",
            tableColumns: [
                {
                    title: '状态',
                    minWidth: 50,
                    render: (h, params) => {
                        const row = params.row;
                        const color = row.bondState === null ?'' : row.bondState === 1?'green':row.bondState === 2?'#ff9900':'red';
                        const type = row.bondState === null ?'' : row.bondState === 1?'ios-checkmark-circle':row.bondState === 2?'ios-warning':'ios-information-circle';
                        const tooltip = row.bondState === null ?'' : row.bondState === 1?'已在途':row.bondState === 2?'未开始或已结束':'紧急';
                        return h('div',[
                            h('Tooltip',{
                                props:{
                                    placement:'right',
                                    transfer:true,
                                    content:tooltip
                                }
                            },[
                                h('Icon', {
                                    props: {
                                        type: type,
                                        color: color,
                                        size: 18
                                    }
                                })
                            ])
                        ])
                    }
                },
                {
                    title: '是否可投',
                    minWidth:80,
                    key: 'vcAdviceType',
                    sortable: 'custom'
                },
                // {
                //     title: '是否过期',
                //     minWidth:60,
                //     key: 'bondStatus'
                    
                // },
                {
                    title: '债券简称',
                    minWidth:120,
                    key: 'vcSname',                   
                    ellipsis:true,
                    tooltip:true,
                    sortable: 'custom'
                },
                // {
                //     title: '发行市场',
                //     key: 'vcMarketName'
                // },
                {
                    title: '债券类型',
                    minWidth:120,
                    key: 'vcBondTypeName',
                    ellipsis:true,
                    tooltip:true,
                    sortable: 'custom'
                },
                {
                    title: '发行主体简称',
                    key: 'vcIssueCompany',
                    minWidth:100,
                    ellipsis:true,
                    tooltip:true,
                    sortable: 'custom'
                },
                {
                    title: '投标开始日',
                    key: 'lBidDate',
                    minWidth:95,
                    sortable: 'custom',
                    render: (h, params) => {
                        const row = params.row;
                        let date;
                        if(row.lBidDate){
                            date=row.lBidDate.substring(0,10);                           
                        }else{
                            date='';
                        }
                        return h('span',date);
                    }
                },
                {
                    title: '投标截止日',
                    key: 'lIssueEndDate',
                    minWidth:130,
                    sortable: 'custom',
                    render: (h, params) => {
                        const row = params.row;
                        let date;
                        if(row.lIssueEndDate){
                            date=row.lIssueEndDate;                           
                        }else{
                            date='';
                        }
                        return h('span',date);
                    }
                },
                {
                    title: '发行规模',
                    key: 'enIssueAmountAct',
                    minWidth:80,
                    sortable: 'custom'
                },
                {
                    title: '期限(年)',
                    key: 'enMaturity',
                    minWidth:90,
                    //sortable: 'custom'
                },
                {
                    title: '投标标的',
                    key: 'vcBidTargetName',
                    minWidth:60,
                    //sortable: 'custom'
                },
                {
                    title: '市场利率',
                    key: 'vcMarketRate',
                    minWidth:60,
                    //sortable: 'custom'
                },
                {
                    title: '利率区间(%)',
                    align:"center",
                    minWidth: 90,
                    //sortable: 'custom', 
                    render: (h, params) => {
                        const row = params.row;
                        const color = 'red';
                        const enRateCeil=row.enRateCeil===null?'':row.enRateCeil;
                        const enRateFloor=row.enRateFloor===null?'':row.enRateFloor 
                        let rate=enRateCeil+'-'+enRateFloor;
                        return h('span', {
                            props: {
                                color: color,
                                size: 18
                            }
                        },rate);
                    }
                },
            ],
            tableData:[],
            //债权详情
            bondDetail:{}
        }       
    },
    
    created(){
        //“默认”查询
        this.defaultSelectBondInfo();
        
        //点击enter查询
        // let that=this;
        // document.onkeydown=function(e){
        //     if(window.event.keyCode===13){
        //         that.selectBondInfo();
        //     }
        // }
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
    mounted(){
        // console.log(this);
        //if(this.$refs.tableWrap.getBoundingClientRect()){
            this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height - 30;
            window.addEventListener('resize', () => {//动态调整高度
                this.tableHeight=this.$refs.tableWrap.getBoundingClientRect().height - 30;
            })
            // this.$route.meta.keepAlive = true;
        //}
    },
    computed: {
        rotateIcon () {
            return this.isCollapsed ? 'show-side' : 'hide-side';
        },
        isShowCheckbox(){
            let res;
            if(this.lIssueBeginDate=='' && this.lIssueEndDate==''){
                res=false;
                this.ischecked=false;
            }else{
                res=true;
            }
            return res;
        }       
    },
    methods:{
        //排序
        changeSort(columnObj){
            console.log(columnObj);
            this.orderList.field=columnObj.key;
            this.orderList.order=columnObj.order;
            this.selectBondInfo();
        },
        // 组件数据刷新
        refresh(){
            this.defaultSelectBondInfo();
        },
        //默认搜索“债券发行信息”
        defaultSelectBondInfo(){
            this.vcSname='';
            this.lIssueBeginDate='';
            //投标截止日默认当前日期加一天
            //this.lIssueEndDate=addDate(new Date(),1);
            this.lIssueEndDate='';
            this.selectBondInfo('num');
            this.bondDetail={};
        },
        //删除标位
        deleteBit(index){
            if(this.editBidForm.bidsArr.length > 1){
                this.editBidForm.bidsArr.splice(index,1); 
                //this.editBidForm={};
                for(let i=1;i<this.editBidForm.bidsArr.length+1;i++){
                    this.editBidForm['enFixbit'+i]=this.editBidForm.bidsArr[i-1];
                    if(this.editBidForm.bidsArr[i-1]==0){
                        flag=false;
                    }
                }
            }else{
                this.$Message.warning({
                    content: '至少需要保留一个标位'
                })
            }
            
        },
        //新增标位  
        addBit(){
            if(this.editBidForm.bidsArr.length>9){
                this.$Message.warning("最多只能添加十个标位");
            }else{
                this.editBidForm.bidsArr.push(null);
            }
        },
        //获取投标开始日
        getStartDate(val,date){
            this.lIssueBeginDate=val;
            //this.isShowCheckbox=true;
        },
        //获取投标截止日
        getEndDate(val,date){
            this.lIssueEndDate=val;
            //this.isShowCheckbox=true;
        },
        getEndDateModal(val,date){
            this.endDate.date=val;
        },
        getEndTimeModal(val,date){
            this.endDate.time=val;
        },
        getAddEndDateModal(val,date){
            this.addEndDate.date=val;
        },
        getAddEndTimeModal(val,date){
            this.addEndDate.time=val;
        },
          //页码改变时的回调
        pageNumChange (page){
            this.pageNum = page;
            this.selectBondInfo();
        },
        //每页数据条数改变时的回调
        pageSizeChange (pageSize){
            this.pageSize = pageSize;
            this.selectBondInfo();
        },
        //维护截止时间
        editEndTime(){
            if(!this.vcCodeSelected){
                this.$Message.warning("请选择要维护的债券");
            }else{
                this.modalShow=true;
                this.modalWidth=420;
                this.modalTitle="维护截止时间";

                //为弹框赋值
                this.endDate.date=this.selectedRow.lIssueEndDate===null?'':this.selectedRow.lIssueEndDate.substring(0,10);
                this.endDate.time=this.selectedRow.lIssueEndDate===null?'':this.selectedRow.lIssueEndDate.substring(11);
                this.addEndDate.date=this.selectedRow.tsAddBidDeadline===null?'':this.selectedRow.tsAddBidDeadline.substring(0,10);
                this.addEndDate.time=this.selectedRow.tsAddBidDeadline===null?'':this.selectedRow.tsAddBidDeadline.substring(11);                
            }            
        },
        //维护利率区间
        editRateArea(){
            if(!this.vcCodeSelected){
                this.$Message.warning("请选择要维护的债券");
            }else{
                this.modalShow=true;
                this.modalWidth=520;
                this.modalTitle="维护利率区间";
                //为弹框赋值
                this.rateForm.enRateCeil=this.selectedRow.enRateCeil?this.selectedRow.enRateCeil:(this.selectedRow.enRateCeil==0)?0:null;
                this.rateForm.enRateFloor=this.selectedRow.enRateFloor?this.selectedRow.enRateFloor:(this.selectedRow.enRateCeil==0)?0:null;
            }
        },
        //维护标位        
        editBid(){
            if(!this.vcCodeSelected){
                this.$Message.warning("请选择要维护的债券");
            }else{
                this.modalShow=true;
                this.modalWidth=520;
                this.modalTitle="维护标位";
                console.log(this.selectedRow.enFixbit1);
                //为弹框赋值
                this.$httpGet(`/bondIssue/selectBondBidOrder?lIssueCnt=${this.lIssueCnt}&vcCode=${this.vcCodeSelected}`)
                .then((res) => {    
                    if(res.status===200 && res.data){                        
                        this.editBidForm.bidsArr=res.data.bidPrice;
                        this.bidsType=res.data.vcBidTarget;
                        //如果3个标位，保留3个标位
                        if(this.editBidForm.bidsArr.length < 4){
                            this.editBidForm.bidsArr.length = 3
                        }
                    }                
                })
            }
        },
        //维护单券集中度
        editBondFocus(){
            //判空
            if(this.vcCodeSelected!==''&& this.vcCodeSelected!==null && this.vcCodeSelected!==undefined){
                if(this.isCollapsed){//如果右侧边栏是折叠的,则打开
                    this.isCollapsed=false;
                }               
                this.$refs.detailTab.switchTab();
            }else{
                this.$Message.warning("请选择债券");
            }
        },
        modalChange(bol){
            if(!bol){
                if(this.modalTitle=="维护标位"){
                    this.$refs.editBid.resetFields();
                }
            }
        },
        //弹框确认
        ok(){                                       
            if(this.modalTitle==="维护截止时间"){//维护截止时间
                if(this.lAddCount==0 || this.lAddCount==null){
                    this.$httpGet(`/bondIssue/updateBondTsBidDeadline?lIssueCnt=${this.lIssueCnt}&lAddCount=${this.lAddCount}&tsBidDeadline=${this.endDate.date+' '+this.endDate.time}&vcCode=${this.vcCodeSelected}`)
                        .then((res)=>{
                            if(res.status===200 && res.data.actionResult===1){
                                //this.selectBondInfo();
                                this.$Message.success(res.data.data);
                                this.modalShow=false;
                                //为高亮行赋值，不刷新tableData
                                this.tableData.forEach(ele => {
                                    ele._highlight=false;
                                    if(this.vcCodeSelected==ele.vcCode){
                                        ele.lIssueEndDate=this.endDate.date+' '+this.endDate.time;
                                        ele._highlight=true;
                                    }
                                });
                                //选中项的行数据也得同时改变，避免回显与显示不一致问题
                                if(this.vcCodeSelected==this.selectedRow.vcCode){
                                    this.selectedRow.lIssueEndDate=this.endDate.date+' '+this.endDate.time;
                                }
                            }else{
                                this.$Message.warning(res.data.data);
                                this.endTimeLoading=false;
                            }
                        })
                        .catch(err => console.log('错误信息为:'+err))
                }else if(this.lAddCount > 0){
                    this.$httpGet(`/bondIssue/updateBondTsBidDeadline?lIssueCnt=${this.lIssueCnt}&lAddCount=${this.lAddCount}&tsBidDeadline=${this.addEndDate.date+' '+this.addEndDate.time}&vcCode=${this.vcCodeSelected}`)
                        .then((res)=>{
                            if(res.status===200 && res.data.actionResult===1){
                                this.$Message.success(res.data.data);
                                this.modalShow=false;
                                //this.selectBondInfo();
                                //为高亮行赋值，不刷新tableData
                                //this.vcCodeSelected
                                this.tableData.forEach(ele => {
                                    ele._highlight=false;
                                    if(this.vcCodeSelected==ele.vcCode){
                                        ele.tsAddBidDeadline=this.addEndDate.date+' '+this.addEndDate.time;
                                        ele._highlight=true;
                                    }
                                });
                                //选中项的行数据也得同时改变，避免回显与显示不一致问题
                                if(this.vcCodeSelected==this.selectedRow.vcCode){
                                    this.selectedRow.tsAddBidDeadline=this.addEndDate.date+' '+this.addEndDate.time;
                                }
                            }else{
                                this.$Message.warning(res.data.data);
                            }
                        })
                        .catch(err => console.log('错误信息为:'+err))
                }
            }else if(this.modalTitle==="维护标位"){//维护标位
                this.$refs.editBid.validate((valid) => {
                    if(valid){
                        let obj={};
                        for(let key in this.editBidForm){
                            if(key!='bidsArr'){
                                obj[key]=this.editBidForm[key];
                            }
                        }
                        obj.lIssueCnt=this.lIssueCnt;
                        obj.vcCode=this.vcCodeSelected;
                        obj.fixbit=this.editBidForm.bidsArr.map((item)=>{
                            return item*1;
                        });
                        this.$httpPost('/bondIssue/updateBondBit',obj)
                            .then((res)=>{
                                if(res.status===200 && res.data){
                                    this.$Message.success(res.data.data);
                                    this.modalShow=false;
                                    this.selectBondInfo();
                                }else{
                                    this.endTimeLoading=false;
                                }
                            })
                            .catch(() => {
                                this.$Message.error("保存修改失败！")
                            })
                    }else{
                        this.$Message.warning("标位设置不符合规则");
                        setTimeout(() => {
                            this.endTimeLoading = false; //改变loading状态
                            this.$nextTick(() => {  //在数据修改之后立即使用这个方法，使用此方法可以避免出现的问题
                                this.endTimeLoading = true;
                            });
                        });
                    }
                })
            }else if(this.modalTitle==="维护利率区间"){//维护利率区间
                let re = /^[0-9]+\.?[0-9]*$/;
                if(this.rateForm.enRateCeil<0 || !re.test(this.rateForm.enRateCeil) || this.rateForm.enRateFloor<0 || !re.test(this.rateForm.enRateFloor)){
                    this.$Message.warning('利率区间不能为空');
                    setTimeout(() => {
                        this.endTimeLoading = false; //改变loading状态
                        this.$nextTick(() => {  //在数据修改之后立即使用这个方法，使用此方法可以避免出现的问题
                            this.endTimeLoading = true;
                        });
                    });
                }else if(this.rateForm.enRateCeil>this.rateForm.enRateFloor){
                    this.$Message.warning('利率上限不能小于利率下限');
                    setTimeout(() => {
                        this.endTimeLoading = false; //改变loading状态
                        this.$nextTick(() => {  //在数据修改之后立即使用这个方法，使用此方法可以避免出现的问题
                            this.endTimeLoading = true;
                        });
                    });
                }else{
                    let obj={};
                        obj.enRateCeil=this.rateForm.enRateCeil;
                        obj.enRateFloor=this.rateForm.enRateFloor;
                        obj.vcCode=this.vcCodeSelected;
                    this.$httpGet(`/bondIssue/updateInterestRateRange?lIssueCnt=${this.lIssueCnt}&enRateCeil=${this.rateForm.enRateCeil}&enRateFloor=${this.rateForm.enRateFloor}&vcCode=${this.vcCodeSelected}`)
                        .then((res)=>{
                            if(res.status===200 && res.data){
                                //this.selectBondInfo();
                                this.$Message.success(res.data.data);
                                this.modalShow=false;                            
                                //为高亮行赋值，不刷新tableData
                                this.tableData.forEach(ele => {
                                    ele._highlight=false;
                                    if(this.vcCodeSelected==ele.vcCode){
                                        ele.enRateFloor=this.rateForm.enRateFloor;
                                        ele.enRateCeil=this.rateForm.enRateCeil;
                                        ele._highlight=true;
                                    }
                                });
                                //选中项的行数据也得同时改变，避免回显与显示不一致问题
                                if(this.vcCodeSelected==this.selectedRow.vcCode){
                                    this.selectedRow.enRateFloor=this.rateForm.enRateFloor;
                                    this.selectedRow.enRateCeil=this.rateForm.enRateCeil;
                                }
                            }else{
                                this.endTimeLoading=false;
                            }
                        })
                        .catch(err => console.log('错误信息为:'+err))
                }
            }           
        },
        //转化成千分位
        toThounands(value){
            if(value!==null){
                return (value.toFixed(2)).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
            }
        },
        //还原千分位后的值
        toNormal(value){
            return `${value}`.replace(/$s?|(,*)/g, '');
        },
        //切换sider状态
        collapsedSider () {
            this.$refs.side1.toggleCollapse();
        },
        //查询债券信息
        selectBondInfo(num){
            if(num){
                this.pageNum=1;
            }
            this.tableLoading=true; 
            var serObj={};
            serObj.field=this.orderList.field;
            serObj.order=this.orderList.order;
            serObj.overdue=this.ischecked;
            serObj.lIssueBeginDate=this.lIssueBeginDate;
            serObj.lIssueEndDate=this.lIssueEndDate;
            serObj.vcSname=this.vcSname;
            serObj.pageNum=this.pageNum;
            serObj.pageSize=this.pageSize;

            // this.$httpGet(`/bondIssue/selectBondIssueInfos?orderList=${this.orderList}&overdue=${this.ischecked}&lIssueBeginDate=${this.lIssueBeginDate}&lIssueEndDate=${this.lIssueEndDate}&vcSname=${this.vcSname}&pageNum=${this.pageNum}&pageSize=${this.pageSize}`)
            this.$httpPost(`/bondIssue/selectBondIssueInfos`,serObj)
                .then((res)=>{
                    if(res.status===200){
                        this.tableLoading=false;
                        this.tableData=res.data.list;
                        // this.totalSize=res.data.total;
                        this.vcCodeSelected='';
                        this.bondDetail={};
                    }
                })
                .then(()=>{
                    //if(!num){
                        this.$httpGet(`/bondIssue/selectBondIssueInfoTotal?overdue=${this.ischecked}&lIssueBeginDate=${this.lIssueBeginDate}&lIssueEndDate=${this.lIssueEndDate}&vcSname=${this.vcSname}&pageNum=${this.pageNum}&pageSize=${this.pageSize}`)
                        //this.$httpPost(`/bondIssue/selectBondIssueInfoTotal`,serObj)
                            .then((res)=>{
                                if(res.status===200){
                                    this.totalSize=res.data;
                                }
                            })
                    //}
                })
                .catch(err => console.log('错误信息为:'+err))
        },
        //查询债券详情信息
        clickTableRow(row,oldRow){
            console.log(row.lIssueCnt);
            this.selectedRow=row;
            this.vcCodeSelected=row.vcCode;
            //追加次数
            this.lAddCount=row.lAddCount;
            this.lIssueCnt=row.lIssueCnt;
            this.$refs.detailTab.showSkin=true;
            // let pageNumber=this.pageNum;
            // if(pageNum){
            //     pageNumber=1
            // }else{
            //     pageNumber=this.pageNum;
            // }
            //this.$httpGet(`/bondIssue/selectBondDetailedInfo?pageNum=${pageNumber}&pageSize=${this.pageSize}&vcCode=${this.vcCode}`)
            this.$httpGet(`/bondIssue/selectBondDetailedInfo?vcCode=${row.vcCode}&lIssueCnt=${row.lIssueCnt}`)
                .then((res) => {            
                    if(res.status===200 && res.data){
                        this.bondDetail=res.data;
                        this.$refs.detailTab.showSkin=false;
                    }                
                })
        },
        //双击跳转到债券投标指令
        dbClickTableRow(row,oldRow){
            // console.log(row);
            // console.log("begin"+row.lIssueBeginDate);
            // console.log("end"+row.lIssueEndDate);
            // console.log("now"+new Date().getTime());
            // let year=new Date().getFullYear();
            // let month=new Date().getMonth()+1;
            // let date=new Date().getDate();
            // if(month<10){
            //     month='0'+month;
            // }
            // if(date<10){
            //     date='0'+date;
            // }
            // let time=year+'-'+month+'-'+date;
            let startTime=row.lBidDate;
            //let endTime=row.lIssueEndDate.substring(0,10);
            let endTime=row.lIssueEndDate;
            let sec1=new Date().getTime();
            let sec2=new Date(startTime).getTime();
            let sec3=new Date(endTime).getTime();
            //与“投标开始日”与“投标截止日”比较,在有效期内进行跳转,否则提示
            if((sec1>=sec2) && (sec1<=sec3)){
                this.$router.push({ path: '/layout/bondtender', query: { pageId:7,vcCode:row.vcCode,title:'债券投标指令',lIssueCnt:row.lIssueCnt,dbClick:true}})
            }else{
                this.$Message.warning("该债券已过期");
            }
        }       
    },
    components:{
        BondDetail,
        Refresh
    }
  }
</script>

<style scoped>
.bond-info{
    height:100%;
}
.bond-info .ivu-layout-sider-children{
    overflow-y: auto;
}
.bond-info >>>.ivu-layout-sider{
     background-color:rgba(38,39,41,0.4);
}
.filter-bar span{
    color:#fff;
    margin-left: 5px;
}
/* 右侧tabpane高度 */
.bond-info >>> .ivu-tabs-content .ivu-tabs-tabpane {
    /* height: calc(100% - 35px)!important; */
    height: 100%;
    overflow-y: auto;
}
/*隐藏箭头样式*/
.bond-info  .ivu-layout-content{
    padding-right:10px;
    position: relative;
}
.bond-info  .ivu-layout-content >>> .show-hide-side-rt{
    cursor:pointer;
    display: inline-block;
    width: 8px;
    height: 80px;
    border-radius: 0 4px 4px 0;
    background: #666;
    position: absolute;
    z-index: 20;
    right: 0;
    top: calc(50% - 48px);
    text-align:left;
    line-height: 75px;   
}
.bond-info  .ivu-layout-content >>> .show-hide-side-rt i{
    margin-left: -3px;
} 
.bond-info >>> .ivu-table-column-center .ivu-table-cell{
    text-align: center;
}
.layout .ivu-layout .ivu-layout-has-sider  .ivu-layout-has-sider{
    height: 100%;
}
.table-wrapper{
    height:calc(100% - 31px);
}
.bond-info >>> .table-wrapper .ivu-table{
    height: calc(100% - 2px);
    overflow-y: auto;
}
/* .bond-info >>> .table-wrapper .ivu-table table{
    width: calc(100% - 2px)!important;
} */
/* .bond-info >>> .table-wrapper .ivu-table .ivu-table-overflowX {
    overflow-x: hidden;
} */
.table-height{
    height:calc(100% - 30px)!important;
}
.table-height >>> .ivu-table-body{
    height: calc(100% - 40px)!important;
}

/*调节modal中input的位置*/
.modal-wraper >>> .ivu-form-item-content {
    left: -20px;
}
/*表格无数据时提示*/
.bond-info >>> .ivu-table-tip{
    height: calc(100% - 40px)!important;
    overflow: hidden;
}
.bond-info >>> .ivu-table-tip table{
    height: 100%;
}
.info-sider-right{
    height:calc(100% - 25px);
}

.modal-wraper>>>.ivu-form-item-error-tip{
    padding-left: 20px;
}
.input-after-icon{
    cursor:pointer;
    position: absolute;
    right:5px;
    top: 10px;
}

</style>
