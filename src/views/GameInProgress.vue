<template>
  <div class="gameInProgress">
    <h1>Game in progress page</h1>
    <Grid/>
  </div>
</template>

<script>
import Grid from "@/components/map/Grid";
export default {
  name: 'GameInProgress',
  components: {
    Grid
  }
}
</script>
