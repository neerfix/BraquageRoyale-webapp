<template>
  <v-app id="inspire">
    <Navbar/>
    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import Navbar from "@/components/Navbar";

  export default {
    name: 'App',
    components: {
      Navbar,
    },
    data: () => ({
      //
    }),
  };
</script>

<style lang="scss" scoped>
::v-deep {
  .container {
    height: 100%;
  }
}
</style>
