<template>
     <div class="layout">
        <Layout>
            <Header class="my-header">
                <Icon @click.native="collapsedSider" :class=" rotateIcon "  type="md-menu" size="24"></Icon>
                <div class="btn-wrapper">
                    <!-- <router-link to="/layout/userRight">用户授权</router-link> -->
                    <router-link to="/layout/menuRight">菜单权限</router-link>
                    <router-link to="/layout/busiRight">业务权限</router-link>
                    <router-link to="/layout/combiAttr">组合属性</router-link>
                    <router-link to="/">返回登录页</router-link>
                </div>
                <div class="user-header" v-show="sideHide">
                    <!--<span>高凯阳</span>-->
                    <span>系统管理员</span>
                    <!--<Icon type="md-notifications-outline" color="#fff" size="18"/>-->
                    <!--<Icon type="ios-shirt" color="#fff" size="18"/>-->
                    <Icon type="ios-settings" color="#fff" size="18"/>
                </div>
            </Header>
            <Layout :style="{padding: '0'}">
                <Content :style="{padding: '0'}">
                    <Layout>
                        <!--<Sider class="my-side" ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                            <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                                <Submenu name="1">
                                    <template slot="title">
                                        <Icon type="logo-usd" />
                                        交易管理
                                    </template>
                                    <MenuItem name="1-1">市场波动预警</MenuItem>
                                </Submenu>
                            </Menu>
                        </Sider>-->
                        <Sider class="my-side" ref="side1" hide-trigger collapsible :width="sideWidth" :collapsed-width="0" v-model="isCollapsed">
                            <Collapse accordion v-model="expandValue">
                                <Panel name="1">
                                    交易管理
                                    <Tree :class="treeClass" slot="content" :data="data1"></Tree>
                                </Panel>
                            </Collapse>
                            <Collapse accordion v-model="expandValue">
                                <Panel name="1">
                                    系统管理
                                    <Tree :class="treeClass" slot="content" :data="dataRight"></Tree>
                                </Panel>
                            </Collapse>
                             <!--<span :class="{'show-side': !isCollapsed, 'show-side-hide': isCollapsed}" @click="collapsedSider">
                                 <Icon type="md-code-working" class="arrow-icon"/>
                             </span>-->
                        </Sider>
                       
                        <Content>
                           <router-view></router-view>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
            <Footer class="layout-footer-center">
                <row>
                    <Col span="8"><p class="text-left">泰康资产管理责任有限公司</p></Col>
                    <!--<Col span="6"><p class="text-center">服务器172.21.5.3已连接</p></Col>-->
                    <Col span="8"><p class="text-center">{{date}}</p></Col>
                    <Col span="8"><p class="text-right">版本2018.11.07</p></Col>
                </row>
            </Footer>
        </Layout>
    </div>
</div>
</template>

<script>
    import moment from 'moment';
  export default {
        data () {
            return {
                sideShow:true,
                sideHide:false,
                sideWidth:200,
                expandValue:"1",
                isCollapsed: false,
                data1: [
                    {
                        title: '股票波动预警',
                        selected: false
                    }
                ],
                dataRight: [
                    {
                        title: '用户授权',
                        selected: true
                    },
                    {
                        title: '菜单权限',
                        selected: false
                    },
                    {
                        title: '业务权限',
                        selected: false
                    },
                    {
                        title: '组合属性',
                        selected: false
                    }
                ],
                date: new Date(),
                timer:null
            }
        },
        computed: {
           rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            treeClass () {
                return [
                    this.isCollapsed ? 'tree' : ''
                ]
            },

        },
        methods: {
            collapsedSider () {
                console.log(this.isCollapsed)
                this.$refs.side1.toggleCollapse();
            },
            showNowDate(){
                var _this = this; //声明一个变量指向vue实例this,保证作用域一致
                this.timer = setInterval(function() {
                    _this.date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                }, 1000);
            },
            showOrHideSide(){
                console.log(this.sideShow)
                // if(this.sideShow){
                //     this.sideWidth = 0;
                // }else{
                //     this.sideWidth = 200;
                // }
                // sideHide = !sideHide;
                // sideShow = !sideShow;
            }
        },
      mounted(){
          this.showNowDate();
      },
      beforeDestroy () {
          if(this.timer) {
              clearInterval(this.timer);//在vue实例销毁钱，清除我们的定时器
          }
      }
  }
</script>

<style>
    /* 附加按钮样式 */
    .btn-wrapperr{
        text-align: left;
        display: inline-block;
        height: 30px!important;
        line-height:30px!important;
        padding: 200px;
    }
/*@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');*/
    .layout{
        font-family:"Microsoft YaHei";
        /*border: 1px solid #d7dde4;*/
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        background: #333;
    }
    .menu-icon{
        position: absolute;
        left: 10px;
        top:15px; 
        transition:all .5s ease;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .iconClass{
        position: absolute;
        left: 10px;
        top:15px;
        vertical-align:middle;

    }
    .layout .ivu-tree{
        width: 180px;
        transition:all .5s ease;
    }
    .tree {
        width: 0;
        
    }
    .layout .ivu-collapse-item:last-child>.ivu-collapse-content{
        padding: 0;
    }
    .layout .ivu-collapse-content{
        padding: 0;
    }
    .layout .ivu-tree-title{
        transition:width .5s ease;
        width: 180px;
        border-radius:0;
        padding: 3px 12px;
        color: #fff;
        font-size: 11px;

    }
    .layout .ivu-tree-title-selected{
        transition:width .5s ease;
        background-color: #181818;
    }
    .layout .ivu-tree-title:hover{
        background-color: #181818;
    }
    /*.layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }
    .layout-footer-center{
        text-align: center;
    }


    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }*/

    /*my样式*/
    .layout .ivu-layout{    
        /*background:radial-gradient(#000 5%, #111 15%, #000 60%);
        background-image:url(../assets/light_ltr.png);*/
        background:url(../assets/back_235.jpg) center center no-repeat #000;
        /*background: #000E17;*/
        background-repeat:no-repeat; 
        background-size:100% 100%;
        -moz-background-size:100% 100%;

    }
    .layout .ivu-layout-header{
        height:50px;    
        background: #232323;
    }
    .layout .ivu-layout-footer{
        background: #232323;
        padding:0;
        color: #fff;
        font-size: 10px;
        height:20px;
        line-height:20px;
    }
    .layout .ivu-layout-footer .text-left{
        text-align: left;
        padding-left: 30px;
        color: #FFEC8B;
    }
    .layout .ivu-layout-footer .text-center{
        text-align: center;
        color: #FFEC8B;
    }
    .layout .ivu-layout-footer .text-right{
        text-align: right;
        padding-right: 30px;
        color: #FFEC8B;
    }

    .layout .ivu-layout .ivu-layout-has-sider{
        height:calc(100vh - 70px);
        padding: 5px 2px;
    }
    .layout .ivu-layout .ivu-layout-has-sider .ivu-layout-sider-children{
        background: #212121;
        opacity:0.9;
        
    }
    .layout .ivu-layout .ivu-layout-has-sider .ivu-layout-sider-children .ivu-collapse{
        background: #292929;
        border: 0 solid #dcdee2;
        
    }
    .layout .ivu-collapse>.ivu-collapse-item.ivu-collapse-item>.ivu-collapse-header{
        border-bottom:0 solid #dcdee2;
        color:#fff;
    }
    .layout .ivu-collapse>.ivu-collapse-item.ivu-collapse-item-active>.ivu-collapse-header{
        border-bottom:0 solid #dcdee2;
    }
    

    .layout .ivu-layout-content{
        padding:0;
        height:calc(100vh - 70px);
    }
    .my-header{
        color:#fff;
        position:relative;
    }
    .user-header{
        height:50px;
        line-height:50px;
        position:absolute;
        right:50px;
    }
    .user-header span,.user-header i{
        margin-left:10px;
        vertical-align:middle;

    }
    /*side*/
    /*.my-side .ivu-layout-sider-children{
        background:#091C1C;
    }
    .my-side .ivu-menu-submenu-title{
        background:#143535;
    }
    .my-side .ivu-menu-submenu-title:hover{
        background:#bfa;
    }*/
    
    .my-side .ivu-collapse-content>.ivu-collapse-content-box{
        
        padding-top: 0;
        padding-bottom: 0;
    }
    .my-side .ivu-collapse-content{
        background:#212121;
    }
    /*.my-side .show-side{
        position: absolute;
        left: 200px;
        top: calc(50% - 30px);
        width: 8px;
        height: 60px;
        border-radius:0 4px 4px 0;
        background-color: #212121;
    }
    .my-side .show-side-hide{
        position: absolute;
        left: 0;
        top: calc(50% - 30px);
        width: 8px;
        height: 60px;
        border-radius:0 4px 4px 0;
        background-color: #212121;
    }

    .my-side .show-side:hover{
        background:#666;
    }
    .arrow-icon{
        font-size: 8px;
    }
    */
    
</style>
