<template>
  <v-container fluid>
    <v-card-title class="text-capitalize">{{
      $vuetify.lang.t(`$vuetify.attributes`)
    }}</v-card-title>
    <v-card class="defaultCard" elevation="0">
      <v-card-text>
        <div class="d-flex justify-space-between">
          <v-spacer></v-spacer><add-attribute></add-attribute>
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
    <edit-attribute v-model="open" :item="editItem"></edit-attribute>
  </v-container>
</template>

<script>
import dataTable from "../../components/common/dataTable.vue";
import Api from "../../store/Api";
import AddAttribute from "./AddAttribute.vue";
import editAttribute from "./editAttribute.vue";
export default {
  components: { dataTable, AddAttribute, editAttribute },
  computed: {
    link() {
      return Api.attribute;
    },
  },
  data() {
    return {
      open: false,
      editItem: null,
      columns: [
        { name: "code", dataProp: "code", type: "text" },
        { name: "name", dataProp: "name", type: "text" },
        { name: "design", dataProp: "frontend_type", type: "text" },
        {
          name: "filterable",
          dataProp: "is_filterable",
          type: "bool",
          textY: "Yes",
          textN: "No",
        },
        {
          name: "required",
          dataProp: "is_required",
          type: "bool",
          textY: "Yes",
          textN: "No",
        },
        { name: "create date", dataProp: "created_at", type: "date" },
      ],
      options: [
        {
          title: "view attribute",
          icon: "mdi-eye",
          type: "show",
          link: true,
          color: "info",
        },

        {
          title: "edit attribute",
          icon: "mdi-pencil-box-outline",
          type: "edit",
          color: "success",
        },
        {
          title: "remove attribute",
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
