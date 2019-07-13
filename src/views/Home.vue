<template>
  <div class="home">
    <p>Home<p/>
    <p>State: {{getApa()}}</p>
    <button @click="inc()">Inc</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
  },
  methods: {
    getApa() {
      return this.$store.state.count;
    },
    inc() {
      this.$store.commit('increment');
    }
  }
}
</script>
