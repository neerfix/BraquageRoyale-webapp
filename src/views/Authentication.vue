<template>
  <div>
    <Login v-if="!isRegister"></Login>
    <Register v-if="isRegister"></Register>
    <p v-if="!isRegister" class="mt-5">Pas de compte ? <v-btn  color="primary" small class="ml-1" text   @click="register()">Inscrivez vous !</v-btn></p>
    <p v-if="isRegister" class="mt-5">Déja un compte ? <v-btn color="primary" small class="ml-1" text @click="login()">Connectez-vous !</v-btn></p>
  </div>
</template>

<script>
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";

export default {
  name: "Auth",
  components: {
    Login,
    Register
  },
  data: () => ({
    isRegister: false
  }),
  beforeMount() {
    if (localStorage.getItem('isLogged') === "true") {
      this.$router.push('/');
    }
  },
  methods: {
    register () {
      this.isRegister = true;
    },
    login () {
      this.isRegister = false;
    }
  }
}
</script>

<style scoped>

</style>
