<template>
  <v-bottom-sheet v-model="sheet" :inset="!this.$vuetify.breakpoint.smAndDown">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" rounded color="success" elevation="0"
        ><v-icon left>mdi-plus</v-icon> Add A New Category</v-btn
      >
    </template>
    <v-sheet class="text-center" min-height="120px">
      <v-card-text>
        <v-text-field
          outlined
          label="category name"
          v-model="form.name"
          :error-messages="serverErr['name']"
        ></v-text-field>
        <v-autocomplete
          :items="categories"
          v-model="form.parent_id"
          item-text="name"
          item-value="id"
          :error-messages="serverErr['parent_id']"
          clearable
          outlined
          label="parent category"
        ></v-autocomplete>
        <v-textarea
          outlined
          label="category description"
          v-model="form.description"
          :error-messages="serverErr['description']"
        ></v-textarea>
        <v-switch label="is featured ?" v-model="form.featured"></v-switch>
        <v-switch label="main menu ?" v-model="form.menu"></v-switch>
        <v-btn
          class="mt-3"
          color="primary"
          min-width="100px"
          :loading="loading"
          @click="Add()"
          >Add</v-btn
        >
      </v-card-text>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
export default {
  data: () => ({
    sheet: false,
    form: {
      name: "",
      description: "",
      featured: false,
      parent_id: null,
      menu: false,
    },
    serverErr: [],
    loading: false,
  }),
  computed: {
    categories() {
      return this.$store.getters["Category/categories"];
    },
  },
  created() {
    this.getCat();
  },
  methods: {
    getCat() {
      this.$store.dispatch("Category/getCats");
    },
    Add() {
      this.serverErr = [];
      this.loading = true;
      this.$store
        .dispatch("Category/add", this.form)
        .then((res) => {
          this.$store.commit("DataTable/add", res.data);
          this.form = {
            name: "",
            description: "",
            featured: false,
            parent_id: null,
            menu: 1,
          };
        })
        .catch((rej) => {
          if (rej.response.status == 422)
            this.serverErr = rej.response.data.errors;
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style></style>
