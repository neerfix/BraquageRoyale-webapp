<template>
  <div class="grid">
    <div class="container">
      <div class="row" v-for="(row, i) in rows" :key="i">
        <cell v-for="(cell, j) in row" :key="j"
          :x="cell.x" :y="cell.y" :tileNumber="cell.backgroundTile"></cell>
      </div>
    </div>
  </div>
</template>

<script>
import dataMap from '../assets/map.json';
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
    createGridFromJSON(data) {
      console.log(data);
      const width = data.width; // Map width
      let currentRow = []; // Contains our future cells
      for(let i = 0 ; i < data.layers[0].data.length; i++) {
        // Crate our data cell
        let x = i % width;
        let y = Math.floor(i/width);
        let backgroundTile = data.layers[0].data[i] - 1;
        // Construct current cell
        let cell = {};
        cell['x'] = x;
        cell['y'] = y;
        cell['backgroundTile'] = backgroundTile;
        // Push our cell inside our current row
        if(i % width == 0 && i !== 0) {
          this.rows.push(currentRow);
          currentRow = [];
        }
        currentRow.push({
          x: i % width,
          y: Math.floor(i/width),
          backgroundTile: data.layers[0].data[i] - 1
        });
      }
      this.rows.push(currentRow)
      //console.table(currentRow)
    },
    init(){
      // Call function from GridData component
      // TODO : a tester !
      this.$root.$refs.GridData.createGridFromJSON(dataMap);
    },
    firstUpdated(){
      this.init();
    },
  },
  mounted() {
    this.createGridFromJSON(dataMap)
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