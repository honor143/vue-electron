const state = {
  keepAliveRoute: []
}

const getters = {
    keepAliveRoute: state=> state.keepAliveRoute
}

const mutations = {
  ADD_KEEPALIVE (state,tag) {
    if(state.keepAliveRoute.indexOf(tag) == -1){
      state.keepAliveRoute.push(tag);
    }
  },
  DELETE_KEEPALIVE (state,tag) {
    if(state.keepAliveRoute.length > 0){
        state.keepAliveRoute.forEach((item, index) => {
            if(item == tag){
              state.keepAliveRoute.splice(index, 1);
            }
        })
    }
  },
  CLEAR_KEEPALIVE(state,tag) {
    state.keepAliveRoute.length = 0;
  }
}



export default {
  state,
  getters,
  mutations
}
