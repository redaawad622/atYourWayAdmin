import Vue from "vue";
import "./Healper";
import "./plugins/axios";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Toasted from 'vue-toasted';
import DatetimePicker from 'vuetify-datetime-picker'
// (Optional) import 'vuetify-datetime-picker/src/stylus/main.styl'
 
Vue.use(DatetimePicker)
Vue.config.productionTip = false;
Vue.use(Toasted,{
  iconPack : 'mdi' // set your iconPack, defaults to material. material|fontawesome|custom-class
})
new Vue({
  router,
  store,
  vuetify,

  render: function (h) {
    return h(App);
  },
}).$mount("#app");
