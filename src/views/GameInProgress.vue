<template>
  <div class="game">
    <div class="map">
      <grid :players="players"></grid>
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
    <v-overlay :value="overlay.players" class="game-overlay">
      <player-card v-for="(player, index) in players" :key="index" :player="player"></player-card>
      <v-btn @click="toggleOverlay('players')">
        Fermer
      </v-btn>
    </v-overlay>
    <v-overlay :value="overlay.options" class="game-overlay">
      <v-btn @click="toggleOverlay('options')">
        Fermer
      </v-btn>
    </v-overlay>
  </div>
</template>

<script>
import Grid from "@/components/map/Grid";
import PlayerCard from "@/components/map/PlayerCard";

import Knight1 from '../assets/img/caracters/knight.png'
import Knight2 from '../assets/img/caracters/knight-2.png'

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
          img: Knight1,
          vitality: 67,
          attack: 12,
          kills: 1,
          coordinates: {
            x: 0,
            y: 0,
          }
        },
        {
          username: 'Nico',
          img: Knight2,
          vitality: 98,
          attack: 6,
          kills: 3,
          coordinates: {
            x: 1,
            y: 6,
          }
        },
        {
          username: 'Gregg',
          img: Knight2,
          vitality: 38,
          attack: 12,
          kills: 1,
          coordinates: {
            x: 2,
            y: 10,
          }
        },
        {
          username: 'Luca',
          img: Knight2,
          vitality: 0,
          attack: 6,
          kills: 3,
          coordinates: {
            x: 7,
            y: 10,
          }
        },
        {
          username: 'Antoine',
          img: Knight1,
          vitality: 0,
          attack: 12,
          kills: 1,
          coordinates: {
            x: 1,
            y: 12,
          }
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
