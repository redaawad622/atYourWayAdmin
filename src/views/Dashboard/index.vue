<template>
  <v-container fluid>
    <todo></todo>
    <iframe src="https://accept.paymob.com/api/acceptance/iframes/309629?payment_token={payment_key_obtained_previously}"></iframe>
  </v-container>
</template>

<script>
import todo from "../../components/dashboard/todo.vue";
export default {
  components: { todo },
};
</script>

<style></style>
