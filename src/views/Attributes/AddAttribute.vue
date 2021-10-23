<template>
  <v-bottom-sheet
    @input="toggle"
    :value="value"
    :inset="!this.$vuetify.breakpoint.smAndDown"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" rounded color="success" elevation="0"
        ><v-icon left>mdi-plus</v-icon> Add A New attribute</v-btn
      >
    </template>
    <v-sheet min-height="120px" style="overflow: scroll">
      <v-card-title class="text-center">Add a new attribute</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            outlined
            v-model="form.code"
            label="attribute code"
            :error-messages="serverErr['code']"
            :rules="reqRules"
          ></v-text-field>
          <v-text-field
            outlined
            v-model="form.name"
            :error-messages="serverErr['name']"
            label="attribute name"
            :rules="reqRules"
          ></v-text-field>
          <v-select
            outlined
            v-model="form.frontend_type"
            :error-messages="serverErr['frontend_type']"
            label="attribute design type"
            :rules="reqRules"
            :items="designType"
          >
          </v-select>
          <v-checkbox
            v-model="form.is_filterable"
            label="filterable"
          ></v-checkbox>
          <v-checkbox v-model="form.is_required" label="required"></v-checkbox>
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
          @click="toggle(false)"
          >Close</v-btn
        >
      </v-card-actions>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: "addAtrribute",
  props: ["value"],
  data() {
    return {
      valid: true,
      loading: false,
      form: {
        code: "",
        name: "",
        frontend_type: "select",
        is_filterable: false,
        is_required: false,
      },
      serverErr: [],
      reqRules: [
        (v) => !!v || this.$vuetify.lang.t(`$vuetify.input field is required`),
      ],
      designType: ["select", "radio", "text", "text_area"],
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
          .dispatch("Attribute/add", this.form)
          .then((res) => {
            this.$store.commit("DataTable/add", res.data);
            this.form = {
              code: "",
              name: "",
              frontend_type: "select",
              is_filterable: false,
              is_required: false,
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
