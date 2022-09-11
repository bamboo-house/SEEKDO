import { ethers } from "hardhat"
const main = async (): Promise<void> => {
  const todoContractFactory = await ethers.getContractFactory("MyTodoPortal");
  const todoContract = await todoContractFactory.deploy();
  // const myTodoPortal = await mytodoContract.deployed();
  console.log("Contract added to:", todoContract.address);
  
  let todoCount;
  todoCount = await todoContract.getTotalTodos();
  console.log(todoCount.toNumber());

  // todoを作る
  let todoTxn = await todoContract.createTodo("テスト１", 20220914);
  await todoTxn.wait();

  const [_, randomPerson] = await ethers.getSigners();

  todoTxn = await todoContract.connect(randomPerson).createTodo("テスト2", 20220916);
  await todoTxn.wait();

  let allTodos = await todoContract.getAllTodos();
  console.log(allTodos);
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