<template>
  <v-bottom-sheet
    @input="toggle"
    :value="value"
    :inset="!this.$vuetify.breakpoint.smAndDown"
    scrollable
  >
    <v-sheet min-height="120px" style="overflow: scroll">
      <v-card-title class="text-center text-capitalize">{{
        $vuetify.lang.t("$vuetify.edit attribute")
      }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            outlined
            type="number"
            v-model="form.price"
            :rules="isNumber"
            :label="$vuetify.lang.t('$vuetify.price')"
          ></v-text-field>
          <v-text-field
            outlined
            type="number"
            :rules="isNumber"
            v-model="form.quantity"
            :label="$vuetify.lang.t('$vuetify.quantity')"
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
          :disabled="!valid"
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
  name: "editAttributeValue",
  props: ["value", "item"],
  data() {
    return {
      valid: true,
      form: {
        price: 0,
        quantity: 0,
      },
      loading: false,
      isNumber: [
        (v) =>
          /^\s*(?=.*[0-9])\d*(?:\.\d{1,2})?\s*$/.test(v) ||
          this.$vuetify.lang.t(
            `$vuetify.number must be equal or greater than 0`
          ),
      ],
    };
  },

  methods: {
    toggle(val) {
      this.$emit("input", val);
    },
    validate() {
      this.$refs.form.validate();
    },
    Edit() {
      if (this.validate) {
        this.loading = true;
        this.$store
          .dispatch("Product/editProductAttribute", {
            form: this.form,
            id: this.item.id,
          })
          .then((res) => {
            this.$store.commit("Attribute/editProductAttribute", res.data);
            this.$toasted.success(
              this.$vuetify.lang.t("$vuetify.Edited successfully"),
              {
                duration: 3000,
              }
            );
          })
          .catch(() => {
            this.message = "The value has already been taken";
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
