<template>
  <v-bottom-sheet
    @input="toggle"
    :value="value"
    :inset="!this.$vuetify.breakpoint.smAndDown"
    scrollable
  >
    <v-sheet min-height="120px" style="overflow: scroll">
      <v-card-title class="text-center text-capitalize">
        {{ $vuetify.lang.t(`$vuetify.edit value`) }}</v-card-title
      >
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            outlined
            v-model="form.value"
            :label="$vuetify.lang.t(`$vuetify.value name`)"
            :error-messages="serverErr['value']"
            :rules="reqRules"
            @focus="serverErr = []"
          ></v-text-field>
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
  name: "editAttributeValue",
  props: ["value", "item"],
  data() {
    return {
      valid: true,
      form: {
        value: "",
      },
      serverErr: [],
      reqRules: [
        (v) => !!v || this.$vuetify.lang.t(`$vuetify.input field is required`),
      ],
      loading: false,
    };
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
      if (this.validate()) {
        this.loading = true;

        this.$store
          .dispatch("Attribute/editValue", {
            form: this.form,
            id: this.item.id,
          })
          .then((res) => {
            this.$store.commit("Attribute/editValue", res.data);
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
