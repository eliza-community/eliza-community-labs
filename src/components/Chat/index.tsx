import { useMemo } from "react"
import { useAppSelector } from "../../store"
import { chatMessages } from "../../store/chatSlice"
import './style.css'

export default function Chat() {
  const messages = useAppSelector(chatMessages)

  const nodes = useMemo(() => {
    console.log(messages)

    return messages.slice(1).map((message, index) => {
      return <div key={index} className={['chat-line', message.role].join(' ')}>{message.content}</div>
    })
  }, [messages])

  return <div style={{flex: 1, padding: '0 20px 20px 20px', overflowY: 'auto'}}>
    {nodes}
  </div>
}