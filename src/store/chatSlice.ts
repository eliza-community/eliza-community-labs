import { createSlice } from "@reduxjs/toolkit";
import { SYSTEM_PROMPT, DEFAULT_ASSISTANT_PROMPT } from "../constants/SYSTEM_PROMPT"
import { RootState } from "../store";

interface Message {
  role: 'system' | 'assistant' | 'user',
  content: string,
  timestamp: number | null,
  directives?: ['draw']
  state: 0 | 1 | 2  // 0: pending，1：success，2：fail
}

export interface ChatState {
  messages: Message[]
}

const _historyMessage = localStorage.getItem('historyMessage')

const initialState: ChatState = {
  messages: [
    { role: 'system', content: SYSTEM_PROMPT, state: 1, timestamp: null },
    ...(_historyMessage ? JSON.parse(_historyMessage) : [
      { role: 'assistant', content: DEFAULT_ASSISTANT_PROMPT, state: 1, timestamp: Date.now() }
    ]) as Message[]
  ]
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages = [...state.messages, action.payload]
    }
  },
})

export const chatReducer = chatSlice.reducer

export const { addMessage } = chatSlice.actions

export const chatMessages = (state: RootState) => state.chat.messages