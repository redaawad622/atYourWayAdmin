<template>
  <v-container fluid>
    <v-card-title class="text-capitalize">{{
      $vuetify.lang.t(`$vuetify.products`)
    }}</v-card-title>
    <v-card class="defaultCard" elevation="0">
      <v-card-text>
        <div class="d-flex justify-space-between">
          <v-spacer></v-spacer>
          <v-btn to="/product/add" rounded color="success" elevation="0"
            ><v-icon left>mdi-plus</v-icon> Add A New Product</v-btn
          >
        </div>
        <data-table
          :link="link"
          :columns="columns"
          :pagination="true"
          :options="options"
        ></data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import dataTable from "../../components/common/dataTable.vue";
import Api from "../../store/Api";
export default {
  components: { dataTable },
  computed: {
    link() {
      return Api.product;
    },
  },
  data() {
    return {
      open: false,
      editItem: null,
      columns: [
        { name: "sku", dataProp: "sku", type: "text" },
        { name: "title", dataProp: "title", type: "text" },
        // { name: "Description", dataProp: "description", type: "text" },
        { name: "price", dataProp: "price", type: "text" },
        {
          name: "categories",
          dataProp: "categories",
          type: "arrayOfObject",
          objProp: "name",
        },
        {
          name: "availablity",
          dataProp: "availablity",
          type: "bool",
          textY: "Yes",
          textN: "No",
        },

        { name: "create date", dataProp: "created_at", type: "date" },
      ],
      options: [
        {
          title: "edit Product",
          icon: "mdi-pencil-box-outline",
          type: "edit",
          color: "success",
          link: true,
        },
        {
          title: "remove Product",
          icon: "mdi-trash-can-outline",
          type: "delete",
          color: "error",
        },
      ],
    };
  },
  methods: {},
  created() {
    this.$store.commit("DataTable/reset");
  },
};
</script>

<style></style>
