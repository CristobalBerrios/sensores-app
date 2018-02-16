<template>
  <v-card class="card-content elevation-3">
    <v-layout row wrap>
      <v-flex xs10>
        <h1 class="display-1">HEARTBEAT SYSMOS</h1>
      </v-flex>
      <v-flex xs2>
        <p>Actualizado hace 1 minuto</p>
      </v-flex>
      <v-flex xs12>
        <br>
        <v-data-table
        :headers="headers"
        :items="sensores"
        hide-actions
        class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="text-xs-lefts">{{ props.item.name }}</td>
          <td class="text-xs-left"><v-btn style="margin:0px;" small round color="green" dark>Online</v-btn></td>
          <td class="text-xs-left">{{ props.item.id }}</td>
          <td class="text-xs-left"><a target="_blank" :href="'https://www.google.com/maps/?q=' +props.item.position.lat + ','+ props.item.position.lng ">{{ props.item.position.lat }} , {{props.item.position.lng}}</a></td>
          <td class="text-xs-left">08/02/2018 11:05 AM</td>
          <td class="text-xs-left">03/02/2018 03:43 AM</td>
        </template>
      </v-data-table>
      </v-flex>

      <v-btn style="position: fixed;" fab dark color="green darken-1" class="btn-flotante" @click="dialog = true">
        <v-icon dark>add</v-icon>
      </v-btn>

      <sensor-form 
      :dialog="dialog"
      @newSensor="pushSensor"
      @closeDialog="dialog = false">
      </sensor-form>
    </v-layout>
  </v-card>
</template>

<script>
import {sensorService} from '@/services/Sensor.service'
import SensorForm from '@/components/Sensor/SensorForm'
export default {
  data () {
    return {
      headers: [
        {text: 'Nombre', align: 'left', sortable: false, value: 'name'},
        {text: 'Status', align: 'left', sortable: false, value: 'status'},
        {text: 'ID No.', align: 'left', sortable: false, value: 'id'},
        {text: 'Geolocalización', align: 'left', sortable: false, value: 'latitude'},
        {text: 'Ultima Conexión', align: 'left', sortable: false, value: 'last_connection'},
        {text: 'Ultima Alerta', align: 'left', sortable: false, value: 'last_alert'}
      ],
      sensores: [],
      dialog: false
    }
  },
  components: {SensorForm},
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
    },
    pushSensor (sensor) {
      let vm = this
      vm.sensores.push(sensor)
    }
  }
}
</script>

<style scoped>
a {
  color:rgba(0,0,0,.87);
}
a:hover {
  color:#43a047;
}

</style>


