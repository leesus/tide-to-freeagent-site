<template>
  <form class="upload">
    <file-input v-model="form.file" @formData="getFile" :error-messages="fileErrors" />
    
    <v-menu
      lazy
      :close-on-content-click="false"
      v-model="startMenu"
      transition="scale-transition"
      offset-y
      full-width
      :nudge-right="40"
      max-width="290px"
      min-width="290px"
      class="mb-3"
    >
      <v-text-field
        slot="activator"
        label="Start date (optional)"
        v-model="startDisplay"
        prepend-icon="event"
        @blur="start = parseDate(startDisplay)"
        :error-messages="startErrors"
        hint="Select a start date to filter your statement by"
        persistent-hint
        readonly
      ></v-text-field>
      <v-date-picker v-model="form.start" @input="startDisplay = formatDate($event)" no-title scrollable actions>
        <template slot-scope="{ save, cancel }">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
            <v-btn flat color="primary" @click="save">OK</v-btn>
          </v-card-actions>
        </template>
      </v-date-picker>
    </v-menu>
    
    <div class="padded mb-3 pt-3">
      <v-checkbox
        label="Single day"
        v-model="form.single"
        hint="Use this with start date to select a single day"
        persistent-hint>
      </v-checkbox>
    </div>
    
    <v-menu
      lazy
      :close-on-content-click="false"
      v-model="endMenu"
      transition="scale-transition"
      offset-y
      full-width
      :nudge-right="40"
      max-width="290px"
      min-width="290px"
      :disabled="form.single"
      class="mb-3"
    >
      <v-text-field
        slot="activator"
        label="End date (optional)"
        v-model="endDisplay"
        prepend-icon="event"
        @blur="end = parseDate(endDisplay)"
        :disabled="form.single"
        :error-messages="endErrors"
        hint="Select an end date to filter your statement by"
        persistent-hint
        readonly
      ></v-text-field>
      <v-date-picker v-model="form.end" @input="endDisplay = formatDate($event)" no-title scrollable actions>
        <template slot-scope="{ save, cancel }">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
            <v-btn flat color="primary" @click="save">OK</v-btn>
          </v-card-actions>
        </template>
      </v-date-picker>
    </v-menu>

    <div class="padded mb-3">
      <v-text-field
        name="filename"
        label="Filename (optional)"
        id="filename"
        v-model="form.filename"
        hint="Set a custom filename for the download"
        persistent-hint
      ></v-text-field>
    </div>

    <div class="padded">
      <v-btn color="primary" @click="submit">Convert</v-btn>
      <v-btn color="tertiary" @click="clear">Reset</v-btn>
    </div>
  </form>
</template>

<script>
import {validationMixin} from 'vuelidate'
import {required} from 'vuelidate/lib/validators'
import fileInput from './FileInput'

export default {
  name: 'upload-form',
  mixins: [validationMixin],
  components: {
    fileInput,
  },
  validations: {
    form: {
      file: {required},
      start: {
        lessThanEnd (value) {
          if (!!this.form.end && !!value) {
            return value <= this.form.end;
          }
          return true;
        }
      },
      end: {
        greaterThanStart (value) {
          if (!!this.form.start && !!value) {
            return value >= this.form.start;
          }
          return true;
        }
      }
    },
  },
  data () {
    return {
      startDisplay: null,
      endDisplay: null,
      startMenu: false,
      endMenu: false,

      form: {
        file: null,
        start: null,
        end: null,
        single: false,
        filename: null
      },

      formData: new FormData(),
    };
  },
  methods: {
    formatDate (date) {
      if (!date) return null
      return date.split('-').reverse().join('/')
    },
    parseDate (date) {
      if (!date) return null
      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    getFile (formData) {
      // Rename file
      this.formData.set('statement', formData[0].get('data'))
    },
    submit () {
      this.$v.$touch()
      
      if (!this.$v.$invalid) {
        Object.keys(this.form).forEach(key => {
          if (key !== 'file' && !!this.form[key]) this.formData.append(key, this.form[key])
        });
        this.$emit('upload', this.formData)
        this.clear();
      }
    },
    clear () {
      this.$v.$reset()
      this.startDisplay = null
      this.endDisplay = null
      this.form.file = null
      this.form.start = null
      this.form.end = null
      this.form.single = false
      this.form.filename = null
      this.formData = new FormData()
    }
  },
  computed: {
    fileErrors () {
      const errors = []
      if (!this.$v.form.file.$dirty) return errors
      !this.$v.form.file.required && errors.push('You must select a file')
      return errors
    },
    startErrors () {
      const errors = []
      if (!this.$v.form.start.$dirty) return errors
      !this.$v.form.start.lessThanEnd && errors.push('Start date must be earlier than end date')
      return errors
    },
    endErrors () {
      const errors = []
      if (!this.$v.form.end.$dirty) return errors
      !this.$v.form.end.greaterThanStart && errors.push('End date must be later than start date')
      return errors
    }
  }
}
</script>

<style>
.upload{
  max-width:400px;
  margin:0 auto;
}

.padded{
  padding-left:40px;
}
</style>
