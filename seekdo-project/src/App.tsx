import React, { useEffect, useState } from 'react';
// 自作コンポーネント
import { Header } from './components/Header';
import { TodoFormAccordion } from './components/TodoFormAccordion';
import { TodoList } from './components/TodoList';
// mui
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Grid, Box } from '@mui/material';
// コントラクト関連のライブラリ
// import abi from "./utils/TodoFactory.json";

const App: React.FC = () => {
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

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  // テーマカラーやフォント設定
  const apptheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#263238',
        light: '#000a12',
        dark: '#4f5b62',
      },
      secondary: {
        main: '#dcedc8',
        light: '#fffffb',
        dark: '#aabb97',
      },
    },
    typography: {
      fontFamily: 'Roboto',
    },
  });

  return (
    <Box sx={{ bgcolor: '#F5F5F6' }}>
      <ThemeProvider theme={apptheme}>
        <CssBaseline />
        <Grid item xs={12}>
          <Header connectWallet={connectWallet} currentAccount={currentAccount} />
        </Grid>

        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <TodoFormAccordion />
            <TodoList currentAccount={currentAccount} />
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </ThemeProvider>
    </Box>
  );
};

export default App;
