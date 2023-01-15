<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div id="app">
    <chat_header />
    <router-view />

  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import chat_header from '@/components/Header.vue'
import DataService from "./services/DataService.js"
import { io } from "socket.io-client";
export default {
  name: 'App',
  components: {
    //HelloWorld
    chat_header
  },
  beforeCreate() {
    this.$store.dispatch('setToken', localStorage.getItem('token'))
    this.$store.dispatch('setUserID', parseInt(localStorage.getItem('userID')))//get string,parse to int
    this.$store.dispatch('setLoginStatus', localStorage.getItem('status') == 'true')//get string,pass to bool
    this.$store.socket = io("http://10.0.2.15:8089")
    const data = {
      id: this.$store.state.userID
    }
    DataService.add_online_account(data)
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.log(e.message);
      });
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
          console.log(res)
        })
        .catch(e => {
          console.log(e.message);
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
