<template>
    <div class="grid">
        <div class="grid-container">
            <div class="grid-row" v-for="(row, i) in rows" :key="i">
                <cell v-for="(cell, j) in row" :key="j" @move="(e) => playerMove(e)" @attack="(e) => playerAttack(e)"
                      :x="cell.x" :y="cell.y" :tileNumber="cell.backgroundTile" :obstacleTile="cell.obstacleTile"
                      :decorationTile="cell.decorationTile" :isAccessible="cell.isAccessible" :isAttackable="cell.isAttackable" :player="cell.player">
                    <cell v-if="cell.obstacleTile !== -1" slot="obstacle" :tileNumber="cell.obstacleTile"></cell>
                    <cell v-if="cell.decorationTile !== -1" slot="decoration" :tileNumber="cell.decorationTile"></cell>
                </cell>
            </div>
        </div>
    </div>
</template>

<script>
import dataMap from '../../assets/json/village.json';
import Cell from './Cell';

export default {
    name: 'Grid',
    components: {
        Cell
    },
    props: {
        players: Array,
    },
    data() {
        return {
            rows: [],
            currentPlayer: {}
        }
    },
    methods: {
        setupObstacles(obstacleProbability) {
            this.rows.map(row => {
                row.map(cell => {
                    const isObstacle = Math.random() < obstacleProbability
                    if (isObstacle) {
                        //console.log(cell)
                    }
                    if (cell.obstacleTile !== -1) {
                        //cell.backgroundTile = cell.obstacleTile
                    }
                    //cell.obstacleTile = isObstacle ? 285 : -1
                })
            })
        },
        createGridFromJSON(data) {
            console.log(data)
            const width = data.width // Map width
            let currentRow = [] // Contains our future cells
            for (let i = 0; i < data.layers[0].data.length; i++) {
                if (i % width === 0 && i !== 0) {
                    this.rows.push(currentRow)
                    currentRow = []
                }
                // Push our cell inside our current row
                currentRow.push({
                    x: i % width,
                    y: Math.floor(i / width),
                    backgroundTile: data.layers[0].data[i] - 1,
                    obstacleTile: data.layers[1].data[i] - 1,
                    decorationTile: data.layers[2].data[i] - 1,
                })
            }
            this.rows.push(currentRow)
        },
        setupCurrentPlayer() {
            if(this.players.length > 0) {
                this.currentPlayer = this.players.find(p => p.isTurn === true)
                this.setAccessibleCellsAroundPlayer(this.currentPlayer.coordinates.x, (this.currentPlayer.coordinates.y))
                this.$forceUpdate()
            }
        },
        placePlayersOnMap() {
            this.players.map(player => {
                this.rows[player.coordinates.y][player.coordinates.x].player = player
            })
            this.$forceUpdate()
        },
        isWalkableCell({x, y}) {
            if (x < 0 || x >= this.rows[0].length || y < 0 || y >= this.rows.length) {
                return false
            }
            return ((this.rows[y][x].obstacleTile === -1 || this.rows[y][x].decorationTile !== -1) && !this.rows[y][x].player)
        },
        isAttackableCell({ x, y }) {
            if (x < 0 || x >= this.rows[0].length || y < 0 || y >= this.rows.length) {
                return false
            }
            return ((this.rows[y][x].obstacleTile === -1 || this.rows[y][x].decorationTile !== -1)
                && this.rows[y][x].player && this.rows[y][x].player.user_id !== this.currentPlayer.user_id)
        },
        setAccessibleCellsAroundPlayer(x, y, distance = 3) {
            if (distance === 0) {
                return
            } else if (distance === 3) {
                this.rows.forEach(row => {
                    row.forEach(cell => {
                        cell.isAccessible = false
                        cell.isAttackable = false
                    })
                })
            }
            const directions = [
                { x: 0, y: 1, label: 'right' }, { x: 0, y: -1, label: 'left' },
                { x: 1, y: 0, label: 'up' }, { x: -1, y: 0, label: 'down' }
            ]
            directions.forEach(direction => {
                const target = {x: x + direction.x, y: y + direction.y}
                if (this.isWalkableCell(target)) {
                    this.rows[target.y][target.x].isAccessible = true
                    this.setAccessibleCellsAroundPlayer(target.x, target.y, distance - 1)
                } else if (this.isAttackableCell(target)) {
                    this.rows[target.y][target.x].isAttackable = true
                }
            })
        },
        playerMove(arrival = {x: null, y: null}) {
            const oldCoordinates = { x: this.currentPlayer.coordinates.x, y: this.currentPlayer.coordinates.y }
            this.$emit('updatePlayer', { player: this.currentPlayer, arrival: arrival })
            this.updateCells(oldCoordinates, arrival)
            this.setAccessibleCellsAroundPlayer(arrival.x, arrival.y)
            this.$forceUpdate()
        },
        playerAttack(target = {x: null, y: null}) {
            this.$emit('attackPlayer', { player: this.currentPlayer, target })
        },
        updateCells(oldCoordinates, nextCoordinates) {
            this.rows[oldCoordinates.y][oldCoordinates.x].player = null
            this.rows[nextCoordinates.y][nextCoordinates.x].player = this.currentPlayer
        },
        // Get current player
        getCurrentUserById(players) {
            // Loop for get current user
            players.forEach(player => {
                if (this.$route.params.userId === player.user_id){
                    this.player = player
                }
            })
        }
    },
    mounted() {
        this.createGridFromJSON(dataMap)
        this.placePlayersOnMap()
        //this.setupObstacles(0.1)
        this.setupCurrentPlayer()
    },
    watch: {
        players() {
            this.placePlayersOnMap()
            this.setupCurrentPlayer()
        }
    }
}
</script>

<style scoped>
.grid-row {
    display: flex;
    flex-direction: row;
}

.grid-container {
    display: flex;
    flex-direction: column;
}

.grid {
    min-width: 650px;
}
</style>
