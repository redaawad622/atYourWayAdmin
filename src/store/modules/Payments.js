/**
 * Category Module
 */
import Vue from "vue";
import Api from "../Api";
const state = {
  paymentSettings: null,
};
// getters
const getters = {
  paymentSettings: (state) => {
    return state.paymentSettings;
  },
};
// actions
const actions = {
  getPaymentSetting({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Vue.axios(Api.payment + `?country_id=${payload}`)
        .then((res) => {
          commit("paymentSettings", res.data.paymentSettings);
          resolve(res);
        })
        .catch((rej) => {
          reject(rej);
        });
    });
  },
};

// mutations
const mutations = {
  paymentSettings(state, payload) {
    state.paymentSettings = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
