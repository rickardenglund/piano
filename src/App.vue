<template>
  <div id="app">
    <PianoConnection></PianoConnection>
    <div id="nav">
      | <router-link to="/">View</router-link> |
      <router-link to="/repeatTrainer">Repeat Trainer</router-link> |
      <router-link to="/scaleTrainer">Scales</router-link> |
      <router-link to="/playback">Playback</router-link> |
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 105px;
}
</style>
<script>
  import PianoConnection from "./components/PianoConnection";
  export default {
    components: {PianoConnection}
  }
</script>