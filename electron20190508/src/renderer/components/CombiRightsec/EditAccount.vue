<template>
    <div class="dialog-form-wrapper">
        <Form ref="formValidate" :model="formData" :label-width="100">
           <Row class="expand-row">
                <Col span="12">
                    <FormItem label="账户名称">
                        <Input size="small" v-model="formData.vcFundName" placeholder="请输入账户名称"></Input>
                    </FormItem>
                    
                    <FormItem label="账户细类">
                        <Input size="small" v-model="formData.vcPortType2" placeholder="请输入账户细类"></Input>
                    </FormItem>
                    <FormItem label="账户类别">
                        <Input size="small" v-model="formData.lClassId" placeholder="请输入账户类别"></Input>
                    </FormItem>
                    <FormItem label="TA账户代码">
                        <Input size="small" v-model="formData.vcFundCodeTa" placeholder="请输入TA账户代码"></Input>
                    </FormItem>
                    <FormItem label="是否有效">
                        <i-switch v-model="formData.cIsValid">
                            <span slot="open">有</span>
                            <span slot="close">无</span>
                        </i-switch>
                        <!--<Switch v-model="formData.cIsValid"></Switch>-->
                    </FormItem>
                    <FormItem label="上交所主席位">
                        <Input size="small" v-model="formData.vcMainSeatSh" placeholder="Enter something..."></Input>
                    </FormItem>
                    <FormItem label="生效日期">
                        <Input size="small" v-model="formData.vcInvestManager" placeholder="Enter something..."></Input>
                    </FormItem>
                    <FormItem label="成立日期">
                        <Input size="small" v-model="formData.lClearBeginDate" placeholder="Enter something..."></Input>
                    </FormItem>
                     <FormItem label="证券控制点">
                        <Input size="small" v-model="formData.vcStockControlPoint" placeholder="Enter something..."></Input>
                    </FormItem>
                    <FormItem label="是否自动合规检查">
                         <i-switch v-model="formData.cAutoCompliance">
                            <span slot="open">是</span>
                            <span slot="close">否</span>
                        </i-switch>
                    </FormItem>
                    <FormItem label="备注">
                        <Input size="small" v-model="formData.vcRemarks" placeholder="Enter something..."></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="账户大类">
                        <Select v-model="accountBigType" size="small" style="width:100px">
                            <Option v-for="item in accountBigTypeList" :value="item.value" :key="item.value">{{ item.value }}</Option>
                        </Select>
                    </FormItem>
                     <FormItem label="险种信息">
                        <Input size="small" v-model="formData.vcInsureInfo" placeholder="请输入险种信息"></Input>
                    </FormItem>
                    <FormItem label="本币币种">
                        <Input size="small" v-model="formData.vcCurrencyNo" placeholder="请输入本币币种"></Input>
                    </FormItem>
                    <FormItem label="主托管行编号">
                        <Input size="small" v-model="formData.lCustodianNo" placeholder="请输入主托管行编号"></Input>
                    </FormItem>
                    <FormItem label="年金类型">
                        <Input size="small" v-model="formData.cAnnuityType" placeholder="Enter something..."></Input>
                    </FormItem>
                    <FormItem label="投资管理人">
                        <Input size="small" v-model="formData.vcMainSeatSz" placeholder="Enter something..."></Input>
                    </FormItem>
                    <FormItem label="清算开始日期">
                        <!--<DatePicker type="date" placeholder="请选择日期" style="width:15px"></DatePicker>-->
                        <Input size="small" v-model="formData.lBeginDate" placeholder="Enter something..."></Input>
                    </FormItem>
                     <FormItem label="资金头寸控制点">
                        <Input size="small" v-model="formData.vcCashControlPoint" placeholder="Enter something..."></Input>
                    </FormItem>
                    <FormItem label="资金来源类型">
                        <Input size="small" v-model="formData.cInvestSourceType" placeholder="Enter something..."></Input>
                    </FormItem>
                     <FormItem label="会计默认分类">
                        <Input size="small" v-model="formData.cInvestType" placeholder="Enter something..."></Input>
                    </FormItem>
                </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
export default {
    data () {
        return {
            formData:{},
           formValidate: {
                id: '',
                vcDisplayName: '',
                vcEmail: '',
                vcPassword: '',
                vcRemark: ''
            },
            accountBigType:'保险',
            accountBigTypeList:[
                {value:"保险"},
                {value:"第三方"},
                {value:"年金"},
                {value:"其他"},
                {value:"资本金"}
          ]
        }
    },
    created(){
        this.initFormData();
        // this.formData = Object.assign({}, this.rowData);
        // console.log("dialog创建")
        // console.log(this.formData)
        // this.selectCombiInfo();
    },
    mounted(){
        
    },
    methods: {
        //初始化表单数据
        initFormData(){
            // 克隆对象
            this.formData = Object.assign({}, this.rowData);
            console.log(this.formData);
            if(this.formData.cIsValid == "1"){
                this.formData.cIsValid = true;
            }else{
                this.formData.cIsValid = false;
            }
            if(this.formData.cAutoCompliance == "1"){
                this.formData.cAutoCompliance = true;
            }else{
                this.formData.cAutoCompliance = false;
            }

        },

       submit(){
            this.$httpPost('/fund/saveFundInfo', this.formData).then((res) => {
               console.log(res.data)
            })

           console.log(this.formData)
       }
    },
    props:['rowData'],
    
}
</script>
<style scoped>

</style>


