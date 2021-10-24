<template>
    <div class="tags clearfix" ref="tags" v-if="showTags">
        <ul class="clearfix">
            <li class="tags-li clearfix"  v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
                <!-- <router-link @click.prevent='clickTag'  :to="{ path: item.path, query: { pageId:item.pageId}}" class="tags-li-title">
                    {{item.title}}
                </router-link> -->
                <span @click="selectTag(item)" class="tags-li-title">{{item.title}}</span>
                <span class="tags-li-icon" @click="closeTags(index)"><Icon type="ios-close" size="16"/></i></span>
                <!-- <Tag @on-change="tagChange" checkable :checked="item.checked" :name="item.title" closable @on-close="closeTags(index)">{{item.title}}</Tag> -->
            </li>
        </ul>
        <!--<div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" class="targetsel">
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>-->
    </div>
</template>

<script>
    import Bscroll from 'better-scroll'
    import bus from '../util/bus.js';
    export default {
        data() {
            return {
                tagsList: []
            }
        },
        methods: {
            clickTag(e){
                e.preventDefault();
            },
            selectTag(item){
               
                this.$router.push({path:item.path,query:{
                    pageId:item.pageId
                }});
            },
            isActive(path) {
                return path === this.$route.path;
            },
            // 关闭单个标签
            closeTags(index) {
                if(this.tagsList.length>1)
                {
                    const delItem = this.tagsList.splice(index, 1)[0];
                    this.$store.commit('DELETE_KEEPALIVE',  'page_' + delItem.pageId);
                    const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
                    if (item) {
                        delItem.path === this.$route.path && this.$router.push(item.path);
                    }else{
                        this.$router.push('/');
                    }
                }

            },
            tagChange(checked,name){
                console.log(checked)
                console.log(name)
            },
            // 关闭全部标签
            closeAll(){
                this.tagsList = [];
                this.$router.push('/');
            },
            // 关闭其他标签
            closeOther(){
                const curItem = this.tagsList.filter(item => {
                    return item.path === this.$route.path;
                });
                this.tagsList = curItem;
            },
            // 设置标签
            setTags(route){
                const isExist = this.tagsList.some(item => {
                    return item.path === route.path;
                })
                /*!isExist && this.tagsList.push({
                    title: route.name,
                    path: route.path,
                    pageId: route.meta.id
                })*/
                /**
                不存在该路标签时，添加标签
                **/
                if(!isExist){
                     this.tagsList.push({
                        title: route.query.title,
                        path: route.path,
                        pageId: route.meta.id,
                        checked:true

                    })
                    this.$store.commit('ADD_KEEPALIVE', 'page_' + route.meta.id);
                    
                }
                // console.log("this.tagsList");
                // console.log(this.tagsList)
               
                // 如果列表中不存在的将当前route添加到keepAlive中
                // this.$store.commit('ADD_KEEPALIVE', route.name);
                // console.log("shezhibiaoqian")
                console.log(this.$store.state.Tags.keepAliveRoute)


            },
            handleTags(command){
                command === 'other' ? this.closeOther() : this.closeAll();
            }
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0;
            }
        },
        watch:{
            
            $route(newValue, oldValue){
                // console.log("new Value");
                // console.log(newValue)
                
                this.setTags(newValue);
                this.scroll = null;
                this.$nextTick(() => {
                    this.scroll = new Bscroll(this.$refs.tags, {scrollX:true,scrollY:false})
                })
            }
        },
        created(){
            if(this.$route.path != "/layout"){
                this.setTags(this.$route);
            }
            
            bus.$on('delete', msg => {
                const curItem = this.tagsList.filter(item => {
                    return item.path != '/'+msg;
                });
                this.tagsList = curItem;
            });
        },
         mounted(){
            // 添加拖动
            this.$nextTick(() => {
                this.scroll = new Bscroll(this.$refs.tags, {scrollX:true,scrollY:false})
            })
        }
    }

</script>


<style>
    .tags {
        position: relative;
        width: 100%;
        height: 23px;
        overflow: hidden;
        background: rgb(35,35,35);
        /* padding-right: 120px; */
    }

    .tags ul {
        display: flex;
        /* box-sizing: border-box; */
        white-space: nowrap;
        display:inline-block;
        /* width: 100%; */
        /* display: flex; */
        /* height: 100%; */
    }

    .tags-li {
        /* float: left; */
        display: flex;
        display: inline-block;
        margin: 1px 1px 1px 1px;
        border-radius: 3px;
        font-size: 12px;
        /* overflow: hidden; */
        cursor: pointer;
        height: 23px;
        line-height: 23px;
        border: 1px solid #000;
        background: #414141;
        padding-right:5px;
        vertical-align: middle;
        color: #F3F3F3;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }

    .tags-li:not(.active):hover {
        background: #646464!important;
        
    }
    .tags-li:not(.active):hover span{
        color: #EE8400!important;
    }

    .tags-li.active {
        background:#282828;
        color: rgb(245,173,3)!important;
    }

    .tags-li-title {
        /* float: left; */
        /*max-width: 80px;*/
        /* overflow: hidden; */
        /* white-space: nowrap; */
        /* text-overflow: ellipsis; */
        padding: 0 5px 0 10px;
        padding-right: 5px;
        display: inline-block;
        color: #bdbdbd;
        height: 100%;
    }

    .tags-li.active .tags-li-title {
        color: #F3F3F3!important;
    }
   
    .tags-close-box {
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 110px;
        height: 30px;
        /*background: #fff;*/
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
        z-index: 10;
    }
    .targetsel
    {
        border: 1px solid #292929!important;
        background-color: #666!important;
        color: #fff!important;
        background: -webkit-linear-gradient(top,#454545 0,#666 100%)!important;
        background: -moz-linear-gradient(top,#454545 0,#666 100%)!important;
        background: -o-linear-gradient(top,#454545 0,#666 100%)!important;
        background: linear-gradient(to bottom,#454545 0,#666 100%)!important;
        background-repeat: repeat-x!important;
    }
    .targetsel:hover,.targetsel:focus
    {
        border: 1px solid #292929!important;
        color: #fff!important;
        background: #646464!important;
    }
    .el-dropdown-menu
    {
        background-color: #666!important;
        border: 1px solid #292929!important;
    }
    .el-popper .popper__arrow
    {
        border-bottom-color:#666!important;
    }
    .el-popper[x-placement^=bottom] .popper__arrow::after
    {
        border-bottom-color:#666!important;
    }
    .el-dropdown-menu__item
    {
        color: #fff!important;
    }
    .el-dropdown-menu__item:not(.is-disabled):hover
    {
        color: #fff!important;
        background-color: #8a8a8a!important;
    }


</style>
