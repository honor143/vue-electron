import axios from 'axios'
// import qs from 'qs'
// 在config.js文件中统一存放一些公共常量，方便之后维护
import { baseURL } from './config.js'
//引入node的https
var https = require('https');
var httpAdapter = require('axios/lib/adapters/http.js')
axios.defaults.adapter = require('axios/lib/adapters/http');

// 封装数据返回失败提示函数---------------------------------------------------------------------------
function errorState (response) {
  // 隐藏loading
  // 如果http状态码正常，则直接返回数据
  if (response && response.status !== 200) {
    // 如果不需要除了data之外的数据，可以直接 return response.data
    return response
  } else {
    console.log("请求数据错误")
  }
}

// 封装数据返回成功提示函数---------------------------------------------------------------------------
function successState (res) {
  // 隐藏loading
  // 统一判断后端返回的错误码(错误码与后台协商而定)
  if (res && res.status == 200) {
    // console.log('success')
    return res
  }
}

// 封装axios--------------------------------------------------------------------------------------
function apiAxios (method, url, data, bUrl, config) {

  let httpDefault = {
    // adapter:httpAdapter({url: baseURL}),
    method: method,

    // httpsAgent:new https.Agent({rejectUnauthorized:false}),
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    }),
    baseURL: !!bUrl ? bUrl : baseURL,
    url: url,
    // `params` 是即将与请求一起发送的 URL 参数
    // `data` 是作为请求主体被发送的数据
    params: method === 'GET' ? data : null,
    data: method === 'POST' ? data : null,
    withCredentials: true,
    timeout: 0,
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
  }
  // 若参数中有config对象，对httpDefault进行修改
  if (!!config) {
    for (let a in config) {
      if (a == 'headers') {
        httpDefault.headers = config[a];
      } else if (a == "withCredentials") {
        httpDefault.withCredentials = config[a];
      }else if (a == "responseType") {
        httpDefault.responseType = config[a];
      }
    }
  }

  // 注意**Promise**使用(Promise首字母大写)
  return new Promise((resolve, reject) => {
    axios(httpDefault)
      // 此处的.then属于axios
      .then((res) => {
        successState(res)
        resolve(res)
      }).catch((response) => {
        errorState(response)
        reject(response)
      })
  })
}

// 输出函数getAxios、postAxios、putAxios、delectAxios，供其他文件调用-----------------------------
// Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
// 在这里直接暴露包含tkajaxGet和tkajaxPost的对象
export default {
  tkajaxGet: (url, data, bUrl, config) => apiAxios('GET', url, data, bUrl, config),
  tkajaxPost: (url, data, bUrl, config) => apiAxios('POST', url, data, bUrl, config)

  // install: function (Vue) {
  // Vue.prototype.tkajaxGet = (url, data,config) => apiAxios('GET', url, data,config)
  // Vue.prototype.tkajaxPost = (url, data,config) => apiAxios('POST', url, data,config)

}
// }
