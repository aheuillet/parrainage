<template>
  <v-app>
    <v-app-bar color="cyan" dark app>
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
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>
