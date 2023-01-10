<template>
    <!-- <v-layout column> -->
    <!-- <v-flex xs6 offset-xs3> -->
    <panel title="Registration" style="alignment">
        <v-text-field label="username" v-model="username"></v-text-field>
        <br>
        <v-text-field label="Password" :type="pw_type" v-model="password">
            <v-icon class="right" @click="toggle_pw_view">
                mdi-eye-outline
            </v-icon>

        </v-text-field>
        <br>
        <div class="danger-alert" />
        <br>
        <v-btn dark class="cyan" @click="Register">
            Register
        </v-btn>
    </panel>
    <!-- </v-flex> -->
    <!-- </v-layout> -->
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
            DataService.Register({ name: this.username, password: this.password })
                .then(res => {
                    console.log("register success")
                    this.$router.push({ path: '/' })
                    console.log("you are in")
                })
                .catch(e => {
                    console.log(e.message);
                    console.log("register fail")
                    alert(e.message);
                    alert("register fail");
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
.right {
    position: absolute;
    right: 0;
}

.btn {
    padding: 0;
    min-width: 0;
}

h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
