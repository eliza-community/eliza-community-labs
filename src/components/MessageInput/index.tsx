import { useCallback, useMemo, useState } from 'react'
import useChat from '../..//hooks/useChat'
import './style.css'
import { useAppSelector } from '../../store'
import { isSendingMessage } from '../../store/chatSlice'

export default function MessageInput() {
  const {
    sendMessage
  } = useChat()

  const isSending = useAppSelector(isSendingMessage)

  const [message, setMessage] = useState ('')

  const canSend = useMemo(() => {
    return !( isSending || message === '')
  }, [isSending, message])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
  }, [])

  const handleSendMessage = useCallback(() => {
    if (!canSend) return

    sendMessage(message)

    setMessage('')
  }, [message, sendMessage, canSend])

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()

      if (isSending) return
      
      handleSendMessage()

      // @ts-expect-error ...
      e.target.style.height = 'auto'    
    }
  }, [handleSendMessage, isSending])

  return <div className="message-input-container">
      <div className='message-input'>
        <textarea spellCheck='false' autoCorrect='off'  rows={1} value={message} onKeyDown={handleKeyPress} onInput={handleChange}></textarea>
      </div>
      <button disabled={!canSend} style={{ opacity: canSend ? 1 : 0.5 }} onClick={handleSendMessage}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="16" height="16" viewBox="0 0 16 16"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/></svg>
      </button>
  </div>
}