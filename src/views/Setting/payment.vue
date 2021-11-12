<template>
  <v-container fluid>
    <v-card-title class="text-capitalize">{{
      $vuetify.lang.t(`$vuetify.payment settings`)
    }}</v-card-title>
    <v-card class="defaultCard" elevation="0">
      <v-card-text>
        <v-list-item-subtitle class="mb-2">{{
          $vuetify.lang.t(
            `$vuetify.please select country to show available payment methods`
          )
        }}</v-list-item-subtitle>
        <v-select
          :items="countries"
          item-text="name"
          item-value="id"
          outlined
          v-model="country"
          hide-details
        ></v-select>
      </v-card-text>
    </v-card>
    <v-expansion-panels
      class="mt-4"
      focusable
      flat
      v-if="country && settingsVal.length > 0"
    >
      <v-expansion-panel
        v-for="(item, i) in settingsVal"
        :key="'pSetting' + i"
        class="mb-2"
      >
        <v-expansion-panel-header expand-icon="mdi-cog">
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="srcs[item[0].code]"></v-img>
            </v-list-item-avatar>
            <v-list-item-title>{{
              $vuetify.lang.current == "ar" ? item[0].ar_name : item[0].name
            }}</v-list-item-title>
          </v-list-item>
        </v-expansion-panel-header>
        <v-expansion-panel-content v-if="(item[0].code = 'cod')">
          <v-form class="mt-4">
            <v-text-field
              outlined
              :label="$vuetify.lang.t(`$vuetify.payment name`)"
              v-model="cod.name"
              :error-messages="serverErr['name']"
            ></v-text-field>
            <v-text-field
              outlined
              :label="$vuetify.lang.t(`$vuetify.payment arabic name`)"
              v-model="cod.ar_name"
              :error-messages="serverErr['ar_name']"
            ></v-text-field>
            <v-switch
              v-model="cod.active"
              :error-messages="serverErr['active']"
              :label="$vuetify.lang.t(`$vuetify.active`)"
            ></v-switch>
            <v-btn color="primary">{{
              $vuetify.lang.t(`$vuetify.save`)
            }}</v-btn>
          </v-form>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      country: "",
      srcs: {
        cod: "cod",
      },
      cod: {
        name: "",
        ar_name: "",
        code: "cod",
        active: false,
      },
      serverErr: [],
    };
  },
  computed: {
    countries() {
      return this.$store.getters["Country/countries"];
    },
    paymentSettings() {
      return this.$store.getters["Payments/paymentSettings"];
    },
    settingsVal() {
      return this.paymentSettings ? Object.values(this.paymentSettings) : [];
    },
  },
  methods: {
    getCountries() {
      this.$store.dispatch("Country/getCountries");
    },
  },
  created() {
    this.getCountries();
  },
  watch: {
    country(val) {
      this.$store.dispatch("Payments/getPaymentSetting", val);
    },
    paymentSettings(val) {
      this.cod = val["cod"][0];
    },
  },
};
</script>

<style></style>
