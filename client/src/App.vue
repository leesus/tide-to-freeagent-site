<template>
  <v-app id="app">
    <app-header />
    <v-content class="pt-4">
      <v-container id="container">
        <router-view/>
      </v-container>
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
import AppFooter from '@/components/AppFooter';
import AppHeader from '@/components/AppHeader';

export default {
  name: 'app',
  components: {
    AppFooter,
    AppHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#container{
  max-width:600px;
}
</style>
