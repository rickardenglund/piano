<template>
  <div>
    <h5>Tests</h5>
    <p v-if="test()" style="color: green;">Test passed</p>
    <p v-else="test()" style="color: red;">Test failed</p>

    <p>Left: {{split().left}}</p>
    <p>Right: {{split().right}}</p>

    <p>StepSizes: {{stepSizes()}}</p>
  </div>
</template>
<script>
  import Trainer from '../trainer'
  import {getStepSizes, split} from '../utilities'

  export default {
    name: 'Tests',
    methods: {
      test() {
        let trainer = new Trainer();
        return trainer.detectMajorScale([60, 62, 64, 65, 67, 69, 71, 72, 71, 69, 67, 65, 64, 62, 60])
          && !trainer.detectMajorScale([60, 63, 64, 65, 67, 69, 71, 72, 71, 69, 67, 65, 64, 62, 60])
          && trainer.detectMajorScale([52, 60, 62, 64, 65, 67, 69, 71, 72, 71, 69, 67, 65, 64, 62, 60])
          && trainer.detectMajorScale([52, 60, 62, 64, 65, 67, 69, 71, 72, 71, 69, 67, 65, 64, 62, 60, 3])
          && trainer.detectDoubleMajorScale([60, 48, 50, 62, 52, 64, 53, 65, 55, 67, 57, 69, 59, 71, 72, 60, 59, 71, 69, 57, 67, 55, 53, 65, 64, 52, 50, 62, 48, 60])
          && !trainer.detectDoubleMajorScale([20, 32, 20, 32, 20, 32, 20, 32, 20, 32, 20, 32, 20, 32, 20, 32, 20, 32, 20, 32, 20, 32, 20, 32, 20, 32, 20, 32, 20, 32])
          && trainer.detectDoubleMajorScale([34, 60, 48, 50, 62, 52, 64, 53, 65, 55, 67, 57, 69, 59, 71, 72, 60, 59, 71, 69, 57, 67, 55, 53, 65, 64, 52, 50, 62, 48, 60, 34])
          && !trainer.detectDoubleMajorScale([60, 48, 33, 50, 62, 52, 64, 53, 65, 55, 67, 57, 69, 59, 71, 72, 60, 59, 71, 69, 57, 67, 55, 53, 65, 64, 52, 50, 62, 48, 60])
          && !trainer.detectDoubleMajorScale([50, 62, 52, 64, 53, 65, 55, 67, 57, 69, 59, 71, 72, 60, 59, 71, 69, 57, 67, 55, 53, 65, 64, 52, 50, 62, 48, 60]);
      },
      split() {
        return split([{pitch: 10}, {pitch: 20}, {pitch: 21}, {pitch: 11}, {pitch: 13}, {pitch: 23}]);
      },
      stepSizes() {
        // return getStepSizes([1,1,2,3,5,8,13,21]);
        return getStepSizes([10, 15, 25, 30]);
      }
    }
  }
</script>
<style>

</style>
