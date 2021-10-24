<template>
     <div class="form-wrapper">
         <Form  ref="setForm" :model="formData" :rules="ruleCustom" :label-width="120">
            <FormItem label="发行规模"  prop="enIssueAmountAct">
                <Input class="setbit-input" type="text" number size="small" v-model="formData.enIssueAmountAct" placeholder="请输入发行规模"></Input>
            </FormItem>
            <FormItem label="投标截止时间" prop="tsBidDeadline" v-if="this.addCount <= 0">
                <!--<Input class="setbit-input" size="small" v-model="formData.tsBidDeadline" placeholder="投标截止时间"></Input>-->
                <!--<DatePicker :value="value1" format="yyyy年MM月dd日" type="date" placeholder="Select date" style="width: 200px"></DatePicker>-->
                 <DatePicker type="datetime" :value="formData.tsBidDeadline" format="yyyy-MM-dd HH:mm" placeholder="投标截止时间" style="width: 200px" @on-change="getBidLine"></DatePicker>
            </FormItem>
            <!--tsBidDeadline-->
            <FormItem label="追加截止时间" prop="tsAddBidDeadline" v-if="this.addCount > 0">
                <!--<Input class="setbit-input" size="small" v-model="formData.tsAddBidDeadline" placeholder="追加截止时间"></Input>-->
                <DatePicker type="datetime" :value="formData.tsAddBidDeadline" format="yyyy-MM-dd HH:mm" placeholder="追加截止时间" style="width: 200px" @on-change="getAddBidLine"></DatePicker>
            </FormItem>
           
         </Form>
    </div>
</template>
<script>
import {validateNum} from '../../../util/valide.js'


export default {
    data () {
        return {
            // value1: '2016-01-01',
            // value1:'20181212 12:12',
            addCount:this.lAddCount,
            formData: this.bidInfoRow,
            vCode:this.vcCode,
            ruleCustom: {
                    enIssueAmountAct: [
                            // {required: true,  message: 'weikong', trigger: 'blur' },
                             {required:true,validator: validateNum, trigger: 'blur' }
                        ]
                }
        }
    },
    computed:{
        returnFormData:function(){
            var formArr = [];
            // this.bits.forEach((item,index) => {
            //     form['bit' + (index+1)] = item;
            // })
            formArr = this.bits.filter(item => {
                return {bit:item}
            })
            return formArr;
        }
       

    },
    props: {
           bidInfoRow:Object,
           vcCode:String,
           lAddCount:Number
        },
    created(){
        // this.bidInfoRow.tsBidDeadline = "56464644"
        // console.log(this.bidInfoRow.tsBidDeadline)
        console.log(this.bidInfoRow)


        // es6对象克隆
        // this.formData = Object.assign({}, this.row);
        // console.log(this.formData);
    },
    methods: {
        getBidLine(val){
            this.formData.tsBidDeadline=val;
        },
        getAddBidLine(val){
            this.formData.tsAddBidDeadline=val;
        },
        // 修改投标信息
         saveBid(){
             this.$refs.setForm.validate((valid) => {
                if(valid){
                    // this.formData.vcScode = this.cScode;
                    console.log('/confirm/updateBidConfirmInfos')
                    this.$httpPost('/confirm/updateBidConfirmInfos', this.formData).then((res) => {
                        console.log(res.data);
                        this.$emit('bidInfoSuccess')
                        this.$Message.success("保存修改成功！")
                    }).catch(() => {
                        this.$Message.error("保存修改失败！")
                    })
                }else{
                    this.$emit('cancelLoading');
                }
             })
           

        },
        resetForm(){
            this.$refs.setForm.resetFields();
        },
        dateChange(value,date){
            console.log(value)
            console.log(date)
        }
       

    }
    
}
</script>
<style scoped>
    .form-wrapper{
        max-height:500px;
        /*overflow-y:auto;*/
    }
    .ivu-input-wrapper{
        width: 300px;
        position:relitive;
    }
    .input-after-icon{
      cursor:pointer;
    }
     
    
</style>


