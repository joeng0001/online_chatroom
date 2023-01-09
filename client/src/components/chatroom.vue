<template>
  <Home class="room_list" />
  <v-container class="container">
    <v-row v-for="message in messages" :key="message.id">
      <v-col>
        <v-label v-if="message.publisherID !== this.$store.state.userID">
          {{ message.content }}
        </v-label>
        <v-label v-else>

        </v-label>
      </v-col>
      <v-col>
        <v-label v-if="message.publisherID === this.$store.state.userID">
          {{ message.content }}
        </v-label>
        <v-label v-else>

        </v-label>
      </v-col>
    </v-row>
  </v-container>
  <div>

    <input placeholder="input there" v-model="chat" @keyup.enter="send_chat">
    <v-btn @click="send_chat">
      send
    </v-btn>
    <v-btn @click="get_props">
      get
    </v-btn>
  </div>
</template>

<script>
import DataService from "../services/DataService.js"
import Home from "./homePage.vue"
export default {
  data() {
    return {
      messages: [],
      chat: "",
      socket: null,
      room_id: 1
    };
  },
  components: {
    Home
  },
  created() {
    this.room_id = this.$route.query.room_id;
    this.get_chat_record(this.room_id);
    this.socket = this.$store.socket;

  },
  mounted() {
    this.socket.on('message', (message) => {
      if (message.room_id === this.room_id) {
        this.messages.push(message);
      }
    })
  },
  watch: {
    '$route.query.room_id': {
      handler(newValue, oldValue) {
        this.room_id = newValue;
        console.log("new room id is ", this.room_id)
        this.get_chat_record(this.room_id);
      },
      deep: true
    }
  },
  methods: {
    get_chat_record(id) {
      console.log("getting message with id", id)
      var data = {
        room_id: id,
      };
      DataService.get_chat_record(data)
        .then(res => {
          //this.messages = res.data.map(i => i.content)
          this.messages = res.data;

          console.log(this.messages)
        })
        .catch(e => {
          console.log(e);
        });
    },
    send_chat() {
      var data = {
        content: this.chat, publisherID: this.$store.state.userID,
        room_id: this.room_id,
        chat_target: "anyone", description: "my first chat"
      };
      DataService.add_chat_record(data)//add the msg to db,
        .then(res => {
          data.type = "new_chat"  //specify the type in socket but not dataService
          this.socket.emit('message', data);//then send it again to server and server
          //will then boardcast the msg to all client
          this.chat = "";
        })
        .catch(e => {
          console.log(e);
        });
    },
    get_props() {
      console.log(this.room_id);
    }
  }
}
</script>

<style scoped>
.container {
  display: inline-block;
  margin-left: 10px;
}

.room_list {
  width: 15%;
  margin-left: 20px;
  padding-left: 0px;
  display: block;
  position: absolute;
}
</style>