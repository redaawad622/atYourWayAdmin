<template>
  <v-bottom-sheet
    v-model="sheet"
    :inset="!this.$vuetify.breakpoint.smAndDown"
    scrollable
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" rounded color="success" elevation="0"
        ><v-icon left>mdi-plus</v-icon>
        {{ $vuetify.lang.t(`$vuetify.add a new category`) }}
      </v-btn>
    </template>
    <v-sheet class="text-center" min-height="120px">
      <v-card-text>
        <v-text-field
          outlined
          :label="$vuetify.lang.t(`$vuetify.category name`)"
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
          :label="$vuetify.lang.t(`$vuetify.parent category`)"
        ></v-autocomplete>
        <v-textarea
          outlined
          :label="$vuetify.lang.t(`$vuetify.category description`)"
          v-model="form.description"
          :error-messages="serverErr['description']"
        ></v-textarea>

        <v-switch
          :label="$vuetify.lang.t(`$vuetify.is featured ?`)"
          v-model="form.featured"
        ></v-switch>
        <template v-if="form.featured">
          <div class="text-center mb-2">
            <img
              id="imgPreview3"
              height="180px"
              :src="$getUrl(form.url, 'imgPreview3')"
              :alt="$vuetify.lang.t(`$vuetify.paste image url or choose image`)"
            />
          </div>
          <v-text-field
            outlined
            v-model="form.url"
            :error-messages="serverErr['url']"
            :label="$vuetify.lang.t(`$vuetify.feature category image url`)"
            prepend-inner-icon="mdi-link"
          ></v-text-field>
          <v-file-input
            outlined
            accept="image/png, image/jpeg, image/bmp"
            prepend-inner-icon="mdi-camera"
            prepend-icon=""
            v-model="form.url"
            :label="$vuetify.lang.t(`$vuetify.Pick an image`)"
            :placeholder="$vuetify.lang.t(`$vuetify.Pick an image`)"
          ></v-file-input>
        </template>
        <v-switch
          :label="$vuetify.lang.t(`$vuetify.main menu ?`)"
          v-model="form.menu"
        ></v-switch>
        <v-btn
          class="mt-3"
          color="primary"
          min-width="100px"
          :loading="loading"
          @click="Add()"
          >{{ $vuetify.lang.t(`$vuetify.add`) }}</v-btn
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
      url: "",
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
        .dispatch("Category/add", this.$objectToFormData(this.form))
        .then((res) => {
          this.$store.commit("DataTable/add", res.data);
          this.form = {
            name: "",
            description: "",
            featured: false,
            parent_id: null,
            url: "",
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
