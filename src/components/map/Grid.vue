<template>
  <div class="grid">
    <div class="container">
      <div class="row" v-for="(row, i) in rows" :key="i">
        <cell v-for="(cell, j) in row" :key="j"
          :x="cell.x" :y="cell.y" :tileNumber="cell.backgroundTile" :obstacleTile="cell.obstacleTile" :decorationTile="cell.decorationTile">
            <cell v-if="cell.obstacleTile !== -1" slot="obstacle" :tileNumber="cell.obstacleTile"></cell>
            <cell v-if="cell.decorationTile !== -1" slot="decoration" :tileNumber="cell.decorationTile"></cell>
          </cell>
      </div>
    </div>
  </div>
</template>

<script>
import dataMap from '../../assets/json/village.json';
// import GridData from "@/components/GridData";
import Cell from './Cell';

export default {
  name: 'Grid',
  components: {
    Cell
  },
  data() {
    return {
      rows: []
    }
  },
  methods: {
    setupObstacles(obstacleProbability) {
      this.rows.map(row => {
        row.map(cell => {
          const isObstacle = Math.random() < obstacleProbability
          if(isObstacle) {
            //console.log(cell)
          }
          if(cell.obstacleTile !== -1) {
            //cell.backgroundTile = cell.obstacleTile
          }
          //cell.obstacleTile = isObstacle ? 285 : -1
        })
      })
    },
    createGridFromJSON(data) {
      console.log(data);
      const width = data.width; // Map width
      let currentRow = []; // Contains our future cells
      for(let i = 0; i < data.layers[0].data.length; i++) {
        if(i % width === 0 && i !== 0) {
          this.rows.push(currentRow);
          currentRow = [];
        }
        // Push our cell inside our current row
        currentRow.push({
          x: i % width,
          y: Math.floor(i / width),
          backgroundTile: data.layers[0].data[i] - 1,
          obstacleTile: data.layers[1].data[i] - 1,
          decorationTile: data.layers[2].data[i] - 1
        });
      }
      this.rows.push(currentRow)
    }
  },
  mounted() {
    this.createGridFromJSON(dataMap)
    this.setupObstacles(0.1)
  }
}
</script>

<style scoped>
.row {
  display : flex;
  flex-direction : row;
}
.constainer {
  display : flex;
  flex-direction : column;
}
</style>