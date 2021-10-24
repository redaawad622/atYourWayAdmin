<template>
  <v-bottom-sheet
    @input="toggle"
    :value="value"
    :inset="!this.$vuetify.breakpoint.smAndDown"
    scrollable
  >
    <v-sheet min-height="120px" style="overflow: scroll">
      <v-card-title class="text-center text-capitalize">{{
        $vuetify.lang.t(`$vuetify.edit attribute`)
      }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            outlined
            v-model="form.code"
            :error-messages="serverErr['code']"
            :label="$vuetify.lang.t(`$vuetify.attribute code`)"
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
            :label="$vuetify.lang.t(`$vuetify.attribute design type`)"
            :rules="reqRules"
            :items="designType"
          >
            <template v-slot:item="{ item }">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $vuetify.lang.t(`$vuetify.${item}`) }}
                  </v-list-item-title>
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
  name: "editAttribute",
  props: ["value", "item"],
  data() {
    return {
      valid: true,
      dataImage: "",
      form: {
        code: "",
        name: "",
        frontend_type: "select",
        is_filterable: false,
        is_required: false,
      },
      loading: false,
      designType: ["select", "radio"],
      serverErr: [],
      reqRules: [
        (v) => !!v || this.$vuetify.lang.t(`$vuetify.input field is required`),
      ],
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
      if (this.validate()) {
        this.loading = true;
        this.$store
          .dispatch("Attribute/edit", {
            form: this.form,
            id: this.item.id,
          })
          .then((res) => {
            this.$store.commit("DataTable/edit", res.data);
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
