<template>
  <v-card-text>
    <v-autocomplete
      :items="attributes"
      item-text="name"
      item-value="id"
      v-model="selectedAttr"
      auto-select-first
      outlined
      label="select attribute"
    ></v-autocomplete>
    <v-autocomplete
      :items="attributeValues"
      item-text="value"
      item-value="value"
      v-model="selectedVal"
      auto-select-first
      v-if="selectedAttr"
      outlined
      :loading="loading"
      :error-messages="message"
      label="select value"
    ></v-autocomplete>
    <template v-if="selectedVal">
      <v-text-field
        outlined
        type="number"
        v-model="price"
        label="price"
      ></v-text-field>
      <v-text-field
        outlined
        type="number"
        v-model="quantity"
        label="quantity"
      ></v-text-field>
      <v-btn :loading="loadingAdd" color="primary" @click="AddProductAttr"
        >Add Attribute</v-btn
      >
    </template>
    <v-card-title>Product Attributes and Values</v-card-title>
    <data-table
      :link="link"
      :columns="columns"
      :pagination="false"
      :options="options"
      @edit="edit"
      @delete="deleteItem"
      :values="productAttribute"
      v-if="productAttribute.length > 0"
    ></data-table>
    <edit-product-attribute
      v-model="open"
      :item="editItem"
    ></edit-product-attribute>
  </v-card-text>
</template>

<script>
import Api from "../../store/Api";
import dataTable from "../common/dataTable.vue";
import EditProductAttribute from "./editProductAttribute.vue";
export default {
  components: { dataTable, EditProductAttribute },
  data() {
    return {
      open: false,
      editItem: null,
      selectedAttr: "",
      selectedVal: "",
      price: 0,
      quantity: 0,
      loading: false,
      loadingAdd: false,
      message: "",
      columns: [
        { name: "Value", dataProp: "value", type: "text" },
        { name: "Price", dataProp: "price", type: "text" },
        { name: "Quantity", dataProp: "quantity", type: "text" },
      ],
      options: [
        {
          title: "edit product attribute",
          icon: "mdi-pencil-box-outline",
          type: "edit",
          color: "success",
        },
        {
          title: "remove product attribute",
          icon: "mdi-trash-can-outline",
          type: "delete",
          color: "error",
        },
      ],
    };
  },
  computed: {
    link() {
      return Api.productAttribute;
    },
    attributes() {
      return this.$store.getters["Attribute/attributes"];
    },
    attributeValues() {
      return this.$store.getters["Attribute/attributeValues"];
    },
    productAttribute() {
      return this.$store.getters["Product/productAttribute"];
    },
  },
  methods: {
    edit(item) {
      this.editItem = item;
      this.open = true;
    },
    deleteItem(item) {
      this.$store.commit("Product/deleteProductAttr", item);
    },
    getAttributes() {
      this.$store.dispatch("Attribute/getAttributes");
    },
    AddProductAttr() {
      this.loadingAdd = true;
      this.message = "";
      this.$store
        .dispatch("Product/AddProductAttr", {
          attribute_id: this.selectedAttr,
          value: this.selectedVal,
          price: this.price,
          quantity: this.quantity,
        })
        .then(() => {
          this.selectedVal = "";
          this.price = 0;
          this.quantity = 0;
        })
        .catch(() => {
          this.message = "product attribute is exist";
        })
        .finally(() => {
          this.loadingAdd = false;
        });
    },
  },
  watch: {
    selectedAttr(val) {
      this.loading = true;
      this.$store.dispatch("Attribute/getAttributeValues", val).finally(() => {
        this.loading = false;
      });
    },
  },
  created() {
    this.getAttributes();
  },
};
</script>

<style></style>
