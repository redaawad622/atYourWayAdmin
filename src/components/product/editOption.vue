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
            v-model="form.name"
            label="option title"
            :error-messages="serverErr['name']"
            :rules="reqRules"
          ></v-text-field>
          <v-text-field
            outlined
            v-model="form.value"
            label="option value"
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
  name: "editAttributeValue",
  props: ["value", "item"],
  data: () => ({
    reqRules: [(v) => !!v || "input is required"],
    valid: true,
    form: {
      price: 0,
      quantity: 0,
    },
    loading: false,
    serverErr: [],
  }),

  methods: {
    toggle(val) {
      this.$emit("input", val);
    },
    validate() {
      return this.$refs.form.validate();
    },
    Edit() {
      this.serverErr = [];
      if (this.validate) {
        this.loading = true;
        this.$store
          .dispatch("Product/editProductOption", {
            form: this.form,
            id: this.item.id,
          })
          .then((res) => {
            this.$store.commit("Product/editProductOption", res.data);
            this.toggle(false);
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
