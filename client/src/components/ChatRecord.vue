<template>
    
    <v-autocomplete
        label="Search Type"
        :items="search_type_list"
        v-model="search_type"
        class="mx-3 my-1"
    ></v-autocomplete>
    <v-text-field label="Search by text" v-model="search_content" :disabled="!search_type" class="mx-3 my-1"></v-text-field>
    <v-table theme="light" class="left">
        <thead>
            <tr>
                <th>
                    id
                </th>
                <th>
                    Room ID
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
            <tr v-for="record in curr_display_chat_records" :key="record.id">
                <td class="border_style">{{ record.id }}</td>
                <td class="border_style">{{ record.room_id }}</td>
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
            curr_display_chat_records:[],
            user_lists: [],
            search_content:"",
            search_type:"",
            search_type_list:[]
        };
    },
    components: {
        Dialog
    },
    watch:{
        search_content:{
            handler(newVal,oldVal){
                if(newVal){
                    this.curr_display_chat_records=this.chat_records.filter(rec=>{
                        return rec[this.search_type].toString().includes(newVal)
                    })
                }else{
                    this.curr_display_chat_records=this.chat_records
                }
            }
        },
    },
    created() {
        this.get_chat_room_list();
        this.get_chat_record();
        this.findall_user();
    },
    props: ['RoomID'],
    methods: {
        find_by_id(target_list, id) {
            if (target_list === 'Room') {
                const res = this.room_lists.find((room) => {
                    return String(room.id) === String(id)
                });
                return res === undefined ? "not found" : res.room_name;
            }
            if (target_list === 'Publisher') {
                const res = this.user_lists.find((user) => {
                    return String(user.id) === String(id)
                });
                return res === undefined ? "not found" : res.name;
            }
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
        async get_chat_room_list() {
            //get all room info
            await DataService.get_room_list({})
                .then(res => {
                    this.room_lists = res.data
                })
                .catch(e => {
                    console.error(e.message);
                });
        },
        async get_chat_record() {
            //get all chat record
            var data = {
                room_id: this.RoomID,
            };
            await DataService.get_chat_record(data)
                .then(res => {
                    this.chat_records = res.data.map(rec=>{
                        rec.room_name=this.find_by_id('Room', rec.room_id)
                        return rec
                    })
                    this.curr_display_chat_records=this.chat_records
                    this.search_type_list=Object.keys(this.chat_records[0]??{})
                })
                .catch(e => {
                    console.error(e.message);
                });
        },
        Deleting(id) {
            if (!confirm("delete?")) {
                return
            }
            var data = {
                id: id,
            };
            DataService.delete_chat_record(data)
                .then(res=> {
                    this.chat_records = this.chat_records.filter((chat) => {
                        return chat.id != id;
                    })
                })
                .catch(e => {
                    console.error(e.message);
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
