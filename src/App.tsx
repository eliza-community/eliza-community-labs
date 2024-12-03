import './App.css'
import { Provider } from 'react-redux'
import { store } from './store'
import Chat from './components/Chat/index'
import MessageInput from './components/MessageInput/index'

function App() {
  return (
    <Provider store={store}>
      <div className='bg'>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className='main'>
        <header>
          <h1>eliza's labs</h1>
        </header>
        <div className='body'>
          <MessageInput></MessageInput>
          <Chat></Chat>
        </div>
      </div>
    </Provider>
  )
}

export default App
