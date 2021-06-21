<template>
  <div>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <!-- Option invite friends -->
      <v-col xs="12">
        <p>Inviter un ami</p>
        <v-text-field
            label="Pseudo de votre ami"
            outlined
            clearable
            v-model="friendUsername"
            :rules="pseudoRule"
            required
            id="friendEmail"
        ></v-text-field>
      </v-col>
      <v-btn
          :disabled="!valid"
          @click="invite"
          id="save"
          color="success"
      >Inviter
      </v-btn>
    </v-form>
    <!-- Error/Success message form-->
    <v-snackbar v-model="snackbar" :timeout="timeoutSnackbar" :color="colorMessage">
      {{ textMessageValidForm }}
      <template v-slot:action="{ attrs }">
        <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "InviteFriends",
  data() {
    return {
      textMessageValidForm: '',
      colorMessage: '',
      timeoutSnackbar: 3000,
      snackbar: false,
      valid: true,
      friendUsername: '',
      pseudoRule: [
        v => !!v || 'Pseudo obligatoire'
      ],
    }
  },
  methods: {
    invite() {
      console.log(this.friendUsername)
      axios
          .get('https://api.braquage-royale.xyz/users')
          .then((r) => {
            r.data.forEach(user => {
              if (user.player.username === this.friendUsername) {
                // axios
                //     .post('https://doc.braquage-royale.xyz/invite', {
                //
                //     })
                //     .then(() => {
                      this.snackbar = true
                      this.textMessageValidForm = 'Votre ami a été invité'
                      this.colorMessage = "green lighten-2";
                //     })
              } else {
                this.snackbar = true
                this.textMessageValidForm = 'Ce pseudo n\'existe pas...'
                this.colorMessage = "red lighten-2";
              }

            })
          })
    },
  }
}
</script>

<style scoped>

</style>
