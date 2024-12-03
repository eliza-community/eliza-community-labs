import { useEffect, useMemo } from "react"
import { useAppSelector } from "../../store"
import { chatMessages } from "../../store/chatSlice"
import './style.css'

export default function Chat() {
  const messages = useAppSelector(chatMessages)

  const nodes = useMemo(() => {
    return messages.slice(1).map((message, index) => {
      return <pre key={index} className={['chat-line', message.role].join(' ')}>{message.content}</pre>
    })
  }, [messages])

  useEffect(() => {
    const chat = document.querySelector('.chat-list')
    
    if (chat) {
      chat.scrollTop = chat.scrollHeight
    }
  }, [messages])

  return <>
    <div className='sending' style={{ visibility: messages[messages.length - 1].role === 'user' ? 'visible' : 'hidden' }}>eliza is typing...</div>
    <div className="chat-list" style={{flex: 1, padding: '0 20px 12px 20px', overflowY: 'auto'}}>
      {nodes}
    </div>
  </>
}