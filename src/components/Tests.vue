<template>
    <div>
        <h5>Tests</h5>
    <p v-if="test()" style="color: green;">Test passed</p>
    <p v-else="test()" style="color: red;">Test failed</p>
    </div>
</template>
<script>
  import Trainer from '../trainer'
  export default {
    name: 'Tests',
    methods: {
      test() {
        let trainer = new Trainer();
        return trainer.detectMajorScale([60,62,64,65,67,69,71,72])
          &&! trainer.detectMajorScale([60,63,64,65,67,69,71,72])
          && trainer.detectMajorScale([52,60,62,64,65,67,69,71,72])
          && trainer.detectMajorScale([52,60,62,64,65,67,69,71,72, 3]);
      }
    }
  }
</script>
<style>

</style>
