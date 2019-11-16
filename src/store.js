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
      if (state.lastNotes.length > 1000) {
        state.lastNotes = state.lastNotes.slice(-500)
      }

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
