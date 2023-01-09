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
      var data = {
        id: this.$store.state.userID,
        online: false,
      }
      this.$store.socket.emit('user_offline', data);
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
