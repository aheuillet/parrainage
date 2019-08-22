<template>
  <v-layout wrap justify-center text-center>
    <v-container>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title class="blue white--text">Paramètres</v-card-title>
          <br />
          <v-card-text>
            <v-btn
              color="red"
              dark
              @click="resetData()"
              style="margin-bottom:10px;"
            >Remettre à zéro les scores</v-btn>
            <v-row justify="space-around">
              <v-switch
                class="mx-2"
                color="green"
                v-model="settings.sell_confirm"
                label="Confirmation lors de la vente"
              ></v-switch>
            </v-row>
            <v-col cols="12">
              <v-subheader class="pl-0" style="margin-bottom:1.2rem;">Délai avant la mise à jour du score (en ms)</v-subheader>
              <v-slider 
              v-model="settings.refresh_rate" 
              step="100"
              min="1000"
              max="10000" 
              thumb-size="30" 
              thumb-label="always" 
              prepend-icon="mdi-clock">
              </v-slider>
            </v-col>
          </v-card-text>
        </v-card>
        <v-snackbar v-model="snackbar">
          {{ text }}
          <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
        </v-snackbar>
      </v-flex>
    </v-container>
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
    text: "Scores remis à zéro"
  }),
  firebase: {
    settings: db.ref("settings"),
    racers: db.ref("racers")
  },
  watch: {
    settings: {
      handler: function() {
        db.ref("settings").set(this.settings);
        this.text = "Paramètres mis à jour";
        this.snackbar = true;
      },
      deep: true
    }
  },
  methods: {
    resetData: function() {
      for (let racerName in this.racers) {
        db.ref("racers/" + racerName + "/score")
          .set(0)
          .then(() => {
            this.text = "Scores remis à zéro";
            this.snackbar = true;
          });
      }
    }
  }
};
</script>