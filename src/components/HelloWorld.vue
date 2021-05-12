<template>
  <div class="hello">
  </div>
</template>

<script>
import dataMap from '../assets/map.json';

export default {
  name: 'HelloWorld',
  mounted() {
    this.setupFromJSON(dataMap);
  },
  methods: {
    setupFromJSON(data) {
      console.log(data)
      const width = data.width;
      console.log(width)
      // let currentRow = [];
      for(let i = 0 ; i < data.layers[0].data.length; i++){
        if(i % width == 0 && i !== 0){
          // this.cells.push(currentRow);
          // currentRow = [];
        }
        // const cell = new CellData(i % width, Math.floor(i/width),data.layers[0].data[i] - 1, data.layers[1].data[i] - 1)
        // currentRow.push(cell);
      }
      // this.cells.push(currentRow);
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
