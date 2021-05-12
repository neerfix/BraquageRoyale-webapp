<template>
  <div class="grid">

  </div>
</template>

<script>
import dataMap from '../assets/map.json';
// import GridData from "@/components/GridData";

export default {
  name: 'Grid',
  methods: {
    init(){
      // Call function from GridData component
      // TODO : a tester !
      this.$root.$refs.GridData.createGridFromJSON(dataMap);
    },
    firstUpdated(){
      this.init();
    }
  }
}
</script>

<style scoped>

</style>