// import { useWallet } from '@solana/wallet-adapter-react';
import {
  WalletConnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import '@solana/wallet-adapter-react-ui/styles.css'
import './style.css'

export default function ConnectWalletButton() {
  // const [walletModalConfig, setWalletModalConfig] = useState<Readonly<{
  //     onSelectWallet(walletName: WalletName): void;
  //     wallets: Wallet[];
  // }> | null>(null);

  // const {
  //   select,
  // } = useWallet();

  return (
    <WalletModalProvider>
      <WalletMultiButton />
      <WalletConnectButton />
  </WalletModalProvider>
  );
}