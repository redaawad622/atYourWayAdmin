<template>
  <v-bottom-sheet
    @input="toggle"
    :value="value"
    :inset="!this.$vuetify.breakpoint.smAndDown"
    scrollable
  >
    <v-sheet min-height="120px" style="overflow: scroll">
      <v-card-title class="text-center text-capitalize">
        {{ $vuetify.lang.t(`$vuetify.edit state`) }}</v-card-title
      >
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-combobox
            outlined
            v-model="form.name"
            :items="states"
            item-text="name"
            item-value="name"
            :return-object="false"
            :error-messages="serverErr['name']"
            :label="$vuetify.lang.t(`$vuetify.state name`)"
          ></v-combobox>
          <v-text-field
            outlined
            :label="$vuetify.lang.t(`$vuetify.shipping price`)"
            v-model="form.shippingPrice"
            :error-messages="serverErr['shippingPrice']"
            type="number"
            :rules="isNumber"
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
  name: "editState",
  props: ["value", "item"],
  data() {
    return {
      valid: true,
      sheet: false,
      form: {
        name: "",
        shippingPrice: 1,
      },
      loading: false,
      serverErr: [],
      isNumber: [
        (v) =>
          /^\s*(?=.*[0-9])\d*(?:\.\d{1,2})?\s*$/.test(v) ||
          this.$vuetify.lang.t(
            `$vuetify.number must be equal or greater than 0`
          ),
      ],
    };
  },
  computed: {
    states: {
      get() {
        return this.$store.getters["Country/states"];
      },
      set(val) {
        this.$store.commit("Country/setStates", val);
      },
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
          .dispatch("Country/editState", {
            form: this.form,
            id: this.item.id,
          })
          .then((res) => {
            this.$store.commit("Country/editValue", res.data);
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
