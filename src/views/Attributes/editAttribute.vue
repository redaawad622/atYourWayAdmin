<template>
  <v-bottom-sheet
    @input="toggle"
    :value="value"
    :inset="!this.$vuetify.breakpoint.smAndDown"
    scrollable
  >
    <v-sheet min-height="120px" style="overflow: scroll">
      <v-card-title class="text-center">Edit Attribute</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            outlined
            v-model="form.code"
            :error-messages="serverErr['code']"
            label="attribute code"
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
            label="attribute design type"
            :rules="reqRules"
            :items="designType"
          >
            ƒ
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
          @click="Edit()"
          >Edit</v-btn
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
  name: "editAttribute",
  props: ["value", "item"],
  data: () => ({
    valid: true,
    dataImage: "",
    form: {
      code: "",
      name: "",
      frontend_type: "select",
      is_filterable: false,
      is_required: false,
    },
    loading: false,
    designType: ["select", "radio", "text", "text_area"],
    serverErr: [],
    reqRules: [(v) => !!v || "input is required"],
  }),
  computed: {
    image() {
      return this.form.url;
    },
  },
  methods: {
    toggle(val) {
      this.$emit("input", val);
    },
    validate() {
      return this.$refs.form.validate();
    },
    Edit() {
      this.serverErr = [];
      if (this.validate()) {
      this.loading = true;
        this.$store
          .dispatch("Attribute/edit", {
            form: this.form,
            id: this.item.id,
          })
          .then((res) => {
            this.$store.commit("DataTable/edit", res.data);
          })
          .catch((rej) => {
            if (rej.response.status == 422)
              this.serverErr = rej.response.data.errors;
          })
          .finally(() => (this.loading = false));
      }
    },
  },
  watch: {
    item(val) {
      if (val) {
        this.form = val;
      }
    },
  },
};
</script>

<style></style>
