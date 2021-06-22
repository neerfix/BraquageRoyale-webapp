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
    }
  },
  methods: {
    invite() {
      axios
          .get('https://api.braquage-royale.xyz/users')
          .then((r) => {
            r.data.forEach(user => {
              if (user.player.username === this.friendUsername) {
                axios
                  .post('https://api.braquage-royale.xyz/invite', {
                    gameId: this.$store.state.game.id,
                    userId: user.id,
                    username: this.friendUsername
                  })
                  .then(() => {
                    this.snackbar = true
                    this.textMessageValidForm = 'Votre ami a été invité'
                    this.colorMessage = "green lighten-2";
                    this.friendUsername = '';
                  })
              }
            })
          })
    },
  }
}
</script>

<style scoped>

</style>
