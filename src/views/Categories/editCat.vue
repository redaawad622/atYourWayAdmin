<template>
  <v-bottom-sheet
    @input="toggle"
    :value="value"
    :inset="!this.$vuetify.breakpoint.smAndDown"
    scrollable
  >
    <v-sheet class="text-center" min-height="120px" style="overflow: auto;">
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
          clearable
          :error-messages="serverErr['parent_id']"
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
        <template v-if="form.featured">
          <div class="text-center mb-2">
            <img
              id="imgPreview3"
              height="180px"
              :src="$getUrl(form.image, 'imgPreview3')"
              alt="paste image url or choose image"
            />
          </div>
          <v-text-field
            outlined
            v-model="form.image"
            :error-messages="serverErr['image']"
            label="feature category image url"
            prepend-inner-icon="mdi-link"
          ></v-text-field>
          <v-file-input
            outlined
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick an image"
            prepend-inner-icon="mdi-camera"
            prepend-icon=""
            v-model="form.image"
            label="Pick an image"
          ></v-file-input>
        </template>
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
      parent_id: null,
      menu: false,
      image: "",
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
      this.form["_method"] = "put";
      this.$store
        .dispatch("Category/edit", {
          form: this.$objectToFormData(this.form),
          id: this.item.id,
        })
        .then((res) => {
          this.$store.commit("DataTable/edit", res.data);
          this.form = {
            name: "",
            description: "",
            featured: false,
            parent_id: 1,
            menu: 1,
            image: "",
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
