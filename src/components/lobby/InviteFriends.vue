<template>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
  >
    <!-- Option invite friends -->
    <v-col xs="12">
      <p>Inviter un ami</p>
      <v-text-field
          label="Adresse mail"
          outlined
          clearable
          v-model="friendEmail"
          :rules="emailRules"
          required
          id="friendEmail"
      ></v-text-field>
    </v-col>
    <v-btn
        :disabled="!valid"
        @click="invite"
        id="save"
        color="success"
    >Inviter
    </v-btn>
  </v-form>
</template>

<script>
export default {
name: "InviteFriends",
  data() {
    return {
      valid: true,
      friendEmail: '',
      emailRules: [
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail non valide'
      ],
    }
  },
  methods: {
    invite() {
      alert('coucou')
    },
  }
}
</script>

<style scoped>

</style>
