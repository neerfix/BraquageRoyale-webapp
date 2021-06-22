<template>
    <div class="game">
        <div class="map">
            <grid :players="players" :map="game.map"
                  @movePlayer="((e) => this.movePlayer(e))" @attackPlayer="((e) => attackPlayer(e))"></grid>
        </div>
        <div class="game-actions">
            <div class="game-options">
                <v-btn @click="toggleOverlay('players')" small class="btn-actions info">
                    Joueurs
                </v-btn>
                <v-btn small class="btn-actions" :disabled="isCurrentPlayer">
                    Fin du tour
                </v-btn>
            </div>
            <div class="game-options" v-if="canOptions">
                <v-btn @click="toggleOverlay('options')" small class="btn-actions warning">
                    Options
                </v-btn>
            </div>
        </div>
        <v-overlay :value="overlay.players" class="game-overlay">
            <player-card v-for="(player, index) in players" :key="index" :player="player"></player-card>
            <v-btn small class="btn-actions" @click="toggleOverlay('players')">
                Fermer
            </v-btn>
        </v-overlay>
        <v-overlay :value="overlay.options" class="game-overlay">
            <v-btn small class="btn-actions" @click="toggleOverlay('options')">
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
                rounds: ['k3njGxsHztcApBPQYU0vEjetk363', 'UwZa24qM1uRKj7bKSmZyP7khUjr2'],
                map: {}
            },
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
    computed: {
       isCurrentPlayer() {
           return !!this.$route.params.userId === this.game.actualRound
       },
        canOptions() {
           return !!this.players.find(player => player.user_id === this.$route.params.userId)
        }
    },
    methods: {
        // Get current game data
        async getGameById(gameId) {
            const { data } = await axios.get("https://api.braquage-royale.xyz/games/" + gameId)
            console.log('game', data)
            data.players.map(async player => {
                player.username = player.user.player.username
                player.img = this.skins[Math.floor(Math.random() * this.skins.length)]
                player.isTurn = !!data.players.find(player => player.user_id === this.game.actualRound) ?? false
                this.players.push(player)
            })
            this.game = {
                ...this.game,
                map: data.map
            }
        },
        endRound(player) {
            this.players.forEach(p => {
                if(p.user_id === player.user_id) {
                    p.isTurn = false
                }
            })
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
        async movePlayer({ player, arrival }) {
            await axios.post("https://api.braquage-royale.xyz/games/" + this.$route.params.gameId + "/action", {
                active_player_id: this.$route.params.userId,
                is_attack: false,
                last_coordinate: {
                    x: player.coordinates.x,
                    y: player.coordinates.y
                },
                coordinate: {
                    x: arrival.x,
                    y: arrival.y
                }
            })
            let p = this.players.find(p => p.user_id === player.user_id)
            p.coordinates = {
                x: arrival.x,
                y: arrival.y
            }
            p.moved = true
            this.$forceUpdate()
        },
        async attackPlayer({ player, target }) {
            let p = this.players.find(p => p.user_id === player.user_id)
            let t = this.players.find(t => t.coordinates.x === target.x && t.coordinates.y === target.y)
            console.log(p, t)
            /*await axios.post("https://api.braquage-royale.xyz/games/" + this.$route.params.gameId + "/action", {
                active_player_id: this.$route.params.userId,
                target_player_id: t.user_id,
                is_attack: true,
                coordinate: {
                    x: t.coordinates.x,
                    y: t.coordinates.y
                }
            })*/
            this.$forceUpdate()
        }
    },
    mounted() {
        this.getGameById(this.$route.params.gameId)
    }
}
</script>
