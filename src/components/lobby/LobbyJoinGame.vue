<template>
  <div class="lobby_join_game">
    <v-card v-for="invit in invits" :key="invit.byUser" class="card_invit">
      <div class="content_invitation d-flex">
        <p class="title_invit">Invitation de {{ invit.byUser }}</p>
        <v-spacer></v-spacer>
        <div class="btn_choice">
          <v-btn fab elevation="2" x-small color="success" class="btn_choice_accept">
            <v-icon>
              mdi-check
            </v-icon>
          </v-btn>
          <v-btn fab elevation="2" x-small color="error" class="btn_choice_decline">
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
  export default {
    name: "LobbyJoinGame",
    data() {
      return{
        invits: [
          {byUser: "Flours"},
          {byUser: "Flours"},
          {byUser: "Flours"},
          {byUser: "Flours"},
          {byUser: "Flours"},
          {byUser: "Flours"},
          {byUser: "Flours"},
        ]
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