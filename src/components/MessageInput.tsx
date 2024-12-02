import { useCallback, useState } from 'react'
import useChat from '../hooks/useChat'

export default function MessageInput() {
  const {
    // isSending,
    // isSendMessageError,
    sendMessage
  } = useChat()

  const [message, setMessage] = useState ('')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }, [])

  const handleSendMessage = useCallback(() => {
    sendMessage(message)

    setMessage('')
  }, [message, sendMessage])

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }, [handleSendMessage])

  return <>
      <input value={message} type='textarea' className='message-input' onKeyDown={handleKeyPress} onInput={handleChange}></input>
      <button onClick={handleSendMessage}>Send</button>
  </>
}