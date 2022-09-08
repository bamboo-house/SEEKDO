import React, { useEffect } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { ethers } from "ethers";

const App = () => {
  const checkIFWalletIsConnected = () => {
    // window.ethereumにアクセスできることを確認する
    const { ethereum }: any = window;
    if (!ethereum) {
      console.log("Make sure you have MetaMask!");
    } else {
      console.log("We have the ethereum object", ethereum);
    }
  };

  const createTodo = async () => {
    try {
      // ユーザーがMetaMaskを持っているか確認
      const { ethereum }: any = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const myTodoPortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        let count = await myTodoPortalContract.createTodo();
        console.log("Retrieved total wave count...", count.toNumber());
        console.log("Signer:", signer);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIFWalletIsConnected();
  }, []);
  return (
    <Button variant="contained">Hello World</Button>
    // <div className="mainContainer">
    //   <div className="dataContainer">
    //     <div className="header">
    //       <span role="img" aria-label="hand-wave">
    //         👋
    //       </span>{" "}
    //       WELCOME!
    //     </div>
    //     <div className="bio">
    //       イーサリアムウォレットを接続して、「
    //       <span role="img" aria-label="hand-wave">
    //         👋
    //       </span>
    //       (wave)」を送ってください
    //       <span role="img" aria-label="shine">
    //         ✨
    //       </span>
    //     </div>
    //     <button className="waveButton" onClick={() => {}}>
    //       Wave at Me
    //     </button>
    //   </div>
    // </div>
  );
}

export default App;
