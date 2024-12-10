import { useCallback, useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "../../store"
import { chatMessages, isSendingMessage, isSendingMessageError, isImgGenerateModel, updateIsImgGenerateModel } from "../../store/chatSlice"
import './style.css'
import useChat from "../../hooks/useChat"
import { getWalletState } from "../../store/wallet"

export default function Chat() {
  const messages = useAppSelector(chatMessages)

  const sending = useAppSelector(isSendingMessage)

  const isError = useAppSelector(isSendingMessageError)

  const isImgGenModelActive = useAppSelector(isImgGenerateModel)

  const has$eliza = useAppSelector(getWalletState).has$eliza

  const dispatch = useAppDispatch()

  const {
    retry
  } = useChat()

  const handleScroll = useCallback(() => {
    const chat = document.querySelector('.chat-list')
    
    if (chat) {
      chat.scrollTop = chat.scrollHeight
    }
  }, [])

  const nodes = useMemo(() => {
    return messages.slice(1).map((message, index) => {
      return <div style={{ clear: 'both' }} key={index}><pre className={['chat-line', message.role].join(' ')}>
        {message.type === 'text' && <span>{message.content}</span>}
        {message.type === 'image' && <img src={message.content} alt="" onLoad={handleScroll} />}
      </pre></div>
    })
  }, [messages, handleScroll])

  const handleChangeImgGenModelState = useCallback(() => {
    if (!has$eliza) return
    dispatch(updateIsImgGenerateModel(!isImgGenModelActive))
  }, [isImgGenModelActive, dispatch, has$eliza])

  useEffect(() => {
    handleScroll()
  }, [messages, handleScroll])

  return <>
    <div className={['plugin-button', has$eliza ? '' : 'disabled', isImgGenModelActive ? 'active' : '' ].join(' ')}>
      <button onClick={handleChangeImgGenModelState}>
        <svg fill="#fff" height="20" viewBox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48h-48z" fill="none"/><path d="M42 38v-28c0-2.21-1.79-4-4-4h-28c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4zm-25-11l5 6.01 7-9.01 9 12h-28l7-9z"/></svg>
      </button>
    </div>
    <div>
      <div className='sending' style={{ visibility: sending ? 'visible' : 'hidden' }}>eliza is typing...</div>
      <div className='error' style={{ display: isError ? 'block' : 'none',  }  }>something error, <span onClick={() => retry()}>retry</span></div>
    </div>
    <div className="chat-list" style={{flex: 1, padding: '0 20px 12px 20px', overflowY: 'auto'}}>
      {nodes}
    </div>
  </>
}