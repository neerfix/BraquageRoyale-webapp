<template>
  <div class="createNewGame">
    <h1>Create New Game page</h1>
    <CreateGame/>
  </div>
</template>

<script>
import CreateGame from "@/components/CreateGame";

export default {
  name: 'CreateNewGame',
  components: {
    CreateGame
  }
}
</script>
