import { useMemo } from "react"
import { useAppSelector } from "../store"
import { chatMessages } from "../store/chatSlice"

export default function Chat() {
  const messages = useAppSelector(chatMessages)

  const nodes = useMemo(() => {
    console.log(messages)
    return messages.map((message, index) => {
      return <div key={index}>{message.content}</div>
    })
  }, [messages])

  return <div>
    {nodes}
  </div>
}