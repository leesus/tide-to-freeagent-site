<template>
  <div class="about">
    <h1>Why this tool exists</h1>
    <p>Currently, Tide only allows you to export your business bank account statement as one huge CSV file. You cannot filter by date, and the exported file is not in the correct format for FreeAgent accounting software.</p>
    <p>After manually editing the file one too many times, we decided to create a command line tool to do the hard work for us. After viewing Tide's community pages and seeing more than a few requests for FreeAgent integration, we decided to create a simple web application to allow other Tide/FreeAgent customers to simplify their workflow.</p>
    <p>The app currently allows you to filter by date, and returns the date, transaction and credit/debit amount for each entry. This is all we need in FreeAgent, but if you have any requests for further functionality, or in the unhappy event you find a bug, please <a href="mailto:enquiries@elefee.ltd?subject=Tide to FreeAgent Suggestion" title="send us an email">get in touch</a>.</p>
    <p>We do not save or store either the uploaded file or the file we generate, they are disposed of immediately.</p>
  </div>
</template>

<script>
export default {
  name: 'about'
}
</script>

<style scoped>
h1 {
  font-weight: normal;
  margin: 0 0 1em;
}
</style>
