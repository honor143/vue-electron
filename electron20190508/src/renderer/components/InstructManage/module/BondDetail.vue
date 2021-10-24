<template>
    <div class="bond-info-wrapper">
        <!-- <Tabs type="card" :value="tabVal" :capture-focus="captureFocus" @on-click="clickTab"> -->
        <Tabs type="card" :value="tabVal" :capture-focus="captureFocus" @on-click="clickTab">
            <TabPane label="发行和评级" name="issueRate">
                <Row class="bond-detail">
                    <Col span="24"><span>债券全称</span><label class="elipse wid280" :title="bondDetail.vcName">{{bondDetail.vcName}}</label></Col>
                    <Col span="12"><span>债券代码</span><label class="elipse wid110" :title="bondDetail.vcCode">{{bondDetail.vcCode}}</label></Col>
                    <Col span="12"><span>募集方式</span><label class="elipse wid90" :title="bondDetail.vcPublicofferTypeName">{{bondDetail.vcPublicofferTypeName}}</label></Col>
                    <Col span="12"><span>债券类型</span><label class="elipse wid110" :title="bondDetail.vcBondTypeName">{{bondDetail.vcBondTypeName}}</label></Col>
                    <Col span="12"><span>发行市场</span><label class="elipse wid90" :title="bondDetail.vcMarketName">{{bondDetail.vcMarketName}}</label></Col>
                    <Col span="12"><span>招标标的</span><label class="elipse wid110" :title="bondDetail.vcBidTargetName">{{bondDetail.vcBidTargetName}}</label></Col>
                    <Col span="12"><span>招标方式</span><label class="elipse wid90" :title="bondDetail.vcBidTypeName">{{bondDetail.vcBidTypeName}}</label></Col>
                    <Col span="12"><span>发行起始</span><label class="elipse wid110" v-if="bondDetail.lIssueBeginDate" :title="bondDetail.lIssueBeginDate.substring(0,10)">{{bondDetail.lIssueBeginDate.substring(0,10)}}</label></Col>
                    <Col span="12"><span>发行截止</span><label class="elipse wid90" v-if="bondDetail.lIssueEndDate"  :title="bondDetail.lIssueEndDate.substring(0,10)">{{bondDetail.lIssueEndDate.substring(0,10)}}</label></Col>
                    <Col span="12"><span>缴款日期</span><label class="elipse wid110" v-if="bondDetail.lPayDate" :title="bondDetail.lPayDate.substring(0,10)">{{bondDetail.lPayDate.substring(0,10)}}</label></Col>
                    <Col span="12"><span>上市日期</span><label class="elipse wid90" :title="bondDetail.lListDate">{{bondDetail.lListDate}}</label></Col>
                    <Col span="12"><span>计划发行</span><label class="elipse wid110" v-if="bondDetail.enIssueAmountPlan" :title="bondDetail.enIssueAmountPlan">{{bondDetail.enIssueAmountPlan}}亿</label></Col>
                    <Col span="12"><span>实际发行</span><label class="elipse wid90" v-if="bondDetail.enIssueAmountAct" :title="bondDetail.enIssueAmountAct">{{bondDetail.enIssueAmountAct}}亿</label></Col>
                    <Col span="12"><span>发行价格</span><label class="elipse wid110" :title="bondDetail.enIssuePrice">{{bondDetail.enIssuePrice}}</label></Col>
                    <Col span="12"><span>假日顺延</span><label class="elipse wid90" :title="bondDetail.vcHoliday">{{bondDetail.vcHoliday}}</label></Col>
                    <Col span="24">
                        <Row>
                            <Col span="5" class="occupy-height"><span>主承销商</span></Col>
                            <Col span="19"><label class="occupy-label" :title="bondDetail.vcLeadUnderwriter">{{bondDetail.vcLeadUnderwriter}}</label></Col>
                        </Row>
                    </Col>
                    <Col span="24">
                        <Row>
                            <Col span="5" class="occupy-height"><span>担保机构</span></Col>
                            <Col span="19"><label class="occupy-label" :title="bondDetail.vcGuarantor">{{bondDetail.vcGuarantor}}</label></Col>
                        </Row>
                    </Col>
                </Row>
                <hr>
                <Row class="bond-detail">
                    <h3>发行主体</h3>
                    <Col span="24"><span>主体全称</span><label class="elipse wid280" :title="bondDetail.vcIssueCompany">{{bondDetail.vcIssueCompany}}</label></Col>
                    <Col span="12"><span>主体属性</span><label class="elipse wid110" :title="bondDetail.vcInstType">{{bondDetail.vcInstType}}</label></Col>
                    <Col span="12"><span  class="wid80">主体行业</span><label class="elipse wid90" :title="bondDetail.vcIndustryName">{{bondDetail.vcIndustryName}}</label></Col>
                    <Col span="12"><span>主体评级</span><label class="elipse wid110" :title="bondDetail.vcCreditRank">{{bondDetail.vcCreditRank}}</label></Col>
                    <Col span="12"><span class="wid80">主体评级日期</span><label class="elipse wid90" v-if="bondDetail.creditRankDate" :title="bondDetail.creditRankDate.substring(0,10)">{{bondDetail.creditRankDate.substring(0,10)}}</label></Col>
                    <Col span="12"><span>主体地域</span><label class="elipse wid110" :title="bondDetail.vcRegion2Name">{{bondDetail.vcRegion2Name}}</label></Col>
                    <Col span="12"><span class="wid80">主体剩余授信</span><label class="elipse wid90" :title="bondDetail.enLeftCredit">{{bondDetail.enLeftCredit}}</label></Col>
                </Row>
                <hr>
                <Row class="bond-detail">
                    <h3>债项评级</h3>
                    <Col span="12"><span>内部评级</span><label class="elipse wid110" :title="bondDetail.vcCreditRatingTk">{{bondDetail.vcCreditRatingTk}}</label></Col>
                    <Col span="12"><span class="wid80">内部评级人</span><label class="elipse wid90" :title="bondDetail.vcRatingOrganTk">{{bondDetail.vcRatingOrganTk}}</label></Col>
                    <Col span="12"><span>是否初评</span><label class="elipse wid110" :title="bondDetail.vcPrimaryRating">{{bondDetail.vcPrimaryRating}}</label></Col>
                    <Col span="12"><span class="wid80">备选库</span><label class="elipse wid90" :title="bondDetail.vcPoolname">{{bondDetail.vcPoolname}}</label></Col>
                    <Col span="24"><span>外部评级</span><label class="elipse wid110" :title="bondDetail.vcCreditRating">{{bondDetail.vcCreditRating}}</label></Col>
                    <Col span="24"><span>评级机构</span><label class="elipse wid280" :title="bondDetail.vcRatingOrgan">{{bondDetail.vcRatingOrgan}}</label></Col>                   
                </Row>
                <Spin size="large" fix v-if="showSkin"></Spin>
            </TabPane>
            <TabPane label="投资建议" name="invesAdvice">
                <Row class="bond-detail">
                    <Col span="11"><span>推荐星级</span><label class="elipse wid90" :title="bondDetail.vcStarLevel">{{bondDetail.vcStarLevel}}</label></Col>
                    <Col span="13"><span  class="wid90">推荐价格范围</span><label class="elipse wid90" :title="bondDetail.vcAdviceRate">{{bondDetail.vcAdviceRate}}</label></Col>
                    <Col span="11"><span>最低价格</span><label class="elipse wid90" :title="bondDetail.vcFloorPrice">{{bondDetail.vcFloorPrice}}</label></Col>
                    <Col span="13"><span class="wid90">能否超最低价</span><label class="elipse wid90" :title="bondDetail.vcOutLowestPrice">{{bondDetail.vcOutLowestPrice}}</label></Col>
                    <Col span="11"><span>推荐人</span><label class="elipse wid90" :title="bondDetail.vcReferral">{{bondDetail.vcReferral}}</label></Col>
                    <!-- <Col span="13"><span class="wid90">单券集中度控制</span><Input ref="focusInput" :readonly="!inputFocus" :class="{ 'bg-waring': inputFocus }" size="small" v-model="bondDetail.enConcentraLimit" placeholder="" style="width:50px"/>%</Col> -->
                    <!-- <Col span="13"><span class="wid90">单券集中度控制</span><Input ref="focusInput" :readonly="!inputFocus" :class="{ 'bg-waring': inputFocus }" size="small" v-model="focusLimit" placeholder="" style="width:50px"/>%</Col> -->
                    <Col span="13"><span class="wid90">单券集中度控制</span><InputNumber ref="focusInput" :min="0" :readonly="!inputFocus" :class="{ 'bg-waring': inputFocus }" size="small" v-model="focusLimit" placeholder="" style="width:50px"/></InputNumber>%</Col>
                    <!-- <InputNumber size="small" :min="0" :step="1" v-model="rateForm.enRateFloor" style="width:100px"></InputNumber> -->
                    <!-- <Col span="24" class="align-right" v-if="inputFocus">
                        <Button size="small" type="primary" @click="saveBondFocus">确定</Button>
                    </Col> -->
                    <transition name="fade">
                        <Col span="24" class="align-right" v-if="inputFocus">
                            <Button size="small" type="primary" @click="cancelFocus">取消</Button><Button size="small" type="primary" @click="saveBondFocus">确定</Button>
                        </Col> 
                    </transition>                   
                    <div class="pad5">
                        <Col span="24"><span class="margBot10">基本面描述</span></Col>
                        <Col span="24">
                            <Input v-model="bondDetail.vcFundamental" :rows="6" readonly type="textarea" placeholder="基本面描述信息由信用策略小组填写，数据来源是MD，MD取自投研平台" />
                        </Col>
                        <Col span="24"><span class="wid100 margBot10">信用策略投资建议</span></Col>
                        <Col span="24">
                            <Input v-model="bondDetail.vcInvestmentAdvice" :rows="18" readonly type="textarea" placeholder="信用策略投资建议由信用策略小组填写，数据来源是MD，MD取自投研平台" />
                        </Col>
                    </div>
                </Row>
                <Spin size="large" fix v-if="showSkin"></Spin>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
  export default {
    name:'BondDetail',
    props:{
    	bondDetail:{
    		type:Object
    	},
        vcCode:{
            type:String
        },
        lIssueCnt:{
            type:Number
        },
        selectBondDetailParams:{
            type:Object
        }
    },
    data () {
        return {
            showSkin:false,
            inputFocus:false,
            tabVal:"issueRate",
            captureFocus:true,
            focusLimit:this.bondDetail.enConcentraLimit,
            limit2:this.bondDetail.enConcentraLimit
        }        
    },
    watch:{
        'bondDetail.enConcentraLimit':function(val){
            this.focusLimit=val;
            this.limit2=val;
        }
    },
    methods:{
        clickTab(name){
            this.tabVal=name;
        },
        //切换tab
        switchTab(){
            this.tabVal="invesAdvice";
            this.inputFocus=true;
        },
        //维护债券集中度(取消)
        cancelFocus(){
            //this.bondDetail.enConcentraLimit=this.focusLimit.enConcentraLimit;
            this.focusLimit=this.limit2;
            this.inputFocus=false;
        },
        //维护债券集中度
        saveBondFocus(){     
            var re = /^[0-9]+.?[0-9]*$/;
            //if(this.focusLimit<=0 || this.focusLimit==''){
            // if(!re.test(this.focusLimit)){
            //     this.$Message.warning('请输入数字');
            // }else 
            if(this.focusLimit<=0){
                this.$Message.warning('集中度不能小于或等于零');
            }else{
                //this.$httpGet(`/bondIssue/updateSingleBondConcentration?vcCode=${this.vcCode}&enConcentraLimit=${this.bondDetail.enConcentraLimit}`)
                this.$httpGet(`/bondIssue/updateSingleBondConcentration?lIssueCnt=${this.lIssueCnt}&vcCode=${this.vcCode}&enConcentraLimit=${this.focusLimit}`)
                    .then((res) => {            
                        if(res.status===200 && res.data.actionResult===1){
                            this.$Message.success(res.data.data);
                            this.inputFocus=false;
                            // this.$httpGet(`/bondIssue/selectBondDetailedInfo?vcCode=${this.vcCode}`)
                            //     .then((res) => {            
                            //         if(res.status===200 && res.data){
                            //             this.bondDetail=res.data;
                            //             this.inputFocus=false;
                            //         }                
                            //     })
                        }else{
                            this.$Message.warning(res.data.data);
                        }                
                    })
            }
        }
    }
  }
</script>

<style scoped>
/* 过渡动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/*单券集中度样式*/
.bg-waring >>> .ivu-input-number-input{
    background: #EE8400;
}
.align-left{
    text-align: right;
}
.align-right{
    text-align: right;
}
.margBot10{
    margin-bottom: 5px;
}
.margBot10:nth-child(1){
    margin-top:5px;
}
.align-right button{
    margin:10px 20px 0 0;
}
 /*债权详情样式  */
 .bond-detail{
     padding:10px 0;
     color: #FFEC8B;
     line-height: 26px;
 }
 .bond-detail .pad5{
     padding: 0 5px;
 }
 .bond-detail span{
     display: inline-block;
     text-align: right;
     width:60px;
     margin-right: 3px;
     color:#fff;
 }
 .bond-detail span.wid80{
     width: 80px;
}
.bond-detail span.wid90{
    width: 90px;
}
.bond-detail span.wid100{
    width: 100px;
}
/*信息过多时,标题占位*/
.occupy-height{
    width: 60px;    
}
.occupy-label{
    padding-left: 3px;
}
hr{
    width:calc(100% - 10px);
    margin: 0 auto;
    border-top: none;
    border-color:#666;
}

.bond-info-wrapper,.bond-info-wrapper >>> .ivu-tabs.ivu-tabs-card{
    height: 100%;
} 
.bond-info-wrapper >>> .ivu-tabs-content{
    height: calc(100% - 25px);
}
/* .bond-info-wrapper .bond-detail >>> .ivu-tabs-content .ivu-tabs-tabpane{
    height: 100%!important;
    overflow-y: auto;
} */

</style>
