<template>
  <v-bottom-sheet
    @input="toggle"
    :value="value"
    :inset="!this.$vuetify.breakpoint.smAndDown"
    scrollable
  >
    <v-sheet min-height="120px" style="overflow: scroll">
      <v-card-title class="text-center text-capitalize">{{
        $vuetify.lang.t("$vuetify.edit order")
      }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-textarea
            outlined
            :label="$vuetify.lang.t('$vuetify.note')"
            :error-messages="serverErr['note']"
            v-model="form.note"
            auto-grow
          ></v-textarea>
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
          >{{ $vuetify.lang.t("$vuetify.edit") }}</v-btn
        >
        <v-btn
          class="mt-3"
          color="error"
          min-width="150px"
          @click="toggle(false)"
          >{{ $vuetify.lang.t("$vuetify.close") }}</v-btn
        >
      </v-card-actions>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: "editOffer",
  props: ["value", "item"],
  data: () => ({
    valid: true,
    dataImage: "",
    sheet: false,
    form: {
      note: "",
    },
    loading: false,
    serverErr: [],
  }),
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
          .dispatch("Order/edit", {
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
  },
};
</script>

<style></style>
