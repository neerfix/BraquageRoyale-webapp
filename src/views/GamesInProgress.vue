<template>
<div>
  <H1 class="title">Les parties en cours ! </H1>
  <v-divider class="separator"></v-divider>
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

        <v-card-text class="text--primary">
          <div>Carte : <span class="font-weight-bold">{{ item.map_id }}</span></div>
          <div>Nombre de joueurs : <span class="font-weight-bold">{{ item.max_player }}</span></div>
        </v-card-text>
      </v-card>
    </template>
  </v-virtual-scroll>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "GamesInProgress",
  data() {
    return {
      games: [],
      yourTurn: false
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
          .get("https://api.braquage-royale.xyz/games/")
          .then((resp) => {
            resp.data.forEach(game => {
              if (game.players[0].user_id === userId && game.status === "ACTIVE") {
                arrayOfGames.push(game)
              }
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

#btn-game {
  border: 2px solid black !important;
  border-right: 4px solid black !important;
  border-bottom: 4px solid black !important;
}
</style>
