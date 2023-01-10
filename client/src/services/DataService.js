import http from "../http";
class DataService {
  get_chat_record(data) {
    console.log("calling in data service testing get with room_id")
    console.log(data)
    return http.put("/chat_record", data);
  }
  add_chat_record(data) {
    console.log("calling in data service chat_record")
    console.log(data)
    return http.post("/chat_record", data);
  }
  delete_chat_record(data) {
    return http.put("/chat_record_deletion", data);
  }
  findall_user() {
    return http.get("/user");
  }
  delete_user(data) {
    return http.post("/user", data);
  }
  edit_user(data) {
    return http.post("/user_edition", data);
  }
  get_room_list() {
    return http.get("/chat_room");
  }
  login(data) {
    return http.post("/login", data);
  }
  Register(data) {
    return http.post("/register", data);
  }
  create_chatroom(data) {
    return http.post("/chat_room_creation", data)
  }
  edit_chatroom(data) {
    return http.post("/chat_room_edition", data)
  }
  remove_chatroom(data) {
    return http.put("/chat_room", data)
  }
  user_offline(data) {
    return http.put("/user", data)
  }


  // test_create(data) {
  //   return http.put("test_create", data)
  // }
}

export default new DataService();