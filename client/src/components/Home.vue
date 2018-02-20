<template>
  <div class="home">
    <h1>Tide&rarr;FreeAgent</h1>
    <h2>Convert a Tide statement into a FreeAgent compatible file</h2>

    <v-card class="pa-5">
      <upload-form v-if="!uploading" @upload="upload" />
      <v-progress-circular v-if="uploading" indeterminate color="primary"></v-progress-circular>
    </v-card>

    <v-snackbar :bottom="true" :timeout="5000" :color="alert.type" v-model="alert.visible">
      {{ alert.message }}
      <v-btn flat color="white" @click.native="alert.visible = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import convert from '@/services/api';
import uploadForm from './UploadForm';

const ALERT_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info'
};

export default {
  name: 'home',
  components: {
    uploadForm
  },
  data () {
    return {
      uploading: false,
      uploaded: false,
      alert: {
        visible: false,
        type: null,
        message: null,
      }
    }
  },
  methods: {
    async upload (formData) {
      this.uploading = true;
      try {
        const {file, filename} = await convert(formData);
        let blob = new Blob([file], {type: 'text/csv'});
        let a = document.createElement("a");
        a.style = "display: none";
        document.body.appendChild(a);
        let url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        this.showAlert('File created successfully!');
      } catch (error) {
        this.showAlert(error.message, ALERT_TYPES.ERROR);
      } finally {
        this.uploading = false;
      }
    },

    showAlert (message, type = ALERT_TYPES.SUCCESS) {
      this.alert.message = message;
      this.alert.type = type;
      this.alert.visible = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  margin: 0 0 1em;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
