import { useWallet } from '@solana/wallet-adapter-react';
import {
  // WalletConnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import '@solana/wallet-adapter-react-ui/styles.css'
import './style.css'
import { useCallback, useEffect } from 'react';
import { checkWalletApi } from '../../apis/checkWallet';
import { useAppDispatch } from '../../store';
import { updateWalletState } from '../../store/wallet';

export default function ConnectWalletButton() {
  const {
    connected,
    publicKey,
  } = useWallet();

  const dispatch = useAppDispatch()
  
  const checkWallet = useCallback(async () => {
    try {
      const res = await checkWalletApi(publicKey as unknown as string)

      if (res.data.has_$eliza) dispatch(updateWalletState({ has$eliza: true }))
    } catch (err) {
      console.log(err)
    }
  }, [publicKey, dispatch])

  useEffect(() => {
    if (connected) {
      console.log(`Connected with public key: ${publicKey}`)

      checkWallet()
    } else {
      dispatch(updateWalletState({ has$eliza: false }))
    }
  }, [connected, publicKey, checkWallet, dispatch])



  return (
    <WalletModalProvider>
      <WalletMultiButton />
      {/* <WalletConnectButton /> */}
  </WalletModalProvider>
  );
}