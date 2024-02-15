<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import DataService from "./services/DataService.js"
import { io } from "socket.io-client";
export default {
  name: 'App',
  components: {
    Header
  },
  beforeUnmount() {
    this.leaving()
  },
  methods: {
    leaving() {
      if (!this.$store.state.loginStatus) {//if he already log out,ignore this operation
        return
      }
      DataService.user_offline({ id: this.$store.state.userID })
        .then(res => {
          console.log(res.message)
        })
        .catch(e => {
          console.error(e.message);
        });
      this.$store.socket.close();
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
