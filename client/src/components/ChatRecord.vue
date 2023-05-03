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
                <th>
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
                    return String(room.id) === String(id)
                });
                return res === undefined ? "not found" : res.room_name;
            }
            if (target_list === 'Publisher') {
                const res = this.user_lists.find((user) => {
                    console.log("publisher", user.id, id)
                    return String(user.id) === String(id)
                });
                return res === undefined ? "not found" : res.name;
            }
        },
        async findall_user() {
            //get all user info
            await DataService.findall_user()
                .then((res) => {
                    this.user_lists = res.data;
                })
                .catch((err) => {
                    console.log(err.message)
                })

            //for demo
            this.user_lists.unshift({ id: 0, name: "sample_user", online: true, active_status: true })
        },
        async get_chat_room_list() {
            //get all room info
            await DataService.get_room_list({})
                .then(res => {
                    this.room_lists = res.data
                })
                .catch(e => {
                    console.log(e.message);
                });
            //for demo
            this.room_lists.unshift({ id: 0, room_name: "sample_room", room_admin: "sample_user", active_status: true, welcome_msg: "sample chatroom" })
        },
        async get_chat_record() {
            //get all chat record
            var data = {
                room_id: this.RoomID,
            };
            await DataService.get_chat_record(data)
                .then(res => {
                    this.chat_records = res.data
                })
                .catch(e => {
                    console.log(e.message);
                });
            //for demo
            this.chat_records.unshift({ id: 0, room_id: 0, publisherID: 0, chat_target: "everyone", description: "sample", content: "demo" })
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
                    console.log(res.message)
                })
                .then(() => {
                    this.chat_records = this.chat_records.filter((chat) => {
                        return chat.id != id;
                    })
                })
                .catch(e => {
                    console.log(e.message);
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
