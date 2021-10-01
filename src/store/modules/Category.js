/**
 * Category Module
 */
import Vue from "vue";
import Api from "../Api";
const state = {
  categories:[]
};

// getters
const getters = {
  categories:(state)=>{
    return state.categories;
  }
};

// actions
const actions = {
  getCats({commit}) {
    return new Promise((resolve, reject) => {
      Vue.axios
        .get(Api.category+"?all=1")
        .then((res) => {
          commit('setCats',res.data.data);
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
        .post(Api.category, payload)
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
        .put(Api.category + "/" + payload.id, payload.form)
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
    state.categories=payload
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
