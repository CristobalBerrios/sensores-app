<template>
  <section>
    <v-toolbar color="green darken-1" dark>
      <v-toolbar-title>Sysmos SpA</v-toolbar-title>
      <v-toolbar-items class="hidden-xs-and-down">
        <v-btn @click="go('heartBeat')" flat>Heartbeat</v-btn>
        <v-btn @click="go('simulator')" flat>Monitor</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-btn @click="logout" flat>Cerrar Sesion
        <v-icon dark right>exit_to_app</v-icon>
      </v-btn>
  </v-toolbar>

  <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </section>
</template>

<script>
import CredentialServices from '@/services/Credentials.service.js'
export default {
  methods: {
    go (name) {
      this.$router.push({name: name})
    },
    logout () {
      let vm = this
      let credentialService = new CredentialServices()
      credentialService.clearCredentials()
      vm.$router.push('/login')
    }
  }
}
</script>


<style>
.card-content {
  min-height: 400px;
  padding: 20px;
  margin: 10px;
  border-radius: 15px;
}
</style>

