<template>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="sm4 md4"

  >
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
import axios from 'axios'
import { db } from '@/main'

export default {
  name: "Login",
  data: () => ({
    password: '',
    email: '',
    valid: true,
    emailRules: [
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail non valide'
    ],
    snackbar: false,
    message: '',
  }),
  computed: {
    isFormValid: function () {
      return this.email !== '' && this.password !== ''
    }
  },
  methods: {
    loginFirebase: function () {
      if (this.isFormValid) {
        db.auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then((userCredential) => {
              const url = 'https://api.braquage-royale.xyz/users'
              const body = {
                id: userCredential.user.uid,
                email: userCredential.user.email,
                date: {
                  createdAt: userCredential.user.metadata.creationTime,
                  updateAt: userCredential.user.metadata.lastSignInTime,
                  lastSignInTime: userCredential.user.metadata.lastSignInTime
                }
              }
              axios({
                method: 'post',
                url: url,
                data: body
              }).then(r => {
                console.log(r)
                this.$router.push('/')
                this.$store.state.user.loggedIn = true;
              })
            })
            .catch((error) => {
              console.error(error)
            })
      } else {
        this.snackbar = true
        this.message = 'Veuillez remplir les champs ci-dessus'
      }
    }
  }
}
</script>

<style scoped>

</style>
