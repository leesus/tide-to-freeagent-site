<template>
  <v-toolbar color="primary">
    <v-toolbar-title class="white--text">Tide&rarr;FreeAgent</v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <v-btn dark flat to="/" exact>Convert</v-btn>
      <v-btn dark flat to="/about" exact>About</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'app-header',
  data () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
