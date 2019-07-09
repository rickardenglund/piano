export function getNoteName(pitch) {
  const noteNames = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
  return noteNames[pitch % 12];
}

export function getVariance(numbers) {
  let mean = getMean(numbers);
  let diffSquare = numbers.map(a => a - mean).map(a => a*a);
  return diffSquare.reduce((a,b) => a + b, 0) / mean;


}

function getMean(numbers) {
  return numbers.reduce((a, b) => b + a, 0) / numbers.length;
}


export function split(arr) {
  let left = [];
  let right = [];
  for (let i = 1; i < arr.length; i += 2) {
    if (arr[i].pitch > arr[i-1].pitch) {
      right.push(arr[i]);
      left.push(arr[i - 1]);
    } else {
      left.push(arr[i]);
      right.push(arr[i - 1]);
    }
  }
  return {left, right}
}

export function getStepSizes(arr) {
  let res = [];
  for (let i = 1; i < arr.length; i++) {
    res.push(arr[i] - arr[i-1]);
  }
  return res;
}
