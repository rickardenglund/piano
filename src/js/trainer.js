import {getNoteName, getVariance, split, getStepSizes} from './utilities'

export default class Trainer {
  constructor() {

  }

  detectMajorScale(notes) {
    for (let i = 0; i < notes.length; i++) {
      let res = this.isMajorScale(notes.slice(i, notes.length));
      if (res) {
        return res;
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
    if (notes.length < 2 * this.twoOctavemajorScaleOffsets.length) return false;
    notes = notes.slice(0, this.twoOctavemajorScaleOffsets.length * 2);

    let pitches = notes.map((note) => note.pitch);
    let tonic = pitches[0];
    for (let i = 0; i < this.twoOctavemajorScaleOffsets.length; i++) {
      if ( !((pitches[i*2] === tonic + this.twoOctavemajorScaleOffsets[i] || pitches[i*2 + 1] === tonic + this.twoOctavemajorScaleOffsets[i])
              && Trainer.sameNote(pitches[i*2], pitches[i*2+1]))
            ) {
        return false;
      }
    }

    // eslint-disable-next-line no-console
    console.log('Double Major scale: ' + tonic);
    // console.log(notes);
    let time = notes[notes.length - 1].playTime - notes[0].playTime;
    let splitNotes = split(notes);
    let leftTimes = getStepSizes(splitNotes.left.map(a => a.playTime));
    let rightTimes = getStepSizes(splitNotes.right.map(a => a.playTime));
    return {
      scale: getNoteName(tonic),
      time,
      splitPitches: splitNotes,
      velocityVariance: getVariance(notes.map(note => note.velocity)),
      leftTimes,
      rightTimes,
      leftHandVariance: getVariance(leftTimes),
      rightHandVariance: getVariance(rightTimes),
    };
  }

  static sameNote(note1, note2) {
    return note1 %  12 === note2 % 12;
  }

  isMajorScale(notes) {
    if (notes.length < this.twoOctavemajorScaleOffsets.length) return false;

    notes = notes.slice(0, this.twoOctavemajorScaleOffsets.length);

    let tonic = notes[0].pitch;

    for (let i = 1; i < notes.length; i++) {
      if (notes[i].pitch != tonic + this.twoOctavemajorScaleOffsets[i]) {
        return false;
      }
    }

    let time = notes[notes.length - 1].playTime - notes[0].playTime;
    let rightTimes = getStepSizes(notes.map(a => a.playTime));

    let res = {
      scale: getNoteName(tonic),
      time,
      splitPitches: [],//splitNotes,
      velocityVariance: getVariance(notes.map(note => note.velocity)),
      rightTimes,
      rightHandVariance: getVariance(rightTimes),
    };

    return res;
  }

  majorScaleOffsets = [0, 2, 4, 5, 7, 9, 11, 12, 11, 9, 7, 5, 4, 2, 0];
  twoOctavemajorScaleOffsets = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24, 23, 21, 19, 17, 16, 14, 12, 11, 9, 7, 5, 4, 2, 0];


}
