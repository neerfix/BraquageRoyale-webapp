<template>
  <div class="options_game">
    <!-- Options new game form -->
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <!-- Option game name -->
      <v-col xs="12">
        <label for="name_game">Nom de la partie</label>
        <v-text-field
            label="Nom de la partie"
            outlined
            clearable
            v-model="nameGame"
            :counter="15"
            :rules="nameGameRules"
            required
            id="name_game"
        ></v-text-field>
      </v-col>
      <!-- Option max player -->
      <v-col xs="12" id="player_max">
        <label for="nb_players_max">Nombre de joueurs maximum</label>
        <v-text-field
            v-model="playersMax"
            label="Nombre de joueurs max"
            :rules="playersMaxRules"
            outlined
            id="nb_players_max"
        />
      </v-col>
      <!-- Option map choice -->
      <v-col xs="12" id="map_choice">
        <label for="map_choice_game">Choix de la map</label>
        <v-select
            :items="itemsMap"
            v-model="choiceMap"
            label="Choix de la map"
            :rules="choiceMapRules"
            outlined
            id="map_choice_game"
        ></v-select>
      </v-col>
      <v-btn
          :disabled="!valid"
          @click="validate"
          id="save"
          color="error"
      >Sauvegarder
      </v-btn>
    </v-form>
    <!-- End create option game form -->
    <!-- Error/Success message form-->
    <v-snackbar v-model="snackbar" :timeout="timeoutSnackbar" :color="colorMessage">
      {{ textMessageValidForm }}
      <template v-slot:action="{ attrs }">
        <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "OptionsAdmin",
  data() {
    return {
      itemsMap: ["Village", "Desert", "Buildings"],
      valid: true,
      snackbar: false,
      colorMessage: '',
      textMessageValidForm: '',
      timeoutSnackbar: 4000,
      gameId: '',
      // Name part rules
      nameGame: '',
      nameGameRules: [
        v => !!v || 'Nom de la partie obligatoire',
        v => (v && v.length <= 15) || 'Le nom ne doit pas depasser 15 caractères',
      ],
      // Players max rules
      playersMax: '',
      playersMaxRules: [
        // v => !v.trim() || 'Test',
        v => !!v || 'Nombre de joueurs max obligatoire',
        v => (!isNaN(parseFloat(v))) || 'Ceci n\'est pas un nombre',
        v => (v >= 0 && v <= 5) || 'Nombre maximum : 5 joueurs'
      ],
      // Choice map rules
      choiceMap: '',
      choiceMapRules: [
        v => !!v || 'Choix de la map obligatoire'
      ],
      // Code rules
      codeJoinGame: '',
      codeJoinGameRules: [
        v => !!v || 'Code de la partie obligatoire',
        v => (v && v.length <= 10) || 'Le code ne doit pas depasser 10 caractères',
      ],
    };
  },
  mounted() {
    this.gameId = this.$store.state.game.id
  },
  methods: {
    // Validate form
    validate() {
      this.snackbar = true
      if (this.$refs.form.validate()) {
        // console.log("Form OK")
        this.updateGame(this.gameId)
        this.textMessageValidForm = "Votre partie à bien été créée"
        this.colorMessage = "green lighten-2";
      } else {
        // console.log("Form KO")
        this.textMessageValidForm = "Des champs sont incorrectes"
        this.colorMessage = "red lighten-2";
      }
    },
    updateGame(gameId) {
      axios
          .patch("https://api.braquage-royale.xyz/games/" + gameId, {
            name: this.nameGame,
            max_player: this.playersMax,
            map_id: this.choiceMap
          })
          .then((r) => {
            console.log(r)
          })
    },
  }
}
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  border: 2px solid black;
}

#player_max .v-text-field {
  width: 40% !important;
}

#map_choice .v-text-field {
  width: 60% !important;
}

#save {
  left: 50%;
  transform: translate(-50%, 0);
  text-transform: initial;
  border: 2px solid black !important;
  border-right: 4px solid black !important;
  border-bottom: 4px solid black !important;
}
</style>
