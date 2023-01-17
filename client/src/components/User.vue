<template>
  <!-- <div>
    this is the user page
    <div v-for="user in online_users">{{ user.name }} {{ user.online }}</div>
    <div v-for="user in offline_users">{{ user.name }} {{ user.online }}</div>
    <v-btn @click="login"> similar login</v-btn>
    <v-btn @click="logout"> similar logout</v-btn>
  </div> -->
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-text-field label="Description" v-model="description"></v-text-field>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="Close">
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="Submit">
          Submit
        </v-btn>

      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-pagination v-model="page" :length="Math.ceil(users_list.length / 5)"></v-pagination>
  <v-table theme="light" class="left">
    <thead>
      <tr>
        <th>
          id
        </th>
        <th>
          Name
        </th>
        <th>
          Online
        </th>
        <th>
          Description
        </th>
        <th><!--if it's admin,show this./...To be done.../-->
          Edit
        </th>

      </tr>
    </thead>
    <tbody>
      <tr v-for="user in curr_display_users_list" :key="user.id">
        <td class="border_style">{{ user.id }}</td>
        <td class="border_style">{{
          user.name
        }}</td>
        <td class="border_style" :style="user.online ? 'color: lightgreen' : 'color:pink'">
          ●
        </td>
        <td class="border_style">{{ user.description }}</td>
        <td class="border_style">
          <v-btn @click="Add_descrition(user)">
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
          <v-btn @click="Delete_user(user.id)">
            <v-icon>
              mdi-trash-can-outline
            </v-icon>
          </v-btn>
          <v-switch @change="save_active_status(user)" v-model="user.active_status" label="active" color="success"
            hide-details></v-switch>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>


<script >
import DataService from "../services/DataService.js"
export default {
  data() {
    return {
      socket: {},
      users_list: [],
      borderStyle: {
        border: '1px solid lightblue',
      },
      dialog: false,
      description: "",
      dialog_user: null,
      curr_display_users_list: [],
      page: 1
    };
  },
  created() {
    this.socket = this.$store.socket;
    this.findall_user();
  },
  watch: {
    page: {
      handler(newpage, oldpage) {
        this.curr_display_users_list = this.users_list.slice(newpage * 5 - 5, newpage * 5);
      },
      immediate: true
    }
  },
  mounted() {
    this.socket.on('user_online', (user) => {
      console.log(user)
      console.log("socket online")
      let target = this.users_list.find((user_obj) => {
        return user_obj.id === user.id;
      })
      if (target !== undefined) {
        target.online = user.online;
      }
    });
    this.socket.on('user_offline', (user) => {
      console.log(user)
      console.log("socket offline")
      let target = this.users_list.find((user_obj) => {
        return user_obj.id === user.id;
      })
      if (target !== undefined) {
        target.online = user.online;
      }
    });
    this.socket.on('error', (err) => {
      console.log(err);
    })
  },
  methods: {
    findall_user() {
      //get all user info
      DataService.findall_user()
        .then((res) => {
          this.users_list = res.data;
        })
        .then(() => {
          this.curr_display_users_list = this.users_list.slice(0, 5);
        })
        .catch((e) => {
          console.log(e)
        })
    },
    Delete_user(id) {
      //remove a user
      if (!confirm("delete?")) {
        return
      }
      if (id === this.$store.state.userID) {
        alert("you can't delete yourself!");
        return;
      }
      var data = {
        id: id
      }
      DataService.delete_user(data)
        .then((res) => {
          console.log(res.message)
        })
        .then(() => {
          this.users_list = this.users_list.filter((user) => {
            return user.id != id;
          })
        })
        .catch(e => {
          console.log(e.message);
        });
    },
    Add_descrition(user) {
      //edit the descrition of a user
      this.descrition = user.descrition;
      this.dialog = true
      this.dialog_user = user
    },
    save_active_status(user) {
      //save the toggled the active status
      DataService.edit_user(user)
        .then((res) => {
          console.log(res.message)
        })
    },
    Submit() {
      //edit a user info
      if (this.dialog_user != null) {
        this.dialog_user.description = this.description;
        DataService.edit_user(this.dialog_user)
          .then((res) => {
            console.log(res.message)
          })
          .then(() => {
            this.dialog_user = null;
            this.dialog = false;
            this.description = "";
          })
          .catch(e => {
            console.log(e.message);
          });
      }

    },
    Close() {
      //close the dialog
      this.dialog_user = null;
      this.dialog = false;
      this.descrition = "";
    }
  }
}
</script >

<style scoped>
.left {
  text-align: left;
  width: 100%;
  padding-left: 100px;
}

.border_style {
  border: 1px solid lightblue;
}
</style>