import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const defaultStore = {
  state: {},
  modules: {},
  mutations: {},
  actions: {},
};

const store = new Vuex.Store(defaultStore);

export default store;
