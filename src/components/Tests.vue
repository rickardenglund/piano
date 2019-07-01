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
        return trainer.detectMajorScale([60, 62, 64, 65, 67, 69, 71, 72, 71, 69, 67, 65, 64, 62, 60])
          && !trainer.detectMajorScale([60, 63, 64, 65, 67, 69, 71, 72, 71, 69, 67, 65, 64, 62, 60])
          && trainer.detectMajorScale([52, 60, 62, 64, 65, 67, 69, 71, 72, 71, 69, 67, 65, 64, 62, 60])
          && trainer.detectMajorScale([52, 60, 62, 64, 65, 67, 69, 71, 72, 71, 69, 67, 65, 64, 62, 60, 3])
          && trainer.detectDoubleMajorScale([ 60, 48, 50, 62, 52, 64, 53, 65, 55, 67, 57, 69, 59, 71, 72, 60, 59, 71, 69, 57, 67, 55, 53, 65, 64, 52, 50, 62, 48, 60])
          && !trainer.detectDoubleMajorScale([20, 32, 20, 32, 20, 32, 20, 32, 20, 32, 20, 32, 20, 32, 20, 32, 20, 32, 20, 32, 20, 32, 20, 32, 20, 32, 20, 32, 20, 32])
          && trainer.detectDoubleMajorScale([34, 60, 48, 50, 62, 52, 64, 53, 65, 55, 67, 57, 69, 59, 71, 72, 60, 59, 71, 69, 57, 67, 55, 53, 65, 64, 52, 50, 62, 48, 60, 34])
          && !trainer.detectDoubleMajorScale([60, 48, 33, 50, 62, 52, 64, 53, 65, 55, 67, 57, 69, 59, 71, 72, 60, 59, 71, 69, 57, 67, 55, 53, 65, 64, 52, 50, 62, 48, 60])
          && !trainer.detectDoubleMajorScale([50, 62, 52, 64, 53, 65, 55, 67, 57, 69, 59, 71, 72, 60, 59, 71, 69, 57, 67, 55, 53, 65, 64, 52, 50, 62, 48, 60]);
      }
    }
  }
</script>
<style>

</style>
