<template>
  <div class="dashboard">

    <v-card
        class="mx-auto"
        elevation="2"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5 mb-1">{{ user.username }}</v-list-item-title>
          <small class="mb-1 font-italic">Votre id a donner à vos amis : {{ user.id }}</small>
          <div class="text-overline mt-3">
            <div class="d-flex align-center flex-wrap justify-space-between">
              <div><span class="text-primary">Rank : </span>{{ user.rank }}</div>
              <div><span class="text-primary">Expérience : </span>{{ user.exp }}</div>
            </div>
          </div>
        </v-list-item-content>

        <v-list-item-avatar>
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"/>
        </v-list-item-avatar>
      </v-list-item>
    </v-card>

    <v-divider class="mt-5 mb-3"></v-divider>

    <div>
      <h4 class="mb-3">Les dernières parties</h4>
      <v-virtual-scroll :items="games" height="450" :item-height="240">
        <template v-slot:default="{ item }">
          <v-card class="mx-auto">
            <v-img
                class="white--text align-end"
                height="125px"
                src="@/assets/img/village-map.png"
            >
              <v-card-title>
                <div class="overlay-title">
                  {{ item.name }}
                </div>
              </v-card-title>
            </v-img>

            <!--            <v-card-subtitle class="pb-0" :class="{'text-primary font-weight-bold': item.isTurn}">-->
            <!--              {{ item.isTurn ? 'À vous de jouer !' : 'En attente' }}-->
            <!--            </v-card-subtitle>-->

            <v-card-text class="text--primary">
<!--              <div>Carte : <span class="font-weight-bold">{{ item.map_id }}</span></div>-->
              <div>Nombre de joueurs : <span class="font-weight-bold">{{ item.max_player }}</span></div>
              <div v-if="item.status === 'ACTIVE'">Partie : <span class="font-weight-bold">en cours</span></div>
              <div v-if="item.status === 'INACTIVE'">Partie : <span class="font-weight-bold">terminée</span></div>
            </v-card-text>
          </v-card>
        </template>
      </v-virtual-scroll>

    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Dashboard',
  data() {
    return {
      user: {
        id: '',
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
    this.getCurrentUser()
    this.getUserGames(localStorage.getItem('idUser'));
  },
  methods: {
    getCurrentUser() {
      axios
          .get("https://api.braquage-royale.xyz/users/" + localStorage.getItem('idUser'))
          .then((resp) => {
            this.user.id = resp.data.id
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
            console.log(resp.data);
            resp.data.forEach(game => {
              game.players.forEach((player) => {
                if (player.user_id === userId) {
                  arrayOfGames.push(game)
                }
              })
            })
            this.games = arrayOfGames;
          })
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
</style>
