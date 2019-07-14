import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lastNotes: [],
    midiChannel: undefined,
  },
  mutations: {
    newNote(state, note) {
      state.lastNotes.push(note)
    },
    clearNotes(state) {
      state.lastNotes = [];
    },
    setMidiChannel(state, midiChannel) {
      state.midiChannel = midiChannel;
    }
  },
  actions: {

  }
})
