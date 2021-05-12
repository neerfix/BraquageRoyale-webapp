<template>
  <div id="app">
    <GridData/>
  </div>
</template>

<script>
import GridData from './components/GridData.vue'

export default {
  name: 'App',
  components: {
    GridData
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
