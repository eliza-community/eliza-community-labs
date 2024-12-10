import $http from "../utils/http";

export function checkWalletApi (address: string) {
  return $http.post('checkWallet', { address })
}