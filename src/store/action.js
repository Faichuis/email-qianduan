/**
 * 商城Vuex-actions
 */
export default {
  saveToken(context,token){
    context.commit('saveToken',token);
  },
  saveUserName(context,username){
    context.commit('saveUserName', username);
  },
  saveCartCount(context, count) {
    context.commit('saveCartCount', count);
  },
  saveEmailAccount(context, val) {
    context.commit('saveEmailAccount', val);
  }
}