<template>
  <v-container fluid>
    <v-card-title class="text-capitalize" v-if="country">{{
      $vuetify.lang.t(`$vuetify.country states`, country.name)
    }}</v-card-title>
    <v-card class="defaultCard" elevation="0" :loading="loading">
      <v-card-text>
        <div class="d-flex justify-space-between">
          <v-spacer></v-spacer><add-state :country="country"></add-state>
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
    <edit-state v-model="open" :item="editItem"></edit-state>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import dataTable from "../../../components/common/dataTable.vue";
import Api from "../../../store/Api";
import AddState from "./AddState.vue";
import EditState from "./editState.vue";
export default {
  components: { dataTable, AddState, EditState },
  computed: {
    link() {
      return Api.state;
    },

    ...mapGetters("Country", ["country", "values"]),
  },
  data() {
    return {
      open: false,
      loading: false,
      editItem: null,
      columns: [
        { name: "name", dataProp: "name", type: "text" },
        { name: "create date", dataProp: "created_at", type: "date" },
      ],
      options: [
        {
          title: "edit state name",
          icon: "mdi-pencil-box-outline",
          type: "edit",
          color: "success",
        },
        {
          title: "remove state",
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
      this.$store.commit("Country/deleteValue", item);
    },
  },
  created() {
    this.$store.commit("DataTable/reset");
    this.$store.commit("Country/resetValues");
    this.loading = true;
    this.$store
      .dispatch("Country/getCountry", this.$route.params.id)
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>
