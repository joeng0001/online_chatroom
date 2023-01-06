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
  findall_user() {
    return http.get("/user");
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
}

export default new DataService();