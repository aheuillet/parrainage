<template>
  <v-app>
    <v-app-bar color="blue" dark app>
      <v-toolbar-title>Soirée parrainage 2019</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn to="/sell" icon>
        <v-icon>mdi-currency-eur</v-icon>
      </v-btn>
      <v-btn to="/settings" icon>
        <v-icon>mdi-settings</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
    <v-footer color="primary lighten-1" padless>
      <v-row justify="center" no-gutters>
        <v-btn v-for="link in links" :key="link" color="white" text rounded class="my-2">{{ link }}</v-btn>
        <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} —
          <strong>BDE Enseirb-Matmeca</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>
