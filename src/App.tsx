import './App.css'
import { Provider } from 'react-redux'
import { store } from './store'
import Chat from './components/Chat/index'
import MessageInput from './components/MessageInput/index'
import Background from './components/Background'
import ConnectWalletButton from './components/ConnectWalletButton'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { clusterApiUrl } from '@solana/web3.js';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { TorusWalletAdapter } from '@solana/wallet-adapter-torus';
import { CoinbaseWalletAdapter } from '@solana/wallet-adapter-coinbase';

function SolanaWalletProvider ({ children }: { children: React.ReactNode }) {
  const endpoint = clusterApiUrl('mainnet-beta')

  const wallets = [
    new PhantomWalletAdapter(), 
    new SolflareWalletAdapter(),
    new TorusWalletAdapter(),
    new CoinbaseWalletAdapter()
  ]

  return <ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={wallets} autoConnect>
      {children}
    </WalletProvider>
  </ConnectionProvider>
}

function App() {
  return (
    <Provider store={store}>
      <SolanaWalletProvider>
        <Background></Background>
        <div className='main'>
          <header className='app-header'>
            <h1>eliza's labs</h1>
            <ConnectWalletButton></ConnectWalletButton>
          </header>
          <div className='app-body'>
            <MessageInput></MessageInput>
            <Chat></Chat>
          </div>
        </div>
      </SolanaWalletProvider>
    </Provider>
  )
}

export default App
