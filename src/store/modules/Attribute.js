/**
 * Category Module
 */
import Vue from "vue";
import Api from "../Api";
const state = {
  attribute: null,
  values: [],
  attributes: [],
  attributeValues:[],
};

// getters
const getters = {
  attributes: (state) => {
    return state.attributes;
  },
  attributeValues: (state) => {
    return state.attributeValues;
  },
  attribute: (state) => {
    return state.attribute;
  },
  values: (state) => {
    return state.values;
  },
};

// actions
const actions = {
  getAttributes({ commit }) {
    return new Promise((resolve, reject) => {
      Vue.axios(Api.attribute+'?all=true')
        .then((res) => {
          commit("setAttributes", res.data.data);
          resolve(res);
        })
        .catch((rej) => {
          reject(rej);
        });
    });
  },
  getAttributeValues({ commit },payload) {
    return new Promise((resolve, reject) => {
      Vue.axios(Api.attribute+`?attribute_id=${payload}`)
        .then((res) => {
          commit("setAttributeValues", res.data);
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
        .post(Api.attribute, payload)
        .then((res) => {
          resolve(res);
        })
        .catch((rej) => {
          reject(rej);
        });
    });
  },
  addValue({ state }, payload) {
    return new Promise((resolve, reject) => {
      payload.attribute_id = state.attribute.id;
      Vue.axios
        .post(Api.attributeValue, payload)
        .then((res) => {
          resolve(res);
        })
        .catch((rej) => {
          reject(rej);
        });
    });
  },
  editValue({ state }, payload) {
    return new Promise((resolve, reject) => {
      payload.attribute_id = state.attribute.id;
      Vue.axios
        .put(Api.attributeValue + "/" + payload.id, payload.form)
        .then((res) => {
          resolve(res);
        })
        .catch((rej) => {
          reject(rej);
        });
    });
  },
  getAttrValue({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Vue.axios(Api.attributeValue + "/" + payload)
        .then((res) => {
          commit("updateDataValues", res.data);
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
        .put(Api.attribute + "/" + payload.id, payload.form)
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
  setAttributes(state, payload) {
    state.attributes = payload;
  },
  setAttributeValues(state, payload) {
    state.attributeValues = payload;
  },
  updateDataValues(state, payload) {
    state.attribute = payload.attribute;
    state.values = payload.values;
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
    state.attribute = null;
    state.values = [];
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
