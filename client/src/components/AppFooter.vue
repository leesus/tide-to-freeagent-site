<template>
  <v-footer>
    <v-spacer />
    <div class="caption">&copy; {{year}} <a href="http://elefee.ltd" title="Made by Elefee" target="_blank">Made by Elefee</a></div>
  </v-footer>
</template>

<script>
export default {
  name: 'app-footer',
  data () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
