<template>
  <div class="home">
    <h1>Home Page</h1>
    <Lobby/>
  </div>
</template>

<script>
import Lobby from "@/components/lobby/Lobby";

export default {
  name: 'Home',
  components: {
    Lobby
  }
}
</script>