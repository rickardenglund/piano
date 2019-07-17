export function getTime() {
  let date = new Date();
  return date.getTime();
}

export function getNoteName(pitch) {
  const noteNames = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
  return noteNames[pitch % 12];
}

export function toName(pitch) {
  let letter = getNoteName(pitch);
  let octave =Math.floor(pitch / 12);
  return letter + '' + octave;
}

export function getVariance(numbers) {
  let mean = getMean(numbers);
  let diffSquare = numbers.map(a => a - mean).map(a => a * a);
  return diffSquare.reduce((a, b) => a + b, 0) / mean;


}

export function getMean(numbers) {
  return numbers.reduce((a, b) => b + a, 0) / numbers.length;
}


export function split(arr) {
  let left = [];
  let right = [];
  for (let i = 1; i < arr.length; i += 2) {
    if (arr[i].pitch > arr[i - 1].pitch) {
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
    res.push(arr[i] - arr[i - 1]);
  }
  return res;
}
