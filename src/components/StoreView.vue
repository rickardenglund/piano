<template>
    <div>
        <p>Size: {{$store.state.lastNotes.length}}
        <button @click="$store.commit('clearNotes')">🗿</button>
        </p>
    </div>
</template>

<script>
  export default {
    name: "StoreView"
  }
</script>

<style scoped>

</style>