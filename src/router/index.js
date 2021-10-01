import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard";
import Categories from "../views/Categories";
import Orders from "../views/Orders";
import Offers from "../views/Offers";
import Attributes from "../views/Attributes";
import AttributesValue from "../views/Attributes/AttributesValue"
import Product from "../views/Products"
import AddProduct from "../views/Products/AddProduct.vue"
import EditProduct from "../views/Products/EditProduct.vue"
import orderDetails from "../views/Orders/orderDetails.vue"



Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/categories",
    name: "categories",
    component: Categories,
  },
  {
    path: "/orders",
    name: "orders",
    component: Orders,
  },
  {
    path: "/orders/:id",
    name: "orderDetails",
    component: orderDetails,
  },
  {
    path: "/offers",
    name: "offers",
    component: Offers,
  },
  {
    path: "/products",
    name: "products",
    component: Product,
  },
  {
    path: "/product/add",
    name: "addProduct",
    component: AddProduct,
  },
  {
    path: "/products/:id/edit",
    name: "editProduct",
    component: EditProduct,
  },
  
  {
    path: "/attributes",
    name: "attributes",
    component: Attributes,
  },
  {
    path: "/attributes/:id",
    name: "AttributesValue",
    component: AttributesValue,
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
