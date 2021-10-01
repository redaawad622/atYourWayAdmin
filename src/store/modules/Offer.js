/**
 * Offer Module
 */
import Vue from "vue";
import Api from "../Api";
const state = {};

// getters
const getters = {};

// actions
const actions = {
  add(_, payload) {
    return new Promise((resolve, reject) => {
      Vue.axios
        .post(Api.offer, payload,{
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
        .post(Api.offer + "/" + payload.id, payload.form, {
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
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
