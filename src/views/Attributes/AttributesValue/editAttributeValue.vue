<template>
  <v-bottom-sheet
    @input="toggle"
    :value="value"
    :inset="!this.$vuetify.breakpoint.smAndDown"
    scrollable
  >
    <v-sheet min-height="120px" style="overflow: scroll">
      <v-card-title class="text-center">Edit Attribute</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            outlined
            v-model="form.value"
            label="value name"
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
          >Edit</v-btn
        >
        <v-btn
          class="mt-3"
          color="error"
          min-width="150px"
          @click="toggle(false)"
          >Close</v-btn
        >
      </v-card-actions>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: "editAttributeValue",
  props: ["value", "item"],
  data: () => ({
    valid: true,
    form: {
      value: "",
    },
    serverErr: [],
    reqRules: [(v) => !!v || "input is required"],
    loading: false,
  }),

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
          })
          .catch((rej) => {
            if (rej.response.status == 422)
              this.serverErr = rej.response.data.errors;
          })
          .finally(() => (this.loading = false));
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
