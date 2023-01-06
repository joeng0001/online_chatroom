<template>
    <v-container>
        <v-row v-for="room in room_list" :key="room.id">
            <v-col>
                <v-card v-if="room.active_status" :title="`${room.id}`" :subtitle="`${room.room_admin}`"
                    :text="`${room.welcome_msg}`" :to="{ name: 'chatroom', query: { room_id: room.id } }"></v-card>
                <v-divider />
            </v-col>

        </v-row>
    </v-container>

</template>

<script>
import DataService from "../services/DataService.js"
export default {
    data() {
        return {
            room_list: [],
        };
    },
    created() {
        this.get_room_list();
    },
    mounted() {
    },
    methods: {
        get_room_list() {
            var data = {
                room_id: this.room_id,
            };
            DataService.get_room_list(data)
                .then(res => {
                    //this.messages = res.data.map(i => i.content)
                    console.log("after getting the room list")
                    console.log(res.data);
                    this.room_list = res.data;
                })
                .catch(e => {
                    console.log(e);
                });
        },
    }
}

</script>

<style>

</style>