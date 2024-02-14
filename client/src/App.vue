<template>
  <div id="app">
    <chat_header />
    <router-view />
  </div>
</template>

<script>
import chat_header from '@/components/Header.vue'
import DataService from "./services/DataService.js"
import { io } from "socket.io-client";
export default {
  name: 'App',
  components: {
    chat_header
  },
  beforeCreate() {
    if(localStorage.getItem('token')){ //if login before,auto login
      this.$store.dispatch('setToken', localStorage.getItem('token'))
      this.$store.dispatch('setUserID', parseInt(localStorage.getItem('userID')))
      this.$store.dispatch('setLoginStatus', localStorage.getItem('status') == 'true')
      this.$store.socket = io("http://localhost:8089")
      DataService.add_online_account({ //that will verify the token
        id: this.$store.state.userID
      })
        .then(res => {
          console.log(res.message)
        })
        .catch(e => {
          console.error(e.message); //if error,auto logout
          this.$store.dispatch('setToken', '')
          this.$store.dispatch('setUserID', null)
          this.$store.dispatch('setLoginStatus', false)
          router.push("/");
        });
    }
    
  },
  created() {
    window.addEventListener("beforeunload", this.leaving);
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
