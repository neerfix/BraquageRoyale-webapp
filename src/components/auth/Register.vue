<template>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="sm4 md4"
  >
    <h1>Inscription à Braquage royal!</h1>
    <v-divider></v-divider>
    <br>
    <v-text-field
        v-model="firstName"
        :rules="[v => !!v || 'Prénom obligatoire']"
        label="Prénom"
        required
        placeholder="Votre prénom"
        outlined
        clearable
    ></v-text-field>

    <v-text-field
        v-model="lastName"
        :rules="[v => !!v || 'Nom obligatoire']"
        label="Nom"
        required
        placeholder="Votre nom"
        outlined
        clearable
    >
    </v-text-field>
    <v-text-field
        v-model="email"
        :rules="[v => !!v || 'E-mail obligatoire'] && emailRules"
        label="E-mail"
        required
        placeholder="Votre e-mail"
        outlined
        clearable
    >
    </v-text-field>
    <v-text-field
        v-model="pseudo"
        :rules="[v => !!v || 'Pseudo obligatoire']"
        label="Pseudo"
        required
        placeholder="Votre pseudo"
        outlined
        clearable
    ></v-text-field>

    <v-text-field
        v-model="password"
        :rules="[v => !!v || 'Obligatoire']"
        label="Mot de passe (minimum 6 caractères)"
        required
        type="password"
        placeholder="Votre mot de passe"
        outlined
        clearable
    ></v-text-field>

    <v-text-field
        v-model="confirmPassword"
        :rules="[v => !!v || 'Obligatoire']"
        label="Confirmer mot de passe"
        required
        type="password"
        placeholder="Confirmer votre mot de passe"
        outlined
        clearable
    ></v-text-field>

    <v-text-field
        v-model="dob"
        :rules="[v => !!v || 'Obligatoire']"
        type="date"
        label="Date de naissance"
        outlined
        clearable
        required
        placeholder="votre date de naissance"
    >
    </v-text-field>

    <v-btn
        id="btn-game"
        color="success"
        class="mr-4"
        :disabled="!valid"
        @click="register()"
    >
      S'inscrire
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
import axios from "axios";
import {db} from "@/main"

export default {
  name: "Register",
  data: () => ({
    pseudo: '',
    loader: false,
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    confirmPassword: '',
    valid: false,
    dob: '',
    emailRules: [
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail non valide'
    ],
    snackbar: false,
    message: '',
  }),
  computed: {
    isFormValid: function () {
      if (this.password !== this.confirmPassword) {
        return console.log('error')
      }
      return this.email !== ''
          && this.password !== ''
          && this.pseudo !== ''
          && this.lastName !== ''
          && this.firstName !== ''
          && this.confirmPassword !== ''
          && this.dob !== ''
    },
  },
  methods: {
    register: function () {
      this.loader = true;
      const url = 'https://api.braquage-royale.xyz/users'
      const body = {
        password: this.password,
        firstname: this.firstName,
        lastname: this.lastName,
        email: this.email,
        player: {
          username: this.pseudo
        },
        date: {
          date_of_birth: this.dob
        }
      }
      if (this.isFormValid) {
        if (this.password.length < 6) {
          this.loader = false;
          this.snackbar = true;
          this.message = "Il doit y avoir au minimum 6 caractère dans votre mot de passe"
        } else {
          axios({
            method: 'post',
            url: url,
            data: body
          }).then(() => {
            console.log('ok')
            db.auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then((resp) => {
                  if (resp.user !== undefined) {
                    console.log(resp.user)
                    localStorage.setItem('idUser', resp.user.uid)
                    localStorage.setItem("isLogged", 'true');
                    this.$router.go(this.$router.push('/'))
                  }
                })
          })
              .catch(() => {
                this.loader = false;
                this.snackbar = true;
                this.message = "Une erreur est survenue."
              })
        }
      } else {
        this.loader = false;
        this.snackbar = true;
        this.message = "Mots de passe non identiques ou remplir tous les champs svp"
      }
    }
  }
}
</script>

<style scoped>
#btn-game {
  border: 2px solid black !important;
  border-right: 4px solid black !important;
  border-bottom: 4px solid black !important;
}
</style>
