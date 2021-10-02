<template>
  <v-container fluid>
    <v-card-title>Settings</v-card-title>

    <v-card class="defaultCard" elevation="0">
      <v-card-title>reset</v-card-title>

      <v-card-text>
        <v-btn @click="openConfirm()"  :text='loading' color="red" :loading='loading'>Reset all data</v-btn>
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
      this.$toasted.show("are you sure you want to reset data ?", {
        // pass the icon name as string
        position: "top-center",
        fullWidth: false,
        singleton: true,
        action: [
          {
            text: "Cancel",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
          {
            text: "Yes",
            onClick: (e, toastObject) => {
              this.resetData();
              toastObject.goAway(0);
            },
          },
        ],
      });
    },
    resetData() {
      this.loading = true;
      this.$store
        .dispatch("Setting/reset")
        .then(() => {
          this.$toasted.success("reset data successfully", {
            duration: 2000,
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style></style>
