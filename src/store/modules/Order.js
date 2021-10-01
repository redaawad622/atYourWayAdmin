/**
 * Offer Module
 */
import Vue from "vue";
import Api from "../Api";
const state = {
  order: null,
  details: [],
};

// getters
const getters = {
  order: (state) => {
    return state.order;
  },
  details: (state) => {
    return state.details;
  },
};

// actions
const actions = {
  getDetails({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Vue.axios(Api.order + "/" + payload)
        .then((res) => {
          commit("updateDetails", res.data);
          resolve(res);
        })
        .catch((rej) => {
          reject(rej);
        });
    });
  },
  edit(_, payload) {
    return new Promise((resolve, reject) => {
      Vue.axios
        .post(Api.order + "/" + payload.id, payload.form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
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
const mutations = {
  updateDetails(state, payload) {
    state.order = payload.order;
    state.details = payload.details;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
