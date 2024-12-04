import { useCallback } from "react"
import { store, useAppDispatch } from "../store"
import { addMessage, updateSendingMessageState, updateSendingMessageErrorState } from "../store/chatSlice"
import { chatApi } from "../apis/chat"

export default function useChat() {
  const dispatch = useAppDispatch()

  const chatWithBot = useCallback(async () => {
    dispatch(updateSendingMessageState(true))

    try {
      const res = await chatApi(store.getState().chat.messages)

      const message = { ...res.data.choices[0].message, state: 1, timestamp: Date.now() }

      dispatch(addMessage(message))
    } catch (err) {
      console.log(err)

      dispatch(updateSendingMessageErrorState(true))
    } finally {
      dispatch(updateSendingMessageState(false))
    }
  }, [dispatch])

  const sendMessage = useCallback(async (message: string) => {
    dispatch(addMessage({ role: 'user', content: message, state: 0, timestamp: Date.now() }))

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