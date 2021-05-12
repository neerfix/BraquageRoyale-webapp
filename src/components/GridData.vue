<template>
  <div>
  </div>
</template>

<script>

import dataMap from '../assets/map.json';

export default {
  name: 'GridData',
  mounted() {
    this.setupFromJSON(dataMap);
  },
  methods: {
    setupFromJSON(data) {
      console.log(data)
      const width = data.width;
      console.log(width)
      let currentRow = [];
      for(let i = 0 ; i < data.layers[0].data.length; i++){
        // if(i % width == 0 && i !== 0){
        //   this.cells.push(currentRow);
        //   currentRow = [];
        // }
        let x = i % width;
        let y = Math.floor(i/width);
        let backgroundTile = data.layers[0].data[i] - 1;

        let cell = {};
        cell['x'] = x;
        cell['y'] = y;
        cell['backgroundTile'] = backgroundTile;

        currentRow.push(cell);
      }
      console.table(currentRow)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
