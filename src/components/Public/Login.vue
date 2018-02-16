<template>
  <v-content>
    <v-card color="grey lighten-5" flat>
      <v-toolbar dark color="myToolbar green darken-1" flat extended>
        <v-layout>
          <v-flex xs8 offset-xs2 md6 offset-md3 class="text-xs-center">
            <br><br>
            <h1 class="display-1">Sysmos SpA</h1>
          </v-flex>
        </v-layout>
      </v-toolbar>
      <v-layout row>
        <v-flex xs10 offset-xs1 md6 offset-md3>
          <v-card class="card--flex-toolbar grey lighten-3">
            <v-toolbar dark color="red darken-1">
              <v-toolbar-title>Iniciar Sesion</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field v-model="credentials.email" color="red darken-1" prepend-icon="mail" label="Email" type="text"></v-text-field>
                <v-text-field v-model="credentials.password" color="red darken-1" prepend-icon="lock" label="Password" type="password"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="submit(credentials)" :loading="isLoading" dark color="red darken-1">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>

    <v-snackbar 
      v-model="snack.model"
      :timeout="4000"
      color="error">
      {{ snack.message }}
      <v-btn flat color="white" @click.native="snack.model = false">Cerrar</v-btn>
    </v-snackbar>
  </v-content>  
</template>

<script>
import { loginService } from '@/services/Login.service'
import CredentialsServices from '@/services/Credentials.service.js'
export default {
  data () {
    return {
      credentials: {},
      credentialService: new CredentialsServices(),
      isLoading: false,
      snack: {
        model: false,
        message: ''
      }
    }
  },
  methods: {
    submit (credentials) {
      let vm = this
      vm.isLoading = true
      loginService.authenticate(credentials).then(data => {
        vm.credentialService.setToken(data.body.token)
        vm.credentialService.setCurrentUser(data.body.email)
        this.$router.push('/admin/heartbeat')
      }, err => {
        vm.isLoading = false
        if (err.body.message) vm.snack.message = err.body.message
        else vm.snack.message = 'Error al internar iniciar sesion'
        vm.snack.model = true
      })
    }
  }
}
</script>

<style scoped>
  .card--flex-toolbar {
    margin-top: -100px;
  }
  .myToolbar {
    height: 200px;
  }
</style>