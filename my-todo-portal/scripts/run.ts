import { ethers } from "hardhat"
const main = async (): Promise<void> => {
  const todoContractFactory = await ethers.getContractFactory("MyTodoPortal");
  const todoContract = await todoContractFactory.deploy();

  // todoを作る
  let todoTxn = await todoContract.createTodo("タイトル１", "ボディ1", 20220914); // コントラクトからの応答をフロントエンドが待機するよう設定
  await todoTxn.wait(); // コントラクトから承認されるのを待つ

  const [_, randomPerson] = await ethers.getSigners();
  todoTxn = await todoContract.connect(randomPerson).createTodo("タイトル2", "ボディ2", 2022105);
  await todoTxn.wait();
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