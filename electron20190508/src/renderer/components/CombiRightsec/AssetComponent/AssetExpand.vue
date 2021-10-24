<template>
     <div>
         <Form class="expand-form" ref="expandForm" :model="formData" :label-width="120">
            <Row class="expand-row">
                <Col span="3">
                     <FormItem label="是否有效:">
                         <i-switch v-model="formData.cIsValid" true-value="1" false-value="0" size="large">
                            <span slot="open">有效</span>
                            <span slot="close">无效</span>
                        </i-switch>
                    </FormItem>
                </Col>
                 <Col span="17">
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
            formData:{}
        }
    },
    props: {
            row: Object
        },
    created(){
        // es6对象克隆
        this.formData = Object.assign({}, this.row);
        console.log(this.formData);
    },
    methods: {
        submitForm(){
            //  this.$refs.expandForm.validate((valid) => {
                // if(valid){
                    console.log(this.formData)
                    this.$httpPost('/asset/saveAssetInfo', this.formData).then((res) => {
                        console.log(res.data);
                        this.$emit('sumbitSuccess')
                        this.$Message.success("保存修改成功！")
                    }).catch(() => {
                        this.$Message.error("保存修改失败！")
                    })
                // }
            //  })
        }
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
    .expand-form  .remarks-item .ivu-input-wrapper{
        width: 90%;
    }
    .expand-form .ivu-btn{
        margin-top: 6px;
    }
</style>


