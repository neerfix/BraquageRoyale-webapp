<template>
  <div class="lobby">
    <v-col xs="12">
      <p>Salon de la partie : {{ nameGame }}</p>
      <!-- PLayers list-->
      <div id="players">
        <v-card class="mx-auto d-flex mb-3" elevation="2" v-for="player in players" :key="player.name">
          <v-card-actions>
            <v-list-item class="grow">
              <!-- Avatar player -->
              <v-list-item-avatar color="grey darken-3">
                <v-img
                    class="elevation-6"
                    alt=""
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                ></v-img>
              </v-list-item-avatar>
              <!-- Information players -->
              <v-list-item-content>
                <v-list-item-title>Nom : {{ player.name }}</v-list-item-title>
                <v-list-item-title>Exp : {{ player.exp }}</v-list-item-title>
                <v-list-item-title>Rank: {{ player.rank }}</v-list-item-title>
              </v-list-item-content>
              <!-- Icon -->
              <v-row align="center" justify="end">
                <v-icon class="mr-1">
                  mdi-star
                </v-icon>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </div>

      <v-col xs="12">
        <v-btn absolute bottom id="quit">Quitter</v-btn>
      </v-col>
    </v-col>
  </div>
</template>

<script>
  export default {
    name: 'Lobby',
    data() {
      return{
        nameGame: 'Apex Legend (nom)',
        players: [
          {name: 'Lulu', exp: '200', rank: 'Gold'},
          {name: 'Flours', exp: '200', rank: 'Gold'},
          {name: 'Flours', exp: '200', rank: 'Gold'},
          {name: 'Flours', exp: '200', rank: 'Gold'},
          {name: 'Flours', exp: '200', rank: 'Gold'},
          {name: 'Flours', exp: '200', rank: 'Gold'},
        ]
      }
    }
  }
</script>

<style>
  #players{
    height: 50vh;
    overflow-y: scroll;
  }
  #quit{
    left: 50%;
    transform: translate(-50%,0);
    text-transform: initial;
    border: 2px solid black;
    border-right: 4px solid black;
    border-bottom: 4px solid black;
  }
</style>

