<template>
    <div class="game">
        <div class="map">
            <grid :players="players"
                  @movePlayer="((e) => this.movePlayer(e))" @attackPlayer="((e) => attackPlayer(e))"></grid>
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
import axios from "axios";

export default {
    name: 'GameInProgress',
    components: {
        Grid, PlayerCard
    },
    data() {
        return {
            skins: [Knight1, Knight2],
            overlay: {
                players: false,
                options: false,
            },
            game: {
                actualRound: 'k3njGxsHztcApBPQYU0vEjetk363',
                rounds: ['k3njGxsHztcApBPQYU0vEjetk363']
            },
            currentPlayer: null,
            players: [],
            /*players: [
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
                        x: 10,
                        y: 6,
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
            ]*/
        }
    },
    methods: {
        // Get current game data
        async getGameById(gameId) {
            const response = await axios.get("https://api.braquage-royale.xyz/games/" + gameId)
            console.log(response.data)
            response.data.players.map(async player => {
                const { data } = await axios.get("https://api.braquage-royale.xyz/users/" + player.user_id)
                player.user = data
                player.username = data.player.username
                player.coordinates = {
                    x: 0,
                    y: 0
                }
                player.img = this.skins[Math.floor(Math.random() * this.skins.length)]
                player.isTurn = !!response.data.players.find(player => player.user_id === this.game.actualRound) ?? false
                this.players.push(player)
            })
            this.players.sort(this.sortPlayers)
        },
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
        movePlayer({ player, arrival }) {
            let p = this.players.find(p => p.user_id === player.user_id)
            p.coordinates = {
                x: arrival.x,
                y: arrival.y
            }
            p.moved = true
            this.$forceUpdate()
        },
        attackPlayer({ player, target }) {
            let p = this.players.find(p => p.user_id === player.user_id)
            let t = this.players.find(t => t.coordinates.x === target.x && t.coordinates.y === target.y)
            console.log(p, t)
            this.$forceUpdate()
        }
    },
    mounted() {
        this.getGameById(this.$route.params.gameId)
    }
}
</script>
