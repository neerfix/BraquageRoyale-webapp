<template>
  <div class="lobby_join_game">
    <v-card v-for="invite in invites" :key="invite.nameGame" class="card_invit">
      <div class="content_invitation d-flex">
        <p class="title_invit ">Invitation pour la partie : <span class="font-weight-black">{{ invite.nameGame }} </span></p>
        <v-spacer></v-spacer>
        <div class="btn_choice">
          <v-btn fab elevation="2" x-small color="success" class="btn_choice_accept" @click="acceptInvitations(invite.userId, invite.gameId, invite.inviteId)">
            <v-icon>
              mdi-check
            </v-icon>
          </v-btn>
          <v-btn fab elevation="2" x-small color="error" class="btn_choice_decline" @click="declineInvitations(invite.inviteId)">
            <v-icon>
              mdi-alert-circle-outline
            </v-icon>
          </v-btn>
        </div>

      </div>
    </v-card>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "LobbyJoinGame",
    data() {
      return{
        idCurrentUser: undefined,
        nameGameInvite: undefined,
        invites: []
      }
    },

    mounted() {
      this.idCurrentUser = localStorage.getItem('idUser')
      this.getAllInvitByUser(this.idCurrentUser)
    },

    methods: {
      // Get all invites
      getAllInvitByUser(currentUserId){
        axios.get("https://api.braquage-royale.xyz/invites")
        .then((response) => {
          response.data.forEach((invite) => {
            // Get invites by current user
            if (invite.userId === currentUserId){
              // Get game invites
              this.getGameById(invite)
            }
          })
        })
      },
      // Get game by id and create object invites
      getGameById(invite){
        axios.get('https://api.braquage-royale.xyz/games/' + invite.gameId)
        .then((response) => {
          // Create object invites
          let invitation = {
            userId: this.idCurrentUser,
            gameId: response.data.id,
            inviteId: invite.id,
            nameGame: response.data.name
          }
          // Push object in array invites
          this.invites.push(invitation)
        })
      },

      declineInvitations(inviteId){
      // TODO : decline invitation when user click on button decline and delete invation in firebase
      // TODO : get invite code
      // TODO : delete invite by invit code
        console.log('invite id : ' + inviteId);
      },

      acceptInvitations(userId, gameId, inviteId){
        console.log("user id : " + userId);
        console.log('game id : ' + gameId);
        console.log('invite id : ' + inviteId);
        // TODO : accept invitation when user click on button accept
        //     axios.post("https://api.braquage-royale.xyz/games/gameId/invite/inviteId/accepted", {
        //       gameId: gameId,
        //       inviteId: inviteId
        //     })
      }
    }
  }
</script>

<style scoped>
  .lobby_join_game{
    height: 60vh;
    overflow-y: auto;
  }
  .card_invit{
    margin-top: 1em;
    margin-right: 0.5em;
  }
  .content_invitation .title_invit{
    width: 56%;
  }
  .content_invitation .title_invit,
  .content_invitation .btn_choice{
    margin: 1em;
  }
  .content_invitation .btn_choice .btn_choice_decline,
  .content_invitation .btn_choice_accept
  {
    margin-left: 5px;
  }
</style>