<template>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="sm4 md4"
  >
    <v-text-field
        v-model="firstName"
        :rules="[v => !!v || 'Prénom obligatoire']"
        label="Prénom"
        required
    ></v-text-field>

    <v-text-field
        v-model="lastName"
        :rules="[v => !!v || 'Nom obligatoire']"
        label="Nom"
        required
    >
    </v-text-field>
    <v-text-field
        v-model="email"
        :rules="[v => !!v || 'E-mail obligatoire']"
        label="E-mail"
        required
    >
    </v-text-field>
    <v-text-field
        v-model="pseudo"
        :rules="[v => !!v || 'Pseudo obligatoire']"
        label="Pseudo"
        required
    ></v-text-field>

    <v-menu

        v-model="fromDateMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
    >
    <template v-slot:activator="{ on }">
      <v-text-field
          label="Date de naissance"
          readonly
          :value="fromDateDisp"
          v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
        locale="en-in"
        v-model="fromDateVal"
        no-title
        @input="fromDateMenu = false"
    ></v-date-picker>
    </v-menu>

    <v-btn
        color="success"
        class="mr-4"
    >
      S'inscrire
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "Register",
  data: () => ({
    pseudo: '',
    lastName: '',
    firstName: '',
    email: '',
    valid: false,
    fromDateMenu: false,
    fromDateVal: null,
  }),
  computed: {
    fromDateDisp() {
      return this.fromDateVal;
      // format/do something with date
    },

  }
}
</script>

<style scoped>

</style>
