<template>
  <div class="lobby">
    <div v-if="$route.params.type === 'lobby_players'"><LobbyPlayers/></div>
  </div>
</template>

<script>
import LobbyPlayers from "@/components/lobby/LobbyPlayers";

export default {
  name: 'Lobby',
  components: {
    LobbyPlayers
  }
}
</script>