<template>
  <div class="lobby_players">
    <v-col xs="12">
      <p>Salon de la partie : {{ nameGame }}</p>
      <!-- PLayers list-->
      <div id="players_list"><PlayersList/></div>
      <v-btn absolute bottom id="quit">Quitter</v-btn>
    </v-col>
  </div>
</template>

<script>
import PlayersList from "@/components/lobby/PlayersList";

  export default {
    name: 'Lobby',
    components: {
      PlayersList
    },
    data() {
      return{
        nameGame: 'Apex Legend (nom)'
      }
    }
  }
</script>

<style scoped>
  #players_list{
    height: 60vh;
    overflow-y: scroll;
  }
  #quit{
    left: 50%;
    transform: translate(-50%,0);
    text-transform: initial;
    border: 2px solid black;
    border-right: 4px solid black;
    border-bottom: 4px solid black;
  }
</style>

