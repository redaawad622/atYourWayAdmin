<template>
  <v-app-bar app elevation="0" color="#fff">
    <v-app-bar-nav-icon
      color="icon"
      @click="$emit('toggle')"
    ></v-app-bar-nav-icon>
    <v-autocomplete
      rounded
      prepend-inner-icon="mdi-magnify"
      placeholder="Search..."
      filled
      hide-details
      dense
    ></v-autocomplete>
    <v-spacer></v-spacer>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" color="primary"
          ><v-icon>mdi-circle</v-icon>
        </v-btn>
      </template>
      <v-color-picker
        class="ma-2"
        v-model="picker"
        show-swatches
        swatches-max-height="100px"
      ></v-color-picker>
    </v-menu>

    <v-btn icon @click="toggleFullScreen"
      ><v-icon>mdi-fullscreen</v-icon>
    </v-btn>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-list-item :class="{ 'px-0': $vuetify.breakpoint.xs }" style="flex: unset" v-bind="attrs" v-on="on">
          <v-list-item-avatar >
            <v-img :src="avater"></v-img>
          </v-list-item-avatar>
          <v-list-item-title v-if="!$vuetify.breakpoint.xs">{{
            user.name
          }}</v-list-item-title>
        </v-list-item>
      </template>
      <v-list dense>
        <v-list-item @click="logout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import avater from "../../assets/avater.png";
export default {
  data() {
    return {
      picker: "",
      avater: avater,
    };
  },
  computed: {
    user() {
      return this.$store.getters["Auth/user"];
    },
  },
  created() {
    let defColor = this.$getItem("atYourWayAdminStoreDefColor");
    this.picker = defColor
      ? defColor
      : this.$vuetify.theme.themes.light.primary;
  },
  methods: {
    logout() {
      this.$store.dispatch("Auth/logout");
    },
    toggleFullScreen() {
      if (
        !document.fullscreenElement && // alternative standard method
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
  },
  watch: {
    picker(val) {
      // Light theme
      this.$vuetify.theme.themes.light.primary = val;
      // Dark theme
      this.$vuetify.theme.themes.dark.primary = val;
      this.$setItem("atYourWayAdminStoreDefColor", val);
    },
  },
};
</script>

<style></style>
