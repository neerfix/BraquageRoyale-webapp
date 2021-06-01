<template>
  <div class="grid">
    <div class="container">
      <div class="row" v-for="(row, i) in rows" :key="i">
        <cell v-for="(cell, j) in row" :key="j"
          :x="cell.x" :y="cell.y" :tileNumber="cell.backgroundTile" :obstacleTile="cell.obstacleTile">
            <cell v-if="cell.obstacleTile === 285" slot="obstacle" :tileNumber="cell.obstacleTile"></cell>
          </cell>
      </div>
    </div>
  </div>
</template>

<script>
import dataMap from '../../assets/json/Tileset.json';
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
    setupRandom(width, height, obstacleProbability) {
      for(let y = 0; y < height; y++) {
        let row = []
        for(let x = 0; x < width; x++) {
          const isObstacle = Math.random() < obstacleProbability;
          row.push({
            x: x,
            y: y,
            backgroundTile: 23,
            obstacleTile: isObstacle ? 285 : -1
          });
        }
        this.rows.push(row)
      }
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
          y: Math.floor(i/width),
          backgroundTile: data.layers[0].data[i] - 1,
          obstacleTile: data.layers[1].data[i] - 1
        });
      }
      this.rows.push(currentRow)
    }
  },
  mounted() {
    this.createGridFromJSON(dataMap)
    this.setupRandom(20, 20, 0.1)
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