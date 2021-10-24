<template>
     <div>
         <Form class="expand-form" :rules="ruleCustom" ref="expandForm" :model="formData" :label-width="120">
            <Row class="expand-row">
                <Col span="8">
                    <FormItem label="分组名称:" prop="vcPortName">
                        <Input size="small" v-model="formData.vcPortName" placeholder="请输入分组名称"></Input>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="分组类型:" prop="lPortType">
                        <Select v-model="formData.lPortType" size="small" style="width:150px">
                            <Option v-for="item in lPortTypeList" :value="item.id" :key="item.id">{{item.vcTypeName}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="分组层级:" prop="lPortLevel">
                        <Select v-model="formData.lPortLevel" size="small" style="width:150px">
                            <Option v-for="item in lPortLevelList" :value="item.id" :key="item.id">{{item.vcTypeName}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                
            </Row>
           <Row class="expand-row">
               <Col span="8">
                    <FormItem label="考核基准类型:" prop="lBenchmarkType">
                        <Select v-model="formData.lBenchmarkType" size="small" style="width:150px">
                            <Option v-for="item in lPortLevelList" :value="item.id" :key="item.id">{{item.vcTypeName}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="基准规模:" prop="enBaseScala">
                        <Input size="small" v-model="formData.enBaseScala" placeholder="请输入基准规模"></Input>
                    </FormItem>
                </Col>
                <Col span="2" offset="6">
                    <Button type="primary" @click="submitForm" size="small">提交修改</Button>
                </Col>
            </Row>
         </Form>
    </div>
</template>
<script>
 // 引入自定义表单验证
 import {validateNum} from '../../../util/valide.js'
export default {
    data () {
        return {
            // 分组类型列表
            lPortTypeList:this.portTypeInfos,
            formData:{},
            ruleCustom:{
                vcPortName:[{ required: true, message: '请输入分组名称', trigger: 'blur' }],
                lPortType:[{ required: true,type:'number', message: '请选择分组类型', trigger: 'change' }],
                lBenchmarkType:[{ required: true,type:'number', message: '请选择考核基准类型', trigger: 'change' }],
                enBaseScala:[ {validator: validateNum,required: true, trigger: 'blur' }],
                lPortLevel:[{ required: true,type:'number', message: '请选择分组层级', trigger: 'change' }]
            },
            lPortLevelList:[
                {id:0,vcTypeName:'混合'},
                {id:1,vcTypeName:'账户'},
                {id:2,vcTypeName:'单元'},
                {id:3,vcTypeName:'组合'}
            
            ]
        
        }
    },
    props: {
            row: Object,
            portTypeInfos:Array
        },
    created(){
        // es6对象克隆
        this.formData = Object.assign({}, this.row);
        console.log(this.formData);
        console.log(this.lPortTypeList)
    },
    methods: {
        // 提交修改表单
        submitForm(){
             this.$refs.expandForm.validate((valid) => {
                if(valid){
                    console.log(this.formData)
                    this.$httpPost('/port/updateTPortInfo', this.formData).then((res) => {
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


