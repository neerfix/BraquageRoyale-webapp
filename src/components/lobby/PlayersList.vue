<template>
  <div class="players_list">
      <!-- PLayers list-->
      <div id="players">
<!--        <v-card class="mx-auto d-flex mb-3 mr-10 players_cards" width="310" elevation="2" v-for="user in users" :key="user.username">-->
        <v-card class="mx-auto d-flex mb-3 mr-10 players_cards" width="310" elevation="2">
          <v-card-actions class="card_actions">
            <v-list-item class="informations_list">
              <!-- Avatar player -->
              <v-list-item-avatar
                  class="avatar_player profile"
                  size="70"
                  tile>
                <v-img
                    class="elevation-6"
                    alt=""
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                >
                  <span class="map_name">Map</span>
                </v-img>
              </v-list-item-avatar>
              <!-- Information players -->
              <v-list-item-content class="content_informations_list">
                <v-list-item-title>Nom : {{ this.users.username }}</v-list-item-title>
                <v-list-item-title>Exp : {{ this.users.exp }}</v-list-item-title>
                <v-list-item-title>Rank: {{ this.users.rank }}</v-list-item-title>
              </v-list-item-content>
              <!-- Icon -->
              <v-row align="center" justify="end" class="row_icon">
                <v-icon class="mr-1" color="orange">
                  mdi-star
                </v-icon>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Lobby',
  data() {
    return{
      players: [

      ],
      idUser: '',
      users: {
        username: '',
        rank: '',
        exp: '',
      }
    }
  },
  mounted() {
    let game = this.$store.state.game
    this.idUser = game.players[0].user_id
    // todo : Try to use it if they are more than 1 player !
    this.userOfGame(this.idUser)
  },
  methods: {
    userOfGame(idUser) {
      axios
          .get("https://api.braquage-royale.xyz/users/" + idUser)
          .then((resp) => {
            this.users.username = resp.data.player.username
            this.users.rank = resp.data.player.rank
            this.users.exp = resp.data.player.exp
          })
    },
  }
}
</script>

<style scoped>
  .players_cards{
    border: 2px solid black !important;
  }
  .card_actions{
    padding: 5px !important;
  }
  .informations_list{
    padding-left: 0;
  }
  .avatar_player{
    margin-top: 0;
    margin-bottom: 0;
  }
  .map_name{
    border: 1px solid #CCC;
    padding: 2px 10px;
    height: max-content;
    background-color: rgba(255, 255, 255, 0.7);
    margin: auto;
  }
  .content_informations_list{
    padding: 0 !important;
    width: 185px;
  }
  .content_informations_list .v-list-item__title{
    line-height: 1.8 !important;
    font-size: 12px !important;
  }
  .row_icon{
    position: absolute;
    right: 0;
    top: 1em;
  }
</style>

