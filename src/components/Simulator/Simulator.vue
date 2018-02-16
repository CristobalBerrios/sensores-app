<template>
  <v-card class="card-content elevation-3">
    <v-layout row wrap>
      <v-flex xs10>
        <h1 class="display-1">Modo Monitoreo</h1>
        <br>
      </v-flex>
      <v-flex xs12 md4>
        <monitoreo-card style="margin: 2px;"></monitoreo-card>
      </v-flex>
      <v-flex xs12 md8>
        <gmap-map
        :center="{lat:-33.4, lng:-71.6}"
        :zoom="9"
        map-type-id="terrain"
        style="width: 100%; height: 400px; margin: 2px;"
        :clickable="true"
        :draggable="true">
          <gmap-marker
          :key="index"
          v-for="(sensor, index) in sensores"
          :title="sensor.name"
          :position="sensor.position"
          :icon="{url:'static/map-pin.png'}"
          :clickable="true"
          :draggable="true">
          </gmap-marker>
        </gmap-map>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import MonitoreoCard from '@/components/Simulator/MonitoreoCard'
import {sensorService} from '@/services/Sensor.service'
export default {
  data () {
    return {
      sensores: {
        position: {
          lat: Number,
          lng: Number
        }
      }
    }
  },
  components: {MonitoreoCard},
  mounted () {
    let vm = this
    vm.getSensores()
  },
  methods: {
    getSensores () {
      let vm = this
      sensorService.query().then(data => {
        vm.sensores = data.body
      })
    }
  }
}
</script>

