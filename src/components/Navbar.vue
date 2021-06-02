<template>
  <div class="navigationGame">
    <v-app-bar app>
      <!-- Add this class (class="d-flex d-sm-none") to show menu icon only on small screen -->
      <v-app-bar-nav-icon @click="drawer = true" class="d-flex d-md-none"></v-app-bar-nav-icon>
      <v-toolbar-title>Braquage Royal</v-toolbar-title>
      <v-img
      src="../assets/img/bank.png"
      max-width="30"
      class="ml-2"
      >

      </v-img>

      <v-spacer></v-spacer>

      <!-- Add this class (class="d-none d-sm-flex") to show tabs only on medium screen and above -->
      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title class="d-none d-md-flex ">
        <v-tabs-slider color="info"></v-tabs-slider>
        <v-tab v-for="item in itemsNav" :key="item.title" link @click="redirect(item.path)">
          {{ item.title }}
        </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <!-- Add a navigation bar -->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item v-for="(item, title) in itemsNav" :key="item.title" link @click="redirect(item.path)">
            <v-list-item-title @click="tab = title">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- Navigation bar ends -->
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        drawer: false,
        tab: null,
        itemsNav: [
          {title: 'Accueil', path: '/'},
          {title: 'Connexion/Inscription', path: '/auth'},
          {title: 'Mes parties', path: '/dashboard'},
          {title: 'Créer une nouvelle partie', path: '/create_new_game'},
          {title: 'Partie en cours', path: 'game_in_progress'}
        ],
      }
    },
    methods: {
      // Allows to navigate between different pages
      redirect (path) {
        this.$router.push(path);
      }
    }
  }
</script>
