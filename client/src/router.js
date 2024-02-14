import { createWebHistory, createRouter } from "vue-router";
import Login_page from "@/pages/Login";
import chatroom from "@/pages/ChatRoom";
import user from "@/pages/User";
import room_list from "@/pages/RoomList";
import registration from "@/pages/Registration";
import Home from "@/pages/HomePage";
import vuex_store from "./store.js";
const routes = [
  {
    path: "/",
    name: "Login_page",
    component: Login_page,
  },
  {
    path: "/chatroom_page",
    name: "chatroom",
    component: chatroom,
  },
  {
    path: "/user_page",
    name: "user",
    component: user,
  },
  {
    path: "/room_list_page",
    name: "room_list",
    component: room_list,
  },
  {
    path: "/registration_page",
    name: "registration",
    component: registration,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const banned_list = ["/user", "/room_list"];

  if (to.path === "/" || to.path === "/registration") {
    if (vuex_store.state.loginStatus) {
      router.push("/home");
      return;
    }
  }
  /*for admin checking*/
  // else if (vuex_store.state.userID !== 1 && banned_list.includes(to.path)) {//if not admin,then some path not allow
  //     router.push("/home")
  //     return;
  //   }
  next();
});
export default router;
