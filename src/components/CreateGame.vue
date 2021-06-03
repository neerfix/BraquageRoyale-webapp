<template>
  <div class="create_game">
    <v-col xs="12">
      <p>Création d'une nouvelle partie</p>
      <v-divider class="separator"></v-divider>
    </v-col>
    <!-- Create new game form -->
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <!-- New game name -->
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
      <!-- Max player -->
      <v-col xs="12">
        <label for="nb_players_max">Nombre de joueurs maximum</label>
        <v-text-field
            v-model="playersMax"
            label="Nombre de joueurs max"
            :rules="playersMaxRules"
            outlined
            id="nb_players_max"
        />
      </v-col>
      <!-- Map choice -->
      <v-col xs="12">
        <label for="map_choice">Choix de la map</label>
        <v-select
            :items="itemsMap"
            v-model="choiceMap"
            label="Choix de la map"
            :rules="choiceMapRules"
            outlined
            id="map_choice"
        ></v-select>
        <v-divider class="separator"></v-divider>
      </v-col>
      <!-- Private game -->
      <v-col xs="12">
        <v-checkbox
            v-model="privateGame"
            label="Partie privé"
        ></v-checkbox>
        <!-- Code -->
        <v-expand-transition>
          <div v-show="privateGame">
            <label for="join_code">Code d'invitation</label>
            <v-text-field
                label="code"
                placeholder="zk88bfz6jb9"
                outlined
                clearable
                v-if="privateGame"
                v-model="codeJoinGame"
                :counter="10"
                :rules="codeJoinGameRules"
                required
                id="join_code"
            ></v-text-field>
          </div>
        </v-expand-transition>
      </v-col>
      <!-- Actions buttons -->
      <v-col xs="12">
        <v-btn elevation="2">Annuler</v-btn>
        <v-btn
            elevation="2"
            color="error"
            :disabled="!valid"
            @click="validate"
        >Créer la partie</v-btn>
      </v-col>
    </v-form>
    <!-- End create new game form -->
  </div>
</template>

<script>
  export default {
    name: "CreateGame",
    data() {
      return {
        itemsMap: ["Map #1", "Map #2", "Map #3"],
        privateGame: false,
        valid: true,
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
    methods: {
      validate () {
        // console.log("Private game " + this.privateGame)
        // console.log("Code value " + this.codeJoinGame)
        // console.log("Form = " + this.$refs.form.validate())
        if(this.$refs.form.validate()) {
          console.log("Form OK")
        } else {
          console.log("Form KO")
        }
      },
    }
  }
</script>

<style scoped>
  .separator{
    border-color: black !important;
    box-shadow: 1px 3px 8px black;
  }
  .v-text-field--outlined >>> fieldset {
    border: 2px solid black;
  }
</style>