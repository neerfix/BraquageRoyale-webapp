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
      <!-- Map choice -->
      <v-col xs="12" id="map_choice">
        <label for="map_choice_game">Choix de la map</label>
        <v-select
            :items="mapName"
            label="Choix de la map"
            :rules="choiceMapRules"
            outlined
            id="map_choice_game"
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
      <v-col xs="12" class="d-flex">
        <v-btn
            elevation="2"
            @click="reset"
            class="btn_actions"
        >Annuler
        </v-btn>
        <v-btn
            id="btn_create_game"
            elevation="2"
            color="error"
            :disabled="!valid"
            @click="validate"
            class="btn_actions"
        >Créer la partie
        </v-btn>
      </v-col>
    </v-form>
    <!-- End create new game form -->
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
import axios from 'axios';

export default {
  name: "CreateGame",
  data() {
    return {
      itemsMap: [],
      privateGame: false,
      valid: true,
      snackbar: false,
      colorMessage: '',
      textMessageValidForm: '',
      timeoutSnackbar: 4000,
      // Name part rules
      mapName: [],
      mapId: '',
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
    this.getMaps()
  },
  methods: {
    // Validate form
    validate() {
      this.snackbar = true
      if (this.$refs.form.validate()) {
        this.createGame()
      } else {
        this.textMessageValidForm = "Des champs sont incorrectes"
        this.colorMessage = "red lighten-2";
      }
    },
    //  Reset form
    reset() {
      this.$refs.form.reset()
    },
    getMaps() {
      axios
          .get("https://api.braquage-royale.xyz/maps/")
          .then((res) => {
            res.data.forEach(map => {
              this.mapName = [
                map.name
              ];
              this.mapId = map.id;
              // let mapData = {
              //   mapId: map.id,
              //   mapName: map.name
              // }
              // // Push object in array itemsMap
              // this.itemsMap.push(mapData)
              // console.log(this.itemsMap)
            })
          })
    },
    // Call API create game
    createGame() {
      const url = 'https://api.braquage-royale.xyz/games/'
      const user_id = localStorage.getItem('idUser')

      const body = {
        name: this.nameGame,
        max_player: this.playersMax,
        is_private: this.privateGame,
        map_id: this.mapId,
        players: [
          {
            user_id: user_id,
            is_spectate: false,
            character_id: 'test'
          }
        ]
      }
      axios({
        method: 'post',
        url: url,
        data: body,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }).then(() => {
        this.colorMessage = "green lighten-2";
        this.textMessageValidForm = "Votre partie à bien été créée"
        setTimeout(() => {
          this.$router.go(this.$router.push('/dashboard'))
        }, 2000)
      })
          .catch((error) => {
            console.log(error);
            this.textMessageValidForm = "Erreur serveur, veuillez réssayer plus tard !"
            this.colorMessage = "red lighten-2";
          })
    }
  }
}
</script>

<style scoped>
.separator {
  border-color: black !important;
  box-shadow: 1px 3px 8px black;
}

.v-text-field--outlined >>> fieldset {
  border: 2px solid black;
}

#player_max .v-text-field {
  width: 40% !important;
}

#map_choice .v-text-field {
  width: 60% !important;
}

.btn_actions {
  border: 2px solid black !important;
  border-bottom: 4px solid black !important;
  border-right: 4px solid black !important;
  text-transform: initial;
}

#btn_create_game {
  margin: auto;
  margin-right: 0;
  border: 2px solid black !important;
  border-bottom: 4px solid black !important;
  border-right: 4px solid black !important;
}
</style>
