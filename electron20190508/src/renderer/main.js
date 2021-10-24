import Vue from 'vue'
import tkajax from './ajax/tkajax'
// import axios from 'axios'
import App from './App'

import router from './router'
import store from './store'
import iView from 'iview/dist/iview.js';
import 'iview/dist/styles/iview.css';
//引入全局修改的组件样式
import './style/common.css'
// 引入iconfont图标
import './font_icon/iconfont.css' 
//引入自定义的样式
import './style/same.scss'
//引入换肤样式
// import './style/skin.scss'
// import './my-sheme/myIviewLess.less'
import '@/permission'
// 引入样式
// import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
// import {VTable,VPagination} from 'vue-easytable'
import {  Table,TableColumn,Button,Input, Loading} from 'element-ui';
// 注册到全局
// Vue.component(VTable.name, VTable)
// Vue.component(VPagination.name, VPagination)

Vue.use(Table)
Vue.use(TableColumn)
// Vue.use(Button)
// Vue.use(Input)
Vue.use(Loading)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
// 
Vue.prototype.$httpGet = tkajax.tkajaxGet;
Vue.prototype.$httpPost =  tkajax.tkajaxPost;
Vue.config.productionTip = false
Vue.use(iView);


/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
