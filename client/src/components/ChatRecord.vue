<template>
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
                    Publisher
                </th>
                <th>
                    Target
                </th>
                <th>
                    Description
                </th>
                <th>
                    Content
                </th>
                <th><!--if it's admin,show this./...To be done.../-->
                    Edit
                </th>

            </tr>
        </thead>
        <tbody>
            <tr v-for="record in chat_records" :key="record.id">
                <td class="border_style">{{ record.id }}</td>
                <td class="border_style">{{
                    this.find_by_id('Room', record.room_id)
                }}</td>
                <td class="border_style">{{
                    this.find_by_id('Publisher', record.publisherID)
                }}</td>
                <td class="border_style">{{ record.chat_target }}</td>
                <td class="border_style">{{ record.description }}</td>
                <td class="border_style">{{ record.content }}</td>
                <td class="border_style">
                    <v-btn @click="Deleting(record.id)">
                        <v-icon>
                            mdi-trash-can-outline
                        </v-icon>
                    </v-btn>
                </td>
            </tr>
        </tbody>
    </v-table>
</template>

<script>
import DataService from "../services/DataService.js"
import Dialog from "./Dialog.vue"
export default {
    data() {
        return {
            room_lists: [],
            chat_records: [],
            user_lists: [],
        };
    },
    components: {
        Dialog
    },
    created() {
        this.get_chat_room_list();
        this.get_chat_record();
        this.findall_user();
    },
    watch: {
        // whenever question changes, this function will run
    },
    props: ['RoomID'],
    methods: {
        find_by_id(target_list, id) {
            //display publisher/room name by finding with id
            if (target_list === 'Room') {
                const res = this.room_lists.find((room) => {
                    return room.id === id
                });

                console.log("in find by id with", target_list, res);
                return res === undefined ? "not found" : res.room_name;
            }
            if (target_list === 'Publisher') {
                const res = this.user_lists.find((user) => {
                    return user.id === id
                });
                console.log("in find by id with", target_list, res);
                return res === undefined ? "not found" : res.name;
            }
        },
        findall_user() {
            //get all user info
            DataService.findall_user()
                .then((res) => {
                    this.user_lists = res.data;
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        get_chat_room_list() {
            //get all room info
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
        get_chat_record() {
            //get all chat record
            console.log("get_chat_room_list being call")
            var data = {
                room_id: this.RoomID,
            };
            DataService.get_chat_record(data)
                .then(res => {
                    console.log("chat_record")
                    console.log(res)
                    this.chat_records = res.data
                    console.log("chat_record is", this.chat_records)
                })
                .catch(e => {
                    console.log(e);
                });
        },
        Deleting(id) {
            //delete chat record
            if (!confirm("delete?")) {
                return
            }
            var data = {
                id: id,
            };
            DataService.delete_chat_record(data)
                .then(res => {
                    console.log(res)
                    console.log("delete successful")
                })
                .then(() => {
                    this.chat_records = this.chat_records.filter((chat) => {
                        return chat.id != id;
                    })
                })
                .catch(e => {
                    console.log(e);
                });

        },
        create_chatroom() {
            //new a chat room
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

<style scoped>
.left {
    text-align: left;
    width: 100%;
    padding-left: 100px;
}



.border_style {
    border: 1px solid lightgreen;
}
</style>
