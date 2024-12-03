import { useCallback, useState } from 'react'
import useChat from '../..//hooks/useChat'
import './style.css'

export default function MessageInput() {
  const {
    // isSending,
    // isSendMessageError,
    sendMessage
  } = useChat()

  const [message, setMessage] = useState ('')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }, [])

  const handleSendMessage = useCallback(() => {
    sendMessage(message)

    setMessage('')
  }, [message, sendMessage])

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }, [handleSendMessage])

  return <div className="message-input-container">
      <textarea spellCheck='false' autoCorrect='off'  rows={1} value={message} contentEditable={true} className='message-input' onKeyDown={handleKeyPress} onInput={handleChange}></textarea>
      {/* <button onClick={handleSendMessage}>Send</button> */}
  </div>
}