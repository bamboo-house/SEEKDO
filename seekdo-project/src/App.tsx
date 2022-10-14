import React, { useEffect, useState } from 'react';
// 自作コンポーネント
import { Header } from './components/Header';
import { TodoFormAccordion } from './components/TodoFormAccordion';
import { TodoList } from './components/TodoList';
// mui
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Grid, Box, Button } from '@mui/material';
// コントラクト関連のライブラリ
import { ethers } from "ethers";
// import abi from "./utils/TodoFactory.json";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState<string>("");
  console.log("currentAccount: ", currentAccount);

  // コントラクトのデプロイ先のアドレス
  // const contractAddress = "0x4840AE6B4203a9f0f0628e5FBEFeff277248CB7A";
  // ABIの内容を参照する変数
  // const contractABI = abi.abi;


  // const getAllTodos = async() => {
  //   // MetaMaskのライブラリ
  //   const { ethereum }: any = window;

  //   try {
  //     if (ethereum) {
  //       // MetaMaskを介して、イーサリアムノードに接続する
  //       const provider = new ethers.providers.Web3Provider(ethereum);
  //       const signer = provider.getSigner();
  //       const todoPortalContract = new ethers.Contract(
  //         contractAddress,
  //         contractABI,
  //         signer
  //       );
  //       const todos = await todoPortalContract.getAllTodos();
  //       const todosCleaned = todos.map((todo: Todo) => {
  //         return {
  //           address: todo.creator,
  //           timestamp: new Date(todo.timestamp * 1000),
  //           body: todo.body,
  //           limit: todo.limit
  //         };
  //       });
  //       setAllTodos(todosCleaned);
  //     } else {
  //       console.log("Ethereum object doesn't exist!");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const checkIfWalletIsConnected = async () => {
    // window.ethereumにアクセスできることを確認する
    try {
      const { ethereum }: any = window;
      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
      } else {
        console.log("We have the ethereum object", ethereum);
      }
  
      // ユーザーのウォレットへのアクセスが許可されているかどうかを確認
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account: ", account);
        setCurrentAccount(account);
        // コントラクトからtodosを取得し、初期表示
        // getAllTodos();
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum }: any = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };


  // useEffect(() => {
  //   const { ethereum }: any = window;
  //   // eimitされたイベントに反応する
  //   let todoPortalContract: ethers.Contract;
  //   const onNewTodo = (from: any, timestamp: number, body: string, limit: number): void => {
  //     console.log("NewTodo", from, timestamp, body, limit);
  //     setAllTodos((prevState): any => [
  //       ...prevState,
  //       {
  //         creator: from,
  //         timestamp: new Date(timestamp * 1000),
  //         body: body,
  //         limit: limit,
  //       },
  //     ]);
  //   };

  //   /* NewTodoイベントがコントラクトから発信されたときに、情報を受け取る */
  //   if (ethereum) {
  //     const provider = new ethers.providers.Web3Provider(ethereum);
  //     const signer = provider.getSigner();
  
  //     todoPortalContract = new ethers.Contract(
  //       contractAddress,
  //       contractABI,
  //       signer
  //     );
  //     todoPortalContract.on("NewTodo", onNewTodo);
  //   }
  //   /*メモリリークを防ぐために、NewTodoのイベントを解除する*/
  //   return () => {
  //     if (todoPortalContract) {
  //       todoPortalContract.off("NewTodo", onNewTodo);
  //     }
  //   };

  // }, []);

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
          dark: '#aabb97'
        }
    },
    typography: {
      fontFamily: 'Roboto'
    }
  })

  return (
    <Box sx={{ bgcolor: '#F5F5F6'}}>
      <ThemeProvider theme={apptheme} >
        <CssBaseline/>
        <Grid item xs={12} >
          <Header connectWallet={connectWallet} currentAccount={currentAccount}/>
        </Grid>

        <Grid container>
          <Grid item xs={2} >
          </Grid>
          <Grid item xs={8}>
            <TodoFormAccordion/>
            <TodoList/>
          </Grid>
          <Grid item xs={2} >
          </Grid>
        </Grid>
      </ThemeProvider>
    </Box>
  );
}

export default App;
