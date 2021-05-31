<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Accueil</router-link> |
      <router-link to="/auth">Authentication</router-link>|
      <router-link to="/dashboard">Tableau de bord</router-link>|
      <router-link to="/create_new_game">Créer une nouvelle partie</router-link>|
      <router-link to="/game_in_progress">Voir la.les partie.s en cours</router-link>|
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
