import { ethers } from "hardhat";

const main = async (): Promise<void> => {
  const todoContractFactory = await ethers.getContractFactory("TodoFactory");

  const todoContract = await todoContractFactory.deploy();
  await todoContract.deployed();
  console.log("Contract deployed to: ", todoContract.address);

  // depositで0.1ethを送る
  let depositTxn = await todoContract.deposit({
    value: ethers.utils.parseEther("0.1")
  });
  await depositTxn.wait();
  console.log("0.1ETH 入金")

  /*
   * コントラクトの残高を取得（0.1ETH）であることを確認
   */
  let contractBalance = await ethers.provider.getBalance(
    todoContract.address
  );
  console.log(
    "Contract balance:",
    ethers.utils.formatEther(contractBalance)
  );

  // withdrowで0.01eth取り出す
  const withdrowTxn = await todoContract.withdrow(ethers.utils.parseEther("0.05"));
  await withdrowTxn.wait();
  console.log("0.05ETH 出金");

  // 再度、残高を確認
  contractBalance = await ethers.provider.getBalance(
    todoContract.address
  );
  console.log(
    "Contract balance:",
    ethers.utils.formatEther(contractBalance)
  );
}; 

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();