<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-toolbar flat dark color="light-blue darken-2" dark>
        <v-toolbar-title> {{ title}} </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container grid-lis-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field v-model="sensor.id" label="ID No" color="light-blue darken-2" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="sensor.name" label="Nombre" color="light-blue darken-2" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-select
                label="Cluster"
                :items="clusters"
                item-text="name"
                item-value="_id"
                v-model="sensor.cluster"
                required
              ></v-select>
              </v-flex>
            <v-flex xs12>
              <v-text-field type="number" v-model="sensor.position.lat" label="Latitud" color="light-blue darken-2" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field type="number" v-model="sensor.position.lng" label="Longitud" color="light-blue darken-2" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-btn :loading="loading" v-if="title === 'Nuevo HeartBeat'" block color="light-blue darken-2" dark @click="submitSensor(sensor)">Agregar</v-btn>
              <v-btn :loading="loading" v-else block color="light-blue darken-2" dark @click="updateSensor(sensor)">Actualizar</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>


<script>
import {sensorService} from '@/services/Sensor.service'
import {clusterService} from '@/services/Cluster.service'
export default {
  data () {
    return {
      sensor: {
        position: {
          lat: Number,
          lng: Number
        }
      },
      clusters: [],
      title: '',
      loading: false
    }
  },
  created () {
    let vm = this
    vm.getClusters()
    vm.$parent.$on('crear', () => {
      vm.title = 'Nuevo HeartBeat'
    })

    vm.$parent.$on('editar', sensor => {
      vm.title = 'Editar HeartBeat'
      vm.sensor = sensor
    })
  },
  props: ['dialog'],
  methods: {
    newSensor (sensor) {
      let vm = this
      vm.sensor = sensor
    },
    submitSensor (model) {
      let vm = this
      vm.loading = true
      sensorService.save(model).then(data => {
        vm.$emit('newSensor', data.body)
        vm.closeDialog()
        vm.loading = false
      })
    },
    updateSensor (sensor) {
      let vm = this
      vm.loading = true
      sensorService.update(sensor._id, sensor).then(data => {
        vm.loading = false
        vm.$emit('updateSensor')
        vm.$emit('closeDialog')
        vm.sensor = {
          position: {
            lat: Number,
            lng: Number
          }
        }
      })
    },
    getClusters () {
      let vm = this
      clusterService.query().then(data => {
        vm.clusters = data.body
      })
    },
    closeDialog () {
      let vm = this
      vm.sensor = {
        position: {
          lat: Number,
          lng: Number
        }
      }
      vm.$emit('closeDialog')
    }
  }
}
</script>
