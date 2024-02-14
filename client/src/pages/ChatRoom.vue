<template>
  <Home class="room_list" />
  <v-container class="container" id="container">
    <v-row v-for="message in messages" :key="message.id">
      <v-col>
        <v-card v-if="message.publisherID !== this.$store.state.userID" class="card">
          <v-card-subtitle>
            {{ find_by_id(message.publisherID) }}
          </v-card-subtitle>
          <v-card-text>
            {{ message.content }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card v-if="message.publisherID === this.$store.state.userID" class="card">
          <v-card-subtitle>
            {{ find_by_id(message.publisherID) }}
          </v-card-subtitle>
          <v-card-text>
            {{ message.content }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <div>

    <v-text-field placeholder="input there" v-model="chat" @keypress.enter="send_chat" class="chat_box">
      <v-icon @click="send_chat()" class="btn" x-large>
        mdi-arrow-right-bold
      </v-icon>
    </v-text-field>
  </div>
</template>

<script>
import DataService from "../services/DataService.js"
import Home from "./HomePage.vue"
export default {
  data() {
    return {
      messages: [],
      chat: "",
      socket: null,
      room_id: 1,
      user_lists: [],
    };
  },
  components: {
    Home
  },
  created() {
    this.room_id = this.$route.query.room_id;
    this.get_chat_record(this.room_id);
    this.findall_user();
    this.socket = this.$store.socket;
  },
  mounted() {
    this.socket.on('message', (message) => {
      if (message.room_id === this.room_id) {
        this.messages.push(message);
      }
      if (message.publisherID === this.$store.state.userID) {
        this.$nextTick(() => {
          var container = document.getElementById("container");
          container.scrollTop = container.scrollHeight;
        })
      }
    })
  },
  watch: {
    '$route.query.room_id': {
      handler(newValue, oldValue) {
        this.room_id = newValue;
        this.get_chat_record(this.room_id);
      },
      deep: true
    }
  },
  methods: {
    find_by_id(id) {
      //get user name by it's id
      const res = this.user_lists.find((user) => {
        return String(user.id) === String(id)
      });
      return res === undefined ? "anonymous" : res.name;
    },
    async findall_user() {
      await DataService.findall_user()
        .then((res) => {
          this.user_lists = res.data;
        })
        .catch((err) => {
          console.error(err.message)
        })
    },
    get_chat_record(id) {
      //get chat record by room id
      var data = {
        room_id: id,
      };
      DataService.get_chat_record(data)
        .then(res => {
          this.messages = res.data;
        })
        .catch(e => {
          console.error(e.message);
        });
    },
    send_chat() {
      var data = {
        content: this.chat, publisherID: this.$store.state.userID,
        room_id: this.room_id,
        chat_target: "anyone", description: "my first chat"
      };
      DataService.add_chat_record(data)
        .then(res => {
          data.type = "new_chat"
          this.socket.emit('message', data);
          this.chat = "";
        })
        .catch(e => {
          console.error(e.message);
        });
    }
  }
}
</script>

<style scoped>
.chat_box {
  position: absolute;
  right: 10%;
  width: 70%;
}

.btn {
  position: absolute;
  right: 0px;
  border: 1px green solid;
}

.card {
  width: 500px;
  border: 1px outset lightgreen;
}

.container {
  display: inline-block;
  margin-left: 200px;
  margin-top: 70px;
  max-height: 700px;
  overflow: scroll;
}

.room_list {
  width: 15%;
  margin-left: 20px;
  padding-left: 0px;
  display: block;
  position: absolute;
}
</style>