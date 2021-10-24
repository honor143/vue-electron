<template>
     <div class="form-wrapper">
         <Form class="expand-form" :model="bitData"  ref="setForm" :label-width="120">

            <FormItem v-for="(item, index) in bitData.bidPrice" 
                :key="index" 
                :label="'标位' + (index + 1)"
                :prop="'bidPrice.' + index"
                :rules="{required: true,validator:validatePercent, trigger: 'blur'}"
                v-if="bitType == '1'"
            >
                <Input class="setbit-input" size="small" v-model="bitData.bidPrice[index]" :disabled="bitData.cIsUpdate != 1" placeholder="请输入标位">
                    <span  slot="append">%</span>
                </Input>
                
                <Icon class="input-after-icon" v-if="bitData.cIsAdd != 0"  @click="deleteBit(index)" size="16" color="#ed4014" type="ios-close-circle" />
            </FormItem>
            <FormItem v-for="(item, index) in bitData.bidPrice" 
                :key="index" 
                :label="'标位' + (index + 1)"
                :prop="'bidPrice.' + index"
                :rules="{required: true,validator:validateYuan, trigger: 'blur'}"
                v-if="bitType != '1'"
            >
                <Input class="setbit-input"  size="small" v-model="bitData.bidPrice[index]" :disabled="bitData.cIsUpdate != 1" placeholder="请输入标位">
                    <span  slot="append">元</span>
                </Input>
                <Icon class="input-after-icon" v-if="bitData.cIsAdd != 0"  @click="deleteBit(index)" size="16" color="#ed4014" type="ios-close-circle" />
            </FormItem>
            <FormItem>
                <Button size="small" v-if="bitData.cIsAdd != 0" :disabled="bitData.cIsAdd != 1"  type="primary" @click="addInput" shape="circle" icon="md-add"></Button>
            </FormItem>
            <!-- <FormItem> -->
                <span class="warn-text">注：标位设置后将会根据数值大小排序！</span>
                
            <!-- </FormItem> -->

         </Form>
    </div>
</template>
<script>
import {validatePercent,validateYuan} from '../../../util/valide.js'
export default {
    data () {
        /* const validatePercent = (rule, value, callback) => {
                var re = /^[0-9]+.?[0-9]*$/;
                if (value === '') {
                    callback(new Error('标位不能为空！'));
                } else if(value <=0 ) {
                    callback(new Error('标位必须大于0'));
                }else if(!re.test(value)){
                    callback('请输入数字类型');
                }else{
                    callback()
                }
            };
        const validateYuan = (rule, value, callback) => {
                var re = /^[0-9]+.?[0-9]*$/;
                if (value === '') {
                    callback(new Error('标位不能为空！'));
                } else if(value <=0 || value > 100) {
                    callback(new Error('标位必须大于0小于100'));
                }else if(!re.test(value)){
                    callback('请输入数字类型');
                }else{
                    callback();
                }
            }; */
        return {
            validateYuan:validateYuan,
            validatePercent:validatePercent,
            reqArr:this.newSelectArr,
            bitData:this.bitMap,
            bitType:this.vcBidTarget,
            // bitList:[],
            scode:this.vcCode,
            instrucIds:[],
            ids:[],
            // combiIds:[]
            // formData:this.returnFormData()
            // combiSetType:this.combiSetTypeList,
            // ruleCustom:{
            //     vcConfig:[{ required: true, message: '请选择组合配置类型', trigger: 'change' }]
            // }
        }
    },
    computed:{
        returnFormData:function(){
            var formArr = [];
            formArr = this.bits.filter(item => {
                return {bit:item}
            })
            return formArr;
        }
       

    },
    props: {
            newSelectArr:Array,
            vcCode:String,
            vcBidTarget:String,
            bitMap:Object,
            lIssueCnt:Number
            // row: Object,
            // combiSetTypeList:Array
        },
    created(){
        console.log("设置标位中");
        console.log(this.bitMap)
        this.initArr();
        // 请求需要修改的标位
        // this.selectUpdateBit();
        


        // es6对象克隆
        // this.formData = Object.assign({}, this.row);
        // console.log(this.formData);
    },
    methods: {
        //初始化数据
        initArr(){
            this.reqArr.forEach((element) => {
                this.instrucIds.push(element.id);
                this.ids.push({lCombiId:element.lCombiId,lFundId:element.lFundId,lMarket:element.lMarket});
                // this.combiIds.push({lCombiId:element.lCombiId,lMarket:element.lMarket,lFundId:element.lFundId});
            });
        },
        
        
        addInput(){
            if(this.bitData.bidPrice.length <=9){
                this.bitData.bidPrice.push('')
            }else{
                this.$Message.warning("超出最大标位数，无法添加！")
            }
            
        },
        deleteBit(index){
            if(this.bitData.bidPrice.length > 1){
                this.bitData.bidPrice.splice(index,1); 
            }else{
                this.$Message.warning({
                    content: '至少需要保留一个标位'
                })
            }
            
        },
        // 修改标位/inst/saveBids
         saveBids(){
             this.$refs.setForm.validate((valid) => {
                if(valid){
                    var formData = {
                        bids:this.bitData.bidPrice,
                        combiMarketInfos:this.ids,
                        stockIds:this.instrucIds,
                        vcCode:this.scode,
                        lIssueCnt:this.lIssueCnt
                    }
                    this.$httpPost('/inst/saveBids', formData).then((res) => {
                        // if(res.data.data.indexof('失败') == -1){
                        //     this.$Message.success(res.data.data);
                        // }else{
                            if(res.data.actionResult == 0){
                                this.$Message.error(res.data.data)
                                this.$emit('bitSetError')
                            }else if(res.data.actionResult == 1){
                                // var idList = JSON.parse(res.data.data);
                                this.$emit('bitSetSuccess',{idlist:res.data.data.instIdAndTaskIds,bidPrices:res.data.data.bids});
                                this.$Message.success("保存修改成功！")
                            }else{
                                this.$Modal.warning({
                                    title: '警告',
                                    content: `<p>${res.data.data}</p>`
                                });
                                this.$emit('bitSetError')

                            }
                        // }
                    }).catch(() => {
                        this.$emit('bitSetError')
                        this.$Message.error("保存修改失败！")

                    })
                }else{
                    this.$emit('bitSetError') 
                }
             })
           

        },
        // 请求标位
        selectUpdateBit(){
            // var reqData = {
            //     combiMarketInfos:this.ids,
            //     vcCode:this.scode
            // };
            // this.$httpPost('/inst/selectUpdateBit', reqData).then((res) => {
            //         if(res.data.bidPrice.length <=3){
            //             res.data.bidPrice.length = 3
            //         }
            //         if(res.data.bidPrice.length > 0){
            //             res.data.bidPrice.map((item) => {
            //                 return parseInt(item);
            //             });
            //         }
            //         this.bitData = res.data
            //     }).catch(() => {
                    
            //     })
        }

    }
    
}
</script>
<style scoped>
    .ivu-input-wrapper{
        width: 300px;
        position:relative;
    }
    .ivu-form-item-label{
        padding:0;
    }
    .input-after-icon{
      cursor:pointer;
      position: absolute;
      right:49px;
      top: 5px;
    }
     
    .form-wrapper{
        max-height:500px;
        overflow-y:auto;
    }
    .form-wrapper >>> .ivu-form-item-label{
        padding: 6px 6px 6px 0;
    }
    .warn-text{
        font-size: 13px;
        font-weight: bold;
        margin-left: 78px;
        color:#ed4014;
    }
</style>


