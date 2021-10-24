<template>
    <div id="assignset">
        <div  class="assign-set clearfix">
            <div class="left">
                <div>
                    <Button size="small" type="primary" @click="refresh">刷新</Button>
                </div>
                <div>
                    <span class="form-label1">待分配总量：</span>
                    <span class="form-label2">分配方式：</span>
                </div>
                
            </div>
            <!--<row class-name="row-style">
                <Col :span="20">
                    <span class="title-color">流程状态</span>
                </Col>
               
            </row>-->


            <div class="right">
                <!--自动分配-->
                <div v-for="(item,index) in headSize" class="select">
                    <Input v-model="assignTotalValue[index]" @on-blur="totalValueChange(index)" number size="small" placeholder="分配总量" >
                        <span slot="append">万</span>
                    </input>
                    <Select size="small" v-model="assignSelectValue[index]" @on-change="assignSelectChange(index)">
                        <Option v-for="item in assignSelectList" :value="item.id" :key="item.id">{{item.allotType}}</Option>
                    </Select>
                </div>
            </div>
            <div class="computed-loading">
                <Spin v-if="isComputeding">
                    <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                    <div>计算中...</div>
                </Spin>
            </div>
        </div>
        
        <Table stripe highlight-row ref="selection" :row-class-name="rowClassName" :show-header="false" :columns="columns" :data="data">
             <!--<template slot-scope="{ row, index }" slot="isEdit">
                <Button type="primary" size="small" style="margin-right: 5px">编辑</Button>
                <Button type="error" size="small">保存</Button>
            </template>-->
        </Table>
        <Modal v-model="warnModal" width="360" @on-cancel="cancelHandle">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>警告！</span>
            </p>
            <div style="text-align:center">
                <p>{{warnData}}</p>
                <!--<p>Will you delete it?</p>-->
            </div>
            <div slot="footer">
                <Button type="error" size="large" long  @click="confirm" >确定</Button>
            </div>
        </Modal>
    </div>
     
</template>
<script>



export default {
    data () {
        return {
            warnModal:false,
            warnData:'',
            modal_loading:true,
            assignTotalValue:[null,null,null,null,null,null,null,null,null,null],
            assignSelectValue:[0,0,0,0,0,0,0,0,0,0],
            scode:this.vcCode,
            isComputeding:false,     
            reqArr:this.newSelectArr,
            ids:[],
            headSize:0,
            columns:[
               {
                    title: '账户名称',
                    key: 'vcFundName',
                    width:100
                },
                {
                    title: '组合名称',
                    key: 'vcCombiName',
                     width:100
                },
                {
                    title: '投资经理',
                    key: 'vcDisplayname',
                    width:100,
                    tooltip:true
                },
                {
                    title: '投标量上限',
                    key: 'lAmountLimit',
                    width:75,
                    render: (h, params) => {
                        var sum = 0;
                        if(this.autoData.headSize > 0){
                            for(let i = 0; i<this.autoData.headSize; i++){
                                sum += parseFloat(!params.row['bid' + (i + 1)] ? 0 :params.row['bid' + (i + 1)]);
                            }
                        }
                        // 标记超限
                        // this.data.forEach((item) => {
                        //     if(item.lCombiId && item.lCombiId ==params.row.lCombiId){
                        //         item.cIsExceed = ((sum > params.row.lAmountLimit) && (params.row.lAmountLimit !=0)) ? 0 :1;
                        //     }
                        // })
                        params.row.cIsExceed = ((sum > params.row.lAmountLimit) && (params.row.lAmountLimit !=0)) ? 0 :1;
                        // this.$set(this.data[params.index],'cIsExceed',params.row.cIsExceed);
                        return h('span',{
                            style:{
                                    color: (params.row.cIsExceed == 0 &&  params.row.isHead == 0) ? 'red' : '' 
                                }
                        }, params.row.lAmountLimit)
                        
                    }
                }
                
           ],
           autoData:this.autoMap,
           data:[],
           selectData:[],
           allotTypeId:0,
           assignSelectList:[{id:0,allotType:"平均分配"},{id:1,allotType:"净值分配"}],
           bids:[]
        }
    },
    computed:{
       /* returnSpanSize(){
            if(this.headSize == 0){
                return 0
            }else{

            }
            return 24 / this.headSize;
        }*/
    },
    props: {
            newSelectArr:Array,
            vcCode:String,
            autoMap:Object,
            lIssueCnt:Number
            
        },
    created(){
        console.log("autoAssign")
        console.log(this.autoMap)
        this.initArr();
        this.selectAutomaticDistribution();
    },
    methods: {
        //初始化数据
       initArr(){
        //    console.log(this.reqArr)
            this.reqArr.forEach((element) => {
                this.ids.push(element.id)
            });
        },
        // 点击刷新按钮
        refresh(){
            this.$emit("autoRefresh");
            // selctAutomaticDistribution();
        },
        // 请求自动分配标位表
        selectAutomaticDistribution(){
                this.headSize = this.autoData.headSize;
                if(this.autoData.headSize > 0){
                     for(let i = 0; i<this.autoData.headSize; i++){
                         this.columns.push({
                             title:'bid' + (i + 1),
                             key:'bid' + (i + 1),
                             //render函数渲染行内编辑
                             render:(h, params) => {
                                 var that = this;
                                //  console.log(params.row)
                                //  console.log(params);
                                
                                if (params.row.isEdit && params.row.isHead == 0) {
                                    return h('input', {
                                        domProps: {
                                            value: params.row['bid' + (i + 1)]
                                        },
                                        on: {
                                            input: function (event) {
                                                // console.log(params.row)
                                                // console.log(event.target.value)
                                                // console.log(params.row)
                                                // params.row.isEdit = true;
                                                // that.$set(params.row,'bid' + (i + 1),event.target.value);
                                                // params.row.isEdit = true;
                                                // console.log(event.target.value)
                                                params.row['bid' + (i + 1)] = event.target.value;
                                            }
                                        }
                                    });
                                } else  {
                                    // console.log('params.row.isEdit nonnonono')
                                    // console.log(params.row)
                                    return h('div', params.row['bid' + (i + 1)]);
                                }
                            }
                            //  width:100
                         })
                     }  
                     this.columns.push({
                        title:'编辑',
                        key:'action',
                        width:50,
                        // render函数渲染编辑保存按钮
                        render: (h, params) => {
                            return h('Button', { 
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style:{
                                    display:params.row.isHead == 0 ? 'inline-block' : 'none' 
                                },
                                on: {
                                    click: () => {
                                        if (params.row.isEdit) {
                                            this.handleSave(params.row,params.index)
                                        } else {
                                            this.handleEdit(params.row)
                                        }
                                    }
                                }
                            }, params.row.isEdit ? '保存' : '编辑')
                        }
                        
                     }) 
                }
                
                if(this.autoData.instructionDistributions.length>0){
                    // 向表格数据中添加编辑保存按钮绑定的状态
                     this.data = this.autoData.instructionDistributions.map((item) => {
                        //  if(item.isHead == 0){
                            return item.isEdit = false;
                        //  }else{
                            //  return item.isEdit = ;
                        //  }
                        
                    });
                }
                
                this.data = this.autoData.instructionDistributions;
               
            // }).catch(() => {
            //    console.log("err")
            // })
        },
        // 总量输入框失去焦点
        totalValueChange(index){
            // console.log(index)
            if(this.assignTotalValue[index]){
                this.reqAssign(index);
            }
        },
        // 分配方式改变时触发
        assignSelectChange(index){
            this.reqAssign(index);
        },
        // 提交分配方式
        reqAssign(index){
            this.isComputeding = true;
            this.$emit("iscomputeding");
            var stockIds = [];
            // 遍历表格数据
            this.data.forEach(item => {
                // 如果是表头
                if(item.isHead == 1){
                    // 指令Id是表头，将表头名传过去
                    stockIds.push({isHead:item.isHead, stockId:item['bid'+(index +1)]})
                }else{
                    // 不是表头将指令ID传过去
                    stockIds.push({isHead:item.isHead, stockId:item.lStockId})
                }
            })
            // 发送的数据 
            let reqData = {
                vcCode:this.scode,
                bidIndex:index+1,
                allotType:this.assignSelectValue[index],
                stockTableData:stockIds,
                waitAmount:this.assignTotalValue[index],
                lIssueCnt:this.lIssueCnt
            }
            // 后台分配 
            this.$httpPost('/inst/computeBidAmount', reqData).then((res) => {
                res.data.forEach((element,i) => {
                    this.data[i]['bid' + (index + 1)] = element;
                })
                this.$emit("computedok");
                this.isComputeding = false;  
            })
        },
        // 提交分配后的标位
        submitBids(){
            // 前端检查数据是否超限
            for (let i = 0; i < this.data.length; i++) {
                const element = this.data[i];
                if(element.cIsExceed == 0){
                    this.$Message.warning('自动分配量超出投标量上限，请修改！')
                    this.$emit('autiAssignErr');
                    return false;
                }
                
            }
            this.bids = [];
            this.data.forEach((data) => {
                if(data.isHead != 1){
                    this.bids.push(data);
                }
            })
            // 后端检查是否超限
            this.$httpPost('/inst/checkBidAmount',this.bids).then((res) => {
                console.log(res)
                if(res.data.actionResult == 0){
                    console.log(res.data.data)
                    this.warnData = res.data.data;
                    this.warnModal = true;
                }else if(res.data.actionResult == 1){
                    this.saveBidAmount();
                }else if(res.data.actionResult == 3){
                    this.$Modal.warning({
                            title: "警告",
                            content: `<p>${res.data.data}</p>`
                    });
                    this.$emit('autiAssignErr');
                    
                }else{
                    this.$emit('autiAssignErr');
                    console.log("其他状态码！")
                }
                
                
            })
            
        },

        saveBidAmount(){
            this.$httpPost('/inst/saveBidAmount', this.bids).then((res) => {
                this.$Message.success("标位分配成功！");
                this.$emit("autiAssignSuc");
                // this.modal_loading = false
            }).catch((err) => {
                this.Message("提交失败！");
                this.$emit('autiAssignErr');
            })
        },
        // 检查提示对话框中的确定
        confirm(){
            console.log("123456")
            // this.modal_loading = true
            this.warnModal = false;
            this.saveBidAmount();
        },
        cancelHandle(){
            this.$emit("warnCancel");
        },
        handleSave(row,index){
            this.$set(row, 'isEdit', false)
            this.data.splice(index,1, row);
            
        },
        handleEdit(row){
            this.$set(row, 'isEdit', true);
        },
        rowClassName (row, index) {
            if (row.isHead == 1) {
                return 'my-red';
            } 
            return '';
        }
    }
    
}
</script>
<style scoped>
.assign-set {
  display: flex;
  height: 50px;
  flex-wrap: nowrap;
  /*overflow-x: auto;*/
}
.left {
  /*float:left;
       position:relative;*/
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  width: 350px;
}
.right {
  /*height: 50px;*/
  /*float:left;*/
  /*width:525px;*/
  /* padding-right: 50px; */
  display: flex;
  flex-wrap: nowrap;
  flex-grow: 1;
}
.computed-loading{
    width: 50px;
}
.select {
  flex-grow: 1;
}
.form-label1,
.form-label2 {
  display: block;
  /*position:absolute;
            right:0;*/
}
.form-label1 {
  top: 5px;
}
.form-label2 {
  top: 25px;
}

/**/
.row-style {
  height: 50px;
  float: left;
}
/*.red {
       color:#fff;
       background-color:#bfa!important;
   }*/

/*#assign-set >>> .ivu-table-wrapper .ivu-table .ivu-table-body .ivu-table-tbody .ivu-table-row .red td{
       background-color:rgba(0,0,0,0);
   }*/
/*.my-red{
       background-color: red!important;
       color:#bfa;
   }*/
</style>


