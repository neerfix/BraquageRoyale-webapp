<template>
  <div class="dashboard">

    <div class="">
      <v-btn @click="displayAllGame" small id="btn-game-all" :color="allGame ? 'success' : ''">
        Toutes mes parties
      </v-btn>
      <v-btn @click="displayCurrentGames" small id="btn-game-current" class="ml-2" :color="gamesInProgress ? 'success' : ''">
        Parties en cours
      </v-btn>
      <v-btn @click="displayAllInvitations" small id="btn-invitation_all" class="ml-2" :color="allInvitations ? 'success' : ''">
        Mes invitations
      </v-btn>
    </div>
    <v-divider class="separator"></v-divider>

    <AllGames v-if="allGame"/>
    <GamesInProgress v-if="gamesInProgress"/>
    <LobbyJoinGame v-if="allInvitations"/>
  </div>
</template>

<script>
import axios from 'axios'
import AllGames from '@/components/AllGames'
import GamesInProgress from "@/views/GamesInProgress";
import LobbyJoinGame from "@/components/lobby/LobbyJoinGame";

export default {
  name: 'Dashboard',
  components: {
    AllGames,
    GamesInProgress,
    LobbyJoinGame
  },
  data() {
    return {
      allGame: false,
      gamesInProgress: false,
      allInvitations: false,
      user: {
        username: '',
        rank: '',
        exp: '',
        status: '',
        avatar: ''
      },
      games: []
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
    this.allGame = true;
    this.gamesInProgress = false;
    this.allInvitations = false;
    this.getCurrentUser()
    this.getUserGames(localStorage.getItem('idUser'));
  },
  methods: {
    getCurrentUser() {
      axios
          .get("https://api.braquage-royale.xyz/users/" + localStorage.getItem('idUser'))
          .then((resp) => {
            this.user.username = resp.data.player.username
            this.user.status = resp.data.status
            this.user.rank = resp.data.player.rank
            this.user.exp = resp.data.player.exp
            this.user.avatar = resp.data.avatar
          })
    },
    getUserGames(userId) {
      let arrayOfGames = [];
      axios
          .get("https://api.braquage-royale.xyz/games/")
          .then((resp) => {
            resp.data.forEach(game => {
              if (game.players[0].user_id === userId) {
                arrayOfGames.push(game)
              }
            })
            this.games = arrayOfGames;
          })
    },
    displayAllGame() {
      this.allGame = true;
      this.gamesInProgress = false;
      this.allInvitations = false;
    },
    displayCurrentGames() {
      this.allGame = false;
      this.gamesInProgress = true;
      this.allInvitations = false;
    },
    displayAllInvitations() {
      this.allGame = false;
      this.gamesInProgress = false;
      this.allInvitations = true;
    },
  }
}
</script>

<style lang="scss" scoped>

.separator {
  border-color: black !important;
  box-shadow: 1px 3px 8px black;
  margin-top: 20px;
  margin-bottom: 20px;
}

  #btn-game-current,
  #btn-game-all,
  #btn-invitation_all {
    border: 2px solid black !important;
    border-right: 4px solid black !important;
    border-bottom: 4px solid black !important;
    margin-top: 0.5em;
  }
</style>
