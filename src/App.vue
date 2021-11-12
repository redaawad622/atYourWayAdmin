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
      :right="$vuetify.rtl"
    >
      <v-sheet
        class="d-flex justify-center align-center"
        :class="{ 'flex-revert': $vuetify.rtl }"
        height="70px"
        color="#2a3042"
      >
        <v-img :src="logoLight" class="mx-2" max-width="24px"></v-img>
        <span v-if="!miniVariant" class="font-weight-bold">ATYOURWAY</span>
      </v-sheet>
      <v-list flat>
        <template v-for="item in items">
          <v-list-group
            v-if="item.children"
            :key="item.title + 'group'"
            :prepend-icon="item.icon"
            active-class="mainListActive"
          >
            <template v-slot:activator>
              <v-list-item-title
                class="text-capitalize"
                style="color: #6a7187"
                >{{
                  $vuetify.lang.t(`$vuetify.${item.title}`)
                }}</v-list-item-title
              >
            </template>
            <v-list-item
              v-for="child in item.children"
              active-class="mainListActive"
              :to="child.to"
              :key="child.title"
              link
              exact
            >
              <v-list-item-icon v-if="child.icon">
                <v-icon color="#6a7187">{{ child.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title
                  class="text-capitalize"
                  style="color: #6a7187"
                  >{{
                    $vuetify.lang.t(`$vuetify.${child.title}`)
                  }}</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            active-class="mainListActive"
            :to="item.to"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon color="#6a7187">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                class="text-capitalize"
                style="color: #6a7187"
                >{{
                  $vuetify.lang.t(`$vuetify.${item.title}`)
                }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <app-bar v-if="user" @toggle="toggleMenu"></app-bar>
    <v-main style="background-color: #f8f8fb">
      <div class="px-4 my-4">
        <search v-if="$vuetify.breakpoint.xs"></search>
      </div>

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
import Search from "./components/common/search.vue";
export default {
  components: { Login, AppBar, Search },
  name,
  Search: "App",

  data: () => ({
    miniVariant: false,
    logo: logo,
    logoLight: logoLight,
    temp: true,
    items: [
      { title: "dashboard", to: "/", icon: "mdi-view-dashboard-outline" },
      {
        title: "categories",
        to: "/categories",
        icon: "mdi-format-list-bulleted-type ",
      },
      { title: "products", to: "/products", icon: "mdi-shopping-outline" },
      { title: "orders", to: "/orders", icon: "mdi-cart-arrow-down" },
      { title: "offers", to: "/offers", icon: "mdi-offer" },
      { title: "attributes", to: "/attributes", icon: "mdi-sort-ascending" },
      { title: "countries", to: "/countries", icon: "mdi-sort-ascending" },
      {
        title: "settings",
        icon: "mdi-cogs",
        children: [
          { title: "general settings", to: "/setting", icon: "mdi-cog" },
          {
            title: "payment settings",
            to: "/setting/payment",
            icon: "mdi-credit-card-settings-outline",
          },
          {
            title: "shipping settings",
            to: "/setting/shipping",
            icon: "mdi-truck-cargo-container",
          },
        ],
      },
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
  created() {
    const lang = localStorage.getItem("at-lang");
    this.$vuetify.lang.current = lang || "en";
    if (lang == "ar") {
      this.$vuetify.rtl = true;
    } else {
      this.$vuetify.rtl = false;
    }
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
.mainListActive.v-list-item--active .v-icon,
.mainListActive.v-list-item--active .v-list-item__title {
  color: #fff !important;
}
</style>
