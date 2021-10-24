<template>
     <div class="wrapper">
          <Row class="bond-info-row">
            <Col span="4">
                <div>
                    <span class="label-text">债券类型</span>
                    <span class="elipse wid120 value-text" :title="returnIssueInfo.vcBondTypeName">{{returnIssueInfo.vcBondTypeName}}</span>
                </div>
            </Col>
            <Col span="4">
                <div>
                    <span class="label-text">发行市场</span>
                    <span class="elipse wid120 value-text" :title="returnIssueInfo.vcMarketName">{{returnIssueInfo.vcMarketName}}</span>
                </div>
            </Col>
            <Col span="4">  
                <div>
                    <span class="label-text">发行主体</span>
                    <span class="elipse wid120 value-text" :title="returnIssueInfo.vcIssueCompany">{{returnIssueInfo.vcIssueCompany}}</span>
                </div>
            </Col>
            <Col span="4">
                <div>
                    <span class="label-text">主体属性</span>
                    <span class="elipse wid120 value-text" :title="returnIssueInfo.vcInstType">{{returnIssueInfo.vcInstType}}</span>
                </div>
            </Col>
            <Col span="4">
                <div>
                    <span class="label-text">主体剩余授信</span>
                    <span class="elipse wid50 value-text" :title="returnIssueInfo.enLeftIssuerCredit">{{returnIssueInfo.enLeftIssuerCredit}}</span>
                </div>
            </Col>
            <Col span="4">
                <div>
                    <span class="label-text">是否固定标位</span>
                    <span class="elipse wid50 value-text" :title="returncBidPrice">{{returncBidPrice}}</span>
                </div>
            </Col>
            
        </Row>
        <Row class="bond-info-row">
            <Col span="4">
                <div>
                    <span class="label-text">外部评级</span>
                    <span class="elipse wid120 value-text" :title="returnIssueInfo.vcCreditRating">{{returnIssueInfo.vcCreditRating}}</span>
                </div>
            </Col>
            <Col span="4">
                <div>
                    <span class="label-text">内部评级</span>
                    <span class="elipse wid120 value-text" :title="returnIssueInfo.vcCreditRatingTk">{{returnIssueInfo.vcCreditRatingTk}}</span>
                </div>
            </Col>
            <Col span="4">
                <div>
                    <span class="label-text">投标日期</span>
                    <span class="elipse wid120 value-text" :title="returnIssueInfo.lBidDate">{{returnIssueInfo.lBidDate}}</span>
                </div>
            </Col>
            <Col span="4">
                <div>
                    <span class="label-text">上市日期</span>
                    <span class="elipse wid120 value-text" :title="returnIssueInfo.lListDate">{{returnIssueInfo.lListDate}}</span>
                </div>
            </Col>
            <Col span="4">
                <div>
                    <span class="label-text">担保人</span>
                    <span class="elipse wid120 value-text" :title="returnIssueInfo.vcGuarantor">{{returnIssueInfo.vcGuarantor}}</span>
                </div>
            </Col>
            <Col span="4">
                <div>
                    <span class="label-text">投标标的</span>
                    <span class="elipse wid50 value-text" :title="returnVcBidtarget">{{returnVcBidtarget}}</span>
                </div>
            </Col>
            
        </Row>
            <Row class="bond-info-row">
            <Col span="4" >
                <div>
                    <span class="label-text">发行规模</span>
                    <span class="elipse wid120 value-text" :title="returnIssueInfo.enIssueVolume">{{returnIssueInfo.enIssueVolume}}</span>
                </div>
            </Col>
            <Col span="4">
                <div>
                    <span class="label-text">发行期限</span>
                    <span class="elipse wid120 value-text" :title="returnIssueInfo.enMaturity">{{returnIssueInfo.enMaturity}}</span>
                </div>
            </Col>
            <Col span="4">
                <div>
                    <span class="label-text">市场利率</span>
                    <span class="elipse wid120 value-text" :title="returnIssueInfo.vcMarketRate">{{returnIssueInfo.vcMarketRate}}</span>
                </div>
            </Col>
            <Col span="4">
                <div>
                    <span class="label-text">利率区间</span>
                    <span class="elipse wid120 value-text" :title="(returnIssueInfo.enRateCeil==null? '': returnIssueInfo.enRateCeil)+ '-' + (returnIssueInfo.enRateFloor==null? '': returnIssueInfo.enRateFloor)">
                        {{returnIssueInfo.enRateCeil}}-{{returnIssueInfo.enRateFloor}}
                    </span>
                </div>
            </Col>
            <Col span="8">
                <div>
                    <span class="label-text">单券集中度限制</span>
                    <span class="elipse wid120 value-text" :title="returnIssueInfo.enConcentraLimit">{{returnIssueInfo.enConcentraLimit}}</span>
                </div>
            </Col>
            
        </Row>
    </div>
</template>
<script>
export default {
    data () {
        return {
            // returnIssueInfo:this.issueInfo
        }
    },
    computed:{
        returnIssueInfo:function(){
            return this.issueInfo;
        },
        returncBidPrice:function(){
            if(this.issueInfo.cBidPrice===0){
                return '否'
            }else if(this.issueInfo.cBidPrice>0){
                return '是'
            }else{
                return ''
            }
        },
        returnVcBidtarget:function(){
            if(this.vcBidTarget==='1'){
                return '利率'
            }else if(this.vcBidTarget === '2'){
                return '价格'
            }else{
                return ''
            }
        }
       

    },
    props: {
            issueInfo:Object,
            vcBidTarget:String
        },
    created(){
        
       
    },
    methods: {
       
    }
    
}
</script>
<style scoped>
    .wrapper{
        min-width: 780px;
        overflow-x: auto;
    }
    .bond-info-row{
        height: 30px;
        line-height: 30px;
    }
    /*债券发行信息样式*/
    
    .label-text{
        color: #fff;
    }
    .value-text{
        margin-left: 5px;
        color: #FFEC8B;
    }
</style>

