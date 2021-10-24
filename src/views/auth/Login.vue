<template>
  <v-sheet class="d-flex align-center justify-center height-100">
    <template>
      <v-card
        class="defaultCard"
        elevation="0"
        :tile="$vuetify.breakpoint.xs"
        :class="{
          'height-100': $vuetify.breakpoint.xs,
          maxWidth500: !$vuetify.breakpoint.xs,
        }"
      >
        <v-img
          class="white--text px-3"
          height="130px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title class="text-capitalize">Welcome Back!</v-card-title>
          <v-card-subtitle>Sign in to continue</v-card-subtitle>
        </v-img>

        <v-card-text class="text--primary">
          <v-avatar size="72" color="#eff2f7" style="margin-top: -50px"
            ><v-icon color="icon">mdi-account-outline</v-icon></v-avatar
          >
          <v-form class="mt-4 px-5" @submit="login()">
            <v-text-field
              v-model="form.email"
              label="Your Email"
              type="email"
              placeholder="enter email"
              hint="For example, example@gmail.com"
              outlined
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              :error-messages="message"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              label="Password"
              placeholder="enter password"
              counter
              outlined
              @click:append="show1 = !show1"
            ></v-text-field>
            <v-checkbox
              v-model="form.remember"
              label="Remember me"
              class="mt-0"
              hide-details=""
              color="primary"
            ></v-checkbox>
            <v-btn class="mt-3" color="primary" @click="login()" block
              >Login</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </template>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    message: "",
    form: {
      email: "",
      password: "",
      store_id: "1",
      remember: true,
      device_name: "web",
    },
    show1: false,

    password: "Password",

    rules: {
      required: (v) =>
        !!v || this.$vuetify.lang.t(`$vuetify.input field is required`),
      min: (v) =>
        v.length >= 6 || this.$vuetify.lang.t(`$vuetify.Min 6 characters`),
    },
  }),
  methods: {
    login() {
      this.message = "";
      const agent = this.info();
      this.form.device_name =
        agent.browser.os +
        "-" +
        agent.browser.name +
        "-" +
        agent.browser.version;
      // await this.$axios.get("/sanctum/csrf-cookie");
      this.$store
        .dispatch("Auth/login", this.form)
        .then(() => {
          window.location.reload();
        })
        .catch(() => {
          this.message = "The email and password you entered don't match";
        });
    },
    info() {
      let agent = {
        browser: {
          name: null,
          version: null,
          v: null,
          userAgent: null,
          app: null,
          os: null,
        },
        mobile: false,
        pointlock: false,
      };

      //  var nVer = navigator.appVersion;
      var nAgt = navigator.userAgent;
      var browserName = navigator.appName;
      var fullVersion = "" + parseFloat(navigator.appVersion);
      var majorVersion = parseInt(navigator.appVersion, 10);
      var nameOffset, verOffset, ix;
      agent.pointlock =
        "pointerLockElement" in document ||
        "mozPointerLockElement" in document ||
        "webkitPointerLockElement" in document;

      // In Opera, the true version is after "Opera" or after "Version"
      if ((verOffset = nAgt.indexOf("Opera")) != -1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
          fullVersion = nAgt.substring(verOffset + 8);
      }
      // In MSIE, the true version is after "MSIE" in userAgent
      else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = nAgt.substring(verOffset + 5);
      }
      // In Chrome, the true version is after "Chrome"
      else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset + 7);
      }
      // In Safari, the true version is after "Safari" or after "Version"
      else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
        browserName = "Safari";
        fullVersion = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
          fullVersion = nAgt.substring(verOffset + 8);
      }
      // In Firefox, the true version is after "Firefox"
      else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset + 8);
      }
      // In most other browsers, "name/version" is at the end of userAgent
      else if (
        (nameOffset = nAgt.lastIndexOf(" ") + 1) <
        (verOffset = nAgt.lastIndexOf("/"))
      ) {
        browserName = nAgt.substring(nameOffset, verOffset);
        fullVersion = nAgt.substring(verOffset + 1);
        if (browserName.toLowerCase() == browserName.toUpperCase()) {
          browserName = navigator.appName;
        }
      }
      // trim the fullVersion string at semicolon/space if present
      if ((ix = fullVersion.indexOf(";")) != -1)
        fullVersion = fullVersion.substring(0, ix);
      if ((ix = fullVersion.indexOf(" ")) != -1)
        fullVersion = fullVersion.substring(0, ix);

      majorVersion = parseInt("" + fullVersion, 10);
      if (isNaN(majorVersion)) {
        fullVersion = "" + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
      }
      agent.browser.name = browserName;
      agent.browser.version = fullVersion;
      agent.browser.v = majorVersion;
      agent.browser.app = navigator.appName;
      agent.browser.userAgent = navigator.userAgent;
      var OSName = "Unknown OS";
      if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
      if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
      if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
      if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";

      agent.browser.os = OSName;
      agent.mobile =
        typeof window.orientation !== "undefined" ||
        navigator.userAgent.indexOf("IEMobile") !== -1;

      return agent;
    },
  },
};
</script>

<style>
.maxWidth500 {
  max-width: 500px !important;
}
</style>
