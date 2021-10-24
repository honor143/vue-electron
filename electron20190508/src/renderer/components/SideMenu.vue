<template>
  <div class="side">
    <Collapse accordion v-model="expandValue" @on-change="collapseChange">
        <Panel v-for="role in roles" :name="role.id + ''"  :key="role.id">
            {{role.vcName}}
            <Tree @on-select-change="treeChange" :class="treeClass" slot="content" :data="dataId(role.id)"></Tree>
        </Panel>
    </Collapse>
  </div>
</template>

<script>
    import { authBaseURL } from '../ajax/config';
    import Iframe from './Iframe'
    const CDATAS = {
        CDATA1: [{
            title: '指令管理',
            expand: true,
            children: [{
                        selected:false,
                        title: '债券发行信息',
                        route:'/layout/bondinfo'
                    },
                    {
                        selected:false,
                        title: '债券投标指令',
                        route:'/layout/bondtender'
                    },
                    {
                        selected:false,
                        title: '债券投标指令test',
                        route:'/layout/bondtendertest'
                    },{
                        selected:false,
                        title: '债券分销指令',
                        route:'/layout/bonddistribut'

                    }]
            }],
        CDATA2: [{
            title: '投资审批',
            // selected: true,
            expand: true,
            children: [
                {
                    selected:false,
                    title: '债券招投标决议审批',
                        route:'/layout/bondbidcheck'
                }
            ]
        }],
        CDATA3: [{
            title: '交易管理',
            expand: true,
            children: [
                {
                    selected:false,
                    title: '市场波动预警',
                        route:'/layout/warn'
                },
                {
                    selected:false,
                    title: '指令分发规则',
                        route:'/layout/instrucdistribrule'
                },{
                    selected:false,
                    title: '债券招投标投标确认',
                        route:'/layout/castbidconfirm'
                },{
                    selected:false,
                    title: '债券招投标中标确认',
                        route:'/layout/bondwinbidconfirm'
                }
            ]
        }],
        CDATA4: [{
                title: '风控管理',
                expand: true,
                children: [
                    {
                        selected:false,
                        title: '债券招投标决议审批',
                        route:'/layout/bondbidcheck'
                    }
                    
                ]
            }],
        CDATA5: [{
                title: '系统管理',
                expand: true,
                children: [{
                        selected:false,
                        title: '菜单权限管理',
                        route:'/layout/menuRight'
                    },
                    {
                        selected:false,
                        title: '业务权限管理',
                        route:'/layout/busiRight'
                    },{
                        selected:false,
                        title: '组合属性设置',
                        route:'/layout/combiAttr'
                    }]
            }]            

    }
    export default {
        data () {
            return {
                expandValue:"1",
                roles:[],
                treeData:{
                    data1: [{
                        title: '指令管理',
                        expand: true,
                        children: []
                    }],
                    data2: [
                        {
                            title: '投资审批',
                            // selected: true,
                            expand: true,
                            children: []
                        }
                    ],
                    data3: [
                        {
                            title: '交易管理',
                            expand: true,
                            children: []
                        }
                    ],
                    data4: [
                        {
                            title: '风控管理',
                            expand: true,
                            children: []
                        }
                    ],
                    data5: [
                        {
                            title: '系统管理',
                            expand: true,
                            children: []
                        }
                    ]
                },
                
            }
        },
        computed: {
            treeClass () {
                return [
                    this.isCollapsed ? 'tree' : ''
                ]
            },
        },
        methods: {
            //动态返回tree的data数据
            dataId(id){
                if(this.treeData['data' + id]){
                    return this.treeData['data' + id];
                }else{
                    this.treeData['data' + id] = [
                        {
                            title: '父节点',
                            expand: true,
                            children: []
                        }
                    ]
                    return this.treeData['data' + id];
                }
              
            },
            //选中treeItem
            treeChange(items){
                console.log(items)
                if(items.length > 0){
                    // 路由跳转携带pageId
                    // console.log(items)
                    // console.log(this.$router)
                    console.log(items[0].routeUrl)
                    if(items[0].lRestype === 2){
                        this.$router.push({ path: items[0].routeUrl, query: { pageId:items[0].id,url:items[0].vcUrl,title:items[0].title}});
                    }else{
                        items[0].selected =false;
                        items[0].expand = !items[0].expand;
                    }

                    
                    //tree选中改变时将其他的treeItem选中状态修改为未选中状态
                    /*this.data1.forEach((item) => {
                        item.children.forEach((element) => {
                            if(element.title != items[0].title){
                                element.selected = false;
                            }
                        });
                    });*/
                }
            },
            //手风琴展开折叠
            collapseChange(keys){
                // this.reqChildMenu(keys[0]);
                this.reqChildMenuPromise2(keys[0]);
            },
            //请求第一个菜单的子菜单
            reqFirstChildMenu(){
                if(this.roles.length  === 0){
                    this.$Message.warning('没有权限请联系管理员！');
                }else{
                    this.expandValue = this.roles[0].id + '';
                    this.reqChildMenuPromise2(this.roles[0].id,'first');
                    //请求子菜单列表
                }
            },


            /* 默认选中第一个tree */
            defaultTreeItem(treeData){
                for (let i = 0; i < treeData.length; i++) {
                    if(treeData[i].lRestype === 2){
                        treeData[i].selected = true;
                        this.$router.push({ path: treeData[i].routeUrl, query: { pageId:treeData[i].id,url:treeData[i].vcUrl,title:treeData[i].title}});
                        break;
                    }else if(treeData[i].lRestype === 4){
                        this.defaultTreeItem(treeData[i].children);
                    }else{
                        break;
                    }
                }
            },

            /* 请求菜单的tree数据*/
            reqChildMenuPromise2(id,first){
                return new Promise((resolve,reject) => {
                    this.$httpGet(`/selectUserAuth`,{id:id},authBaseURL).then((res) => {
                        //返回的子菜单数据
                        var data = res.data;
                        //渲染新子菜单列表
                        this.addRoutesHandle(data);
                        if(first && data.length > 0){
                          this.defaultTreeItem(data)
                        }
                        this.treeData['data' + id][0].children = data;
                        resolve(data);
                    }).catch((err) => {
                        reject(err);
                    })
                })
            },
            /* 根据数据添加路由 */
            addRoutesHandle(data){
                 data.forEach((item) => {
                        // 判断菜单 
                        if(item.lIntegrationId == 2){
                            if(item.lRestype === 2){
                                
                                var pathsolitList = item.vcUrl.split('/');
                                var path = pathsolitList[pathsolitList.length-1].toLowerCase().trim();
                                // console.log(path);
                                // console.log(this.$router.options.routes[0])
                                var hasPath = false;
                                item.routeUrl = '/layout/' + path; 
                                // console.log(item)
                                this.$router.options.routes[0].children.forEach((route) => {
                                    if(route.path === path){
                                        hasPath = true
                                    }
                                })
                                if(!hasPath){
                                    this.$router.options.routes[0].children.push({
                                        path:path,
                                        name: item.title,
                                        meta: {lPid:item.lPid,keepAlive:true,id: item.id,url:item.vcUrl},
                                        component: Iframe
                                    })
                                }
                               
                            }else if(item.lRestype === 4 && item.children.length > 0){
                                this.addRoutesHandle(item.children);
                            }
                        }else{
                            if(item.lRestype === 2){
                                item.routeUrl = item.vcUrl;
                            }else if(item.lRestype === 4 && item.children.length > 0){
                                this.addRoutesHandle(item.children);
                            }
                            
                        }
                    })
                    console.log(this.$router.options.routes[0])
                    this.$router.addRoutes([this.$router.options.routes[0]]);
                
            },










            /*
                这里是promise方式请求子菜单
            */
            /* reqChildMenuPromise(id){
                return new Promise((resolve,reject) => {
                    //this.$httpGet(`/selectUserAuth?id=${id}`).then((res) => {
                    this.$httpGet(`/selectUserAuth`,{id:id},authBaseURL).then((res) => {
                        //返回的子菜单数据
                        var data = res.data;
                        //用于保存筛选出来新菜单的数组
                        var newChildren = [];
                        //id对应的静态子菜单
                        var children = CDATAS['CDATA' + id][0].children;
                        //嵌套循环向新数组中添加有权限的子菜单
                        children.forEach(child => {
                            data.forEach(element => {
                                if(element.vcName == child.title){
                                    child.pageId = element.id;
                                    newChildren.push(child);
                                }
                            });
                        })
                        //渲染新子菜单列表
                        this.treeData['data' + id][0].children = newChildren;
                        resolve(data);
                    }).catch((err) => {
                        reject(err);
                    })
                })
            }, */

            //请求子菜单列表通用方法
            /* reqChildMenu(id,first){
                var _this = this;
                //当没有下次展开的手风琴时(用户只有一个菜单权限时)，id为'',不请求子菜单
                if(id != ''){
                    //this.$httpGet(`/selectUserAuth?id=${id}`).then((res) => {
                    this.$httpGet(`/selectUserAuth`,{id:id},authBaseURL).then((res) => {
                        //返回的子菜单数据
                        var data = res.data;
                        //用于保存筛选出来新菜单的数组
                        var newChildren = [];
                        _this.treeData['data' + id][0].children = [];
                        // this.$router.options.routes[0].children.length = 0;
                        data.forEach((reqItem) => {
                            if(reqItem.lIntegrationId == 2){
                                // 判断菜单
                                
                                var pathsolitList = reqItem.vcUrl.split('/');
                                var path = pathsolitList[pathsolitList.length-1].toLowerCase().trim();
                                // 
                                var hasPath = false;
                                _this.$router.options.routes[0].children.forEach((route) => {
                                    if(route.path === path){
                                        hasPath = true
                                    }
                                })
                                if(!hasPath){
                                    _this.$router.options.routes[0].children.push({
                                        path:path,
                                        name: reqItem.vcName,
                                        meta: {lPid:reqItem.lPid,keepAlive:true,id: reqItem.id,url:reqItem.vcUrl},
                                        component: Iframe
                                    })
                                }

                                
                                _this.treeData['data' + id][0].children.push({
                                    title:reqItem.vcName,
                                    selected:false,
                                    lIntegrationId:reqItem.lIntegrationId,
                                    pageId:reqItem.id,
                                    route:'/layout/'+ path,
                                    url: reqItem.vcUrl
                                })
                            }else{
                                _this.treeData['data' + id][0].children.push({
                                    title:reqItem.vcName,
                                    selected:false,
                                    lIntegrationId:reqItem.lIntegrationId,
                                    pageId:reqItem.id,
                                    route:reqItem.vcUrl,
                                    url: reqItem.vcUrl
                                })
                            }
                            
                        })
                        this.$router.addRoutes([this.$router.options.routes[0]]);
                        console.log(this.$router)
                        newChildren = this.treeData['data' + id][0].children;
                        // //id对应的静态子菜单
                        // var children = CDATAS['CDATA' + id][0].children;
                        // //嵌套循环向新数组中添加有权限的子菜单
                        // children.forEach(child => {
                        //     data.forEach(element => {
                        //         if(element.vcName == child.title){
                        //             child.pageId = element.id;
                        //             child.selected = false;
                        //             newChildren.push(child);
                        //         }
                        //     });
                        // })
                        // //渲染新子菜单列表
                        // this.treeData['data' + id][0].children = newChildren;
                        // 如果是第一次reqFirstChildMenu请求子菜单
                        if(first){
                            // 遍历一级菜单权限
                            _this.roles.forEach((item) => {
                                // 如果当前一级菜单的vcName等于当前路由的parentName
                                if(item.id == _this.$route.meta.lPid){
                                    // 请求当前一级菜单下的子菜单,展开菜单
                                    _this.reqChildMenuPromise2(item.id).then((data) => {
                                        _this.expandValue = item.id + '';
                                        // 选中子菜单（这里的一级菜单ID与tree尾号相同）
                                        var treeData = _this.treeData['data' + item.id][0];
                                        treeData.children.forEach(child => {
                                            if(child.route == _this.$route.path){
                                                // console.log("child.selected = true;")
                                                // child.selected = true;
                                            }
                                        })
                                    });
                                }
                            })
                            if(_this.$route.path == '/layout'){
                                
                                newChildren[0].selected = true;
                                console.log("newChildren")
                                console.log(newChildren);
                                // this.treeData['data' + id][0].children[0].selected = true;
                                _this.$router.push({ path: newChildren[0].route, query: { pageId:newChildren[0].pageId}});
                            }else{

                            }
                        }
                        // newChildren[0].selected = true;
                        // console.log()
                        // this.$router.push({ path: items[0].route, query: { pageId:items[0].pageId}});
                            



                        // this['data' + id][0].children = CDATAS['CDATA' + id][0].children.filter(item => {
                            // for (var i = 0; i < data.length; i++) {
                            //     var element = data[i];
                            //     console.log(element)
                            //     console.log(element.vcName == item.title)
                            //     if(element.vcName != item.title){
                            //         return false;
                            //     }else{
                            //         return true;
                            //     }
                            // }
                            // return true;
                            

                            // data.forEach(function(element) {
                            //     console.log(element.vcName == item.title)
                            //     return element.vcName == item.title;
                            // }, this);
                        // });
                        // 修改对应data数据
                        // this['data' + id][0].children = data.map((item) => {
                        //     return {title:item.vcName,route:'/layout/faxingxinxi'}
                        // })
                    })
                }
                
            } */
        },
        created(){
            
            //从vuex中获取取用户权限
            this.roles = this.$store.state.User.userRoles;
            
            //请求第一个菜单的子菜单
            this.reqFirstChildMenu();
        },
        components:{
            Iframe
        }
       
    }
</script>

<style scoped>
    /* .tree {
        width: 0;
        
    } */
    /*tree控件宽度*/
    .side .ivu-tree{
        width: 100%;
    }
    /*collapse背景*/
    .side .ivu-collapse{
        background: #292929;
        border: 0 solid #dcdee2;
        
    }
    /*collapse-content背景*/
    .side >>> .ivu-collapse-content{
        background:#212121;
    }
    /*collapse-content 中的 内容区的上下内边距*/
    .side >>> .ivu-collapse-content>.ivu-collapse-content-box{
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .side >>> .ivu-collapse>.ivu-collapse-item.ivu-collapse-item>.ivu-collapse-header{
        border-bottom:0 solid #dcdee2;
        color:#fff;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    .side >>> .ivu-collapse>.ivu-collapse-item .ivu-collapse-item-active>.ivu-collapse-header{
        border-bottom:0 solid #dcdee2;
    }
    .side >>> .ivu-collapse>.ivu-collapse-item .ivu-collapse-item-active>.ivu-collapse-header{
        border-bottom:0 solid #dcdee2;
    }
    /*collapse上边框*/
    .side >>> .ivu-collapse>.ivu-collapse-item{
        border-top: 0px solid #666;
    }
     /*tree控件隐藏root节点*/
    .side >>> .ivu-tree>.ivu-tree-children>li>span{
        display:none;
    }
    .side >>> .ivu-tree>.ivu-tree-children .ivu-tree-children{
        padding:0;
    }
    /*.ivu-collapse-hide .ivu-collapse-header{

    } */
    .side >>> .ivu-tree .ivu-tree-title{
        transition:width 1s ease;
        width: 90.8%;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        border-radius:0;
        padding: 1px 12px;
        color: #fff;
        font-size: 11px;
    }
    .side >>> .ivu-tree-title-selected{
        background-color: #181818;
    }
    .side >>> .ivu-tree-title:hover{
        background-color: #181818;
    }
</style>
