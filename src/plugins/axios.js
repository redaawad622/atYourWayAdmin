"use strict";

import Vue from "vue";
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL:
    process.env.NODE_ENV == "production"
      ? "https://api.atyourway.com/"
      : "http://localhost:8000/",
  // timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
};
const $user = Vue.prototype.$getItem("hajaUser");
const _axios = axios.create(config);
if ($user && $user.token) {
  _axios.defaults.headers.common["Authorization"] =
    "Bearer " + $user.token.token;
}
_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (!config.params) {
      config.params = {};
    }
    config.params["zone"] = Intl.DateTimeFormat().resolvedOptions().timeZone;
    config.params["lang"] = localStorage.getItem("at-lang") || "en";
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function (Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
