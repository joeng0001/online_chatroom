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
import panel from "../components/Panel.vue"
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
            DataService.Register({ name: this.username, password: this.password })
                .then(res => {
                    this.$router.push({ path: '/' })
                })
                .catch(e => {
                    console.error(e.message);
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
    background-color: rgba(188, 188, 188, 0.7);
    text-align: center;
    justify-content: center;
}

.btn:hover {
    transition: all 0.3s ease;
    transition-timing-function: linear;
    background-color: rgba(15, 185, 241, 0.7);
}
</style>
