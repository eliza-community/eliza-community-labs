import { createSlice } from "@reduxjs/toolkit";
import { SYSTEM_PROMPT, DEFAULT_ASSISTANT_PROMPT } from "../constants/SYSTEM_PROMPT"
import { RootState } from "../store";

interface Message {
  role: 'system' | 'assistant' | 'user',
  content: string,
  timestamp: number | null,
  directives?: ['draw']
  state: 0 | 1 | 2  // 0: pending，1：success，2：fail
  type: 'image' | 'text'
}

export interface ChatState {
  isSendingMessage: boolean
  isSendingMessageError: boolean
  messages: Message[]
  isImgGenerateModel: boolean
}

const _historyMessage = localStorage.getItem('historyMessage')

const initialState: ChatState = {
  isSendingMessage: false,
  isSendingMessageError: false,
  isImgGenerateModel: false,
  messages: [
    { role: 'system', content: SYSTEM_PROMPT, state: 1, timestamp: null, type: 'text' },
    ...(_historyMessage ? JSON.parse(_historyMessage) : [
      { role: 'assistant', content: DEFAULT_ASSISTANT_PROMPT, state: 1, timestamp: Date.now(), type: 'text' }
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
    updateIsImgGenerateModel(state, action) {
      state.isImgGenerateModel = action.payload
    },
    updateSendingMessageErrorState(state, action) {
      state.isSendingMessageError = action.payload
      console.log(state.isSendingMessageError)
    }
  },
})

export const chatReducer = chatSlice.reducer

export const { addMessage, updateSendingMessageState, updateIsImgGenerateModel, updateSendingMessageErrorState } = chatSlice.actions

export const chatMessages = (state: RootState) => state.chat.messages

export const isSendingMessage = (state: RootState) => state.chat.isSendingMessage

export const isImgGenerateModel = (state: RootState) => state.chat.isImgGenerateModel

export const isSendingMessageError = (state: RootState) => state.chat.isSendingMessageError