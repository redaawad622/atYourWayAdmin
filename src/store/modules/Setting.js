/**
 * Category Module
 */
import Vue from "vue";
import Api from "../Api";
const state = {};

// getters
const getters = {};

// actions
const actions = {
  reset() {
    return new Promise((resolve, reject) => {
      Vue.axios
        .post(Api.reset)
        .then((res) => {
          resolve(res);
        })
        .catch((rej) => {
          reject(rej);
        });
    });
  },
};

// mutations
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
