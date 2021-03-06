import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 本项目页面组件Map
/*export const COMPONENTS = new Map([
  [6: require('@/components/InstructManage/BondInfo').default],
  [7: require('@/components/InstructManage/BondTendInstruc').default,
  [8: require('@/components/InstructManage/BondDistributInstruc').default,

  [9: require('@/components/InvestChecksec/BondBidCheck').default,
  
  [10: require('@/components/TradeManage/InstrucDistributeRule').default,
  [201: require('@/components/Warn').default,
  [11: require('@/components/TradeManage/BondCastBidConfirm').default,
  [12: require('@/components/TradeManage/BondWinBidConfirm').default,

  [14: require('@/components/MenuRight').default,
  [15: require('@/components/BusiRight').default,
  [16: require('@/components/CombiAttr').default,
  
])*/
export default new Router({
  routes: [
    
    {
      path: '/layout',
      name: 'layout',
      component: require('@/components/Layout1').default,
      children:[
        // {
        //   path: 'userRight',
        //   name: 'userRight',
        //   component: require('@/components/UserRight').default
        //  },
         {
           path: 'menuRight',
           name: '菜单权限管理',
          
           meta: {lPid:5,keepAlive: true,id:14},
           component: require('@/components/MenuRight').default
         },
         //菜单权限管理-子菜单start
        //  import UserInfo from './MenuRightsec/UserInfo.vue'
        //   import RoleInfo from './MenuRightsec/RoleInfo.vue'
        //   import PageFun from './MenuRightsec/PageFun.vue'
        //   import BranchInfo from './MenuRightsec/BranchInfo.vue'
        //   import UserRole from './MenuRightsec/UserRole.vue'
        //   import RolePageFunc from './MenuRightsec/RolePageFunc.vue'
        //   import UserBranch from './MenuRightsec/UserBranch.vue'
        {
          path: 'userInfo',
          name: '用户信息',
          meta: {lPid:14,keepAlive: true,id:181},
          component: require('@/components/MenuRightsec/UserInfo').default
        },{
          path: 'roleInfo',
          name: '角色信息',
          meta: {lPid:14,keepAlive: true,id:182},
          component: require('@/components/MenuRightsec/RoleInfo').default
        },{
          path: 'pageFun',
          name: '页面功能信息',
          meta: {lPid:14,keepAlive: true,id:183},
          component: require('@/components/MenuRightsec/PageFun').default
        },{
          path: 'branchInfo',
          name: '部门信息',
          meta: {lPid:14,keepAlive: true,id:184},
          component: require('@/components/MenuRightsec/BranchInfo').default
        },{
          path: 'userRole',
          name: '用户-角色',
          meta: {lPid:14,keepAlive: true,id:185},
          component: require('@/components/MenuRightsec/UserRole').default
        },{
          path: 'rolePageFunc',
          name: '角色-页面-功能',
          meta: {lPid:14,keepAlive: true,id:186},
          component: require('@/components/MenuRightsec/RolePageFunc').default
        },{
          path: 'userBranch',
          name: '用户-部门',
          meta: {lPid:14,keepAlive: true,id:187},
          component: require('@/components/MenuRightsec/UserBranch').default
        },

         //菜单权限管理-子菜单end
         {
           path: 'busiRight',
           name: '业务权限管理',
           meta: {lPid:5,keepAlive: true,id:15},
           component: require('@/components/BusiRight').default           
         },
         //业务权限管理-子菜单start
          {
            path: 'userRight',
            name: '用户-组合',
            meta: {lPid:15,keepAlive: true,id:188},
            component: require('@/components/BusiRightsec/UserRight').default
          },
          {
            path: 'invesMgeRight',
            name: '岗位-组合',
            meta: {lPid:15,keepAlive: true,id:54},
            component: require('@/components/BusiRightsec/InvesMgeRight').default
          },
          {
            path: 'branchRight',
            name: '部门-组合',
            meta: {lPid:15,keepAlive: true,id:189},
            component: require('@/components/BusiRightsec/BranchRight').default
          },
          {
            path: 'userToO3user',
            name: '用户-恒生O3用户',
            meta: {lPid:15,keepAlive: true,id:191},
            component: require('@/components/BusiRightsec/UserToO3user').default
          },
          {
            path: 'sysCombiToGP3Combi',
            name: '系统组合-GP3组合',
            meta: {lPid:15,keepAlive: true,id:192},
            component: require('@/components/BusiRightsec/SysCombiToGP3Combi').default
          },
          //业务权限管理-子菜单end
         {
           path: 'combiAttr',
           name: '组合属性设置',
           meta: {lPid:5,keepAlive: true,id:16},
           component: require('@/components/CombiAttr').default
        },
        //组合属性设置-子菜单start
        {
          path: 'accountInfo',
          name: '账户信息',
          meta: {lPid:16,keepAlive: true,id:193},
          component: require('@/components/CombiRightsec/AccountInfo').default
        },{
          path: 'assetUnitInfo',
          name: '资产单元信息',
          meta: {lPid:16,keepAlive: true,id:194},
          component: require('@/components/CombiRightsec/AssetUnitInfo').default
        },{
          path: 'combiInfo',
          name: '组合信息',
          meta: {lPid:16,keepAlive: true,id:195},
          component: require('@/components/CombiRightsec/CombiInfo').default
        },{
          path: 'userDefineGroup',
          name: '自定义分组',
          meta: {lPid:16,keepAlive: true,id:196},
          component: require('@/components/CombiRightsec/UserDefineGroup').default
        },
        //组合属性设置-子菜单end
        {
          path: 'uploadClient',
          name: '系统更新管理',
          meta: {lPid:5,keepAlive: true,id:1321},
          component: require('@/components/Upload').default
       },
        //债券发行信息
        {
          path: 'bondinfo',
          name: '债券发行信息',
          meta:{lPid:1, id:6,keepAlive: true},
          component: require('@/components/InstructManage/BondInfo').default
        },
        //债券投标指令
        {
          path: 'bondtender',
          name: '债券投标指令',
          meta:{lPid:1,id:7,keepAlive: true},
          component: require('@/components/InstructManage/BondTendInstruc').default
        },
        
         //债券分销指令
        {
          path: 'bonddistribut',
          name: '债券分销指令',
          meta:{lPid:1,id:8,keepAlive: true},
          component: require('@/components/InstructManage/BondDistributInstruc').default
        },
        //-----start -- 新增内容 4.3 crl-------
         //指令信息查询
        {
          path: 'instructionsInfo',
          name: '指令信息查询',
          meta:{lPid:1,id:1421,keepAlive: true},
          component: require('@/components/InstructManage/InstructionsInfo').default
        },
        //------- end-------
        
        //指令分发规则
         {
          path: 'instrucdistribrule',
          name: '指令分发',
          meta:{lPid:3,id:10,keepAlive: true},
          component: require('@/components/TradeManage/InstrucDistributeRule').default
        },
        // 市场波动预警
          {
          path: 'warn',
          name: '股票异常交易监控',
          meta:{lPid:3, id:201,keepAlive: false},
         
          component: require('@/components/Warn').default
        },
        // 债券招投标投标确认
        {
          path: 'castbidconfirm',
          name: '债券投标确认',
          meta:{lPid:3,id:11,keepAlive: true},
          component: require('@/components/TradeManage/BondCastBidConfirm').default
        },
        // 债券中标确认
        {
          path: 'bondwinbidconfirm',
          name: '债券中标确认',
          meta:{lPid:3,id:12,keepAlive: true},
          component: require('@/components/TradeManage/BondWinBidConfirm').default
        },
           //债券投标审批
        // {
        //   path: 'bondbidcheck',
        //   name: '债券投标审批',
        //   meta:{parentName:"投资审批",id:9,keepAlive: true},
        //   component: require('@/components/InvestChecksec/BondBidCheck').default
        // },  
        {
          path: 'bondbidcheck',
          name: '债券投标审批',
          meta:{lPid:2,id:9,keepAlive: true},
          component: require('@/components/InvestChecksec/BondBidCheck').default
        },  
        {
          path: 'updatefundcheck',
          name: '账户修改审批',
          meta:{lPid:2,id:550,keepAlive: true},
          component: require('@/components/InvestChecksec/Updatefundcheck').default
        }, 
        //  {
        //   path: 'bondbidcheck',
        //   name: '债券投标审批',
        //   meta:{id:9},
        //   component: require('@/components/test').default
        // }, 
        
        
        
        //债券投标确认
       /* {
          path: 'bondcastbidconfirm',
          name: '债券投标确认',
          component: require('@/components/TradeManage/BondCastBidConfirm').default
        }, */ 
        //债券中标确认
        
      ]
    },
    // {//系统管理
    //   path: '/sysAdmin',
    //   name: 'sysAdmin',
    //   component: require('@/components/SysAdmin').default,
    //   children:[
    //     {
    //      path: 'userRight',
    //      name: 'userRight',
    //      component: require('@/components/UserRight').default
    //     },
    //     {
    //       path: 'menuRight',
    //       name: 'menuRight',
    //       component: require('@/components/MenuRight').default
    //     },
    //     {
    //       path: 'busiRight',
    //       name: 'busiRight',
    //       component: require('@/components/BusiRight').default
    //     },
    //     {
    //       path: 'combiAttr',
    //       name: 'combiAttr',
    //       component: require('@/components/CombiAttr').default
    //     }
    //   ]
    // },
    {
      path: '/',
      // redirect:"/login"
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/components/Login').default
    }
    
  ]
})
