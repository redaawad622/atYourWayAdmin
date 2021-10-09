<template>
  <v-container fluid>
    <v-card-title>Add Product</v-card-title>
    <v-card class="defaultCard" elevation="0">
      <v-card-title>Product Information</v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            outlined
            v-model="form.title"
            label="product title"
            :error-messages="serverErr['title']"
            :rules="reqRules"
          ></v-text-field>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                outlined
                v-model="form.sku"
                label="product sku"
                :error-messages="serverErr['sku']"
                :rules="reqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                outlined
                v-model="form.quantity"
                :error-messages="serverErr['quantity']"
                label="product quantity"
                :rules="[...reqRules, ...isNumber]"
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-autocomplete
            multiple
            chips
            clearable
            outlined
            v-model="form.categories"
            deletable-chips
            :error-messages="serverErr['categories']"
            label="product categories"
            :rules="reqRules"
            :items="categories"
            item-text="name"
            item-value="id"
          ></v-autocomplete>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                outlined
                v-model="form.price"
                label="product price"
                :error-messages="serverErr['price']"
                type="number"
                :rules="[...reqRules, ...isNumber]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                outlined
                v-model="form.sale_price"
                type="number"
                :error-messages="serverErr['sale_price']"
                label="product sale price"
                :rules="[...reqRules, ...isNumber]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-text-field
            outlined
            type="number"
            :rules="isNumber"
            label="permenent discount"
            v-model.number="form.permanentDiscount"
            :error-messages="serverErr['permanentDiscount']"
          ></v-text-field>
          <v-textarea
            rows="3"
            v-model="form.description"
            :error-messages="serverErr['description']"
            outlined
            label="product description"
          ></v-textarea>
          <v-checkbox
            v-model="form.availablity"
            label="availablity"
            hide-details
          ></v-checkbox>
          <v-checkbox v-model="form.featured" label="featured"></v-checkbox>
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
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import Api from "../../store/Api";
export default {
  computed: {
    link() {
      return Api.product;
    },
    categories() {
      return this.$store.getters["Category/categories"];
    },
  },
  data: () => ({
    valid: true,
    loading: false,
    form: {
      title: "",
      sku: "",
      quantity: "",
      price: "",
      sale_price: "",
      categories: [],
      description: "",
      permanentDiscount: 0,
      featured: false,
      availablity: true,
    },
    serverErr: [],
    reqRules: [(v) => !!v || "input is required"],
    isNumber: [
      (v) =>
        /^\s*(?=.*[0-9])\d*(?:\.\d{1,2})?\s*$/.test(v) ||
        "number must be equal or greater than 0",
    ],
  }),
  methods: {
    getCat() {
      this.$store.dispatch("Category/getCats");
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    Add() {
      this.serverErr = [];
      if (this.validate) {
        this.loading = true;

        this.$store
          .dispatch("Product/add", this.$objectToFormData(this.form))
          .then((res) => {
            this.$router.replace(`/products/${res.data.id}/edit`);
            this.reset();
          })
          .catch((rej) => {
            if (rej.response.status == 422)
              this.serverErr = rej.response.data.errors;
          })
          .finally(() => (this.loading = false));
      }
    },
  },
  created() {
    this.getCat();
  },
};
</script>

<style></style>
