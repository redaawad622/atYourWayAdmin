<template>
  <v-bottom-sheet
    v-model="sheet"
    :inset="!this.$vuetify.breakpoint.smAndDown"
    scrollable
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" rounded color="success" elevation="0"
        ><v-icon left>mdi-plus</v-icon>
        {{ $vuetify.lang.t(`$vuetify.add a new country`) }}
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
            :items="countries"
            item-text="name"
            item-value="name"
            :return-object="false"
            :error-messages="serverErr['name']"
            :label="$vuetify.lang.t(`$vuetify.country name`)"
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
  name: "addCountry",
  data: () => ({
    sheet: false,
    valid: true,
    countries: [],
    form: {
      name: "",
    },
    loading: false,
    serverErr: [],
  }),
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    Add() {
      this.serverErr = [];
      this.loading = true;
      if (this.validate()) {
        this.$store
          .dispatch("Country/add", this.$objectToFormData(this.form))
          .then((res) => {
            this.$store.commit("DataTable/add", res.data);
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
    getCountries() {
      fetch("https://countriesnow.space/api/v0.1/countries/states")
        .then((response) => response.json())
        .then((data) => {
          this.countries = data.data;
          this.$setItem("atCountries", this.countries);
        });
    },
  },
  mounted() {
    this.countries = this.$getItem("atCountries") || [];
    if (this.countries.length < 50) {
      this.getCountries();
    }
  },
};
</script>
