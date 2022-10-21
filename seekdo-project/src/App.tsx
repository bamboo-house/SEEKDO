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
    // eslintでPromise関連のエラーが出るためvoidをつける
    // 参照：https://stackoverflow.com/questions/43980188/what-could-this-be-about-tslint-error-promises-must-be-handled-appropriately#:~:text=promise%20%E3%82%92%E5%91%BC%E3%81%B3%E5%87%BA%E3%81%97%E3%81%9F%E3%81%84%E5%A0%B4%E5%90%88%E3%82%82%E3%81%82%E3%82%8A%E3%81%BE%E3%81%99%E3%81%8C%E3%80%81%E5%BF%9C%E7%AD%94%E3%81%AB%E5%AF%BE%E3%81%97%E3%81%A6%E3%81%AF%E4%BD%95%E3%82%82%E3%81%99%E3%82%8B%E5%BF%85%E8%A6%81%E3%81%AF%E3%81%82%E3%82%8A%E3%81%BE%E3%81%9B%E3%82%93%E3%80%82%E3%83%AB%E3%83%BC%E3%83%88%E5%A4%89%E6%9B%B4%E3%81%8B%E4%BD%95%E3%81%8B%E3%80%82
    void checkIfWalletIsConnected();
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
