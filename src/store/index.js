import Vue from "vue";
import Vuex from "vuex";
import Auth from "./modules/Auth";
import DataTable from "./modules/DataTable";
import Category from "./modules/Category";
import Offer from "./modules/Offer";
import Attribute from "./modules/Attribute";
import Product from "./modules/Product";
import Order from "./modules/Order";
import Setting from "./modules/Setting";
import Country from "./modules/Country";
import Payments from "./modules/Payments";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Auth,
    DataTable,
    Category,
    Offer,
    Attribute,
    Product,
    Order,
    Setting,
    Country,
    Payments,
  },
});
