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
import chat_header from '@/components/header.vue'
import DataService from "./services/DataService.js"
export default {
  name: 'App',
  components: {
    //HelloWorld
    chat_header
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
      this.$store.close();
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
