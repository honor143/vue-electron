import Vue from 'vue'
import Vuex from 'vuex'

//此处与vuex冲突
//import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'
//import User from './modules/User'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  state:{
    //  httpurl:"http://10.88.158.206:8090/",
    // wsUrl: 'ws://10.88.158.206:8090/',
    // httpurl:"http://10.88.233.37:8090/",
    wsUrl: 'ws://10.88.233.37:8090/FixedIncomeSys/'
      // wsUrl: 'ws://10.88.233.95:8090/FixedIncomeSy/'
   
  },
  // plugins: [
  //   createPersistedState(),
  //   createSharedMutations()
  // ],
  strict: process.env.NODE_ENV !== 'production'
})
