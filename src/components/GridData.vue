<template>
  <div class="gridData">
  </div>
</template>

<script>
// Get json map
import dataMap from '../assets/map.json';

export default {
  name: 'GridData',
  mounted() {
    // Create grid
    this.createGridFromJSON(dataMap);
  },
  methods: {
    // Create grid
    createGridFromJSON(data) {
      const width = data.width; // Map width
      let currentRow = []; // Contains our future cells
      for(let i = 0 ; i < data.layers[0].data.length; i++){
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
        currentRow.push(cell);
      }
      console.table(currentRow)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
