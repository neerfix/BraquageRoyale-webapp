<template>
    <div class="game">
        <div class="map">
            <grid :players="players" :currentPlayer="this.currentPlayer"
                  @updatePlayer="((e) => this.updatePlayer(e))"></grid>
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
        <div class="player-actions">
            <div class="player-attack mb-2">
                <v-btn elevation="2" color="primary">
                    Attaquer
                </v-btn>
            </div>
            <div class="player-pass">
                <v-btn elevation="2">
                    Fin du tour
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
import Grid from '../components/map/Grid';
import PlayerCard from '../components/map/PlayerCard';

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
            game: {
                actualRound: 3,
                rounds: [4, 1, 2, 3, 5]
            },
            currentPlayer: {
                coordinates: {
                    x: null,
                    y: null
                }
            },
            players: [
                {
                    id: 1,
                    username: 'Flo',
                    img: Knight1,
                    vitality: 41,
                    attack: 12,
                    kills: 0,
                    isTurn: false,
                    coordinates: {
                        x: 10,
                        y: 5,
                    }
                },
                {
                    id: 2,
                    username: 'Nico',
                    img: Knight2,
                    vitality: 29,
                    attack: 6,
                    kills: 0,
                    isTurn: false,
                    coordinates: {
                        x: 0,
                        y: 6,
                    }
                },
                {
                    id: 3,
                    username: 'Gregg',
                    img: Knight2,
                    vitality: 38,
                    attack: 12,
                    kills: 2,
                    isTurn: false,
                    coordinates: {
                        x: 14,
                        y: 9,
                    }
                },
                {
                    id: 4,
                    username: 'Luca',
                    img: Knight2,
                    vitality: 0,
                    attack: 6,
                    kills: 3,
                    isTurn: false,
                    coordinates: {
                        x: 7,
                        y: 12,
                    }
                },
                {
                    id: 5,
                    username: 'Antoine',
                    img: Knight1,
                    vitality: 0,
                    attack: 12,
                    kills: 1,
                    isTurn: false,
                    coordinates: {
                        x: 1,
                        y: 12,
                    }
                }
            ]
        }
    },
    methods: {
        /* newRound(oldPlayer = this.players.find(player => player.isTurn)) {
          console.log(oldPlayer)
          oldPlayer.isTurn = false
          let currentPlayerIndex = this.game.rounds.indexOf(oldPlayer.id)
          let nextPlayerId = this.game.rounds[currentPlayerIndex + 1]
          let nextPlayer = this.players.find(player => player.id === nextPlayerId)
          if(nextPlayer === undefined) {
            nextPlayer = this.players.find(player => player.id === this.game.rounds[0])
          }
          while(nextPlayer.vitality === 0) {
            nextPlayer = this.players.find(player => player.id === (nextPlayerId + 1))
            if(nextPlayer === undefined) {
              nextPlayer = this.players.find(player => player.id === this.game.rounds[0])
            }
          }
          console.log(nextPlayer)
          nextPlayer.isTurn = true
        }, */
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
        },
        updatePlayer({ player, arrival }) {
            let p = this.players.find(p => p.id === player.id)
            p.coordinates = {
                x: arrival.x,
                y: arrival.y
            }
            this.$forceUpdate()
        }
    },
    mounted() {
        let player = this.players.find(player => player.id === this.game.actualRound)
        player.isTurn = true
        this.currentPlayer = player
        this.players.sort(this.sortPlayers)
    }
}
</script>
