<template>
  <v-bottom-sheet v-model="sheet" :inset="!this.$vuetify.breakpoint.smAndDown">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" rounded color="success" elevation="0"
        ><v-icon left>mdi-plus</v-icon>
        {{ $vuetify.lang.t(`$vuetify.add a new attribute value`) }}</v-btn
      >
    </template>
    <v-sheet min-height="120px" style="overflow: scroll">
      <v-card-title class="text-center text-capitalize">{{
        $vuetify.lang.t(`$vuetify.add a new attribute value`)
      }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            outlined
            v-model="form.value"
            :label="$vuetify.lang.t(`$vuetify.value name`)"
            :error-messages="serverErr['value']"
            :rules="reqRules"
            @focus="serverErr = []"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          class="mt-3"
          color="primary"
          min-width="150px"
          :loading="loading"
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
  name: "addAtrributeValue",
  data() {
    return {
      valid: true,
      sheet: false,
      loading: false,
      form: {
        value: "",
      },
      serverErr: [],
      reqRules: [
        (v) => !!v || this.$vuetify.lang.t(`$vuetify.input field is required`),
      ],
    };
  },
  methods: {
    toggle(val) {
      this.$emit("input", val);
    },
    validate() {
      return this.$refs.form.validate();
    },
    Add() {
      this.serverErr = [];
      if (this.validate()) {
        this.loading = true;

        this.$store
          .dispatch("Attribute/addValue", this.form)
          .then((res) => {
            this.$store.commit("Attribute/addValue", res.data);
            this.form = {
              value: "",
              price: 0,
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
  },
};
</script>

<style></style>
