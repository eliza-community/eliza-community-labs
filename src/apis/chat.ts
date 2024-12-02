import { ChatState } from "../store/chatSlice";
import $http from "../utils/http";

export function chatApi (messages: ChatState['messages']) {
  return $http.post('chat', { messages })
}