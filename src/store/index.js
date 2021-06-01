import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
Vue.use(Vuex);

const state = {
  token:'',
  username:'',//登录用0
  emailAccount:'',
}
export default new Vuex.Store({
  state,
  mutations,
  actions
});