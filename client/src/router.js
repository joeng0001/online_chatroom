import { createWebHistory, createRouter } from "vue-router";
import Login_page from '@/components/login' //the entry page 
import chatroom from '@/components/chatroom' //just for testing 
import user from '@/components/user'  //view the user of the chat room
import room_list from '@/components/room_list' //view all the chating room
import registration from '@/components/registration' //view all the chating room
import Home from '@/components/homePage' //view all the chating room
import vuex_store from "./store.js"
const routes = [
  {
    path: '/',
    name: 'Login_page',
    component: Login_page
  },
  {
    path: '/chatroom',
    //query: this.$route.query,
    name: 'chatroom',
    component: chatroom
  },
  {
    path: '/user',
    name: 'user',
    component: user
  },
  {
    path: '/room_list',
    name: 'room_list',
    component: room_list
  },
  {
    path: '/registration',
    name: 'registration',
    component: registration
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(from)
  console.log(to.path === "/")
  console.log(vuex_store.state.loginStatus)
  if (to.path === "/" || to.path === "/registration") {//going to login
    next();
    return;
  } else
    if (!vuex_store.state.loginStatus) {//if not login,force to login page
      router.push("/")
      return;
    }
  next();
});
export default router;