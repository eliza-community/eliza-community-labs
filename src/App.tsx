import './App.css'
import Chat from './components/Chat'
import { Provider } from 'react-redux'
import { store } from './store'
import MessageInput from './components/MessageInput'

function App() {
  return (
    <Provider store={store}>
      <div className='main'>
        <header>chat</header>
        <div>
          <Chat></Chat>
        </div>
        <footer>
          <MessageInput></MessageInput>
        </footer>
      </div>
    </Provider>
  )
}

export default App
