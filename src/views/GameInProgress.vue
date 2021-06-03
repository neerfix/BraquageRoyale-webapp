<template>
  <div class="game">
    <div class="map">
      <Grid />
    </div>
    <div class="game-actions">
      <div class="game-players mb-2">
        <v-btn elevation="2" @click="toggleOverlay('players')">
          Joueurs
        </v-btn>
      </div>
      <div class="game-options">
        <v-btn elevation="2" color="primary" @click="toggleOverlay('options')">
          Options
        </v-btn>
      </div>
    </div>
    <v-overlay :value="overlay.players">
      <player-card v-for="(player, index) in players" :key="index" :player="player"></player-card>
      <v-btn @click="toggleOverlay('players')">
        Fermer
      </v-btn>
    </v-overlay>
    <v-overlay :value="overlay.options">
      <v-btn @click="toggleOverlay('options')">
        Fermer
      </v-btn>
    </v-overlay>
  </div>
</template>

<script>
import Grid from "@/components/map/Grid";
import PlayerCard from "@/components/map/PlayerCard";
export default {
  name: 'GameInProgress',
  components: {
    Grid, PlayerCard
  },
  data() {
    return {
      overlay: {
        players: false,
        options: false,
      },
      players: [
        {
          username: 'Flo',
          img: '',
          vitality: 67,
          attack: 12,
          kills: 1
        },
        {
          username: 'Nico',
          img: '',
          vitality: 98,
          attack: 6,
          kills: 3
        },
        {
          username: 'Gregg',
          img: '',
          vitality: 38,
          attack: 12,
          kills: 1
        },
        {
          username: 'Luca',
          img: '',
          vitality: 0,
          attack: 6,
          kills: 3
        },
        {
          username: 'Antoine',
          img: '',
          vitality: 0,
          attack: 12,
          kills: 1
        }
      ]
    }
  },
  methods: {
    toggleOverlay(overlay) {
      this.overlay[overlay] = !this.overlay[overlay]
    },
    sortPlayers(a, b) {
      if (a.vitality < b.vitality) {
        return 1;
      }
      if (a.vitality > b.vitality) {
        return -1;
      }
      return 0;
    }
  },
  mounted() {
    this.players.sort(this.sortPlayers)
  }
}
</script>
