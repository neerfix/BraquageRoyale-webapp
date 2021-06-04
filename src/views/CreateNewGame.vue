<template>
  <div class="createNewGame">
    <CreateGame/>
  </div>
</template>

<script>
import CreateGame from "@/components/CreateGame";

export default {
  name: 'CreateNewGame',
  beforeCreate() {
    if (!localStorage.getItem('idUser')) {
      if (confirm("Vous devez être connecté !")) {
        this.$router.go(this.$router.push('/auth'))
      } else {
        this.$router.go(this.$router.push('/'))
      }
    }
  },
  components: {
    CreateGame
  }
}
</script>
