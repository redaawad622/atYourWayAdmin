<template>
  <v-container fluid>
    <v-card-title>Orders</v-card-title>
    <v-card class="defaultCard" elevation="0">
      <v-card-text>
        <div class="d-flex justify-space-between">
          <v-spacer></v-spacer>
        </div>
        <data-table
          :link="link"
          :columns="columns"
          :pagination="true"
          :options="options"
          @edit="edit"
        ></data-table>
      </v-card-text>
    </v-card>
    <edit-order v-model="open" :item="editItem"></edit-order>
  </v-container>
</template>

<script>
import dataTable from "../../components/common/dataTable.vue";
import Api from "../../store/Api";
import EditOrder from "./editOrder.vue";

export default {
  components: { dataTable, EditOrder },
  computed: {
    link() {
      return Api.order;
    },
  },
  data() {
    return {
      open: false,
      editItem: null,
      columns: [
        { name: "order number", dataProp: "uuid", type: "test" },
        { name: "customer name", dataProp: "user", objProp:"name", type: "object" },
        { name: "customer address", dataProp: "user", objProp:"address", type: "object" },
        { name: "Note", dataProp: "note", type: "text" },
        { name: "create date", dataProp: "created_at", type: "date" },
      ],
      options: [
        {
          title: "view order details",
          icon: "mdi-eye",
          type: "show",
          link: true,
          color: "info",
        },
        {
          title: "edit order",
          icon: "mdi-pencil-box-outline",
          type: "edit",
          color: "success",
        },
        {
          title: "remove order",
          icon: "mdi-trash-can-outline",
          type: "delete",
          color: "error",
        },
      ],
    };
  },
  methods: {
    edit(item) {
      this.editItem = item;
      this.open = true;
    },
  },
  created() {
    this.$store.commit("DataTable/reset");
  },
};
</script>

<style></style>
