<template>
  <div class="create_game">
    <v-col xs="12">
      <p>Création d'une nouvelle partie</p>
      <v-divider></v-divider>
    </v-col>
    <!-- New game name -->
    <v-col xs="12">
      <p>Nom de la partie</p>
      <v-text-field
          label="Nom de la partie"
          outlined
          clearable
      ></v-text-field>
    </v-col>
    <!-- Max player -->
<!--    <v-col xs="12">-->
<!--      <p>Nombre de joueurs maximum</p>-->
<!--      <vue-number-input v-model="value" :min="1" :max="10" inline controls></vue-number-input>-->
<!--    </v-col>-->
    <!-- Map choice -->
    <v-col xs="12">
      <p>Choix de la map</p>
      <v-select
          :items="itemsMap"
          label="Choix de la map"
          outlined
      ></v-select>
      <v-divider></v-divider>
    </v-col>

  </div>
</template>

<script>
  export default {
    name: "CreateGame",
    data() {
      return {
        itemsMap: ["Map #1", "Map #2", "Map #3"]
      };
    },
  }
</script>

<style scoped>

</style>