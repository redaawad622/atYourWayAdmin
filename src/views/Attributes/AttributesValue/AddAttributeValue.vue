<template>
  <v-bottom-sheet v-model="sheet" :inset="!this.$vuetify.breakpoint.smAndDown">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" rounded color="success" elevation="0"
        ><v-icon left>mdi-plus</v-icon> Add A New attribute value</v-btn
      >
    </template>
    <v-sheet min-height="120px" style="overflow: scroll">
      <v-card-title class="text-center">Add a new attribute value</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            outlined
            v-model="form.value"
            label="value name"
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
          >Add</v-btn
        >
        <v-btn
          class="mt-3"
          color="error"
          min-width="150px"
          @click="sheet = false"
          >Close</v-btn
        >
      </v-card-actions>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: "addAtrributeValue",
  data: () => ({
    valid: true,
    sheet: false,
    loading: false,
    form: {
      value: "",
    },
    serverErr: [],
    reqRules: [(v) => !!v || "input is required"],
  }),
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
          })
          .catch((rej) => {
            if (rej.response.status == 422)
              this.serverErr = rej.response.data.errors;
          })
          .finally(() => (this.loading = false));
      }
    },
  },
};
</script>

<style></style>
