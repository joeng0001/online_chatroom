<template>
    <v-container>
        <v-pagination v-model="page" :length="Math.ceil(room_list.length / 5)"></v-pagination>
        <v-row v-for="room in curr_display_room_list" :key="room.id">
            <v-col>
                <v-card v-if="room.active_status" :title="`${room.id}`" :subtitle="`${room.room_admin}`"
                    :text="`${room.welcome_msg}`" :to="{ name: 'chatroom', query: { room_id: room.id } }"
                    class="card"></v-card>
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
            curr_display_room_list: [],
            page: 1
        };
    },
    created() {
        this.get_room_list();
    },
    mounted() {
    },
    watch: {
        page: {
            handler(newpage, oldpage) {
                this.curr_display_room_list = this.room_list.slice(newpage * 5 - 5, newpage * 5);
            },
            immediate: true
        }
    },

    methods: {
        async get_room_list() {
            //get all caht room info
            await DataService.get_room_list({})
                .then(res => {
                    this.room_list = res.data;
                    this.curr_display_room_list = this.room_list.slice(0, 5);
                })
                .catch(e => {
                    console.log(e.message);
                });

            //for demo
            this.curr_display_room_list.unshift({ id: 0, room_name: "sample_room", room_admin: "sample_user", active_status: true, welcome_msg: "sample chatroom" })

        },
    }
}

</script>

<style scoped>
.card {
    border: solid 1px;
}

.card:hover {
    transition: all 0.3s ease;
    background-color: rgba(3, 218, 198, 0.7);
    padding: 20px;
    font-size: 25px;
    border-radius: 100px
}
</style>