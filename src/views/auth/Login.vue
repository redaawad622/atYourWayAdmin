<template>
  <v-row justify="center" class="height-100" align="center">
    <template>
      <v-card class="defaultCard" elevation="0" max-width="540">
        <v-img
          class="white--text"
          height="130px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title>Welcome Back!</v-card-title>
          <v-card-subtitle>Sign in to continue</v-card-subtitle>
        </v-img>

        <v-card-text class="text--primary">
          <v-avatar size="72" color="#eff2f7" style="margin-top: -50px"
            ><v-icon color="icon">mdi-account-outline</v-icon></v-avatar
          >
          <v-form class="mt-4 px-5" @submit="login()">
            <v-text-field
              v-model="form.email"
              label="Your Email"
              type="email"
              placeholder="enter email"
              hint="For example, example@gmail.com"
              outlined
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              :error-messages="message"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              label="Password"
              placeholder="enter password"
              counter
              outlined
              @click:append="show1 = !show1"
            ></v-text-field>
            <v-checkbox
              v-model="form.remember"
              label="Remember me"
              class="mt-0"
              hide-details=""
              color="primary"
            ></v-checkbox>
            <v-btn class="mt-3" color="primary" @click="login()" block
              >Login</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </template>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    message: "",
    form: {
      email: "",
      password: "",
      store_id:'1',
      remember: true,
    },
    show1: false,

    password: "Password",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 6 || "Min 6 characters",
   
    },
  }),
  methods: {
    async login() {
      this.message = "";
      await this.$axios.get("/sanctum/csrf-cookie");
      this.$store.dispatch("Auth/login", this.form).catch(() => {
        this.message = "The email and password you entered don't match";
      });
    },
  },
};
</script>

<style></style>
