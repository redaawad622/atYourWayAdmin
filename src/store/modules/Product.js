/**
 * Category Module
 */
import Vue from "vue";
import Api from "../Api";
const state = {
  product: null,
  productAttribute: [],
  productOptions: [],
};

// getters
const getters = {
  product: (state) => {
    return state.product;
  },
  productAttribute: (state) => {
    return state.productAttribute;
  },
  productOptions: (state) => {
    return state.productOptions;
  },
};

// actions
const actions = {
  getProduct({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      Vue.axios(Api.product + "/" + payload)
        .then((res) => {
          commit("setProduct", res.data.data);
          dispatch("getProductAttributes");
          dispatch("getProductOptions");
          resolve(res);
        })
        .catch((rej) => {
          reject(rej);
        });
    });
  },
  getProductAttributes({ state, commit }) {
    return new Promise((resolve, reject) => {
      Vue.axios(Api.productAttribute + `?product_id=${state.product.id}`)
        .then((res) => {
          commit("setProductAttribute", res.data);
          resolve(res);
        })
        .catch((rej) => {
          reject(rej);
        });
    });
  },
  getProductOptions({ state, commit }) {
    return new Promise((resolve, reject) => {
      Vue.axios(Api.productOption + `?product_id=${state.product.id}`)
        .then((res) => {
          commit("setProductOptions", res.data);
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
        .post(Api.product, payload)
        .then((res) => {
          resolve(res);
        })
        .catch((rej) => {
          reject(rej);
        });
    });
  },
  edit({ state }, payload) {
    return new Promise((resolve, reject) => {
      Vue.axios
        .post(Api.product + "/" + state.product.id, payload)
        .then((res) => {
          resolve(res);
        })
        .catch((rej) => {
          reject(rej);
        });
    });
  },
  removeImage(_, payload) {
    return new Promise((resolve, reject) => {
      Vue.axios
        .delete(Api.product + "/image/" + payload)
        .then((res) => {
          resolve(res);
        })
        .catch((rej) => {
          reject(rej);
        });
    });
  },
  addImage(_, payload) {
    return new Promise((resolve, reject) => {
      Vue.axios
        .post(Api.product + "/image", payload, {
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
  AddProductAttr({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      payload.product_id = state.product.id;
      Vue.axios
        .post(Api.productAttribute, payload)
        .then((res) => {
          commit("AddToProductAttribute", res.data);
          resolve(res);
        })
        .catch((rej) => {
          reject(rej);
        });
    });
  },
  AddProductOption({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      payload.product_id = state.product.id;
      Vue.axios
        .post(Api.productOption, payload)
        .then((res) => {
          commit("AddToProductOptions", res.data);
          resolve(res);
        })
        .catch((rej) => {
          reject(rej);
        });
    });
  },
  editProductAttribute(_, payload) {
    return new Promise((resolve, reject) => {
      Vue.axios
        .put(Api.productAttribute + "/" + payload.id, payload.form)
        .then((res) => {
          resolve(res);
        })
        .catch((rej) => {
          reject(rej);
        });
    });
  },

  editProductOption(_, payload) {
    return new Promise((resolve, reject) => {
      Vue.axios
        .put(Api.productOption + "/" + payload.id, payload.form)
        .then((res) => {
          resolve(res);
        })
        .catch((rej) => {
          reject(rej);
        });
    });
  },
  saveDiscount({ state }, payload) {
    return new Promise((resolve, reject) => {
      Vue.axios
        .post(Api.product + "/" + state.product.id + "/discount", payload)
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
  setProduct(state, payload) {
    payload.categories = payload.categories.map((c) => c.category_id);
    state.product = payload;
  },

  setProductAttribute(state, payload) {
    state.productAttribute = payload;
  },
  setProductOptions(state, payload) {
    state.productOptions = payload;
  },
  AddToProductAttribute(state, payload) {
    state.productAttribute.unshift(payload);
  },
  AddToProductOptions(state, payload) {
    state.productOptions.unshift(payload);
  },
  deleteProductAttr(state, payload) {
    state.productAttribute.splice(payload, 1);
  },
  deleteProductOption(state, payload) {
    state.productOptions.splice(payload, 1);
  },

  editProductAttribute(state, payload) {
    let index = state.productAttribute.findIndex(
      (item) => item.id === payload.id
    );
    if (index !== -1) {
      state.productAttribute.splice(index, 1, payload);
    }
  },
  editProductOption(state, payload) {
    let index = state.productOptions.findIndex(
      (item) => item.id === payload.id
    );
    if (index !== -1) {
      state.productOptions.splice(index, 1, payload);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
