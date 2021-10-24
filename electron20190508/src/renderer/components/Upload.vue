<template>
    <div class="layout">
        <!-- <FormItem label="应标资料" v-show="islook"> -->
          <!-- <template> -->

             
            <div class="flex-wrapper">
                <Upload
                        multiple
                        ref="upload"
                        :before-upload="handleUpload"
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
              <!-- <ul class="file-list" v-for="(file,index) in fileList" :key="index">
                <li>文件名: <span style="font-size:15px;">{{ file.name }}</span> <Icon type="ios-close" size="20" style="float:right;" @click="delFileList(index)"></Icon></li>
              </ul> -->
            </div>
           
            <!-- <Button type="primary" @click="upload">上传</Button> -->
          <!-- </template> -->
        <!-- </FormItem> -->
 
 
        <!-- <FormItem v-show="islookshenghe">
          <h3>已经提交数据-正在等待审核</h3>
          <Button type="primary" @click="gobackfanhui">返回</Button>
        </FormItem>
 
        <FormItem v-show="islook">
          <Button type="primary" :loading="loading2" icon="ios-power" @click="upload">
            <span v-if="!loading2">接受并提交应标信息</span>
            <span v-else>正在上传文件中...</span>
          </Button>      
 
          <p style="color:red;font-size:15px;" v-show="isfiletihsi">请上传文件</p>
        </FormItem> -->
    </div>
</template>

<script>
    import { authBaseURL } from '../ajax/config';
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
            handleUpload (file) {
                this.fileList.push(file);
                console.log(this.fileList);
                return false;
            },
            onSuccess(response, file, fileList){
                this.$Message.success("文件上传成功！")
                this.fileList.length = 0;
            },
           
            handleClose(index){
                this.fileList.splice(index, 1);
            },
            upload () {
                let that = this;
                if(that.fileList.length > 0){
                    that.loading = true;
                    //创建 formData 对象
                    let formData = new FormData();
                    //向 formData 对象中添加文件
                    //多个文件上传
                    for(var i=0; i< that.fileList.length; i++){ 
                        formData.append("uploadFile"+i,that.fileList[i]);  // 文件对象  
                    } 
            
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
            
                    that.$httpPost("/static/uploadClient", formData, authBaseURL,{
                            headers: {
                            'Content-Type': 'multipart/form-data'
                            }
                        }).then(function (rdata) {
                            if(rdata.data.actionResult == 1){
                                that.loading = false;
                                // 上传成功
                                that.onSuccess();
                            }else{
                                that.loading = false;
                                that.$Message.error('上传失败！' + error);   
                            }
                            // console.log(rdata);
                        }).catch(function (error) {
                            that.loading = false;
                            that.$Message.error('服务器错误' + error);
                        });
                }else{
                    that.$Message.error("请至少上传一个文件");
                }
            }
        },
        created(){
            
           
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
       width: 600px;

   }
   .flex-wrapper{
       display: flex;
   }
   .button-wrapper{
       margin-left: 15px;
   }
   .file-wrapper >>> .ivu-tag{
       background: #363636;
   }
</style>
