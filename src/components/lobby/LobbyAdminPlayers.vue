<template>
  <div class="lobby_admin_players">
    <v-col xs="12">
      <p>Salon de la partie : {{ nameGame }}</p>
      <p>Code d'invitation : {{ invitationCode }}</p>

      <v-btn @click="showAdminListPlayers">Liste des joueurs</v-btn>

      <!-- PLayers list-->
      <div v-if="showPlayersList" id="players_list" class="mb-12"><PlayersList/></div>
      <v-divider class="separator"></v-divider>


      <v-col xs="12" class="d-flex">
        <v-btn
            elevation="2"
            class="btn_actions"
            absolute
            bottom
            left
        >Supprimer</v-btn>
        <v-btn
            id="go"
            elevation="2"
            color="error"
            class="btn_actions"
            absolute
            bottom
            right
        >Lancer</v-btn>
      </v-col>
    </v-col>
  </div>
</template>

<script>
import PlayersList from "@/components/lobby/PlayersList";

export default {
  name: 'LobbyAdminPlayers',
  components: {
    PlayersList
  },
  data() {
    return{
      nameGame: 'Apex Legend (nom)',
      invitationCode: 'klnb54ef654za',
      showPlayersList: true,
      showOptions: false,
    }
  },
  methods: {
    showAdminListPlayers(){
      this.showPlayersList = true
      this.showOptions = false
    },
    showAdminOptions(){
      this.showPlayersList = false
      this.showOptions = true
    }
  }
}
</script>

<style scoped>
  #players_list{
    height: 40vh;
    overflow-y: scroll;
  }
  .separator{
    border-color: black !important;
    box-shadow: 1px 3px 8px black;
  }
  .btn_actions{
    border: 2px solid black !important;
    border-bottom: 4px solid black !important;
    border-right: 4px solid black !important;
    text-transform: initial;
  }
  #go{
    margin: auto;
    margin-right: 0;
    border: 2px solid black !important;
    border-bottom: 4px solid black !important;
    border-right: 4px solid black !important;
  }
</style>

