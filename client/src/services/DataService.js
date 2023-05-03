import http from "../http";
import store from "../store"
class DataService {
  get_chat_record(data) {
    data.jwt = store.state.token
    return http.put("/chat_record", data);
  }
  add_chat_record(data) {
    data.jwt = store.state.token
    return http.post("/chat_record", data);
  }
  delete_chat_record(data) {
    data.jwt = store.state.token
    return http.put("/chat_record_deletion", data);
  }
  findall_user() {
    return http.get("/user");
  }
  delete_user(data) {
    data.jwt = store.state.token
    return http.post("/user", data);
  }
  edit_user(data) {
    data.jwt = store.state.token
    return http.post("/user_edition", data);
  }
  get_room_list(data) {
    data.jwt = store.state.token
    return http.post("/chat_room", data);
  }
  login(data) {
    return http.post("/login", data);
  }
  Register(data) {
    return http.post("/register", data);
  }
  create_chatroom(data) {
    data.jwt = store.state.token
    return http.post("/chat_room_creation", data)
  }
  edit_chatroom(data) {
    data.jwt = store.state.token
    return http.post("/chat_room_edition", data)
  }
  remove_chatroom(data) {
    data.jwt = store.state.token
    return http.put("/chat_room", data)
  }
  user_offline(data) {
    data.jwt = store.state.token
    return http.put("/user", data)
  }
  add_online_account(data) {
    data.jwt = store.state.token
    return http.put("login", data)
  }

  // test_create(data) {
  //   return http.put("test_create", data)
  // }
}

export default new DataService();