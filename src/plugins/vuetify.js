import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import en from "./locale/en.ts";
import ar from "./locale/ar.ts";
import de from "./locale/de.ts";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { en, ar, de },
    current: "en",
  },
  theme: {
    themes: {
      light: {
        primary: "#556ee6",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#34c38f",
        warning: "#FFC107",
        icon: "#495057",
      },
    },
  },
});
