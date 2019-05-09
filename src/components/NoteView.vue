<template>
  <div>
    <h2>Notes:</h2>

      <p>History: {{notes}} </p>

  </div>
</template>

<script>
  export default {
    name: "NoteView",
    props: ['notes'],
  }
</script>

<style scoped>

  p {
    display: inline;
  }
</style>
