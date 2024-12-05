import { useEffect, useMemo } from "react"
import { useAppSelector } from "../../store"
import { chatMessages, isSendingMessage, isSendingMessageError } from "../../store/chatSlice"
import './style.css'
import useChat from "../../hooks/useChat"

export default function Chat() {
  console.log('chat update')
  const messages = useAppSelector(chatMessages)

  const sending = useAppSelector(isSendingMessage)

  const isError = useAppSelector(isSendingMessageError)
  console.log(233, isError)

  const {
    retry
  } = useChat()

  const nodes = useMemo(() => {
    return messages.slice(1).map((message, index) => {
      return <div style={{ clear: 'both' }} key={index}><pre className={['chat-line', message.role].join(' ')}>
        {message.type === 'text' && <span>{message.content}</span>}
        {message.type === 'image' && <img src={message.content} alt="" />}
      </pre></div>
    })
  }, [messages])

  useEffect(() => {
    const chat = document.querySelector('.chat-list')
    
    if (chat) {
      chat.scrollTop = chat.scrollHeight
    }
  }, [messages])

  return <>
    <div>
      <div className='sending' style={{ visibility: sending ? 'visible' : 'hidden' }}>eliza is typing...</div>
      <div className='error' style={{ visibility: isError ? 'visible' : 'hidden',  }  }>something error, <span onClick={() => retry()}>retry</span></div>
    </div>
    <div className="chat-list" style={{flex: 1, padding: '0 20px 12px 20px', overflowY: 'auto'}}>
      {nodes}
    </div>
  </>
}