<template>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="sm4 md4"
  >
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

<!--    <v-menu-->

<!--        v-model="fromDateMenu"-->
<!--        :close-on-content-click="false"-->
<!--        :nudge-right="40"-->
<!--        transition="scale-transition"-->
<!--        offset-y-->
<!--        max-width="290px"-->
<!--        min-width="290px"-->
<!--    >-->
<!--      <template v-slot:activator="{ on }">-->
<!--        <v-text-field-->
<!--            label="Date de naissance"-->
<!--            readonly-->
<!--            :rules="[v => !!v || 'Date de naissance obligatoire']"-->
<!--            :value="fromDateVal"-->
<!--            v-on="on"-->
<!--            outlined-->
<!--            clearable-->
<!--            required-->
<!--        ></v-text-field>-->
<!--      </template>-->
<!--      <v-date-picker-->
<!--          locale="en-in"-->
<!--          v-model="fromDateVal"-->
<!--          no-title-->
<!--          @input="fromDateMenu = false"-->
<!--      ></v-date-picker>-->
<!--    </v-menu>-->

    <v-btn
        color="success"
        class="mr-4"
        :disabled="!valid"
        @click="register()"
    >
      S'inscrire
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
import axios from "axios";
import { db } from "@/main"

export default {
  name: "Register",
  data: () => ({
    pseudo: '',
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
      if (this.isFormValid) {
        console.log(this.dob)
        db.auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then((userCredential) => {
              const url = 'https://api.braquage-royale.xyz/users'
              const body = {
                id: userCredential.user.uid,
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                player: {
                  username: this.pseudo
                },
                date: {
                  date_of_birth: this.dob
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
              }).catch(e => {
                console.log(e.response)
              })
            })
            .catch((error) => {
              console.error(error)
            })
      } else {
        this.snackbar = true;
        this.message = "Mots de passe non identiques ou remplir tous les champs svp"
      }
    }
  }
}
</script>

<style scoped>

</style>
