<template>
     <div>
          <!--tags-->
      <div class="tag">
        <!--<div class="tagChildren"><Button type="primary" size="small" @click="preTag" icon="ios-arrow-back"></Button></div>-->
        <div class="tag-wrapper clearfix" ref="tagWrapper">
            <div ref="tags" class="tag-content clearfix">
                <Tag v-for="item in returnIssueInfo" class="my-tag" :class="{'my-tag-active': isActive(item.id)}"  @click.native="tagClick(item)" :key="item.id" :name="item.vcTypeName">{{item.vcTypeName}}</Tag>
            </div>
        </div>  
        <!--<div class="tagChildren"><Button type="primary" size="small" @click="nextTag" icon="ios-arrow-forward"></Button></div>-->
      </div>
    </div>
</template>
<script>
import Bscroll from 'better-scroll'
export default {
    data () {
        return {
            activeId:this.issueInfos[0].id,
            returnIssueInfo:this.issueInfos
        }
    },
   
    props: {
            issueInfos:Array
        },
    created(){

    },
    methods: {
        isActive(id){
            return id == this.activeId;
        },
        // 点击切换选中的债券
        tagClick(item){
            this.activeId = item.id;
            this.$emit('clickTag', item)
        }
    },
    mounted(){
        // 添加拖动
        // this.$nextTick(() => {
                this.scroll = new Bscroll(this.$refs.tagWrapper, {scrollX:true,scrollY:false})
            // })
    }
    
}
</script>
<style scoped>
    .tag-wrapper{
        width: 100%;
        height: 30px;
        overflow:hidden;
        background-color: rgba(155, 155, 155, 0.1)
    }
    .tag-wrapper .tag-content{
        white-space: nowrap;
        display:flex;
        display:inline-block;
   }
   .tagChildren{
        width: 20px;
        height: 30px;
        float:left;
        line-height:30px;
        text-align: center;
        background:#666;
   }
   .my-tag{
       background: #333333;
       border-radius: 3px;
       line-height:20px; 
       border: 1px solid #333   ;
   }
   
   .my-tag:hover{
       background: #EE8400;
       color: #000;
   }
   .tag >>>.my-tag span{
       color: #fff;
   }
   

    .my-tag-active{
        background: #EE8400;
        color: #000;
        font-weight: bold;
        border-radius: 3px;
        border: 1px solid #333 
    }
    .tag >>>.my-tag-active span{
        color: #000;
    }

    /* 调整后样式 */
    .tag-wrapper{
        background: none;       
    }
    .my-tag:nth-child(1){
        margin-left: 10px;
    }
    .tag >>> .my-tag span.ivu-tag-text{
        color: rgb(255,235,200);
    }
    .tag >>> .my-tag:hover span.ivu-tag-text{
       color: #000;
    }
    .tag >>> .tag-content .my-tag-active span.ivu-tag-text{
        color: #000;
    }
    .tag >>> .tag-content .my-tag-active::before{
        background:rgb(246,141,32)!important;
    }
    .ivu-tag{
        padding:0;
        margin: 0;
        border-radius: 0;
        overflow: visible;
    }
    .tag >>> .tag-content .my-tag{
        position: relative;
        display: inline-block;
        padding: .2em 1em 0;
        transform: translateZ(0);
        background: none;
        border: none;
        color: rgb(255,235,200);
        font-weight: bold;
    }
    .tag >>>.tag-content .my-tag::before{
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        /* background: rgb(26,68,68); */
        background: #383838;
        /* background-image: linear-gradient(hsla(0,0%,100%,.6),hsla(0,0%,100%,0)); */
        border: 1px solid rgba(0,0,0,.4);
        border-bottom: none;
        /* border-radius: .5em .5em 0 0; */
        transform:scaleY(1.1) perspective(.5em) rotateX(5deg) translateZ(0);
        -webkit-transform:scaleY(1.1) perspective(.5em) rotateX(5deg) translateZ(0);
        transform-origin:left right;
    }
    .tag >>>.tag-content .my-tag:hover::before{
        background:#EE8400;
    }
</style>

