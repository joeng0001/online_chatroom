<template>
    <div class="margintop">
        <v-row justify="center">
            <v-dialog v-model="dialog">
                <v-card v-if="room_action == 'Editing'">
                    <v-pagination v-model="page" :length="2" circle>
                    </v-pagination>
                </v-card>
                <v-card v-if="page == 1">
                    <v-card-title>
                        <span class="text-h5">{{ room_action?room_action: "New" }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="10" sm="6" md="5">
                                    <v-text-field label="Room Name" required
                                        v-model="new_room.room_name"></v-text-field>
                                </v-col>
                                <v-col cols="10" sm="6" md="5">
                                    <v-text-field label="Welcome message" hint="Message that will show to all"
                                        persistent-hint required v-model="new_room.welcome_msg"></v-text-field>
                                </v-col>
                                <v-col cols="10" sm="5">
                                    <v-select :items="user_list" label="Admin" required v-model="new_room.room_admin">
                                    </v-select>
                                </v-col>
                                <v-col cols="10">
                                    <v-text-field label="Remark" v-model="new_room.remark"></v-text-field>
                                </v-col>
                                <v-col cols="10" sm="5">
                                    <v-select :items="['true', 'false']" label="Active"
                                        hint="true for active,false for deactive" required
                                        v-model="new_room.active_status"></v-select>
                                </v-col>
                                <!-- <v-col cols="10" sm="5">
                                    <v-autocomplete
                                        :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                        label="Interests" multiple></v-autocomplete>
                                </v-col>  -->
                            </v-row>
                        </v-container>
                        <small>required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                            Close
                        </v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="Save">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <v-card v-if="page == 2">
                    <div>
                        this is chat records page
                    </div>
                    <ChatRecord :RoomID="chat_record_room_id" />
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>
<script>
import DataService from "../services/DataService.js"
import ChatRecord from "./ChatRecord.vue"
export default {
    data() {
        return {
            dialog: false,
            user_list: [],
            new_room: {
                id: null,
                room_name: null,
                welcome_msg: null,
                room_admin: null,
                remark: null,
                active_status: 'true',
            },
            room_action: null,
            page: 1,
            chat_record_room_id: 1
        };
    },
    components: {
        ChatRecord
    },
    //props: ['action', 'room_info'],
    created() {
        this.findall_user();
    },
    mounted() {

    },
    watch: {
        new_room: {
            handler(newValue, oldValue) {
                //console.log("the watch active");
                if (newValue.active_status === 'true')
                    newValue.active_status = true;
                if (newValue.active_status == 'false')
                    newValue.active_status = false;
            },
            deep: true
        }
    },
    methods: {
        findall_user() {
            //get all user info
            DataService.findall_user()
                .then((all_user) => {
                    this.user_list = all_user.data.map((item) => {
                        return item.name;
                    });

                    console.log(this.user_list)
                })

        },
        open_dialog(action, room_info) {
            //open the dialog ,call by parent component
            this.new_room = { ...room_info }
            this.room_action = action
            if (action === 'New')
                delete this.new_room.id;//let the id auto increment
            this.dialog = true;
        },

        open_dialog_chat_record(id) {
            //directly open the dialog in chat record page ->page 2
            this.chat_record_room_id = id
            this.dialog = true;
            this.page = 2;
        },
        Save() {
            //update the chat room info
            this.dialog = false;
            console.log(this.new_room);
            (this.room_action === "New" ? DataService.create_chatroom(this.new_room) : DataService.edit_chatroom(this.new_room))
                .then((res) => {
                    console.log("save finished")
                    console.log(res)
                    this.$emit('get_room_info');
                })
        }
    }
}

</script>

<style scoped>
.margintop {
    margin-top: 10px
}
</style>