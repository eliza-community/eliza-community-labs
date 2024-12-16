import { useCallback } from "react"
import { store, useAppDispatch } from "../store"
import { addMessage, updateSendingMessageState, updateSendingMessageErrorState } from "../store/chatSlice"
import { chatApi } from "../apis/chat"
import { imageGenApi } from "../apis/imageGen"

export default function useChat() {
  const dispatch = useAppDispatch()

  const chatWithBot = useCallback(async () => {
    dispatch(updateSendingMessageErrorState(false))
    dispatch(updateSendingMessageState(true))

    try {
      const chatState = store.getState().chat

      const messages = chatState.messages

      if (chatState.isImgGenerateModel) {
        const res = await imageGenApi(messages[messages.length - 1].content)
        const message = { role: 'assistant', content: res.data.url, state: 1, timestamp: Date.now(), type: 'image' }
        dispatch(addMessage(message))
      } else {
        const res = await chatApi(messages)
        const message = { ...res.data.choices[0].message, state: 1, timestamp: Date.now(), type: 'text' }
        dispatch(addMessage(message))
      }
    } catch (err) {
      console.log(err)

      dispatch(updateSendingMessageErrorState(true))
    } finally {
      dispatch(updateSendingMessageState(false))
    }
  }, [dispatch])

  const sendMessage = useCallback(async (message: string) => {
    dispatch(addMessage({ role: 'user', content: message, state: 0, timestamp: Date.now(), type: 'text' }))

    chatWithBot()
  }, [chatWithBot, dispatch])

  const retry = useCallback(() => {
    dispatch(updateSendingMessageErrorState(false))
    chatWithBot()
  }, [chatWithBot, dispatch])

  return {
    retry,
    sendMessage
  }  
}