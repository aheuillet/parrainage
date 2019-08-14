import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firebaseAction } from 'vuexfire'
const fb = require('./firebaseConfig.js')


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    racers: {}
  },
  mutations: vuexfireMutations,
  actions: {
    bindRacers: firebaseAction(context => {
       // return the promise returned by `bindFirebaseRef`
       return context.bindFirebaseRef('racers', fb.database.ref('soiree-parrainage-2019').child('racers'))
    })
  }
})
