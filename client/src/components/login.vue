<template>
  <!-- <v-layout column> -->
  <!-- <v-flex xs6 offset-xs3> -->
  <panel title="Login" style="alignment">
    <v-text-field label="username" v-model="username"></v-text-field>
    <br>
    <v-text-field label="Password" :type="pw_type" v-model="password">
      <v-icon class="right" @click="toggle_pw_view">
        mdi-eye-outline
      </v-icon>

    </v-text-field>
    <br>
    <div class="danger-alert" />
    <br>
    <v-btn dark class="cyan" @click="login">
      Login
    </v-btn>
    <v-btn dark class="cyan" @click="to_register">
      Registration
    </v-btn>
  </panel>
  <!-- </v-flex> -->
  <!-- </v-layout> -->
</template>


<script>
import DataService from "../services/DataService.js"
import panel from "./Panel.vue"
import { io } from "socket.io-client";
export default {
  name: 'Login',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      username: '',
      password: '',
      pw_view: false
    }
  },
  components: {
    panel
  },
  computed: {
    pw_type() {
      return this.pw_view ? "text" : "password";
    }
  },
  methods: {
    login() {
      DataService.login({ name: this.username, password: this.password })
        .then(res => {
          console.log(res.data)
          this.$store.dispatch('setToken', res.data.token)
          this.$store.dispatch('setUserID', res.data.user_id)
          this.$store.socket = io("http://10.0.2.15:8089")
          this.$router.push("/home");
          console.log("you are in")
          console.log(this.$store.state.token)
          console.log(this.$store.state.userID)
        }).then(() => {
          //this.$router.push("/chatroom");
        })
        .catch(e => {
          console.log(e.message);
          console.log("login fail")
        });
    },
    toggle_pw_view() {
      this.pw_view = !this.pw_view;
    },
    to_register() {
      this.$router.push("/registration");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.right {
  position: absolute;
  right: 0;
}

.btn {
  padding: 0;
  min-width: 0;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
