import api from '../../api/products.js';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async getProductsList(ctx, data) {
      return await api.getProductsList();
    },
  },
  modules: {
  }
})
