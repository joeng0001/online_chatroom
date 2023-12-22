<template>
  <v-toolbar color="cyan-lighten-3" align>
    <v-toolbar-items>
      <v-btn color="blue" :to="{ name: 'Home' }" v-if="$store.state.loginStatus">
        Home Page
      </v-btn>
      <v-btn color="blue" :to="{ name: 'Login_page' }" v-else>
        Login Page
      </v-btn>
    </v-toolbar-items>

    <v-toolbar-items style="padding-left:200px;">
      <!-- <v-btn :to="{ name: 'user' }" class="light" v-if="$store.state.loginStatus && $store.state.userID === 1"> -->
      <v-btn :to="{ name: 'user' }" class="light" v-if="$store.state.loginStatus">
        user_list
      </v-btn>
      <!-- <v-btn :to="{ name: 'room_list' }" class="light" v-if="$store.state.loginStatus && $store.state.userID === 1"> -->
      <v-btn :to="{ name: 'room_list' }" class="light" v-if="$store.state.loginStatus">
        room_list
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn color="#3700B3" depressed style="right: 0px;" @click="logout" v-if="$store.state.loginStatus">
        log out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import DataService from "../services/DataService.js"
export default {
  methods: {
    logout() {
      var data = {
        id: this.$store.state.userID,
        online: false,
      }
      this.$store.socket.emit('user_offline', data);
      DataService.user_offline({ id: this.$store.state.userID })
        .catch(e => {
          console.error(e.message);
        });
      this.$store.socket.close();
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUserID', null);
      this.$store.dispatch('setLoginStatus', false);
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped>
.light {
  cursor: pointer;
}

.light:hover {
  color: #E9E;
}
</style>
