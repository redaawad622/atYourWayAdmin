/**
 * Auth Module
 */
import Vue from "vue";
import Api from "../Api";
const state = {
  user: Vue.prototype.$getItem("hajaUser") || null,
};

// getters
const getters = {
  user: (state) => {
    return state.user;
  },
};

// actions
const actions = {
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Vue.axios
        .post(Api.login, payload)
        .then((res) => {
          commit("updateUser", res.data);
          if (payload.remember) {
            Vue.prototype.$setItem("hajaUser", res.data);
          }
          resolve(res);
        })
        .catch((rej) => {
          reject(rej);
        });
    });
  },
  logout({ commit }, payload) {
    window.localStorage.removeItem("hajaUser");
    return new Promise((resolve, reject) => {
      Vue.axios
        .post(Api.logout, payload)
        .then((res) => {
          commit("updateUser", null);
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
  updateUser(state, payload) {
    state.user = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
