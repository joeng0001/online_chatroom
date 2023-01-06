<template>
  <div>
    this is the user page
    <div v-for="user in online_users">{{ user.name }} {{ user.online }}</div>
    <div v-for="user in offline_users">{{ user.name }} {{ user.online }}</div>
    <v-btn @click="login"> similar login</v-btn>
    <v-btn @click="logout"> similar logout</v-btn>
  </div>
</template>

<script >
import DataService from "../services/DataService.js"
export default {
  data() {
    return {
      socket: {},
      online_users: [],
      offline_users: []
    };
  },
  created() {
    console.log("current socket is ", this.$store.socket)
    this.socket = this.$store.socket;
    this.findall_user();
  },
  mounted() {
    this.socket.on('user_online', (user) => {
      this.online_users.push(user);
      this.offline_users = this.offline_users.filter((i) => {
        return i.id != user.id;
      });
    });
    this.socket.on('user_offline', (user) => {
      this.offline_users.push(user);
      this.online_users = this.online_users.filter((i) => {
        return i.id != user.id;
      });
    });
    this.socket.on('error', (err) => {
      console.log(err);
    })
  },
  methods: {
    login() {
      this.socket.emit('user_online', this.offline_users[0]);//trigger to make server boardcast to all client,i am now online
      this.socket.on('error', (err) => {
        console.log(err);
      })
    },
    logout() {
      this.socket.emit('user_offline', this.online_users[0]);//trigger to make server boardcast to all client,i am now online
      this.socket.on('error', (err) => {
        console.log(err);
      })
    },
    findall_user() {
      DataService.findall_user()
        .then((all_user) => {
          console.log(all_user.data)
          all_user.data.forEach((user) => {
            user.online ? this.online_users.push(user) : this.offline_users.push(user);
          });
        })

    }
  }
}
</script >