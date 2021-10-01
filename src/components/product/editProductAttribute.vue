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
            type="number"
            v-model="form.price"
            label="price"
          ></v-text-field>
          <v-text-field
            outlined
            type="number"
            v-model="form.quantity"
            label="quantity"
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
          :disabled="!valid"
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
    valid: true,
    form: {
      price: 0,
      quantity: 0,
    },
    loading: false,
  }),

  methods: {
    toggle(val) {
      this.$emit("input", val);
    },
    validate() {
      this.$refs.form.validate();
    },
    Edit() {
      this.loading = true;
      this.$store
        .dispatch("Product/editProductAttribute", {
          form: this.form,
          id: this.item.id,
        })
        .then((res) => {
          this.$store.commit("Attribute/editProductAttribute", res.data);
        })
        .catch(() => (this.message = "The value has already been taken"))
        .finally(() => (this.loading = false));
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
