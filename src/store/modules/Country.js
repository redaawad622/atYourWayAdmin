/**
 * Category Module
 */
import Vue from "vue";
import Api from "../Api";
const state = {
  country: null,
  values: [],
  states: [],
  countries: [],
};
// getters
const getters = {
  country: (state) => {
    return state.country;
  },
  values: (state) => {
    return state.values;
  },
  states: (state) => {
    return state.states;
  },
  countries: (state) => {
    return state.countries;
  },
};
// actions
const actions = {
  add(_, payload) {
    return new Promise((resolve, reject) => {
      Vue.axios
        .post(Api.country, payload, {
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
        .post(Api.country + "/" + payload.id, payload.form, {
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
  getCountries({ commit }) {
    return new Promise((resolve, reject) => {
      Vue.axios(Api.country + "?all=1")
        .then((res) => {
          commit("updateCountries", res.data.data);
          resolve(res);
        })
        .catch((rej) => {
          reject(rej);
        });
    });
  },
  getCountry({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Vue.axios(Api.country + "/" + payload)
        .then((res) => {
          commit("updateDataValues", res.data);
          resolve(res);
        })
        .catch((rej) => {
          reject(rej);
        });
    });
  },
  addState({ state }, payload) {
    return new Promise((resolve, reject) => {
      payload.country_id = state.country.id;
      Vue.axios
        .post(Api.state, payload)
        .then((res) => {
          resolve(res);
        })
        .catch((rej) => {
          reject(rej);
        });
    });
  },
  editState({ state }, payload) {
    return new Promise((resolve, reject) => {
      payload.country_id = state.country.id;
      Vue.axios
        .put(Api.state + "/" + payload.id, payload.form)
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
  updateDataValues(state, payload) {
    state.country = payload.country;
    state.values = payload.values;
  },
  updateCountries(state, payload) {
    state.countries = payload;
  },
  addValue(state, payload) {
    state.values.unshift(payload);
  },
  editValue(state, payload) {
    let index = state.values.findIndex((item) => item.id === payload.id);
    if (index !== -1) {
      state.values.splice(index, 1, payload);
    }
  },
  resetValues(state) {
    state.country = null;
    state.values = [];
  },
  setStates(state, payload) {
    state.states = payload || [];
  },
  deleteValue(state, payload) {
    state.values.splice(payload, 1);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
