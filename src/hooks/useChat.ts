import { useCallback, useState } from "react"
import { store, useAppDispatch } from "../store"
import { addMessage } from "../store/chatSlice"
import { chatApi } from "../apis/chat"

export default function useChat() {
  const dispatch = useAppDispatch()

  const [isSending, setIsSending] = useState(false)

  const chatWithBot = useCallback(async () => {
    setIsSending(true)

    try {
      const res = await chatApi(store.getState().chat.messages)

      console.log(res)

      const message = { ...res.data.choices[0].message, state: 1, timestamp: Date.now() }

      dispatch(addMessage(message))
    } catch (err) {
      console.log(err)
    } finally {
      setIsSending(false)
    }
  }, [dispatch])

  const sendMessage = useCallback(async (message: string) => {
    dispatch(addMessage({ role: 'user', content: message, state: 0, timestamp: Date.now() }))

    chatWithBot()
  }, [chatWithBot, dispatch])

  return {
    isSending,
    sendMessage
  }  
}