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
  isSendingMessage: boolean
  isSendingMessageError: boolean
  messages: Message[]
}

const _historyMessage = localStorage.getItem('historyMessage')

const initialState: ChatState = {
  isSendingMessage: false,
  isSendingMessageError: false,
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
    },
    updateSendingMessageState(state, action) {
      state.isSendingMessage = action.payload
    },
    updateSendingMessageErrorState(state, action) {
      state.isSendingMessageError = action.payload
      console.log(state.isSendingMessageError)
    }
  },
})

export const chatReducer = chatSlice.reducer

export const { addMessage, updateSendingMessageState, updateSendingMessageErrorState } = chatSlice.actions

export const chatMessages = (state: RootState) => state.chat.messages

export const isSendingMessage = (state: RootState) => state.chat.isSendingMessage

export const isSendingMessageError = (state: RootState) => state.chat.isSendingMessageError