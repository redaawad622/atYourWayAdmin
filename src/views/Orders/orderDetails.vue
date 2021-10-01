<template>
  <v-container fluid>
    <v-card-title v-if="order"
      >({{ order.user.name }}) Order details</v-card-title
    >
    <v-card class="defaultCard" elevation="0">
      <v-card-text>
        <data-table
          :link="link"
          :columns="columns"
          :pagination="false"
          :options="options"
          @edit="edit"
          :option="false"
          @delete="deleteItem"
          :values="details"
          v-if="order"
        ></data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import dataTable from "../../components/common/dataTable.vue";
import Api from "../../store/Api";

export default {
  components: { dataTable },
  computed: {
    link() {
      return Api.order;
    },
    ...mapGetters("Order", ["order", "details"]),
  },
  data() {
    return {
      columns: [
        { name: "Sku", dataProp: "sku", type: "link" ,to:'/products/' },
        { name: "Title", dataProp: "title", type: "text" },
        { name: "Quantity", dataProp: "quantity", type: "text" },
        { name: "details", dataProp: "details",objProp:'value', type: "arrayOfObject" },
      ],
      options: [],
    };
  },
  methods: {

  },
  created() {
    this.$store.commit("DataTable/reset");
    this.$store.dispatch("Order/getDetails", this.$route.params.id);
  },
};
</script>

<style></style>
