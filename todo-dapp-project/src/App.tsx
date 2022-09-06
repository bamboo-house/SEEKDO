import React, { useEffect } from 'react';
import './App.css';

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

  useEffect(() => {
    checkIFWalletIsConnected();
  }, []);
  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
          <span role="img" aria-label="hand-wave">
            👋
          </span>{" "}
          WELCOME!
        </div>
        <div className="bio">
          イーサリアムウォレットを接続して、「
          <span role="img" aria-label="hand-wave">
            👋
          </span>
          (wave)」を送ってください
          <span role="img" aria-label="shine">
            ✨
          </span>
        </div>
        <button className="waveButton" onClick={() => {}}>
          Wave at Me
        </button>
      </div>
    </div>
  );
}

export default App;
