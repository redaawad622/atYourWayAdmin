<template>
  <v-card-text>
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
    <v-btn color="primary" @click="AddProductOption">Add</v-btn>
    <v-card-title>Product options and Values</v-card-title>
    <data-table
      :link="link"
      :columns="columns"
      :pagination="false"
      :options="options"
      @edit="edit"
      @delete="deleteItem"
      :values="productOptions"
      v-if="productOptions.length > 0"
    ></data-table>
    <edit-option v-model="open" :item="editItem"></edit-option>
  </v-card-text>
</template>

<script>
import Api from "../../store/Api";
import dataTable from "../common/dataTable.vue";
import EditOption from "./editOption.vue";
export default {
  components: { dataTable, EditOption },
  data() {
    return {
      reqRules: [(v) => !!v || "input is required"],
      open: false,
      editItem: null,
      form: {
        name: "",
        value: "",
      },
      serverErr: [],
      loading: false,
      loadingAdd: false,
      columns: [
        { name: "Option Title", dataProp: "name", type: "text" },
        { name: "Option Value", dataProp: "value", type: "text" },
      ],
      options: [
        {
          title: "edit product option",
          icon: "mdi-pencil-box-outline",
          type: "edit",
          color: "success",
        },
        {
          title: "remove product option",
          icon: "mdi-trash-can-outline",
          type: "delete",
          color: "error",
        },
      ],
    };
  },
  computed: {
    link() {
      return Api.productOption;
    },
    productOptions() {
      return this.$store.getters["Product/productOptions"];
    },
  },
  methods: {
    edit(item) {
      this.editItem = item;
      this.open = true;
    },
    deleteItem(item) {
      this.$store.commit("Product/deleteProductOption", item);
    },
    
    AddProductOption() {
      this.loadingAdd = true;
      this.serverErr = [];
      this.$store
        .dispatch("Product/AddProductOption", this.form)
        .then(() => {
          this.form = {
            name: "",
            value: "",
          };
        })
        .catch((rej) => {
          if (rej.response.status == 422)
            this.serverErr = rej.response.data.errors;
        })
        .finally(() => {
          this.loadingAdd = false;
        });
    },
  },

};
</script>

<style></style>
