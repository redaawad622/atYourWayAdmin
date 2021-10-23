/**
 * Category Module
 */
import Vue from "vue";
import Api from "../Api";
const state = {
  categories: [],
};

// getters
const getters = {
  categories: (state) => {
    return state.categories;
  },
};

// actions
const actions = {
  getCats({ commit }) {
    return new Promise((resolve, reject) => {
      Vue.axios
        .get(Api.category + "?all=1")
        .then((res) => {
          commit("setCats", res.data.data);
          resolve(res);
        })
        .catch((rej) => {
          reject(rej);
        });
    });
  },
  add(_, payload) {
    return new Promise((resolve, reject) => {
      Vue.axios
        .post(Api.category, payload, {
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
  edit(_, payload) {
    return new Promise((resolve, reject) => {
      Vue.axios
        .post(Api.category + "/" + payload.id, payload.form, {
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
  setCats(state, payload) {
    state.categories = payload;
  },
  pushCat(state, payload) {
    state.categories.unshift(payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
