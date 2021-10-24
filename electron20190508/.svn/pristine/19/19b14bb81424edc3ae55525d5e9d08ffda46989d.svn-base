<template>
    <div class="layout">
        <!-- <FormItem label="应标资料" v-show="islook"> -->
          <!-- <template> -->

             
            <div class="flex-wrapper">
                <Upload
                        ref="upload"
                        :before-upload="beforUpload"
                        action="http:">
                        <Button icon="ios-cloud-upload-outline" type="primary">选择上传的文件</Button>
                    </Upload>
                <div class="button-wrapper">
                    <Button type="primary" :loading="loading" @click="upload">
                        <span v-if="!loading">上传</span>
                        <span v-else>上传...</span>
                    </Button>
                </div>
                
            </div>
            
            <div class="file-wrapper">
                <Tag type="dot" v-for="(file,index) in fileList" :key="index" closable  @on-close="handleClose(index)" color="warning">{{file.name}}</Tag>
            </div>
            <!-- <Modal
                v-model="warnModel"
                title="警告"
                width="300">
                <p>{{warnMessage}}</p>
                
            </Modal> -->
         
    </div>
</template>

<script>
    export default {
        name:'page_1321',
        data () {
            return {
                fileList: [],
                loadingStatus: false,
                loading:false
            }
        },
        methods: {
            // 文件上穿之前
            beforUpload (file) {
                if(!file){
                    return false
                }
                var fileNameArr = file.name.split('.');
                
                if(fileNameArr[fileNameArr.length-1] != 'xls' && fileNameArr[fileNameArr.length-1] != 'xlsx'){
                    console.log(fileNameArr)
                    this.$Message.warning(`${file.name}后缀名不为 xls 或 xlsx ！`)
                    return false
                }
                this.fileList = [];
                this.fileList.push(file);
                return false;
            },
            // 上传成功调用
            onSuccess(response, file, fileList){
                this.$Message.success("文件上传成功！")
                this.$emit('uploadsuc')
                this.fileList = [];
            },
           
            // 删除选中上传文件
            handleClose(index){
                this.fileList.splice(index, 1);
            },
            // 上传前的检查接口
            checkHandle(checkUrl,formData,baseUrl){
                return new Promise((resolve,reject) => {
                    this.$httpPost(checkUrl, formData, baseUrl,{
                            headers: {
                            'Content-Type': 'multipart/form-data'
                            }
                        }).then((res) => {
                            resolve(res.data)
                        }).catch((error) => {
                            this.loading = false;
                            this.$Message.error('服务器错误' + error);
                        });
                })
            },
            // 真正上传的接口
            uploadHandle(actionUrl, formData, baseUrl){
                this.$httpPost(actionUrl, formData, baseUrl,{
                            headers: {
                            'Content-Type': 'multipart/form-data'
                            }
                        }).then((rdata) => {
                            if(rdata.data.actionResult == 1){
                                this.loading = false;
                                // 上传成功
                                this.onSuccess();
                            }else{
                                this.loading = false;
                                this.$Message.error('上传失败！' + error);   
                            }
                        }).catch((error) => {
                            this.loading = false;
                            this.$Message.error('服务器错误' + error);
                        });
            },
            // 点击上传按钮时调用方法  处理上传前的数据
            upload () {
                if(this.fileList.length > 0){
                    this.loading = true;
                    //创建 formData 对象
                    let formData = new FormData();
                    //向 formData 对象中添加文件
                    //多个文件上传
                    for(var i=0; i< this.fileList.length; i++){ 
                        formData.append("uploadFile"+i,this.fileList[i]);  // 文件对象  
                    } 
                    formData.append('excelFile', this.fileList[0]);
                    formData.append('vcCode', this.options.vcCode);
                    formData.append('lPageId', this.options.lPageId);
                    formData.append('lIssueCnt', this.options.lIssueCnt);
                    this.checkHandle(this.checkUrl,formData,this.baseUrl).then((res) => {
                        if(res.actionResult == 1){
                            console.log('res.actionResult == 1')
                            this.uploadHandle(this.actionUrl,formData,this.baseUrl);
                        }else if(res.actionResult == 2){
                            this.$Modal.confirm({
                                title: '警告',
                                content: `<p>${res.data}</p>`,
                                onOk: () => {
                                    this.uploadHandle(this.actionUrl,formData,this.baseUrl);
                                }
                            });
                        }else{
                            this.$Modal.warning({
                                title: '警告',
                                content: `<p>${res.data}</p>`,
                                okText: '取消'
                            });
                            this.loading = false
                        }
                    }).catch((err) => {
                        this.$Message.error('文件类型检查未通过！')
                    })
                }else{
                    this.$Message.error("未选择上传的文件！");
                }
            }
        },
        created(){
        },
        props:{
            actionUrl:String,
            checkUrl:String,
            baseUrl:String,
            options:Object
        }
        
  }
  
</script>

 <style scoped>
   .file-list{
       display: flex;
   }
   .file-wrapper{
       border:1px solid #212121;
       height:200px;
       width: 390px;
       margin: 0 5px 5px;

   }
   .flex-wrapper{
       margin:5px 0 0 5px;
       display: flex;
   }
   .button-wrapper{
       margin-left: 15px;
   }
   .file-wrapper >>> .ivu-tag{
       background: #363636;
   }
</style>
