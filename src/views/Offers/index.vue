<template>
  <v-container fluid>

     <v-card-title class="text-capitalize">{{
      $vuetify.lang.t(`$vuetify.offers`)
    }}</v-card-title>
    <v-card class="defaultCard" elevation="0">
      <v-card-text>
        <div class="d-flex justify-space-between">
          <v-spacer></v-spacer><add-offer></add-offer>
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
    <edit-offer v-model="open" :item="editItem"></edit-offer>
  </v-container>
</template>

<script>
import dataTable from "../../components/common/dataTable.vue";
import Api from "../../store/Api";
import AddOffer from "./AddOffer.vue";
import EditOffer from "./editOffer.vue";
export default {
  components: { dataTable, AddOffer, EditOffer },
  computed: {
    link() {
      return Api.offer;
    },
  },
  data() {
    return {
      open: false,
      editItem: null,
      columns: [
        { name: "image", dataProp: "url", type: "image" },
        { name: "title", dataProp: "title", type: "text" },
        { name: "legend", dataProp: "legend", type: "text" },
        { name: "description", dataProp: "description", type: "text" },
        { name: "availablity", dataProp: "availablity", type: "bool" },
        {
          name: "right text",
          dataProp: "isRight",
          type: "bool",
          textY: "Yes",
          textN: "No",
        },
        { name: "create date", dataProp: "created_at", type: "date" },
      ],
      options: [
        {
          title: "edit offer",
          icon: "mdi-pencil-box-outline",
          type: "edit",
          color: "success",
        },
        {
          title: "remove offer",
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
