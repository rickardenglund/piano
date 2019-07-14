<template>
  <div class="scale" @click="display = !display">

    <h2>{{scale.scale}}</h2>
    <p>{{index}} :  Total time:{{scale.time.toFixed(2)}} ms Velocity Variance:
      {{scale.velocityVariance.toFixed(2)}}</p>
    <p v-if="scale.splitpitches">
      : LeftVariance: {{scale.leftHandVariance.toFixed(0) }} RightVariance: {{scale.rightHandVariance.toFixed(0)}}
    </p>

    <div v-if="display">
      <canvas :id="'right'+index" width="600px" height="120px"></canvas>
      <canvas :id="'left'+index" width="600px" height="120px"></canvas>
    </div>
  </div>
</template>

<script>
  import Chart from 'chart.js'
  import {getMean} from '../js/utilities'


  export default {
    name: "Scale",
    data() {
      return {
        display: true
      };
    },
    props: ['scale', 'index'],
    mounted() {
      if (this.scale.leftTimes) {
        let leftMean = getMean(this.scale.leftTimes);
        let ctx = document.getElementById('left' + this.index);
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.scale.leftTimes.map((o, index) => {
              return index
            }),
            datasets: [{
              label: 'Left hand: ' + leftMean,
              data: this.scale.leftTimes.map(x => {
                return Math.round(x - leftMean);
              }),
              backgroundColor: this.scale.leftTimes.map(t => {
                return Math.abs(t - leftMean) > 0.2 * leftMean ? 'rgba(255, 0, 0, 0.5)' : 'rgba(10, 99, 15, 0.2)'
              }),
              // borderColor: [
              //   'rgba(255, 99, 132, 1)',
              // ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: false,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      }
      if (this.scale.rightTimes) {
        let rightMean = getMean(this.scale.rightTimes);
        let ctx = document.getElementById('right' + this.index);
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.scale.rightTimes.map((o, index) => {
              return index
            }),
            datasets: [{
              label: 'Right hand',
              data: this.scale.rightTimes.map(x => {
                return x - rightMean
              }),
              backgroundColor: this.scale.rightTimes.map(t => {
                return Math.abs(t - rightMean) > 0.2 * rightMean ? 'rgba(255, 0, 0, 0.5)' : 'rgba(10, 99, 15, 0.2)'
              }),
              // borderColor: [
              //   'rgba(255, 99, 132, 1)',
              // ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: false,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: false
                }
              }]
            }
          }
        });
      }
    }
  }
</script>

<style scoped>
.scale {
  background-color: white;
  margin: 5px;
  padding-top: 10px;
  padding-left: 40px;
  /*padding: 10px;*/
  position: relative;
  width: 700px;
  /*border: gray solid 3px;*/
  box-shadow: 12px 10px 45px -9px rgba(0,0,0,0.75);
}

  h2 {
    position: absolute;
    top: -10px;
    left: -20px;
    background-color: lightgray;
    padding: 10px;
  }
</style>
