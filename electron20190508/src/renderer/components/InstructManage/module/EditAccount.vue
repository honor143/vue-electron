<template>
     <div class="form-wrapper">
         <Form  ref="setForm" :model="editAccountForm"  :label-width="120" :rules="formRules">
            <FormItem label="分销券种及简称：">
                <label class="value-text">{{editAccountForm.vcBondTypeName}}&nbsp&nbsp&nbsp</label>
                <label class="value-text">{{editAccountForm.vcSname}}</label>
                
                <!-- <Input class="setbit-input" type="text" number size="small" v-model="formData.enIssueAmountAct" placeholder="请输入发行规模"></Input> -->
            </FormItem>
            <FormItem label="交易对手：">
                <label class="value-text">
                   {{editAccountForm.vcRival}}
                </label>
                <!--<Input class="setbit-input" size="small" v-model="formData.tsBidDeadline" placeholder="投标截止时间"></Input>-->
                <!--<DatePicker :value="value1" format="yyyy年MM月dd日" type="date" placeholder="Select date" style="width: 200px"></DatePicker>-->
                 <!-- <DatePicker type="datetime" :value="formData.tsBidDeadline" format="yyyy-MM-dd HH:mm" placeholder="投标截止时间" style="width: 200px" @on-change="getBidLine"></DatePicker> -->
            </FormItem>
            
            <!-- <FormItem label="变更时点：">
                <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="变更时点" style="width: 200px" @on-change="getBidLine"></DatePicker>
            </FormItem> -->
            <FormItem label="缴款时点：">
                <DatePicker type="datetime" disabled format="yyyy-MM-dd HH:mm" placeholder="缴款时点" style="width: 200px" :value="editAccountForm.lPayDate"></DatePicker>
            </FormItem>
             <FormItem label="原账户：">
                <label class="value-text">{{editAccountForm.vcFundNameBefore}}&nbsp</label>
                <label class="value-text">{{editAccountForm.vcCombiNameBefore}}</label>
                <!-- <label class="value-text">{{bondInfos.lAmountBefore}} </label> -->
                <Button type="primary" style="margin-left:30px" @click="modalShow = true;" size="small">变更账户</Button>
            </FormItem>
             <FormItem label="变更后账户：" prop="returnAfterFund">
                 <Row>
                    <Col span="10">
                        <Input disabled v-model="editAccountForm.returnAfterFund" placeholder="变更后账户" />
                    </Col>
                    <!-- <Col span="1" style="text-align: center">-</Col> -->
                   <!--  <Col span="5">
                        <Input v-model="bondInfos.lAmountAfter" placeholder="变更后金额" />
                    </Col> -->
                </Row>
            </FormItem>
            <FormItem label="变更原因：" prop="vcRemarks">
                <Input type="textarea" v-model="editAccountForm.vcRemarks" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入变更原因"></Input>
            </FormItem>
            
           
         </Form>
        <Modal
            class="modals"
            width="600"
            v-model="modalShow"
            title="选择账户"
            @on-ok="handleOk"
            :loading="selectFundLoading"
            >
            <FindAccountAndCombi ref="findAccountAndCombi" @nocombi="resetLoading" @editfundandcombi="hasSelectFund" v-if="modalShow"></FindAccountAndCombi> 
        </Modal>
    </div>
</template>
<script>
import {validateNum} from '../../../util/valide.js'
import FindAccountAndCombi from './FindAccountAndCombi'

export default {
    data () {
        const validateAccount = (rule, value, callback) => {
                console.log(value)
                if (value.trim() === '') {
                    callback(new Error('请选择变更后账户！'));
                } else {
                    if (this.bondInfos.vcFundNameBefore !== this.bondInfos.vcFundNameAfter || this.bondInfos.vcCombiNameBefore!==this.bondInfos.vcCombiNameAfter) {
                        callback();
                    }else{
                        callback('变更后账户与变更前相同，请重新选择！');
                    }
                    
                }
            };
        return {
            editAccountForm:{},
            modalShow:false,
            selectFundLoading:true,
            bondInfos:this.bondInfo,
            formRules:{
                returnAfterFund:[{required:true, validator:validateAccount}]
            }
        }
    },
    computed:{
        // returnAfterFund(){
        //     return this.bondInfos.vcFundNameAfter + '   ' + this.bondInfos.vcCombiNameAfter
        // }
    },
    props: {
           bondInfo:Object
        },
    created(){
        this.editAccountForm = Object.assign(this.bondInfos);
        this.editAccountForm.returnAfterFund = this.bondInfos.vcFundNameAfter + '   ' + this.bondInfos.vcCombiNameAfter
    },
    methods: {
        handleOk(){
            this.$refs.findAccountAndCombi.submitCombi();
            
        },
        hasSelectFund(current){
            this.editAccountForm.vcFundNameAfter = current.fundCurrent.vcName;
            this.editAccountForm.lFundIdAfter = current.fundCurrent.id;
            this.editAccountForm.vcCombiNameAfter = current.combiCurrent.vcName;
            this.editAccountForm.lCombiIdAfter = current.combiCurrent.id;
            this.editAccountForm.returnAfterFund = this.bondInfos.vcFundNameAfter + '   ' + this.bondInfos.vcCombiNameAfter;
            this.modalShow = false;
        },
        // 提交账户修改
        submitEditForm(){
            console.log(this.bondInfos)
            this.$refs.setForm.validate((valid)=>{
                if(valid){
                    this.$httpPost('/bondChange/createBondChange',this.editAccountForm).then((res) => {
                        if(res.data.actionResult === 1){
                            this.$Message.success('账户修改流程发起成功！')
                            this.$emit('submitsuc',res.data.data);
                        }else{
                            this.$Message.warning(res.data.data)
                            this.$emit('submiterror')
                        }
                    }).catch(() => {
                        this.$Message.warning('账户修改流程发起失败！')
                    })
                }else{
                     this.$emit('submiterror')
                }
            })
           
        },
        resetLoading(){
            this.selectFundLoading = false;
            this.$nextTick(() => {
                this.selectFundLoading = true;
            })
        }
    },

    components:{
        FindAccountAndCombi
    }
    
}
</script>
<style scoped>
    .form-wrapper{
        max-height:500px;
        /*overflow-y:auto;*/
    }
   
    .input-after-icon{
      cursor:pointer;
    }
     
    
</style>


