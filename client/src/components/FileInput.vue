<template>
  <div>
    <v-text-field prepend-icon="attach_file" single-line
                  v-model="filename" :label="label" :required="required"
                  @click.native="onFocus"
                  :disabled="disabled" ref="fileTextField"
                  :error-messages="errorMessages"></v-text-field>
    <input type="file" :accept="accept" :multiple="multiple" :disabled="disabled"
           ref="fileInput" @change="onFileChange">
  </div>
</template>

<script>
  export default {
    name: 'file-input',
    props: {
      value: {
        type: [Array, String]
      },
      accept: {
        type: String,
        default: '*'
      },
      label: {
        type: String,
        default: 'Select file'
      },
      required: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean,
        default: false
      },
      errorMessages: {
        type: Array
      }
    },
    data () {
      return {
        filename: ''
      }
    },
    watch: {
      value (v) {
        this.filename = v
      }
    },
    mounted () {
      this.filename = this.value
    },
    methods: {
      onFocus () {
        if (!this.disabled) {
          this.$refs.fileInput.click()
        }
      },
      onFileChange ($event) {
        const files = $event.target.files || $event.dataTransfer.files
        if (files) {
          if (files.length > 0) {
            this.filename = [...files].map(file => file.name).join(', ')
          } else {
            this.filename = null
          }
        } else {
          this.filename = $event.target.value.split('\\').pop()
        }
        this.$emit('input', this.filename)
        this.$emit('selected', files)
      }
    }
  }
</script>

<style scoped>
  input[type=file] {
    position: absolute;
    left: -99999px;
  }
</style>
