<template>
<section>
  <v-card class="card-content elevation-3">
    <v-layout row wrap>
      <v-flex md10 xs12>
        <h1 class="display-1">HEARTBEAT</h1>
      </v-flex>
      <v-flex md2 xs12>
        <p>Actualizado hace 1 minuto</p>
      </v-flex>
      <v-flex xs12>
        <v-flex offset-md9 md3 xs12>
          <v-btn @click="submitHistorical" small round dark color="green">Enviar Informacion</v-btn>
          <v-btn @click="dlgCluster = true" small round dark color="light-blue darken-2">Clusters</v-btn>
        </v-flex>
        <v-data-table
        :headers="headers"
        :items="sensores"
        hide-actions
        class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="text-xs-lefts">{{ props.item.name }}</td>
          <td class="text-xs-left">
            <v-btn v-if="props.item.isOnline" style="margin:0px;" small round color="green" dark>Online</v-btn>
            <v-btn v-else style="margin:0px;" small round color="red" dark>Offline</v-btn>
          </td>
          <td class="text-xs-left">{{ props.item.id }}</td>
          <td class="text-xs-left"><a class="my-link" target="_blank" :href="'https://www.google.com/maps/?q=' +props.item.position.lat + ','+ props.item.position.lng ">{{ props.item.position.lat }} , {{props.item.position.lng}}</a></td>
          <td v-if ="props.item.last_connection" class="text-xs-left">
            {{ moment(props.item.last_connection).format('DD-MM-YYYY')}} - {{ moment(props.item.last_connection).format('hh:mm A') }}
          </td>
          <td v-else class="text-xs-left">No ha tenido Conexión</td>
          <td v-if ="props.item.last_event" class="text-xs-left">
            {{ moment(props.item.last_event).format('DD-MM-YYYY') }} - {{ moment(props.item.last_event).format('hh:mm A') }}
          </td>
          <td v-else class="text-xs-left">No tiene Alertas</td>
          <td class="text-xs-left">
            <v-btn @click="showForm(props.item)" fab dark small color="light-blue darken-1">
              <v-icon dark>edit</v-icon>
            </v-btn>
            <v-btn @click="sensor = props.item; dlgEliminarSensor = true" fab dark small color="red">
              <v-icon dark>delete</v-icon>
            </v-btn>
          </td> 
        </template>
      </v-data-table>
      </v-flex>
    </v-layout>
  </v-card>

  <v-btn fab dark color="light-blue darken-3" class="btn-flotante" @click="showForm()">
    <v-icon dark>add</v-icon>
  </v-btn>

  <v-snackbar
    :timeout="4000"
    :top="snackBar.top"
    v-model="snackBar.model"
    color="success">
    {{ snackBar.message }}
    <v-btn flat color="white" @click.native="snackBar.model = false">Cerrar</v-btn>
  </v-snackbar>


  <v-dialog v-model="dlgEliminarSensor" persistent max-width="350px">
    <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Eliminar HeartBeat</h3>
            <div>Esta seguro de eliminar el Heartbeat {{sensor.name}}</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn @click="deleteSensor(sensor)" flat color="green">Confirmar</v-btn>
          <v-btn @click="dlgEliminarSensor = false" flat color="red">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>

  <sensor-form 
    :dialog="dialog"
    @newSensor="pushSensor"
    @updateSensor="getSensores(); showSnackBar('HeartBeat Actualizado') "
    @closeDialog="dialog = false">
  </sensor-form>

  <cluster 
    :dialog="dlgCluster" 
    @closeDialog="dlgCluster = false">
  </cluster>
</section>
</template>

<script>
import Vue from 'vue'
import {sensorService} from '@/services/Sensor.service'
import {historicalService} from '@/services/Historical.service'
import SensorForm from '@/components/Sensor/SensorForm'
import Cluster from '@/components/Cluster/Cluster'

export default {
  data () {
    return {
      headers: [
        {text: 'Nombre', align: 'left', sortable: false, value: 'name'},
        {text: 'Status', align: 'left', sortable: false, value: 'status'},
        {text: 'ID No.', align: 'left', sortable: false, value: 'id'},
        {text: 'Geolocalización', align: 'left', sortable: false, value: 'latitude'},
        {text: 'Ultima Conexión', align: 'left', sortable: false, value: 'last_connection'},
        {text: 'Ultima Alerta', align: 'left', sortable: false, value: 'last_alert'},
        {text: '', align: 'left', sortable: false}
      ],
      sensores: [],
      sensor: {},
      dialog: false,
      dlgCluster: false,
      dlgEliminarSensor: false,
      snackBar: {
        model: false,
        message: '',
        top: false
      }
    }
  },
  components: {SensorForm, Cluster},
  mounted () {
    let vm = this
    vm.getSensores()
    setInterval(() => {
      vm.getSensores()
      vm.showSnackBar('Heartbeats Actualizados', true)
    }, 60000)
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
    },
    deleteSensor (sensor) {
      let vm = this
      vm.dlgEliminarSensor = false
      sensorService.destroy(sensor._id).then(response => {
        vm.getSensores()
        vm.showSnackBar('El heartbeat ' + sensor.name + ' fue eliminado')
      })
    },
    showForm (sensor) {
      let vm = this
      if (sensor) vm.$emit('editar', Vue.util.extend({}, sensor))
      else vm.$emit('crear')
      vm.dialog = true
    },
    showSnackBar (message, top) {
      let vm = this
      if (top) vm.snackBar.top = true
      else vm.snackBar.top = false
      vm.snackBar.message = message
      vm.snackBar.model = true
    },
    submitHistorical () {
      let vm = this
      let data = []
      let event = {}
      vm.sensores.forEach(sensor => {
        event = {
          _id: sensor._id,
          intensity: 2.1
        }
        data.push(event)
      })
      historicalService.save(data).then(data => {
        vm.showSnackBar('Informacion enviada')
      }, response => {
        vm.showSnackBar('Error al enviar la informacion')
      })
    }
  }
}
</script>

<style scoped>
.btn-flotante {
    position: fixed;
    right: 8px;
    bottom: 8px;
}
.my-link {
  color:rgba(0,0,0,.87);
}
a:hover {
  color:#43a047;
}

</style>


