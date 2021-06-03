<template>
  <div class="lobby">
    <div v-if="$route.params.type === 'lobby_players'"><LobbyPlayers/></div>
    <div v-if="$route.params.type === 'lobby_admin_players'"><LobbyAdminPlayers/></div>
  </div>
</template>

<script>
import LobbyPlayers from "@/components/lobby/LobbyPlayers";
import LobbyAdminPlayers from "@/components/lobby/LobbyAdminPlayers";

export default {
  name: 'Lobby',
  components: {
    LobbyPlayers,
    LobbyAdminPlayers
  }
}
</script>