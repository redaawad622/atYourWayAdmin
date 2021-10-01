/**
 * DataTable Module
 */
import Vue from "vue";
const state = {
  dataCollection: [],
  links: null,
  meta: null,
  loading: false,
};

// getters
const getters = {
  dataCollection: (state) => {
    return state.dataCollection;
  },
  links: (state) => {
    return state.links;
  },
  meta: (state) => {
    return state.meta;
  },
  loading: (state) => {
    return state.loading;
  },
};

// actions
const actions = {
  getData({ commit }, payload) {
    commit("updateLoading", true);
    return new Promise((resolve, reject) => {
      Vue.axios
        .get(payload.link)
        .then((res) => {
          commit("updateDataCollection", res.data.data);
          if (payload.pagination) {
            commit("updateLinks", res.data.links);
            commit("updateMeta", res.data.meta);
          }
          commit("updateLoading", false);

          resolve(res);
        })
        .catch((rej) => {
          reject(rej);
        });
    });
  },
  deleteItem({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Vue.axios
        .delete(payload.link)
        .then(() => {
          commit("deleteFromCollection", payload.index);
          resolve();
        })
        .catch((rej) => {
          reject(rej);
        });
    });
  },
};

// mutations
const mutations = {
  updateDataCollection(state, payload) {
    state.dataCollection = payload;
  },
  updateLinks(state, payload) {
    state.links = payload;
  },
  updateMeta(state, payload) {
    state.meta = payload;
  },
  updateLoading(state, payload) {
    state.loading = payload;
  },
  deleteFromCollection(state, payload) {
    state.dataCollection.splice(payload,1);
  },
  add(state, payload) {
    state.dataCollection.unshift(payload);
  },
  reset(state) {
    state.dataCollection=[];
    state.links=null;
    state.meta=null;
  },
  edit(state, payload) {
    let index=state.dataCollection.findIndex((item)=>item.id===payload.id)
    if(index !==-1){
    state.dataCollection.splice(index, 1, payload);
      //state.dataCollection[index]=payload;
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
