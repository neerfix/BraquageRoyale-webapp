<template>
<div>
  <v-virtual-scroll :items="games" height="450" :item-height="240">
    <template v-slot:default="{ item }">
      <v-card class="mx-auto">
        <v-img
            class="white--text align-end"
            height="125px"
            src="@/assets/img/village-map.png"
        >
          <v-col>
          <v-card-title>
            <div class="overlay-title">
              {{ item.name }}
            </div>
          </v-card-title>
          <v-btn
          color="success"
          id="btn-game"
          small
          v-if="yourTurn"
          @click="joinGame(item.id)"
          >
            Rejoindre !
<!--            Faire le lien avec la partie en cours ici :) -->
          </v-btn>
            <v-card-title
            v-if="!yourTurn">
              <div class="overlay-wait">
                En attente de votre tour
              </div>
            </v-card-title>
          </v-col>
        </v-img>

        <div class="d-flex">
          <v-card-text class="text--primary">
            <div>Carte : <span class="font-weight-bold">{{ item.map_id }}</span></div>
            <div>Nombre de joueurs : <span class="font-weight-bold">{{ item.max_player }}</span></div>
          </v-card-text>

          <!-- Modal dialogue Setting game (Lobby)-->
          <v-dialog
              v-model="dialog"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn fab x-small v-bind="attrs" v-on="on" class="mt-3 mr-6" @click="sendDataFromGame(item)">
                <v-icon>mdi-cog-outline</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-btn id="btn_show_lobby_player" @click="showPlayersLobby">Players</v-btn>
                <v-btn id="btn_show_lobby_admin" @click="showAdminLobby" >Admin/Options</v-btn>
                <v-spacer></v-spacer>
              </v-toolbar>
              <!-- Lobby -->
              <div v-if="showLobbyPlayers"><LobbyPlayers/></div>
              <div v-if="showLobbyAdmin"><LobbyAdminPlayers/></div>
            </v-card>
          </v-dialog>
          <!-- Setting game (Lobby)-->
        </div>
      </v-card>
    </template>
  </v-virtual-scroll>
</div>
</template>

<script>
import axios from "axios";
import LobbyPlayers from "@/components/lobby/LobbyPlayers";
import LobbyAdminPlayers from "@/components/lobby/LobbyAdminPlayers";

export default {
  name: "GamesInProgress",
  components: {
    LobbyPlayers,
    LobbyAdminPlayers
  },
  data() {
    return {
      games: [],
      yourTurn: true,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      showLobbyPlayers: true,
      showLobbyAdmin: false,
    }
  },
  beforeCreate() {
    if (!localStorage.getItem('idUser')) {
      if (confirm("Vous devez être connecté !")) {
        this.$router.go(this.$router.push('/auth'))
      } else {
        this.$router.go(this.$router.push('/'))
      }
    }
  },
  mounted() {
    this.getAllActiveGames(localStorage.getItem('idUser'))
  },
  methods: {
    getAllActiveGames(userId) {
      let arrayOfGames = [];
      axios
          .get("https://api.braquage-royale.xyz/users/" + userId + '/games')
          .then((resp) => {
            resp.data.forEach(game => {
                arrayOfGames.push(game)
            })
            this.games = arrayOfGames;
          })
    },
    showPlayersLobby(){
      this.showLobbyPlayers = true
      this.showLobbyAdmin = false
    },
    showAdminLobby(){
      this.showLobbyPlayers = false
      this.showLobbyAdmin = true
    },
    sendDataFromGame(game) {
      this.$store.state.game = game;
    },
    joinGame(idGame){
      this.$router.go(this.$router.push('/game/' + localStorage.getItem('idUser') + '/' + idGame))
    }
  }
}
</script>


<style lang="scss" scoped>
  ::v-deep {
    .text-overline {
      line-height: 1 !important;
      font-size: .65rem !important;
    }
  }

  .overlay-title {
    background-color: #ebf1f5;
    color: #000;
    border-radius: 4px;
    opacity: .75;
    font-size: .875rem;
    line-height: 2;
    padding: 0 1rem;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  }

  .overlay-wait {
    background-color: #DF6464;
    color: #000;
    border-radius: 4px;
    opacity: .75;
    font-size: .875rem;
    line-height: 2;
    padding: 0 1rem;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  }

  .separator {
    border-color: black !important;
    box-shadow: 1px 3px 8px black;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  #btn-game,
  #btn_show_lobby_player,
  #btn_show_lobby_admin{
    border: 2px solid black !important;
    border-right: 4px solid black !important;
    border-bottom: 4px solid black !important;
  }

  #btn_show_lobby_admin{
    margin-left: 1em;
  }

</style>
