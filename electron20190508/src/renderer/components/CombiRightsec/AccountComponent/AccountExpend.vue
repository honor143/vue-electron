<template>
     <div>
         <Form class="expand-form" :rules="ruleCustom" ref="expandForm" :model="formData" :label-width="120">
            <Row class="expand-row">
                <Col span="6">
                    <FormItem label="账户全称:" prop="vcFundCaption">
                        <Input size="small" v-model="formData.vcFundCaption" placeholder="请输入账户全称"></Input>
                    </FormItem>
                </Col>
                 <Col span="6">
                    <FormItem label="投资管理人:" prop="vcInvestManager">
                        <Input size="small" v-model="formData.vcInvestManager" placeholder="请输入投资管理人"></Input>
                    </FormItem>
                </Col>
                 <Col span="6">
                    <FormItem label="上交所主席位:" prop="vcMainSeatSh">
                        <Input size="small" v-model="formData.vcMainSeatSh" placeholder="请输入上交所主席位"></Input>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="深交所主席位:" prop="vcMainSeatSz">
                        <Input size="small" v-model="formData.vcMainSeatSz" placeholder="请输入深交所主席位"></Input>
                    </FormItem>
                </Col>
                
                    
            </Row>
            <Row class="expand-row">
                <Col span="6">
                    <FormItem label="账户大类:" prop="vcFundType1">
                        <Select v-model="formData.vcFundType1" size="small" style="width:150px">
                            <Option v-for="item in accountBigTypeList" :value="item.value" :key="item.value">{{ item.value }}</Option>
                        </Select>
                    </FormItem>
                </Col>
               
                <Col span="6">
                        <FormItem label="账户细类:" prop="vcFundType2">
                            <Select v-model="formData.vcFundType2" size="small" style="width:150px">
                                <Option v-for="item in accountDetailTypeList" :value="item.vcPortType" :key="item.vcPortType">{{item.vcPortType}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="账户运营类型:" prop="lFundTypeOperation">
                            <Select v-model="formData.lFundTypeOperation" size="small" style="width:150px">
                                <Option v-for="item in dicFundOperationList" :value="item.id" :key="item.id">{{item.vcPortType}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                     <Col span="6">
                    <FormItem label="账户权益类型:" prop="lFundTypeEquity">
                        <Select v-model="formData.lFundTypeEquity" size="small" style="width:150px">
                            <Option v-for="item in dicFundEquityList" :value="item.id" :key="item.id">{{item.vcPortType}}</Option>
                        </Select>
                    </FormItem>
                </Col>
               
                
            </Row>
           
            <Row class="expand-row">
                <Col span="6">
                    <FormItem label="账户固收类型:" prop="lFundTypeFixincome">
                        <Select v-model="formData.lFundTypeFixincome" size="small" style="width:150px">
                            <Option v-for="item in dicFundFixIncomeList" :value="item.id" :key="item.id">{{item.vcPortType}}</Option>
                        </Select>
                    </FormItem>
                </Col>
               
                <Col span="6">
                    <FormItem label="资金来源类型:" prop="cInvestSourceType">
                        <Select v-model="formData.cInvestSourceType" size="small" style="width:200px">
                            <Option v-for="item in cInvestSourceTypeList" :value="item.id" :key="item.id">{{item.label}}</Option>
                        </Select>
                        <!--<Input size="small" v-model="formData.cInvestSourceType" placeholder="Enter something..."></Input>-->
                    </FormItem>
                </Col>
                 <Col span="6">
                    <FormItem label="主托管行:" prop="lCustodianNo">
                        <!--<Input size="small" search enter-button @on-search="openSearchDialog" v-model="formData.vcMainSeatSz" placeholder="请输入或选择主托管行"></Input>-->
                        <!--@on-query-change="queryChange"-->
                        <Select v-model="formData.lCustodianNo" size="small" filterable  style="width:150px">
                            <Option v-for="item in custodianNoList" :value="item.id" :key="item.id">{{item.vcPortType}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="备注:" prop="vcRemarks">
                        <Input size="small" v-model="formData.vcRemarks" placeholder="请输入备注"></Input>
                    </FormItem>
                </Col>
               
            </Row>
             <Row class="expand-row">
                <Col span="6">
                    <FormItem label="是否后端集合:" prop="cIsBackIntegration">
                         <i-switch v-model="formData.cIsBackIntegration" :true-value="1" :false-value="0" size="large">
                            <span slot="open">是</span>
                            <span slot="close">否</span>
                        </i-switch>
                        
                    </FormItem>
                </Col>
                 <Col span="6">
                    <FormItem label="是否有效:" prop="cIsValid">
                         <i-switch v-model="formData.cIsValid" :true-value="1" :false-value="0" size="large">
                            <span slot="open">有效</span>
                            <span slot="close">无效</span>
                        </i-switch>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="是否自动合规检查:" prop="cAutoCompliance">
                         <i-switch v-model="formData.cAutoCompliance" :true-value="1" :false-value="0" size="large">
                            <span slot="open">是</span>
                            <span slot="close">否</span>
                        </i-switch>
                    </FormItem>
                </Col>
            </Row>
            <Row class="expand-row">
                <Col span="1" offset="21">
                    <Button type="primary" @click="submitForm" size="small">提交修改</Button>
                </Col>
            </Row>
         </Form>
        <!--<Modal v-model="modal" mask width="800" @on-ok="clickOK" scrollable title="选择主托管行">
            <BankDialog ref="BankDialog" />
        </Modal>   -->
    </div>
</template>
<script>

// import BankDialog from './BankDialog'

export default {
    data () {
        return {
            modal:false,
            formData:{
              

            },
            accountBigType:'保险',
            accountBigTypeList:[
                    {value:"保险"},
                    {value:"第三方"},
                    {value:"年金"},
                    {value:"其他"},
                    {value:"资本金"}
            ],
            ruleCustom:{
                vcFundCaption:[{ required: true, message: '请输入账户全称', trigger: 'blur' }],
                vcFundType1:[{ required: true, message: '请选择账户大类', trigger: 'change' }],
                vcFundType2:[{ required: true, message: '请选择账户细类', trigger: 'change' }],
                lFundTypeOperation:[{ required: true,type:'number', message: '请选择账户运营类型', trigger: 'change' }],
                lFundTypeEquity:[{ required: true,type:'number', message: '请选择账户权益类型', trigger: 'change' }],
                lFundTypeFixincome:[{ required: true,type:'number', message: '请选择固收权益类型', trigger: 'change' }],
                lCustodianNo:[{ required: true,type:'number', message: '请选择主托管行', trigger: 'change' }],
                // cIsValid:[{ required: true, message: '请输入账户全称', trigger: 'blur' }],
                vcMainSeatSh:[{ required: true, message: '请输入上交所主席位', trigger: 'blur' }],
                vcMainSeatSz:[{ required: true, message: '请输入深交所主席位', trigger: 'blur' }],
                vcInvestManager:[{ required: true, message: '请输入投资管理人', trigger: 'blur' }],
                cInvestSourceType:[{ required: true,type:'number', message: '请选择择账户来源类型', trigger: 'change' }]
                // cAutoCompliance:[{ required: true, message: '请输入账户全称', trigger: 'blur' }],
                // cIsBackIntegration:[{ required: true, message: '请输入账户全称', trigger: 'blur' }],
                // vcRemarks:[{ required: true, message: '请输入账户全称', trigger: 'blur' }]



            },
            //资金来源类型
            cInvestSourceTypeList:[
                {id:1, label:'泰康'},
                {id:2, label:'非泰康'}
            ],
            // accountDetailType:'',
            accountDetailTypeList: this.dicFundType2List,
            dicFundOperationList: this.dicFundOperation,
            dicFundEquityList: this.dicFundEquity,
            dicFundFixIncomeList:this.dicFundFixIncome,
            custodianNoList:this.custodianNo
        }
    },
    props: {
            row: Object,
            dicFundType2List:Array,
            dicFundOperation:Array,
            dicFundEquity:Array,
            dicFundFixIncome:Array,
            custodianNo:Array
        },
    created(){
        // es6对象克隆
        console.log(this.dicFundEquityList)
        console.log(this.dicFundType2List)
        console.log(this.custodianNo);
        this.formData = Object.assign({}, this.row);
        console.log("dialog创建")
        // this.selectCombiInfo();
    },
    mounted(){
        
    },
    methods: {
        submitForm(){
             this.$refs.expandForm.validate((valid) => {
                if(valid){
                    console.log(this.formData)
                    this.$httpPost('/fund/saveFundInfo', this.formData).then((res) => {
                        console.log(res.data);
                        this.$emit('sumbitSuccess')
                        this.$Message.success("保存修改成功！")
                    }).catch(() => {
                        this.$Message.error("保存修改失败！")
                    })
                }
             })
           

        },
        openSearchDialog(){
            this.modal = true;
            console.log("xuanze托管行弹框")
        },

        clickOK(){
            var returnSelection = this.$refs.BankDialog.returnSelection();
            console.log(this.$refs.BankDialog.returnSelection())
            console.log(returnSelection)
            if(returnSelection.length > 1){
                this.$Message.warning("只能选择一个托管行")
            }else if(returnSelection.length == 0){
                this.$Message.warning("未选择托管行")
            }else{
                this.formData.vcMainSeatSz = returnSelection[0].vcPortType;
            }

        },
        queryChange(query){
            console.log(query)
            this.custodianNoList = this.custodianNo.filter((item) => {
                return (item.id+'').indexOf(query) != -1  || item.vcPortType.indexOf(query) !=-1
            })
            
        }
    },
    components:{
        // BankDialog
    }
}
</script>
<style scoped>
  .expand-row{
        margin-bottom: 10px;
    }
    
    .expand-form .ivu-input-wrapper{
        width: 200px;
    }
</style>


