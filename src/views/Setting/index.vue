<template>
  <v-container fluid>
    <v-card-title class="text-capitalize">{{
      $vuetify.lang.t(`$vuetify.settings`)
    }}</v-card-title>
    <v-card class="defaultCard" elevation="0">
      <v-card-title>reset</v-card-title>

      <v-card-text>
        <v-btn
          @click="openConfirm()"
          :text="loading"
          color="red"
          :loading="loading"
        >
          {{ $vuetify.lang.t("$vuetify.reset all data") }}</v-btn
        >
        <v-btn
          @click="openConfirmGenerate()"
          :text="loading"
          color="red"
          :loading="loading"
          >{{ $vuetify.lang.t("$vuetify.generate fake data") }}</v-btn
        >
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    openConfirm() {
      this.$toasted.show(
        this.$vuetify.lang.t("$vuetify.are you sure you want to reset data ?"),
        {
          // pass the icon name as string
          position: "top-center",
          fullWidth: false,
          singleton: true,
          action: [
            {
              text: this.$vuetify.lang.t("$vuetify.Cancel"),
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
            {
              text: this.$vuetify.lang.t("$vuetify.Yes"),
              onClick: (e, toastObject) => {
                this.resetData();
                toastObject.goAway(0);
              },
            },
          ],
        }
      );
    },
    openConfirmGenerate() {
      this.$toasted.show(
        this.$vuetify.lang.t(
          "$vuetify.are you sure you want to generate fake data ?"
        ),
        {
          // pass the icon name as string
          position: "top-center",
          fullWidth: false,
          singleton: true,
          action: [
            {
              text: this.$vuetify.lang.t("$vuetify.Cancel"),
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
            {
              text: this.$vuetify.lang.t("$vuetify.Yes"),
              onClick: (e, toastObject) => {
                this.generateData();
                toastObject.goAway(0);
              },
            },
          ],
        }
      );
    },
    resetData() {
      this.loading = true;
      this.$store
        .dispatch("Setting/reset")
        .then(() => {
          this.$toasted.success(
            this.$vuetify.lang.t("$vuetify.reset data successfully"),
            {
              duration: 2000,
            }
          );
        })
        .finally(() => {
          this.loading = false;
        });
    },
    generateData() {
      this.loading = true;
      this.$store
        .dispatch("Setting/generate")
        .then(() => {
          this.$toasted.success(
            this.$vuetify.lang.t("$vuetify.generate data successfully"),
            {
              duration: 2000,
            }
          );
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style></style>
