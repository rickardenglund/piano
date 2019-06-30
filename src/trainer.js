export default class Trainer {
  constructor() {

  }

  detectMajorScale(notes) {
    for (let i = 0; i < notes.length; i++) {
      if (this.isMajorScale(notes.slice(i, notes.length))) {
        return true;
      }
    }
    return false;
  }

  isMajorScale(notes) {
    if (notes.length < this.majorScaleOffsets.length) return false;

    notes = notes.slice(0, this.majorScaleOffsets.length);

    let tonic = notes[0];

    for (let i = 1; i < notes.length; i++) {
      if (notes[i] != tonic + this.majorScaleOffsets[i]) {
        return false;
      }
    }
    return true;
  }
  majorScaleOffsets = [0, 2, 4, 5, 7, 9, 11, 12, 11, 9, 7, 5, 4, 2, 0];

}
