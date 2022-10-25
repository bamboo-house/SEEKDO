import { useState } from "react";
import { createContainer } from "unstated-next";

const useAccountContainer = () => {
  const [currentAccount, setCurrentAccount] = useState<string>('');
  console.log('現在のアカウント: ', currentAccount);

  const checkIfWalletIsConnected = async (): Promise<void> => {
    // window.ethereumにアクセスできることを確認する
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log('あなたのメタマスクを確認してください');
      } else {
        console.log('ブラウザからメタマスクにアクセス可能です', ethereum);
      }

      // ユーザーのウォレットへのアクセスが許可されているかどうかを確認
      const accounts: any[] = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log('許可されたアカウント: ', account);
        setCurrentAccount(account);
      } else {
        console.log('許可されたアカウントが見つかりませんでした');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum }: any = window;
      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log('接続アカウント: ', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    currentAccount,

    checkIfWalletIsConnected,
    connectWallet
  };
};

export const AccountContainer = createContainer(useAccountContainer);