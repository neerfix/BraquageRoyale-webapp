<template>
  <div class="lobby_admin_players">
    <v-col xs="12">
      <p>Salon de la partie : {{ this.$store.state.game.name }}</p>
<!--      <p>Code d'invitation : {{ invitationCode }}</p>-->

      <v-btn class="btn_choice" :class="{is_active: showPlayersList === true}" @click="showAdminListPlayers">Liste des joueurs</v-btn>
      <v-btn class="btn_choice" :class="{is_active: showOptions === true}" @click="showAdminOptions">Options</v-btn>
      <v-btn class="btn_choice" :class="{is_active: showInvite === true}" @click="showInviteFriends">Inviter</v-btn>

      <!-- PLayers list -->
      <div v-if="showPlayersList" id="players_list" class="mb-12"><PlayersList/></div>
      <!-- Options admin -->
      <div v-if="showOptions" id="options_admin" class="mb-12"><OptionsAdmin/></div>
      <!-- Options invite  -->
      <div v-if="showInvite" id="invite" class="mb-12"><InviteFriends/></div>

      <v-divider class="separator"></v-divider>
    </v-col>
  </div>
</template>

<script>
import PlayersList from "@/components/lobby/PlayersList";
import OptionsAdmin from "@/components/lobby/OptionsAdmin";
import InviteFriends from "@/components/lobby/InviteFriends";

export default {
  name: 'LobbyAdminPlayers',
  components: {
    PlayersList,
    OptionsAdmin,
    InviteFriends
  },
  data() {
    return{
      nameGame: 'Apex Legend (nom)',
      invitationCode: 'klnb54ef654za',
      showPlayersList: true,
      showOptions: false,
      showInvite: false,
    }
  },
  methods: {
    // If list players is clicked
    showAdminListPlayers(){
      this.showPlayersList = true
      this.showOptions = false
      this.showInvite = false
    },
    // If options admin is clicked
    showAdminOptions(){
      this.showPlayersList = false
      this.showOptions = true
      this.showInvite = false
    },
    // If invite admin is clicked
    showInviteFriends(){
      this.showPlayersList = false
      this.showOptions = false
      this.showInvite = true
    }
  }
}
</script>

<style scoped>
  .is_active{
    border: 1px solid black;
    border-bottom-color: white;
  }
  .btn_choice{
    background-color: transparent !important;
    box-shadow: none !important;
    text-transform: initial;
    border-radius: 2px;
  }
  #players_list,
  #options_admin,
  #invite{
    height: 70vh;
    overflow-y: scroll;
    border-top: 1px solid black;
    margin-top: -1px;
    margin-left: 2px;
    padding-top: 1em;
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

