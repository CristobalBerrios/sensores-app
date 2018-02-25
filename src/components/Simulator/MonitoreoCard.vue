<template>
  <v-card color="grey darken-2" dark>
    <v-toolbar flat dark color="grey darken-3" dark>
      <v-toolbar-title>ULTIMO EVENTO DETECTADO</v-toolbar-title>
    </v-toolbar>
    <v-container fluid grid-list-xs>
      <v-layout row wrap>
        <v-flex xs8 offset-xs2>
          <h1 v-if="intensity < 5" class="text-xs-center display-4 green--text">{{ intensity }}</h1>
          <h1 v-if="intensity >= 5 && intensity < 8" class="text-xs-center display-4 yellow--text">{{ intensity }}</h1>
          <h1 v-if="intensity >= 8" class="text-xs-center display-4 red--text">{{ intensity }}</h1>
          <h1 class="text-xs-center">Mercalli</h1>
        </v-flex>
        <v-flex xs12>
          <h1 v-if="intensity" class="text-xs-center">{{ date }} - {{ hour }}</h1>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: ['intensity', 'date', 'hour']
}
</script>

