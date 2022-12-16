import Vue from 'vue'
import Vuex from 'vuex'
// import Cookies from 'js-cookie'

Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    // menu: sessionStorage.getItem('menu') || ''
    menu:[],
    token:'',
    // data:[]
  },
  mutations:{
    // 获得menu的逻辑
    setMenu(state, data) {
      // vuex添加
      state.menu = data  
// sessionStorage.setItem('menu', JSON.stringify(data));
  },
  // setData(state,data){
  //   state.data=data
  // },
  setToken(state,data){
    state.token=data
  }
//   getMenu(state){
//     const menu =sessionStorage.get('menu')
//     state.menu = menu
//   }
  }
})