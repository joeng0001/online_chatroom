<template>
    <panel title="Registration">
        <v-text-field label="username" v-model="username" class="input"></v-text-field>
        <br>
        <v-text-field label="Password" :type="pw_type" v-model="password" class="input">
            <v-icon class="right" @click="toggle_pw_view">
                mdi-eye-outline
            </v-icon>

        </v-text-field>
        <br>
        <div class="danger-alert" />
        <br>
        <v-btn dark class="btn" @click="Register">
            Register
        </v-btn>
    </panel>
</template>

<script>
import DataService from "../services/DataService.js"
import panel from "./Panel.vue"
export default {
    data() {
        return {
            username: '',
            password: '',
            pw_view: false
        }
    },
    components: {
        panel
    },
    computed: {
        pw_type() {
            return this.pw_view ? "text" : "password";
        }
    },
    methods: {
        Register() {
            //call register method
            DataService.Register({ name: this.username, password: this.password })
                .then(res => {
                    console.log("register success")
                    this.$router.push({ path: '/' })
                    console.log("you are in")
                })
                .catch(e => {
                    console.log(e.message);
                    console.log("register fail")
                    alert(e.message, "user name already in use");
                });
        },
        toggle_pw_view() {
            this.pw_view = !this.pw_view;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input {
    margin-top: 10px;
    margin-right: 10px;
}


.right {
    position: absolute;
    right: 20px;
}

.btn {
    padding: 5px;
    border-radius: 10px;
    background-color: rgba(188, 188, 188, 0.7);
    text-align: center;
    justify-content: center;
}

.btn:hover {
    transition: all 0.3s ease;
    transition-timing-function: linear;
    background-color: rgba(15, 185, 241, 0.7);
    padding: 5px 20px 25px 20px;
    font-size: 25px;
}
</style>
