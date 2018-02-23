<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-toolbar flat dark color="green darken-1" dark>
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
              <v-text-field v-model="sensor.id" label="ID No" color="green darken-1" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="sensor.name" label="Nombre" color="green darken-1" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field type="number" v-model="sensor.position.lat" label="Latitud" color="green darken-1" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field type="number" v-model="sensor.position.lng" label="Longitud" color="green darken-1" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-btn :loading="loading" v-if="title === 'Nuevo HeartBeat'" block color="green darken-1" dark @click="submitSensor(sensor)">Agregar</v-btn>
              <v-btn v-else block color="green darken-1" dark @click="updateSensor(sensor)">Actualizar</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>


<script>
import {sensorService} from '@/services/Sensor.service'
export default {
  data () {
    return {
      sensor: {
        position: {
          lat: Number,
          lng: Number
        }
      },
      title: '',
      loading: false
    }
  },
  created () {
    let vm = this
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
        vm.$emit('newSensor', data.body.sensor)
        vm.closeDialog()
      })
    },
    updateSensor (sensor) {
      let vm = this
      vm.loading = true
      sensorService.update(sensor._id, sensor).then(data => {
        console.log(data)
        vm.$emit('updateSensor')
        vm.$emit('closeDialog')
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
