<template>
  <v-container fluid>
    <v-card-title class="text-capitalize">{{
      $vuetify.lang.t(`$vuetify.countries and states`)
    }}</v-card-title>
    <v-card class="defaultCard" elevation="0">
      <v-card-text>
        <div class="d-flex justify-space-between">
          <v-spacer></v-spacer><add-country></add-country>
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
    <edit-country v-model="open" :item="editItem"></edit-country>
  </v-container>
</template>

<script>
import dataTable from "../../components/common/dataTable.vue";
import Api from "../../store/Api";
import AddCountry from "./AddCountry.vue";
import EditCountry from "./editCountry.vue";

export default {
  components: { dataTable, AddCountry, EditCountry },
  computed: {
    link() {
      return Api.country;
    },
  },
  data() {
    return {
      open: false,
      editItem: null,
      columns: [
        { name: "name", dataProp: "name", type: "text" },

        { name: "create date", dataProp: "created_at", type: "date" },
      ],
      options: [
         {
          title: "view states",
          icon: "mdi-eye",
          type: "show",
          link: true,
          color: "info",
        },
        {
          title: "edit country name",
          icon: "mdi-pencil-box-outline",
          type: "edit",
          color: "success",
        },
        {
          title: "remove country",
          hint: "this case remove every state related with this country",
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


