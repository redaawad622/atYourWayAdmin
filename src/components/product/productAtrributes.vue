<template>
  <v-card-text>
    <v-form ref="AddAttrForm" lazy-validation>
      <v-autocomplete
        :items="attributes"
        item-text="name"
        item-value="id"
        v-model="selectedAttr"
        auto-select-first
        outlined
        :label="$vuetify.lang.t('$vuetify.select attribute')"
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
        :label="$vuetify.lang.t('$vuetify.select value')"
      ></v-autocomplete>
      <template v-if="selectedVal">
        <v-text-field
          outlined
          type="number"
          v-model="price"
          :label="$vuetify.lang.t('$vuetify.price')"
          :rules="isNumber"
        ></v-text-field>
        <v-text-field
          outlined
          type="number"
          v-model="quantity"
          :label="$vuetify.lang.t('$vuetify.quantity')"
          :rules="isNumber"
        ></v-text-field>
        <v-btn :loading="loadingAdd" color="primary" @click="AddProductAttr">{{
          $vuetify.lang.t("$vuetify.add attribute")
        }}</v-btn>
      </template>
    </v-form>
    <v-card-title>{{
      $vuetify.lang.t("$vuetify.product attributes and values")
    }}</v-card-title>
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
     isNumber: [
        (v) =>
          /^\s*(?=.*[0-9])\d*(?:\.\d{1,2})?\s*$/.test(v) ||
          this.$vuetify.lang.t(
            `$vuetify.number must be equal or greater than 0`
          ),
      ],
      columns: [
        { name: "value", dataProp: "value", type: "text" },
        { name: "price", dataProp: "price", type: "text" },
        { name: "quantity", dataProp: "quantity", type: "text" },
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
      this.message = "";
      if (this.$refs.AddAttrForm.validate()) {
        this.loadingAdd = true;
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
            this.$toasted.success(
              this.$vuetify.lang.t("$vuetify.Added successfully"),
              {
                duration: 3000,
              }
            );
          })
          .catch(() => {
            this.message = "product attribute is exist";
            this.$toasted.success(
              this.$vuetify.lang.t("$vuetify.Failed to add"),
              {
                duration: 3000,
              }
            );
          })
          .finally(() => {
            this.loadingAdd = false;
          });
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
