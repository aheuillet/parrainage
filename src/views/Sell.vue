<template>
  <v-layout wrap justify-center align-content-center text-center>
    <v-flex xs12>
      <v-card class="mx-auto">
        <v-card-title>Vendre une boisson</v-card-title>
        <v-card-actions>
          <v-btn @click="sellOne('info')">
            <v-icon>mdi-laptop</v-icon>Info
          </v-btn>
          <v-btn @click="sellOne('elec')">
            <v-icon>mdi-bug</v-icon>Elec
          </v-btn>
          <v-btn @click="sellOne('telecom')">
            <v-icon>mdi-wifi</v-icon>Télécom
          </v-btn>
          <v-btn @click="sellOne('matmeca')">
            <v-icon>mdi-android-studio</v-icon>Matméca
          </v-btn>
          <v-btn @click="sellOne('ensegid')">
            <v-icon>mdi-terrain</v-icon>Ensegid
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { db } from '../firebaseConfig';
export default {
  name: 'sell',
  data: () => ({
    racers: []
  }),
  firebase: {
    racers: db.ref("racers")
  },
  methods: {
    sellOne: function (target) {
      this.racers[target].score++;
    }
  }
}
</script>