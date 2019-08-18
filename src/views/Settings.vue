<template>
  <v-layout wrap justify-center text-center>
    <v-flex xs12>
      <v-card>
        <v-card-title>Paramètres</v-card-title>
        <v-card-text>
          <v-btn color="primary" @click="resetData()">Remettre à zéro les scores</v-btn>
        </v-card-text>
      </v-card>
      <v-snackbar v-model="snackbar">
        {{ text }}
        <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-flex>
  </v-layout>
</template>

<script>
import { db } from "../firebaseConfig";
export default {
  name: "settings",
  data: () => ({
    settings: {},
    racers: {},
    snackbar: false,
    text: "Scores remis à zéro",
  }),
  firebase: {
    settings: db.ref("settings"),
    racers: db.ref("racers")
  },
  methods: {
    resetData: function() {
      for (let racerName in this.racers) {
        db.ref("racers/" + racerName + "/score").set(0).then(() => {
            this.snackbar = true;
        });
      }
    }
  }
};
</script>