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
          <td :style="borderStyle" class="inline">
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
            <v-btn @click="Open_dialog_chat_record()">
              <v-icon>
                mdi-comment
              </v-icon>
            </v-btn>
            <v-switch @change="save_active_status(room)" v-model="room.active_status" label="active" color="success"
              hide-details></v-switch>
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
        room_name: "",
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
          this.room_lists = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    Open_dialog(action, room) {
      this.$refs.vc.open_dialog(action, action === 'New' ? this.room_prototype : room);//this will active the dialog by changing "dialog" to true in dialog component 
    },
    Open_dialog_chat_record() {
      this.$refs.vc.open_dialog_chat_record();
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
    },
    save_active_status(room) {
      console.log("updating")
      console.log(room)
      DataService.edit_chatroom(room)
        .then((res) => {
          console.log("update success")
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

.inline {
  display: flex;
}
</style>