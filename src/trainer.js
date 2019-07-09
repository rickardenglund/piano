import {getNoteName, getVariance} from './utilities'

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

  detectDoubleMajorScale(notes) {
    for (let i = 0; i < notes.length; i++) {
      let res = this.isDoubleMajorScale(notes.slice(i, notes.length));
      if (res) {
        return res;
      }
    }
    return false;
  }

  isDoubleMajorScale(notes) {
    if (notes.length < 2 * this.majorScaleOffsets.length) return false;
    notes = notes.slice(0, this.majorScaleOffsets.length * 2);

    let pitches = notes.map((note) => note.pitch);
    let tonic = pitches[0];
    for (let i = 0; i < this.majorScaleOffsets.length; i++) {
      if ( !((pitches[i*2] === tonic + this.majorScaleOffsets[i] || pitches[i*2 + 1] === tonic + this.majorScaleOffsets[i])
              && Trainer.sameNote(pitches[i*2], pitches[i*2+1]))
            ) {
        return false;
      }
    }

    console.log('Double Major scale: ' + tonic);
    console.log(notes);
    let time = notes[notes.length - 1].playTime - notes[0].playTime;
    return {scale: getNoteName(tonic), time, velocityVariance: getVariance(notes.map(note => note.velocity))};
  }

  static sameNote(note1, note2) {
    return note1 %  12 === note2 % 12;
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
