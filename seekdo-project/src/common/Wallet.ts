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
    // setCur rentAccount(accounts[0]);
  } catch (error) {
    console.log(error);
  }
};

export default { connectWallet };