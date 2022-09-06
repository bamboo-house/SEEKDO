import { ethers } from "hardhat"
const main = async (): Promise<void> => {

  const [owner, randomPerson] = await ethers.getSigners();
  // console.log("Hello Typescript: ", owner.address);
  const myTodoContractFactory = await ethers.getContractFactory("MyTodoPortal");
  const myTodoContract = await myTodoContractFactory.deploy();
  const myTodoPortal = await myTodoContract.deployed();

  console.log("Contract deployed to: ", myTodoPortal.address);
  console.log("Contract deployed by:", owner.address);

  let todoCount;
  todoCount = await myTodoContract.getTotalTodo();

  let todoTxn = await myTodoContract.createTodo();
  await todoTxn.wait();

  todoCount = await myTodoContract.getTotalTodo();

  todoTxn = await myTodoContract.deleteTodo();
  await todoTxn.wait();

  todoCount = await myTodoContract.getTotalTodo();
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