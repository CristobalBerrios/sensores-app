<template>
  <v-dialog v-model="dialog" persistent scrollable max-width="500px">
    <v-card>
      <v-toolbar flat dark color="light-blue darken-2" dark>
        <v-toolbar-title> Clusters </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container grid-lis-md>
          <v-layout wrap>
            <v-flex xs8>
              <v-text-field v-model="cluster.name" label="Nombre" color="light-blue darken-2" required></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-btn @click="submitCluster(cluster)" :loading="loading" color="light-blue darken-2" round dark>Agregar</v-btn>
            </v-flex>
            <v-flex xs10>
              <v-data-table
                :headers="headers"
                :items="clusters"
                hide-actions
                class="elevation-1">
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">
                    {{ props.item.name }}
                    <v-btn @click=" clusterE = props.item; dlgEditar = true" fab dark small color="light-blue darken-1">
                      <v-icon dark>edit</v-icon>
                    </v-btn>
                    <v-btn @click="clusterE = props.item; dlgEliminar = true" fab dark small color="red">
                      <v-icon dark>delete</v-icon>
                    </v-btn>
                  </td>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>

    <v-snackbar
    :timeout="4000"
    v-model="snackBar.model"
    :color="snackBar.color">
    {{ snackBar.message }}
    <v-btn flat color="white" @click.native="snackBar.model = false">Cerrar</v-btn>
  </v-snackbar>

  <v-dialog v-model="dlgEditar" persistent max-width="350px">
    <v-card>
      <v-toolbar flat dark color="light-blue darken-2" dark>
        <v-toolbar-title> Editar Cluster </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dlgEditar = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container grid-lis-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field v-model="clusterE.name" label="Nombre" color="light-blue darken-2" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-btn block color="light-blue darken-2" dark @click="editCluster(clusterE)">Actualizar</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog v-model="dlgEliminar" persistent max-width="350px">
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">Eliminar Cluster</h3>
          <div>Esta seguro de eliminar el Cluster</div>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn @click="deleteCluster(clusterE)" flat color="green">Confirmar</v-btn>
        <v-btn @click="dlgEliminar = false" flat color="red">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  </v-dialog>
</template>

<script>
import {clusterService} from '@/services/Cluster.service'
export default {
  data () {
    return {
      cluster: {},
      clusterE: {},
      clusters: [],
      headers: [
        {text: 'Nombre', align: 'left', sortable: false, value: 'name'}
      ],
      snackBar: {
        model: false,
        message: '',
        color: ''
      },
      dlgEditar: false,
      dlgEliminar: false,
      loading: false
    }
  },
  props: ['dialog'],
  mounted () {
    let vm = this
    vm.getClusters()
  },
  methods: {
    getClusters () {
      let vm = this
      clusterService.query().then(data => {
        vm.clusters = data.body
      })
    },
    submitCluster (cluster) {
      let vm = this
      vm.loading = true
      clusterService.save(cluster).then(data => {
        vm.clusters.push(data.body)
        vm.showSnackBar('Cluster agregado exitosamente', 'success')
        vm.loading = false
        vm.cluster = {}
      }, response => {
        vm.showSnackBar('Error al agregar el cluster', 'error')
        vm.loading = false
      })
    },
    editCluster (cluster) {
      let vm = this
      clusterService.update(cluster._id, cluster).then(data => {
        vm.getClusters()
        vm.dlgEditar = false
        vm.showSnackBar('Cluster editado correctamente', 'success')
      }, response => {
        vm.dlgEditar = false
        vm.showSnackBar('Error al editar el cluster', 'error')
      })
    },
    deleteCluster (cluster) {
      let vm = this
      clusterService.destroy(cluster._id).then(data => {
        vm.getClusters()
        vm.dlgEliminar = false
        vm.showSnackBar('Cluster eliminado', 'success')
      }, response => {
        vm.dlgEliminar = false
        vm.showSnackBar('Error al eliminar el cluster', 'error')
      })
    },
    closeDialog () {
      let vm = this
      vm.cluster = {}
      vm.$emit('closeDialog')
    },
    showSnackBar (message, color) {
      let vm = this
      vm.snackBar.message = message
      vm.snackBar.color = color
      vm.snackBar.model = true
    }
  }
}
</script>

