import router from './router'
import store from './store'
import Vue from 'vue'
// import iView from 'iview/dist/iview.js';
// import 'iview/dist/styles/iview.css';
// Vue.use(iView)
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
// import {getCookie} from './util/cookie'
// import { Message } from 'element-ui'
// import { getToken } from '@/utils/auth' // 验权
import Cookies from 'js-cookie'
const whiteList = ['/login'] // 不重定向白名单
const {ipcRenderer} = require('electron')
var cookie = null;
function reqCookie(){
  return ipcRenderer.sendSync('getCookie','getCookie')
}



router.beforeEach((to, from, next) => {
  NProgress.start()
  if (reqCookie().length > 0) {
    if (to.path === '/login') {
      next();
      NProgress.done();
    } else {                 
      if (!store.getters.userRoles) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          if(!store.getters.userInfo.userId){
            // console.log("GetUserInfo")
            store.dispatch('GetUserInfo').then((res) => {
              next();
            })
          }else{
            next();
          }
        })
        // .catch((err) => {
        //   store.dispatch('FedLogOut').then(() => {
        //     Message.error(err || 'Verification failed, please login again')
        //     next({ path: '/' })
        //   })
        // })
      } else {
        next()
      }
    }
  } else {
    console.log("没有cookie")
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      if(to.path == '/login'){
        next()
      }else{
        next('/login')
      }
       // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})





router.afterEach(() => {
  NProgress.done() // 结束Progress
})
