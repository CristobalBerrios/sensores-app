<template>
  <v-card class="card-content elevation-3">
    <v-layout row wrap>
      <v-flex xs12 md8 lg8>
        <h1 class="display-1">MONITOR DE SISMOS EN TIEMPO REAL</h1>
      </v-flex>
      <v-flex xs12 md4 lg4>
        <v-layout row wrap>
          <v-flex xs12>
            <p class="title-scale">Escala Mercalli (Numérica)</p>
          </v-flex>
          <v-flex xs12>
            <img :src="scale" width="100%" alt="">
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 md4>
        <v-card class="frame elevation-3">
          <monitoreo-card 
          :intensity="last_event.intensity"
          :date="moment(last_event.date).format('DD-MM-YYYY')"
          :hour="moment(last_event.date).format('hh:mm A')"
          style="margin: 2px;">
          </monitoreo-card>
        </v-card>
      </v-flex>
      <v-flex xs12 md8>
        <v-card class="frame elevation-3">
          <gmap-map
        :center="{lat:-33.4, lng:-71.6}"
        :zoom="9"
        map-type-id="terrain"
        style="width: 100%; height: 400px; margin: 2px;"
        :clickable="true"
        :draggable="true">
          <div v-for="(sensor, index) in sensores" :key="index">
            <gmap-marker
            v-if="isEvent(sensor._id)"
          :title="sensor.name"
          :position="sensor.position"
          :icon="{url:iconMarkerRed}"
          :clickable="true"
          :draggable="true">
          </gmap-marker>
            <gmap-marker
            v-else
          :title="sensor.name"
          :position="sensor.position"
          :icon="{url:iconMarkerGreen}"
          :clickable="true"
          :draggable="true">
          </gmap-marker>
          </div>
        </gmap-map>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <h2>REGISTRO DE EVENTOS DETECTADOS</h2>
      </v-flex>
      <v-flex xs12>
        <v-data-table
        :headers="headers"
        :items="events"
        hide-actions
        class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="text-xs-lefts">{{ moment(props.item.date).format('DD-MM-YYYY') }}</td>
          <td class="text-xs-left">{{  moment(props.item.date).format('hh:mm A') }}</td>
          <td class="text-xs-left">{{ props.item.intensity }}</td>
          <td class="text-xs-left">{{ props.item.sensors.length }}</td>
        </template>
      </v-data-table>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import MonitoreoCard from '@/components/Simulator/MonitoreoCard'
import {sensorService} from '@/services/Sensor.service'
import {eventService} from '@/services/Event.service'
import iconGreen from '@/assets/marker-green.png'
import iconRed from '@/assets/marker-red.png'
import Scale from '@/assets/escala.png'
export default {
  data () {
    return {
      headers: [
        {text: 'Fecha', align: 'left', sortable: false},
        {text: 'Hora', align: 'left', sortable: false},
        {text: 'intensidad', align: 'left', sortable: false},
        {text: 'N° Sensores Activados', align: 'left', sortable: false}
      ],
      sensores: [],
      events: [],
      last_event: {
        intensity: 0,
        date: '00-00-0000',
        hour: '00-00',
        sensors: []
      },
      iconMarkerGreen: iconGreen,
      iconMarkerRed: iconRed,
      scale: Scale
    }
  },
  components: {MonitoreoCard},
  mounted () {
    let vm = this
    vm.getEvents()
    vm.getSensores()
  },
  methods: {
    getSensores () {
      let vm = this
      sensorService.query().then(data => {
        vm.sensores = data.body
      })
    },
    getEvents () {
      let vm = this
      eventService.query().then(data => {
        vm.events = data.body
        if (vm.events.length > 0) vm.last_event = vm.events[0]
      })
    },
    isEvent (id) {
      let vm = this
      let sensors = vm.last_event.sensors
      let is = false
      sensors.forEach(data => {
        if (data === id) {
          is = true
        }
      })

      return is
    }
  }
}
</script>

<style scoped>
  .title-scale {
    margin: 0;
  }

  .frame {
    padding: 10px;
    border-radius: 10px;
    background-color: #EEEEEE;
    margin: 4px;
  }
</style>


