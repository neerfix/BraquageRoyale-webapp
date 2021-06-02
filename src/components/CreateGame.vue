<template>
  <div class="create_game">
    <v-col xs="12">
      <p>Création d'une nouvelle partie</p>
      <v-divider></v-divider>
    </v-col>
    <!-- Create new game form -->
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <!-- New game name -->
      <v-col xs="12">
        <p>Nom de la partie</p>
        <v-text-field
            label="Nom de la partie"
            outlined
            clearable
            v-model="nameGame"
            :counter="15"
            :rules="nameGameRules"
            required
        ></v-text-field>
      </v-col>
      <!-- Max player -->
      <v-col xs="12">
        <p>Nombre de joueurs maximum</p>
        <v-text-field
            v-model="playersMax"
            label="Nombre de joueurs max"
            :rules="[playersMaxRules]"
            outlined
        />
      </v-col>
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
      <!-- Private game -->
      <v-col xs="12">
        <v-checkbox
            v-model="privateGame"
            label="Partie privé"
        ></v-checkbox>
        <!-- Code -->
        <v-expand-transition>
          <div v-show="privateGame">
            <p>Code d'invitation</p>
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
        nameGame: '',
        nameGameRules: [
          v => !!v || 'Nom de la partie obligatoire',
          v => (v && v.length <= 15) || 'Le nom ne doit pas depasser 15 caractères',
        ],
        playersMax: '',
        playersMaxRules: v  => {
          if (!v.trim()) return true;
          if (!isNaN(parseFloat(v)) && v >= 0 && v <= 5) return true;
          return 'Nombre maximum : 5 joueurs';
        },
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
        console.log("Form " + this.$refs.form.validate())
        // this.$refs.form.validate()
      },
    }
  }
</script>

<style scoped>

</style>