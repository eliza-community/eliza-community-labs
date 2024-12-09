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
    <div className="plugin-button">
      <button>
        <svg fill="#fff" height="24" viewBox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48h-48z" fill="none"/><path d="M42 38v-28c0-2.21-1.79-4-4-4h-28c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4zm-25-11l5 6.01 7-9.01 9 12h-28l7-9z"/></svg>
      </button>
      {/* <svg fill="#fff" height="16" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M86.4,480h339.2c12.3,0,22.4-9.9,22.4-22.1V246c0-12.2-10-22-22.4-22H404v-30.9c0-41.5-16.2-87.6-42.6-115.4  C335.1,49.9,297.4,32,256.1,32c-0.1,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c-41.3,0-79,17.9-105.3,45.6c-26.4,27.8-42.6,73.9-42.6,115.4V224  H89h-2.6C74,224,64,233.9,64,246v211.9C64,470.1,74,480,86.4,480z M161,193.1c0-27.3,9.9-61.1,28.1-80.3l0,0l0-0.3  C206.7,93.9,231,83,255.9,83h0.1h0.1c24.9,0,49.2,10.9,66.8,29.5l0,0.2l-0.1,0.1c18.3,19.2,28.1,53,28.1,80.3V224h-17.5h-155H161  V193.1z"/></svg> */}
    </div>
    <div>
      <div className='sending' style={{ visibility: sending ? 'visible' : 'hidden' }}>eliza is typing...</div>
      <div className='error' style={{ visibility: isError ? 'visible' : 'hidden',  }  }>something error, <span onClick={() => retry()}>retry</span></div>
    </div>
    <div className="chat-list" style={{flex: 1, padding: '0 20px 12px 20px', overflowY: 'auto'}}>
      {nodes}
    </div>
  </>
}