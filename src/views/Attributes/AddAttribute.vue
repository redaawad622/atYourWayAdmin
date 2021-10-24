<template>
  <v-bottom-sheet
    @input="toggle"
    :value="value"
    :inset="!this.$vuetify.breakpoint.smAndDown"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" rounded color="success" elevation="0"
        ><v-icon left>mdi-plus</v-icon>
        {{ $vuetify.lang.t(`$vuetify.add a new attribute`) }}</v-btn
      >
    </template>
    <v-sheet min-height="120px" style="overflow: scroll">
      <v-card-title class="text-center text-capitalize">
        {{ $vuetify.lang.t(`$vuetify.add a new attribute`) }}</v-card-title
      >
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            outlined
            v-model="form.code"
            :label="$vuetify.lang.t(`$vuetify.attribute code`)"
            :error-messages="serverErr['code']"
            :rules="reqRules"
          ></v-text-field>
          <v-text-field
            outlined
            v-model="form.name"
            :error-messages="serverErr['name']"
            :label="$vuetify.lang.t(`$vuetify.attribute name`)"
            :rules="reqRules"
          ></v-text-field>
          <v-select
            outlined
            v-model="form.frontend_type"
            :error-messages="serverErr['frontend_type']"
            :label="$vuetify.lang.t(`$vuetify.attribute design type`)"
            :rules="reqRules"
            :items="designType"
          >
            <template v-slot:item="{item}">
              <v-list-item>
               
                <v-list-item-content>
                  <v-list-item-title> {{$vuetify.lang.t(`$vuetify.${item}`)}} </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mt-2"></v-divider>
            </template>
          </v-select>
          <v-checkbox
            v-model="form.is_filterable"
            :label="$vuetify.lang.t(`$vuetify.filterable`)"
          ></v-checkbox>
          <v-checkbox
            v-model="form.is_required"
            :label="$vuetify.lang.t(`$vuetify.required`)"
          ></v-checkbox>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          class="mt-3"
          color="primary"
          min-width="150px"
          :loading="loading"
          @click="Add()"
          >{{ $vuetify.lang.t(`$vuetify.add`) }}</v-btn
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
  name: "addAtrribute",
  props: ["value"],
  data() {
    return {
      valid: true,
      loading: false,
      form: {
        code: "",
        name: "",
        frontend_type: "select",
        is_filterable: false,
        is_required: false,
      },
      serverErr: [],
      reqRules: [
        (v) => !!v || this.$vuetify.lang.t(`$vuetify.input field is required`),
      ],
      designType: ["select", "radio"],
    };
  },
  methods: {
    toggle(val) {
      this.$emit("input", val);
    },
    validate() {
      return this.$refs.form.validate();
    },
    Add() {
      this.serverErr = [];
      if (this.validate()) {
        this.loading = true;

        this.$store
          .dispatch("Attribute/add", this.form)
          .then((res) => {
            this.$store.commit("DataTable/add", res.data);
            this.form = {
              code: "",
              name: "",
              frontend_type: "select",
              is_filterable: false,
              is_required: false,
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
