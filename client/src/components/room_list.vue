<template>
  <v-btn color="primary" class="btn" @click="Open_dialog('New', null)">
    Create New ChatRoom
  </v-btn>
  <Dialog ref="vc" v-on:get_room_info="get_chat_room_list" />
  <v-app class="margintop">

    <!-- <v-btn @click="create_chatroom">
      create chat room
    </v-btn> -->
    <v-divider></v-divider>
    <v-table theme="light" class="left">
      <thead>
        <tr>
          <th>
            id
          </th>
          <th>
            Room Name
          </th>
          <th>
            Welcome Message
          </th>
          <th><!--if it's admin,show this./...To be done.../-->
            Edit
          </th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="room in room_lists" :key="room.id">
          <td :style="borderStyle">{{ room.id }}</td>
          <td :style="borderStyle">{{ room.room_name }}</td>
          <td :style="borderStyle">{{ room.welcome_msg }}</td>
          <td :style="borderStyle">
            <v-btn @click="Open_dialog('Editing', room)">
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
            <v-btn @click="Deleting(room.id)">
              <v-icon>
                mdi-trash-can-outline
              </v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-app> -->
</template> 

<script>
import DataService from "../services/DataService.js"
import Dialog from "./Dialog.vue"
export default {
  data() {
    return {
      room_lists: [],
      borderStyle: {
        border: '1px solid lightgreen',
      },
      dialog_action: "",
      room_prototype: {
        id: "",
        room_name: "tt",
        welcome_msg: "",
        room_admin: "",
        remark: "",
        active_status: "",
      },
      target_room: {},
    };
  },
  components: {
    Dialog
  },
  created() {
    this.get_chat_room_list();
  },
  watch: {
    // whenever question changes, this function will run
  },
  methods: {
    get_chat_room_list() {
      console.log("get_chat_room_list being call")
      DataService.get_room_list()
        .then(res => {
          console.log("res is")
          console.log(res)
          this.room_lists = res.data
          console.log(this.room_lists)
        })
        .catch(e => {
          console.log(e);
        });
    },
    Open_dialog(action, room) {
      //this.dialog_action = action
      //console.log(room)
      //this.target_room = { ...room };
      //console.log(this.target_room.id)
      //console.log("target_room is ", this.target_room);
      this.$refs.vc.open_dialog(action, action === 'New' ? this.room_prototype : room);//this will active the dialog by changing "dialog" to true in dialog component 
    },
    Deleting(id) {
      console.log("receive id", id)
      DataService.remove_chatroom({ room_id: id })
        .then(res => {
          console.log(res)
        })
        .then(() => {
          this.get_chat_room_list();
        })
        .catch(e => {
          console.log(e);
        });

    },
    create_chatroom() {
      console.log("create chat room")
      let data = {
        room_name: "third room",
        room_admin: "admin",
        active_status: 1,
        welcome_msg: "yoyoyo"
      }
      DataService.create_chatroom(data)
        .then(res => {
          console.log(res)
        })
        .then(() => {
          this.get_chat_room_list();
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
}
</script>

<style>
.left {
  text-align: left;
  width: 100%;
  padding-left: 100px;
}

.top {
  padding-top: 200px;
}

.margintop {
  margin-top: 15px;
}

.btn {
  border-radius: 10%;
}
</style>