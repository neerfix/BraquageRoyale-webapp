<template>
  <div class="dashboard">
    
    <v-card
      class="mx-auto"
      elevation="2"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5 mb-1">{{ user.username }}</v-list-item-title>
          <v-list-item-subtitle>{{ user.status }}</v-list-item-subtitle>
          <div class="text-overline mt-3">
            <div class="d-flex align-center flex-wrap justify-space-between">
              <div><span class="text-primary">Rank : </span>{{ user.rank }}</div>
              <div><span class="text-primary">Expérience : </span>{{ user.exp }}</div>
            </div>
          </div>
        </v-list-item-content>

        <v-list-item-avatar>
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-list-item-avatar>
      </v-list-item>
    </v-card>

    <v-divider class="mt-5 mb-3"></v-divider>

    <div>
      <h4 class="mb-3">Parties en cours</h4>
      <v-virtual-scroll :items="games" height="450" :item-height="240">
        <template v-slot:default="{ item }">
          <v-card class="mx-auto">
            <v-img
              class="white--text align-end"
              height="125px"
              :src="item.map.src"
            >
              <v-card-title>
                <div class="overlay-title">
                  {{ item.name }}
                </div>
              </v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0" :class="{'text-primary font-weight-bold': item.isTurn}">
              {{ item.isTurn ? 'À vous de jouer !' : 'En attente' }}
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <div>Carte : <span class="font-weight-bold">{{ item.map.name }}</span></div>
              <div>Nombre de joueurs : <span class="font-weight-bold">{{ item.players }}</span></div>
            </v-card-text>
          </v-card>
        </template>
      </v-virtual-scroll>
      
    </div>

  </div>
</template>

<script>
import VillageMap from '../assets/img/village-map.png'

export default {
  name: 'Dashboard',
  data() {
    return {
      user: {
        username: 'Ynov',
        rank: 'Gold 2',
        exp: '128 032',
        status: 'Joueur Pro - Vitality',
        avatar: ''
      },
      games: [
        {
          name: 'Apex Legends',
          map: {
            name: 'Village',
            src: VillageMap
          },
          players: 3,
          isTurn: true
        },
        {
          name: 'Worms',
          map: {
            name: 'Village',
            src: VillageMap
          },
          players: 5,
          isTurn: false
        },
        {
          name: 'Apex Legends',
          map: {
            name: 'Village',
            src: VillageMap
          },
          players: 3,
          isTurn: true
        },
        {
          name: '4 Worms',
          map: {
            name: 'Village',
            src: VillageMap
          },
          players: 5,
          isTurn: false
        },
        {
          name: 'Apex Legends',
          map: {
            name: 'Village',
            src: VillageMap
          },
          players: 3,
          isTurn: true
        },
        {
          name: 'Worms',
          map: {
            name: 'Village',
            src: VillageMap
          },
          players: 5,
          isTurn: false
        },
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .text-overline {
    line-height: 1 !important;
    font-size: .65rem !important;
  }
}
.overlay-title {
  background-color: #ebf1f5;
  color: #000;
  border-radius: 4px;
  opacity: .75;
  font-size: .875rem;
  line-height: 2;
  padding: 0 1rem;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
</style>