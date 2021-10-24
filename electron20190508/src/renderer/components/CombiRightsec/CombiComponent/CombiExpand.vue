<template>
     <div>
         <Form class="expand-form" :rules="ruleCustom" ref="expandForm" :model="formData" :label-width="120">
            <Row class="expand-row">
                <Col span="3">
                     <FormItem label="是否有效:">
                         <i-switch v-model="formData.cIsValid" true-value="1" false-value="0" size="large">
                            <span slot="open">有效</span>
                            <span slot="close">无效</span>
                        </i-switch>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="配置类型:" prop="vcConfig">
                        <Select v-model="formData.vcConfig" size="small" style="width:150px">
                            <Option v-for="item in combiSetType" :value="item.vcPortType" :key="item.vcPortType">{{item.vcPortType}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                 
                 <Col span="15">
                   <FormItem label="备注:" class="remarks-item" >
                        <Input size="small" v-model="formData.vcRemarks" placeholder="请输入备注"></Input>
                    </FormItem>
                </Col>
                <Col span="2" >
                    <Button type="primary" @click="submitForm" size="small">提交修改</Button>
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
            combiSetType:this.combiSetTypeList,
            ruleCustom:{
                vcConfig:[{ required: true, message: '请选择组合配置类型', trigger: 'change' }]
            }
        }
    },
    props: {
            row: Object,
            combiSetTypeList:Array
        },
    created(){
        // es6对象克隆
        this.formData = Object.assign({}, this.row);
        console.log(this.formData);
    },
    methods: {
        submitForm(){
             this.$refs.expandForm.validate((valid) => {
                if(valid){
                    console.log(this.formData)
                    this.$httpPost('/combi/saveCombiInfo', this.formData).then((res) => {
                        console.log(res.data);
                        this.$emit('sumbitSuccess')
                        this.$Message.success("保存修改成功！")
                    }).catch(() => {
                        this.$Message.error("保存修改失败！")
                    })
                }
             })
        }
    }
    
}
</script>
<style scoped>
  .expand-row{
      margin-top: 10px;
        margin-bottom: 10px;
    }
    
    .expand-form .ivu-input-wrapper{
        width: 200px;
    }
    .expand-form  .remarks-item .ivu-input-wrapper{
        width: 90%;
    }
    .expand-form .ivu-btn{
        margin-top: 6px;
    }
</style>


