<template>
  <v-card-text>
    <v-form ref="addOptionForm" lazy-validation>
      <v-text-field
        outlined
        v-model="form.name"
        :label="$vuetify.lang.t('$vuetify.option title')"
        :error-messages="serverErr['name']"
        :rules="reqRules"
      ></v-text-field>
      <v-text-field
        outlined
        v-model="form.value"
        :label="$vuetify.lang.t('$vuetify.option value')"
      ></v-text-field>
      <v-btn color="primary" @click="AddProductOption">
        {{ $vuetify.lang.t("$vuetify.add") }}</v-btn
      >
    </v-form>
    <v-card-title class="text-capitalize"> 
      {{ $vuetify.lang.t("$vuetify.product options and values") }}</v-card-title
    >
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
      reqRules: [
        (v) => !!v || this.$vuetify.lang.t(`$vuetify.input field is required`),
      ],
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
        { name: "option title", dataProp: "name", type: "text" },
        { name: "option value", dataProp: "value", type: "text" },
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
      if (this.$refs.addOptionForm.validate()) {
        this.loadingAdd = true;
        this.serverErr = [];
        this.$store
          .dispatch("Product/AddProductOption", this.form)
          .then(() => {
            this.form = {
              name: "",
              value: "",
            };
            this.$toasted.success(
              this.$vuetify.lang.t("$vuetify.Added successfully"),
              {
                duration: 3000,
              }
            );
          })
          .catch((rej) => {
            if (rej.response.status == 422)
              this.serverErr = rej.response.data.errors;

            this.$toasted.error(
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
};
</script>

<style></style>
