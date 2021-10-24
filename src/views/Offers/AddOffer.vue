<template>
  <v-bottom-sheet
    v-model="sheet"
    :inset="!this.$vuetify.breakpoint.smAndDown"
    scrollable
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" rounded color="success" elevation="0"
        ><v-icon left>mdi-plus</v-icon>
        {{ $vuetify.lang.t(`$vuetify.add a new offer`) }}
      </v-btn>
    </template>
    <v-sheet min-height="120px" style="overflow: scroll">
      <v-card-title class="text-center text-capitalize">{{
        $vuetify.lang.t(`$vuetify.add offer`)
      }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <div class="text-center mb-2">
            <img
              id="imgPreview2"
              height="180px"
              :src="$getUrl(form.url, 'imgPreview2')"
              :alt="$vuetify.lang.t(`$vuetify.paste image url or choose image`)"
            />
          </div>
          <v-text-field
            outlined
            v-model="form.url"
            :error-messages="serverErr['url']"
            :label="$vuetify.lang.t(`$vuetify.image url`)"
            prepend-inner-icon="mdi-link"
            v-if="
              typeof form.url == 'string' || form.url == null || form.url == ''
            "
          ></v-text-field>
          <v-file-input
            outlined
            accept="image/png, image/jpeg, image/bmp"
            :placeholder="$vuetify.lang.t(`$vuetify.Pick an image`)"
            :label="$vuetify.lang.t(`$vuetify.Pick an image`)"
            prepend-inner-icon="mdi-camera"
            prepend-icon=""
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
            hide-details
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
          :disabled="!valid"
          @click="Add()"
          >{{ $vuetify.lang.t(`$vuetify.add`) }}</v-btn
        >
        <v-btn
          class="mt-3"
          color="error"
          min-width="150px"
          @click="sheet = false"
          >{{ $vuetify.lang.t(`$vuetify.close`) }}</v-btn
        >
      </v-card-actions>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: "addOffer",
  data: () => ({
    sheet: false,
    valid: true,
    form: {
      url: "",
      title: "",
      legend: "",
      dexcription: "",
      isRight: false,
      availablity: true,
    },
    loading: false,
    serverErr: [],
  }),
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    Add() {
      this.serverErr = [];
      this.loading = true;
      if (this.validate()) {
        this.$store
          .dispatch("Offer/add", this.$objectToFormData(this.form))
          .then((res) => {
            this.$store.commit("DataTable/add", res.data);
            this.form = {
              url: "",
              title: "",
              legend: "",
              dexcription: "",
              availablity: true,
              isRight: false,
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
};
</script>

<style></style>
