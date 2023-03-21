<template>
  <panel title="Login" style="alignment">
    <v-text-field label="username" v-model="username" class="input"></v-text-field>
    <br>
    <v-text-field label="Password" :type="pw_type" v-model="password" class="input">
      <v-icon class="right" @click="toggle_pw_view">
        mdi-eye-outline
      </v-icon>
    </v-text-field>
    <br>
    <div class="danger-alert" />
    <br>
    <v-btn class="btn" @click="login">
      Login
    </v-btn>
    <v-btn class="btn" @click="to_register">
      Registration
    </v-btn>
  </panel>
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
      pw_view: false,
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
      //login,init all the param
      DataService.login({ name: this.username, password: this.password })
        .then(res => {
          this.$store.dispatch('setToken', res.data.token)
          this.$store.dispatch('setUserID', res.data.user_id)
          this.$store.dispatch('setLoginStatus', true)
          this.$store.socket = io("http://10.0.2.15:8089")
          this.$router.push("/home");
        }).then(() => {
          var data = {
            id: this.$store.state.userID,
            online: true,
            jwt: this.$store.state.toekn
          }
          this.$store.socket.emit('user_online', data);
          this.$store.socket.on('error', (err) => {
            console.log(err);
          })
        })
        .catch(e => {
          console.log(e.message);
          console.log("login fail")
        });
    },
    toggle_pw_view() {
      //toggle the pw field type
      this.pw_view = !this.pw_view;
    },
    to_register() {
      //go to register page
      this.$router.push("/registration");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input {
  margin-top: 10px;
  margin-right: 10px;
}


.right {
  position: absolute;
  right: 20px;
}

.btn {
  padding: 5px;
  border-radius: 10px;
  background-color: rgba(188, 188, 188, 0.7);
  text-align: center;
  justify-content: center;
}

.btn:hover {
  transition: all 0.3s ease;
  transition-timing-function: linear;
  background-color: rgba(119, 221, 119, 0.7);
  padding: 5px 10px 15px 10px;
  font-size: 20px;
}
</style>
