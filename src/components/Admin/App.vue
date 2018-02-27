<template>
  <section>
    <v-toolbar class="fondo" dark>
      <img class="logo" src="../../assets/logo-sysmos.gif" alt="">
      <v-toolbar-title class="toolbar-title">
        Sysmos SpA
      </v-toolbar-title>
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

.fondo {
  background-image: url("../../assets/banner-fondo.jpg") !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-position: left center !important;
}

.logo {
  height: 45px;
  position: relative;
}
.toolbar-title {
  margin-left: 0px !important;
  margin-right: 50px;
  font-size: 23px;
}

.table.table thead th {
  font-size: 17px;
}

thead {
  background-color: #e6f7ff;
}
</style>

