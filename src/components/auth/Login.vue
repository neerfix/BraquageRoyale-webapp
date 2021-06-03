<template>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="sm4 md4"

  >
    <h1>Connexion à Braquage royal!</h1>
    <v-divider></v-divider>
    <br>
    <v-text-field
        v-model="email"
        :rules="[v => !!v || 'E-mail obligatoire'] || emailRules"
        label="E-mail"
        placeholder="Votre e-mail"
        required
        outlined
        clearable
    ></v-text-field>

    <v-text-field
        v-model="password"
        placeholder="Votre mot de passe"
        :rules="[v => !!v || 'Mot de passe obligatoire']"
        label="Mot de passe"
        type="password"
        required
        outlined
        clearable
    ></v-text-field>

    <v-btn
        color="success"
        class="mr-4"
        :disabled="!valid"
        @click="loginFirebase()"
    >
      Se connecter
    </v-btn>

    <v-progress-circular
        v-if="loader"
        indeterminate
        color="primary"
        :width="5"
    ></v-progress-circular>

    <v-snackbar
        v-model="snackbar"
    >
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="red"
            v-bind="attrs"
            @click="snackbar = false"
        >
          X
        </v-btn>
      </template>
    </v-snackbar>
  </v-form>
</template>

<script>
import { db } from '@/main'

export default {
  name: "Login",
  data: () => ({
    password: '',
    email: '',
    valid: true,
    loader: false,
    snackbar: false,
    message: '',
    emailRules: [
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail non valide'
    ],
  }),
  computed: {
    isFormValid: function () {
      return this.email !== '' && this.password !== ''
    },
  },
  methods: {
    loginFirebase: function () {
      if (this.isFormValid) {
        this.loader = true;
        db.auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then((resp) => {
              if (resp.user !== undefined ) {
                localStorage.setItem("isLogged", 'true');
                this.loader = false;
                this.$router.go(this.$router.push('/'))
              }
            })
            .catch(() => {
              this.loader = false;
              this.snackbar = true
              this.message = 'Erreur, veuillez ressaisir vos identifiants. :( '
            })
      } else {
        this.loader = false;
        this.snackbar = true
        this.message = 'Veuillez remplir les champs ci-dessus'
      }
    }
  }
}
</script>

<style scoped>

</style>
