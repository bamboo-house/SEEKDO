import { ethers } from "hardhat";

const main = async (): Promise<void> => {
  const todoContractFactory = await ethers.getContractFactory("TodoFactory");
  /*
   * デプロイする際0.1ETHをコントラクトに提供する
   */
  const todoContract = await todoContractFactory.deploy({
    value: ethers.utils.parseEther("0.1"),
  });
  await todoContract.deployed();
  console.log("Contract deployed to: ", todoContract.address);

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