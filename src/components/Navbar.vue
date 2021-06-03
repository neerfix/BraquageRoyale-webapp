<template>
  <div class="navigationGame">
    <v-app-bar app color="#4a86e8" id="navbar">
      <!-- Add this class (class="d-flex d-sm-none") to show menu icon only on small screen -->
      <v-app-bar-nav-icon @click="drawer = true" class="d-flex d-md-none"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">Braquage Royal</v-toolbar-title>
      <v-img
      src="../assets/img/bank.png"
      max-width="30"
      class="ml-3 mb-3"
      >

      </v-img>

      <v-spacer></v-spacer>

      <!-- Add this class (class="d-none d-sm-flex") to show tabs only on medium screen and above -->
      <template v-slot:extension>
        <v-tabs v-model="tab" dark align-with-title class="d-none d-md-flex ">
        <v-tabs-slider color="secondary"></v-tabs-slider>
        <v-tab v-for="item in itemsNav" :key="item.title" link dark @click="redirect(item.path)">

          {{ item.title }}
        </v-tab>
          <v-btn
              rounded
              small
              class="mt-2 "
              color="green"
              @click="loginOrAccount()"
          >
            <v-icon dark
            v-if="user">
              mdi-account
            </v-icon>
            <v-icon
              v-if="!user">
              mdi-login
            </v-icon>
          </v-btn>

          <v-btn
              rounded
              small
              v-if="user"
              class="mt-2 ml-5"
              color="red"
              @click="disconnect()"
          >
            <v-icon
                color="white"
            >
              mdi-account-cancel
            </v-icon>
          </v-btn>
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
      <v-btn
          rounded
          small
          class="mt-2 ml-5"
          color="green"
          @click="loginOrAccount()"
      >
        <v-icon
            color="white"
            v-if="user">
          mdi-account
        </v-icon>
        <v-icon
            color="white"
            v-if="!user">
          mdi-login
        </v-icon>
      </v-btn>
      <v-btn
          rounded
          small
          v-if="user"
          class="mt-2 ml-5"
          color="red"
          @click="disconnect()"
      >
        <v-icon
            color="white"
            >
          mdi-disconnect
        </v-icon>
      </v-btn>
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
        user: false,
        itemsNav: [
          {title: 'Accueil', path: '/'},
          {title: 'Mes parties', path: '/dashboard'},
          {title: 'Créer une nouvelle partie', path: '/create_new_game'},
          {title: 'Partie en cours', path: 'game_in_progress'}
        ],
      }
    },
    beforeMount() {
      if (localStorage.getItem('isLogged') === 'true') {
        this.user = true
      }
    },
    methods: {
      // Allows to navigate between different pages
      redirect (path) {
        this.$router.push(path);
      },
      loginOrAccount() {
        if (this.user) {
          this.$router.push('/account');
        } else {
          this.$router.push('/auth');
        }
      },
      disconnect() {
        localStorage.clear()
        this.$router.go(this.$router.push('/'))
      }
    }
  }
</script>
