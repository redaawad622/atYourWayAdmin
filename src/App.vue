<template>
  <v-app>
    <v-navigation-drawer
    v-if="user"
      :mobile-breakpoint="960"
      :mini-variant="$vuetify.breakpoint.smAndDown ? false : miniVariant"
      dark
      app
      v-model="temp"
      color="#2a3042"
    >
      <v-sheet
        class="d-flex justify-center align-center"
        height="70px"
        color="#2a3042"
      >
      <v-img :src="logoLight" class="mx-2"  max-width="24px"></v-img>
        <span v-if="!miniVariant" class="font-weight-bold">ATYOURWAY</span>
        
      </v-sheet>
      <v-list flat>
        <v-list-item
          v-for="item in items"
          active-class="mainListActive"
          :to="item.to"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon color="#6a7187">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content  >
            <v-list-item-title style="color:#6a7187"   >{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <app-bar v-if="user" @toggle="toggleMenu"></app-bar>
    <v-main style="background-color: #f8f8fb">
      <router-view v-if="user" />
      <login v-else></login>
    </v-main>
  </v-app>
</template>

<script>
import Login from "./views/auth/Login.vue";
import logo from "./assets/logo.png";
import logoLight from "./assets/logo-light.svg";
import AppBar from "./components/common/AppBar.vue";
export default {
  components: { Login, AppBar },
  name: "App",

  data: () => ({
    miniVariant: false,
    logo: logo,
    logoLight: logoLight,
    temp: true,
    items: [
      { title: "Dashboard", to: "/", icon: "mdi-view-dashboard-outline" },
      {
        title: "Categories",
        to: "/categories",
        icon: "mdi-format-list-bulleted-type ",
      },
      { title: "products", to: "/products", icon: "mdi-shopping-outline" },
      { title: "orders", to: "/orders", icon: "mdi-cart-arrow-down" },
      { title: "offers", to: "/offers", icon: "mdi-offer" },
      { title: "attributes", to: "/attributes", icon: "mdi-sort-ascending" },
      { title: "setting", to: "/setting", icon: "mdi-cog" },
    ],
  }),
  computed: {
    user() {
      return this.$store.getters["Auth/user"];
    },
  },
  methods: {
    toggleMenu() {
      if (this.$vuetify.breakpoint.smAndDown) {
        this.temp = !this.temp;
      } else {
        this.miniVariant = !this.miniVariant;
      }
    },
  },
};
</script>
<style>
.v-sheet.v-card.defaultCard {
  box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%) !important;
}
.height-100 {
  height: 100%;
}
.w-100 {
  width: 100%;
}
.mainListActive.v-list-item--active .v-icon,.mainListActive.v-list-item--active .v-list-item__title {
  color: #fff !important;
}

</style>
