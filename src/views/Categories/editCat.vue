<template>
  <v-bottom-sheet
    @input="toggle"
    :value="value"
    :inset="!this.$vuetify.breakpoint.smAndDown"
    scrollable
  >
    <v-sheet class="text-center" min-height="120px" style="overflow: auto">
      <v-card-text>
        <v-text-field
          outlined
          :label="$vuetify.lang.t(`$vuetify.category name`)"
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
              :src="$getUrl(form.image, 'imgPreview3')"
              :alt="$vuetify.lang.t(`$vuetify.paste image url or choose image`)"
            />
          </div>
          <v-text-field
            outlined
            v-model="form.image"
            :error-messages="serverErr['image']"
            :label="$vuetify.lang.t(`$vuetify.feature category image url`)"
            prepend-inner-icon="mdi-link"
          ></v-text-field>
          <v-file-input
            outlined
            accept="image/png, image/jpeg, image/bmp"
            prepend-inner-icon="mdi-camera"
            prepend-icon=""
            v-model="form.image"
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
          @click="Edit()"
          >{{ $vuetify.lang.t(`$vuetify.edit`) }}</v-btn
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
            parent: null,
            menu: 1,
            image: "",
          };
          this.toggle(false);
          this.$toasted.success(
            this.$vuetify.lang.t("$vuetify.Edited successfully"),
            {
              duration: 3000,
            }
          );
        })
        .catch((rej) => {
          if (rej.response.status == 422)
            this.serverErr = rej.response.data.errors;

          this.$toasted.error(this.$vuetify.lang.t("$vuetify.Failed to edit"), {
            duration: 3000,
          });
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
