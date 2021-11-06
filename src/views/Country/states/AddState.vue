<template>
  <v-bottom-sheet
    v-model="sheet"
    :inset="!this.$vuetify.breakpoint.smAndDown"
    scrollable
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" rounded color="success" elevation="0"
        ><v-icon left>mdi-plus</v-icon>
        {{ $vuetify.lang.t(`$vuetify.add a new state`) }}
      </v-btn>
    </template>
    <v-sheet min-height="120px" style="overflow: scroll">
      <v-card-title class="text-center text-capitalize">{{
        $vuetify.lang.t(`$vuetify.add country`)
      }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-combobox
            outlined
            v-model="form.name"
            :items="states"
            item-text="name"
            item-value="name"
            :return-object="false"
            :error-messages="serverErr['name']"
            :label="$vuetify.lang.t(`$vuetify.state name`)"
          ></v-combobox>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          class="mt-3"
          color="primary"
          min-width="150px"
          :loading="loading"
          :disabled="!valid"
          @click="Add()"
          >{{ $vuetify.lang.t(`$vuetify.add`) }}</v-btn
        >
        <v-btn
          class="mt-3"
          color="error"
          min-width="150px"
          @click="sheet = false"
          >{{ $vuetify.lang.t(`$vuetify.close`) }}</v-btn
        >
      </v-card-actions>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: "addState",
  props: ["country"],
  data: () => ({
    sheet: false,
    valid: true,
    form: {
      name: "",
    },
    loading: false,
    serverErr: [],
  }),
  computed: {
    states: {
      get() {
        return this.$store.getters["Country/states"];
      },
      set(val) {
        this.$store.commit("Country/setStates", val);
      },
    },
  },
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    Add() {
      this.serverErr = [];
      if (this.validate()) {
        this.loading = true;

        this.$store
          .dispatch("Country/addState", this.form)
          .then((res) => {
            this.$store.commit("Country/addValue", res.data);
            this.form = {
              name: "",
            };
            this.$toasted.success(
              this.$vuetify.lang.t("$vuetify.Added successfully"),
              {
                duration: 3000,
              }
            );
          })
          .catch((rej) => {
            if (rej.response.status == 422)
              this.serverErr = rej.response.data.errors;

            this.$toasted.error(
              this.$vuetify.lang.t("$vuetify.Failed to add"),
              {
                duration: 3000,
              }
            );
          })
          .finally(() => (this.loading = false));
      } else {
        this.$toasted.error(
          this.$vuetify.lang.t("$vuetify.form validation error"),
          {
            duration: 3000,
          }
        );
      }
    },
    getStates() {
      this.postData("https://countriesnow.space/api/v0.1/countries/states", {
        country: this.country.name,
      }).then((data) => {
        if (!data.error) this.states = data.data.states; // JSON data parsed by `data.json()` call
      });
    },
    async postData(url = "", data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    },
  },
  watch: {
    country(val) {
      if (val) {
        this.getStates();
      }
    },
  },
};
</script>
