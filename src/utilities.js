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
