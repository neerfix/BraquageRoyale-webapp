<template>
  <div class="home">
    <h1>Home Page</h1>
    <button @click="test()">test</button>
  </div>
</template>

<script>

export default {
  name: 'Home',
  methods: {
    test() {
      console.log(window.getPath)
      return new Notification('Braquage Royal!', {body: "C'est votre tour ! Allez les massacrer", icon:"./assets/img/bank.png"})
    },
    askPermission() {
      if ('Notification' in window) {
        if (Notification.permission === "default") {
          //
        }
      }
    }
  }
}
</script>
