<template>
  <v-layout wrap justify-center text-center>
    <v-dialog v-model="dialog" persistent>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
    </v-dialog>
    <v-flex xs12>
      <v-card class="mx-auto mb-3">
        <v-card-title>Vendre une boisson</v-card-title>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-banner two-line>
        <v-avatar slot="icon" color="green" size="40">
          <v-icon icon="mdi-lock" color="white">mdi-laptop</v-icon>
        </v-avatar>Filière info
        <template v-slot:actions>
          <v-btn @click="startSell('info')" text color="green">Vendre</v-btn>
        </template>
      </v-banner>
      <v-banner two-line>
        <v-avatar slot="icon" color="blue accent-4" size="40">
          <v-icon icon="mdi-lock" color="white">mdi-bug</v-icon>
        </v-avatar>Filière élec
        <template v-slot:actions>
          <v-btn @click="startSell('elec')" text color="blue accent-4">Vendre</v-btn>
        </template>
      </v-banner>
      <v-banner two-line>
        <v-avatar slot="icon" color="yellow" size="40">
          <v-icon icon="mdi-lock" color="white">mdi-wifi</v-icon>
        </v-avatar>Filière télécom
        <template v-slot:actions>
          <v-btn @click="startSell('telecom')" text color="yellow">Vendre</v-btn>
        </template>
      </v-banner>
      <v-banner two-line>
        <v-avatar slot="icon" color="red darken-2" size="40">
          <v-icon icon="mdi-lock" color="white">mdi-android-studio</v-icon>
        </v-avatar>Filière matméca
        <template v-slot:actions>
          <v-btn @click="startSell('matmeca')" text color="red darken-2">Vendre</v-btn>
        </template>
      </v-banner>
      <v-banner two-line>
        <v-avatar slot="icon" color="pink lighten-3" size="40">
          <v-icon icon="mdi-lock" color="white">mdi-cellphone-wireless</v-icon>
        </v-avatar>Filière SEE
        <template v-slot:actions>
          <v-btn @click="startSell('see')" text color="pink lighten-3">Vendre</v-btn>
        </template>
      </v-banner>
      <v-banner two-line>
        <v-avatar slot="icon" color="deep-purple" size="40">
          <v-icon icon="mdi-lock" color="white">mdi-lan-connect</v-icon>
        </v-avatar>Filière RSI
        <template v-slot:actions>
          <v-btn @click="startSell('rsi')" text color="deep-purple">Vendre</v-btn>
        </template>
      </v-banner>
    </v-flex>
    <v-bottom-sheet v-model="sheet" persistent>
      <v-sheet class="text-center" height="150px">
        <div class="py-3">
          <strong>Confirmer la vente ?</strong>
        </div>
        <v-btn class="mt-6" text color="red" @click="abortSell()">Annuler</v-btn>
        <v-btn class="mt-6" text color="green" @click="confirmSell()">Confirmer</v-btn>
      </v-sheet>
    </v-bottom-sheet>
  </v-layout>
</template>

<script>
import { db, fire } from "../firebaseConfig";
import * as firebaseui from 'firebaseui';
export default {
  name: "sell",
  data: () => ({
    racers: {},
    settings: {},
    selected: null,
    sheet: false,
    dialog: true
  }),
  computed: {
    greaterPopSize: function() {
      var max = 1;
      for (var racerName in this.racers) {
        const racer = this.racers[racerName];
        if (racer.size > max) {
          max = racer.size;
        }
      }
      return max;
    }
  },
  firebase: {
    settings: db.ref("settings"),
    racers: db.ref("racers")
  },
  methods: {
    sellOne: function(target) {
      this.racers[target].score +=
        this.greaterPopSize / this.racers[target].size;
      db.ref("racers/" + target + "/score").set(
        Math.round(this.racers[target].score)
      );
    },
    confirmSell: function() {
      if (this.selected != null) {
        this.sellOne(this.selected);
        this.sheet = false;
        this.selected = null;
      }
    },
    startSell: function(target) {
      if (this.settings.sell_confirm) {
        this.selected = target;
        this.sheet = true;
      } else {
        this.sellOne(target);
      }
    },
    abortSell: function() {
      this.sheet = false;
      this.selected = null;
    },
    launchFirebaseUI: function() {
      var ui = new firebaseui.auth.AuthUI(fire.auth());
      var _this = this;
      var uiConfig = {
        callbacks: {
          // eslint-disable-next-line
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            _this.dialog = false;
            return false;
          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById("loader").style.display = "none";
          }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: "popup",
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,  
        signInSuccessUrl: window.location.pathname,
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          {
            provider: fire.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false
          }
        ],
        // Terms of service url.
        tosUrl: "none",
        // Privacy policy url.
        privacyPolicyUrl: "none"
      };
      ui.start("#firebaseui-auth-container", uiConfig);
    }
  },
  mounted: function() {
    this.launchFirebaseUI();
  }
};
</script>