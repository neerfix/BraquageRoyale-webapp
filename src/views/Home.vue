<template>
  <div class="home">
    <v-card
        class="mx-auto"
        max-width="400"
    >
      <v-img
          class="white--text align-end"
          height="200px"
          :src="bankImage"
      >
      </v-img>

      <v-card-title>Braquage Royal ! </v-card-title>
      <v-card-subtitle class="pb-0">Le nouveau battle royal inédit</v-card-subtitle>
      <br>
      <v-divider></v-divider>

      <v-card-text class="text--primary">
        <div>A jouer de 2 à 5.</div>
        <div>Le dernier qui a survécu, gagne ! C'est aussi simple.</div>
      </v-card-text>

      <v-card-actions>
        <v-btn
            color="primary"
            id="btn-game-login"
            v-if="!isConnected"
            @click="toLogin"
        >
          Connectez-vous
        </v-btn>

        <v-btn
            color="primary"
            id="btn-game"
            v-if="isConnected"
            @click="toGames"
        >
          Vos parties
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import bankImage from '@/assets/img/bank.png'
export default {
  name: 'Home',
  data() {
    return {
      bankImage: bankImage,
      isConnected: ''
    }
  },
  beforeMount() {
    this.isConnected = localStorage.getItem('isLogged')
  },
  mounted() {
    this.askNotificationPermission()
  },
  methods: {
    test() {
      console.log(window.getPath)

    },
    async askNotificationPermission(){
      if(!('Notification' in window)){
        return;
      }
      if(Notification.permission === "default"){

        const permission = await Notification.requestPermission();
        if(permission === "granted"){
          return new Notification('Braquage Royal!', {body: "C'est bon de vous revoir, allez les massacrer !", icon:'../assets/img/bank.png'})
        }

      }else if(Notification.permission === "granted"){
        return new Notification('Braquage Royal!', {body: "C'est bon de vous revoir, allez les massacrer !", icon:'./assets/img/braquageroyale.png'})
      }
    },
    toLogin() {
      this.$router.go(this.$router.push('/auth'))
    },
    toGames() {
      this.$router.go(this.$router.push('/dashboard'))
    },
  }
}
</script>

<style scoped>

#btn-game,
#btn-game-login {
  border: 2px solid black !important;
  border-right: 4px solid black !important;
  border-bottom: 4px solid black !important;
}
</style>
