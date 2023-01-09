<template>
  <v-toolbar class="cyan" color="#B3FFCC" align>
    <!-- <v-toolbar-title> too thick to occupy space
  </v-toolbar-title> -->
    <v-toolbar-items>
      <v-btn color="blue" :to="{ name: 'Home' }">
        Home Page
      </v-btn>
    </v-toolbar-items>

    <v-toolbar-items style="padding-left:200px;">
      <v-btn color="blue" :to="{ name: 'chatroom' }">
        online chat room
      </v-btn>
      <v-btn :to="{ name: 'user' }" class="light" v-if="$store.state.loginStatus">
        user_list
      </v-btn>
      <v-btn :to="{ name: 'room_list' }" class="light" v-if="$store.state.loginStatus">
        room_list
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn color="#FFCCCB" depressed style="right: 0px;" @click="logout">
        log out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout() {
      var data = {
        id: this.$store.state.userID,
        online: false,
      }
      this.$store.socket.emit('user_offline', data);
      console.log("logging out");
      this.$store.socket.close();
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style >
.light {
  cursor: pointer;
}

.light:hover {
  color: #E9E;
}

.width {
  width: 200px
}
</style>
