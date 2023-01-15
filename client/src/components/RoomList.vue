<template>
  <v-btn color="primary" class="btn" @click="Open_dialog('New', null)">
    Create New ChatRoom
  </v-btn>
  <v-btn color="secondary" class="btn" @click="Open_dialog_chat_record(-1)">
    View all chatrecord
  </v-btn>
  <Dialog ref="vc" v-on:get_room_info="get_chat_room_list" />
  <v-app class="margintop">
    <v-divider></v-divider>
    <v-pagination v-model="page" :length="Math.ceil(room_list.length / 5)"></v-pagination>
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
        <tr v-for="room in curr_display_room_list" :key="room.id">
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
            <v-btn @click="Open_dialog_chat_record(room.id)">
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
  </v-app>
</template> 

<script>
import DataService from "../services/DataService.js"
import Dialog from "./Dialog.vue"
export default {
  data() {
    return {
      room_list: [],
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
      curr_display_room_list: [],
      page: 1
    };
  },
  components: {
    Dialog
  },
  created() {
    this.get_chat_room_list();
  },
  watch: {
    page: {
      handler(newpage, oldpage) {
        this.curr_display_room_list = this.room_list.slice(newpage * 10 - 10, newpage * 10);
      },
      immediate: true
    }
  },
  methods: {
    get_chat_room_list() {
      //get room info
      console.log("get_chat_room_list being call")
      DataService.get_room_list()
        .then(res => {
          this.room_list = res.data;
        })
        .then(() => {
          this.curr_display_room_list = this.room_list.slice(0, 10);
        })
        .catch(e => {
          console.log(e);
        });
    },
    Open_dialog(action, room) {
      //call child open dialog method with action type and room info
      this.$refs.vc.open_dialog(action, action === 'New' ? this.room_prototype : room);//this will active the dialog by changing "dialog" to true in dialog component 
    },
    Open_dialog_chat_record(id) {
      //call child open cha record page
      this.$refs.vc.open_dialog_chat_record(id);
    },
    Deleting(id) {
      //delete a chatroom
      if (!confirm("delete the chatroom?")) {
        return
      }
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

<style scoped>
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