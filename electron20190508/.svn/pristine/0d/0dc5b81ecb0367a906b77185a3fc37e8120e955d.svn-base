
import tkajax from '../../ajax/tkajax.js'
import Vue from 'vue'
import { authBaseURL } from '../../ajax/config.js';
const state={//初始化用户信息
    loginUrl:'http://10.88.233.37:8090/',
    // loginUrl:'http://10.88.158.206:8090/',
    //loginUrl:'http://10.88.233.54:8090',
    userInfo:{
        oaRoles:[],
        userId:'',
        userName:''
    },
    userRoles:null
}
const getters = {//'获取state中的userInfo'
    userInfo: state=> state.userInfo,
    userRoles: state=> state.userRoles
}
const mutations={
    SAVE_USERINFO(state,obj){//'登录成功后保存用户信息'
        state.userInfo=obj;
        console.log("ffff");
    },
    SAVE_USERROLES(state,roleArr){//'保存用户权限'
        state.userRoles=roleArr;
    },
    CLEAR_USERINFO(state){//'清空用户权限'
        state.userInfo={
            oaRoles:[],
            userId:'',
            userName:''
        }
    },
    CLEAR_USERROLES(state){//'清空用户权限'
        state.userRoles=null;
    }
}  
const actions={
    Login({commit},payload){//'登录成功后保存用户信息'
        console.log("登录");          
        commit('SAVE_USERINFO',payload);
    },
    // 获取权限信息
    GetInfo({ commit, state , rootState}) {
      return new Promise((resolve, reject) => {
        //   console.log('564679686' + rootState.httpurl)
            tkajax.tkajaxGet('/selectUserAuth',null,authBaseURL).then((res) => {
            console.log( res.data)
            console.log("users hglkashgajh")
            commit('SAVE_USERROLES', res.data)
            resolve(res.data)
        }).catch(error => {
            reject(error)
        })
      })
    },
    GetUserInfo({ commit, state , rootState}) {
        return new Promise((resolve, reject) => {
            //tkajax.tkajaxPost('/loginSuccessUri').then((res) => {
            tkajax.tkajaxGet('/getUserInfo',null,authBaseURL).then((res) => {
            commit('SAVE_USERINFO', res.data)
            resolve(res.data)
        }).catch(error => {
            reject(error)
        })
      })
    },
}
//导出
export default {
    state,
    getters,
    mutations,
    actions
}