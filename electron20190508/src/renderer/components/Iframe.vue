<template>

    <div class="layout">
        <!-- <webview class="my-iframe" :src="iframeUrl" allowpopups></webview> -->
        <!-- <iframe sandbox="allow-scripts allow-same-origin allow-top-navigation" ref="iframe" src="http://10.88.158.207/OMS/testIframe"  width="100%" height="100%"> -->
        <iframe class="my-iframe" seamless="true" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" ref="iframe" :src="iframeUrl"  width="100%" height="100%">
            <h1>我是iframe</h1>
        </iframe>
    </div>
</template>

<script>
    import { base } from '../ajax/config.js'
  export default {
        data () {
            return {
                iframeUrl:"",
                // timeout:null
            }
        },
        created(){
            /*this.$refs.iframe.onload= () => {
                // selectIssueInfo(){
                    this.$httpGet('/secondary/selectSecondaryBonds').then((res) => {
                        console.log("nihaowohaodajiahao")
                        this.issueInfoList = res.data;
                        if(this.issueInfoList.length > 0){
                            this.selectTag =  this.issueInfoList[0].id;
                            // 获取到当前选中的债券vcCode后请求债券信息，和指令列表
                            this.selectBondInfo();
                            this.initTable();
                            this.selectInstructionList();
                            this.selectBondDetailedInfo();
                        }
                        console.log('this.issueInfoList')
                        console.log(this.issueInfoList)
                    })
                // }
            }*/
            
            // this.timeout = setTimeout(() => {
                    this.iframeUrl = base + this.$route.meta.url;
                    // this.iframeUrl = "http://10.88.233.37:8080/index";
                // },1000)
            // this.iframeUrl = "http://10.88.158.207" + this.$route.meta.url
            // alert("createdcreatedcreatedcreatedcreated")
           
        },
        watch: {
            '$route' (to, from) {
                console.log("watchwatchwatchwatchwatch")
               
                // this.iframeUrl = "http://10.88.158.207" + this.$route.query.url
                // this.timeout = setTimeout(() => {
                    this.iframeUrl = base + this.$route.meta.url;
                    // this.iframeUrl = "http://10.88.233.37:8080/#/RiskControlDemand";
                // },1000)
                // alert(this)
                console.log(this.iframeUrl)
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                // console.log("beforeRouteEnterbeforeRouteEnterbeforeRouteEnter")
                    // vm.iframeUrl = "http://10.88.158.207" + vm.$route.meta.url;
                    // console.log(vm)
            })
        },
        activated(){
            // alert("activatedactivatedactivatedactivatedactivatedactivated")
        }
        
  }
  
</script>

<style>
    .layout{
        height: 100%;
    }  
    .my-iframe{
        height: 100%;
        border: 0px solid #fff;
    }  
</style>
