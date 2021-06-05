<template>
    <div class="grid">
        <div class="grid-container">
            <div class="grid-row" v-for="(row, i) in rows" :key="i">
                <cell v-for="(cell, j) in row" :key="j" @move="(e) => playerMove(e)"
                      :x="cell.x" :y="cell.y" :tileNumber="cell.backgroundTile" :obstacleTile="cell.obstacleTile"
                      :decorationTile="cell.decorationTile" :isAccessible="cell.isAccessible" :player="cell.player">
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
        currentPlayer: Object,
    },
    data() {
        return {
            rows: [],
            moves: 0,
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
            this.setAccessibleCellsAroundPlayer(this.currentPlayer.coordinates.x, this.currentPlayer.coordinates.y)
        },
        placePlayersOnMap() {
            this.players.map(player => {
                this.rows[player.coordinates.y][player.coordinates.x].player = player
            })
        },
        isWalkableCell({x, y}) {
            if (x < 0 || x >= this.rows[0].length || y < 0 || y >= this.rows.length) {
                return false
            }
            return ((this.rows[y][x].obstacleTile === -1 || this.rows[y][x].decorationTile !== -1) && !this.rows[y][x].player)
        },
        setAccessibleCellsAroundPlayer(x, y, distance = 3) {
            if (distance === 0) {
                return
            } else if (distance === 3) {
                this.rows.forEach(row => {
                    const cells = row.filter(cell => {
                        return cell.isAccessible
                    })
                    cells.forEach(cell => {
                        cell.isAccessible = false
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
        updateCells(oldCoordinates, nextCoordinates) {
            this.rows[oldCoordinates.y][oldCoordinates.x].player = null
            this.rows[nextCoordinates.y][nextCoordinates.x].player = this.currentPlayer
        }
    },
    mounted() {
        this.createGridFromJSON(dataMap)
        this.placePlayersOnMap()
        //this.setupObstacles(0.1)
        this.setupCurrentPlayer()
    },
    watch: {
        currentPlayer() {
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
