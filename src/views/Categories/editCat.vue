<template>
  <v-bottom-sheet
    @input="toggle"
    :value="value"
    :inset="!this.$vuetify.breakpoint.smAndDown"
  >
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
          v-model="form.parent"
          item-text="name"
          item-value="name"
          clearable
          :error-messages="serverErr['parent']"
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
          @click="Edit()"
          >Edit</v-btn
        >
      </v-card-text>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
export default {
  props: ["value", "item"],
  data: () => ({
    sheet: false,
    form: {
      name: "",
      description: "",
      featured: false,
      parent: null,
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
  
  methods: {
    toggle(val) {
      this.$emit("input", val);
    },
    Edit() {
      this.serverErr = [];
      this.loading = true;
      this.$store
        .dispatch("Category/edit", { form: this.form, id: this.item.id })
        .then((res) => {
          this.$store.commit("DataTable/edit", res.data);
          this.form = {
            name: "",
            description: "",
            featured: false,
            parent: null,
            menu: 1,
          };
          this.toggle(false);
        })
        .catch((rej) => {
          if (rej.response.status == 422)
            this.serverErr = rej.response.data.errors;
        })
        .finally(() => (this.loading = false));
    },
  },
  watch: {
    item(val) {
      if (val) {
        this.form = val;
      }
    },
  },
};
</script>

<style></style>
