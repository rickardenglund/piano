import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lastNotes: [],
    midiChannel: undefined,
    midiServer: undefined,
  },
  getters: {
    isConnected(state) {
      return state.midiServer && state.midiServer.connected;
    }
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
    },
    setMidiServer(state, server) {
      state.midiServer = server;
    }
  },
  actions: {

  }
})
