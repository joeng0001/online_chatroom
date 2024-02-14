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
    &nbsp;
    <v-btn class="btn" @click="to_register">
      Registration
    </v-btn>
    &nbsp;
    <v-btn class="btn" @click="bypass_login_for_testing">
      bypass login for demo
    </v-btn>
  </panel>
</template>


<script>
import DataService from "../services/DataService.js"
import panel from "../components/Panel.vue"
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
      console.log("calling dataservice login ")
      DataService.login({ name: this.username, password: this.password })
        .then(res => {
          console.log("initing socket")
          this.$store.dispatch('setToken', res.data.token)
          this.$store.dispatch('setUserID', res.data.user_id)
          this.$store.dispatch('setLoginStatus', true)
          this.$store.socket = io("http://localhost:8089")
          this.$router.push("/home");
        }).then(() => {
          var data = {
            id: this.$store.state.userID,
            online: true,
            jwt: this.$store.state.toekn
          }
          console.log("emit online")
          this.$store.socket.emit('user_online', data);
          this.$store.socket.on('error', (err) => {
            console.error(err);
          })
        })
        .catch(e => {
          console.error(e.message);
        });
    },
    bypass_login_for_testing() {
      //for demo
      this.$store.dispatch('setUserID', "0");
      this.$store.dispatch('setLoginStatus', true);
      this.$store.socket = io("http://localhost:8089");
      this.$router.push("/home");
    },
    toggle_pw_view() {
      this.pw_view = !this.pw_view;
    },
    to_register() {
      this.$router.push("/registration_page");
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
}
</style>
