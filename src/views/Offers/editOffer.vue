<template>
  <v-bottom-sheet
    @input="toggle"
    :value="value"
    :inset="!this.$vuetify.breakpoint.smAndDown"
    scrollable
  >
    <v-sheet min-height="120px" style="overflow: scroll">
      <v-card-title class="text-center text-capitalize">
        {{ $vuetify.lang.t(`$vuetify.edit offer`) }}</v-card-title
      >
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <div class="text-center mb-2">
            <img
              id="imgPreview"
              height="180px"
              :src="$getUrl(form.url, 'imgPreview')"
              :alt="$vuetify.lang.t(`$vuetify.paste image url or choose image`)"
            />
          </div>
          <v-text-field
            outlined
            v-model="form.url"
            :error-messages="serverErr['url']"
            prepend-inner-icon="mdi-link"
            :label="$vuetify.lang.t(`$vuetify.image url`)"
          ></v-text-field>
          <v-file-input
            outlined
            accept="image/png, image/jpeg, image/bmp"
            :placeholder="$vuetify.lang.t(`$vuetify.Pick an image`)"
            :label="$vuetify.lang.t(`$vuetify.Pick an image`)"
            prepend-icon="mdi-camera"
            prepend-inner-icon="mdi-camera"
            v-model="form.url"
          ></v-file-input>
          <v-text-field
            outlined
            v-model="form.title"
            :error-messages="serverErr['title']"
            :label="$vuetify.lang.t(`$vuetify.title`)"
          ></v-text-field>
          <v-text-field
            outlined
            v-model="form.legend"
            :error-messages="serverErr['legend']"
            :label="$vuetify.lang.t(`$vuetify.legend`)"
          ></v-text-field>
          <v-textarea
            outlined
            :label="$vuetify.lang.t(`$vuetify.description`)"
            :error-messages="serverErr['description']"
            :hide-details="!serverErr['description']"
            v-model="form.description"
            auto-grow
          ></v-textarea>
          <v-switch
            :label="$vuetify.lang.t(`$vuetify.active`)"
            v-model="form.availablity"
          ></v-switch>
          <v-switch
            :label="$vuetify.lang.t(`$vuetify.right text`)"
            v-model="form.isRight"
          ></v-switch>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          class="mt-3"
          color="primary"
          min-width="150px"
          :loading="loading"
          @click="Edit()"
          >{{ $vuetify.lang.t(`$vuetify.edit`) }}</v-btn
        >
        <v-btn
          class="mt-3"
          color="error"
          min-width="150px"
          @click="toggle(false)"
          >{{ $vuetify.lang.t(`$vuetify.close`) }}</v-btn
        >
      </v-card-actions>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: "editOffer",
  props: ["value", "item"],
  data() {
    return {
      valid: true,
      dataImage: "",
      sheet: false,
      form: {
        url: "",
        dexcription: "",
        availablity: true,
        isRight: false,
        title: "",
        legend: "",
      },
      loading: false,
      serverErr: [],
    };
  },
  computed: {
    image() {
      return this.form.url;
    },
  },
  methods: {
    toggle(val) {
      this.$emit("input", val);
    },
    validate() {
      return this.$refs.form.validate();
    },

    Edit() {
      this.serverErr = [];
      this.loading = true;
      this.form["_method"] = "put";
      if (this.validate()) {
        this.$store
          .dispatch("Offer/edit", {
            form: this.$objectToFormData(this.form),
            id: this.item.id,
          })
          .then((res) => {
            this.$store.commit("DataTable/edit", res.data);
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

            this.$toasted.error(
              this.$vuetify.lang.t("$vuetify.Failed to edit"),
              {
                duration: 3000,
              }
            );
          })
          .finally(() => (this.loading = false));
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
  watch: {
    item(val) {
      if (val) {
        this.form = val;
      }
    },
    image(input) {
      if (input && input instanceof File) {
        var reader = new FileReader();
        reader.onload = function () {
          var dataURL = reader.result;
          document.getElementById("imgPreview").src = dataURL;
        };
        reader.readAsDataURL(input);
      }
    },
  },
};
</script>

<style></style>
