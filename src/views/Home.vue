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
      return new Notification('Coucou')
    }
  }
}
</script>
