<template>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="sm4 md4"
  >
    <v-text-field
        v-model="pseudo"
        :rules="[v => !!v || 'Pseudo obligatoire']"
        label="Pseudo"
        required
    ></v-text-field>

    <v-text-field
        v-model="password"
        :rules="[v => !!v || 'Mot de passe obligatoired']"
        label="Mot de passe"
        required
    ></v-text-field>

    <v-btn
        color="success"
        class="mr-4"
        :disabled="!valid"
        @click="loginFirebase()"
    >
      Se connecter
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    password: '',
    pseudo: '',
    valid: true
  }),
  methods: {
    loginFirebase() {
      if (this.$refs.form.validate() === true) {
        // API
      } else {
        console.log('tg')
      }
    }
  }
}
</script>

<style scoped>

</style>
