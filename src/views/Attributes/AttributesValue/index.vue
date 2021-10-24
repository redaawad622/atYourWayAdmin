<template>
  <v-container fluid>
    <v-card-title class="text-capitalize" v-if="attribute">{{
      $vuetify.lang.t(`$vuetify.attribute values`, attribute.name)
    }}</v-card-title>
    <v-card class="defaultCard" elevation="0" :loading="loading">
      <v-card-text>
        <div class="d-flex justify-space-between">
          <v-spacer></v-spacer><add-attribute-value></add-attribute-value>
        </div>
        <data-table
          :link="link"
          :columns="columns"
          :pagination="false"
          :options="options"
          @edit="edit"
          @delete="deleteItem"
          :values="values"
        ></data-table>
      </v-card-text>
    </v-card>
    <edit-attribute-value
      v-model="open"
      :item="editItem"
    ></edit-attribute-value>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import dataTable from "../../../components/common/dataTable.vue";
import Api from "../../../store/Api";
import AddAttributeValue from "./AddAttributeValue.vue";
import EditAttributeValue from "./editAttributeValue.vue";
export default {
  components: { dataTable, EditAttributeValue, AddAttributeValue },
  computed: {
    link() {
      return Api.attributeValue;
    },
    ...mapGetters("Attribute", ["attribute", "values"]),
  },
  data() {
    return {
      open: false,
      loading: false,
      editItem: null,
      columns: [
        { name: "value", dataProp: "value", type: "text" },

        { name: "create date", dataProp: "created_at", type: "date" },
      ],
      options: [
        {
          title: "edit attribute value",
          icon: "mdi-pencil-box-outline",
          type: "edit",
          color: "success",
        },
        {
          title: "remove attribute value",
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
    deleteItem(item) {
      this.$store.commit("Attribute/deleteValue", item);
    },
  },
  created() {
    this.$store.commit("DataTable/reset");
    this.$store.commit("Attribute/resetValues");
    this.loading = true;
    this.$store
      .dispatch("Attribute/getAttrValue", this.$route.params.id)
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style></style>
