const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const todoContractFactory = await hre.ethers.getContractFactory("TodoPortal");
  const todoContract = await todoContractFactory.deploy();
  const todoPortal = await todoContract.deployed();

  console.log("Contract deployed to: ", todoPortal.address);
  console.log("Contract deployed by:", owner.address);

  let todoCount;
  todoCount = await todoContract.getTotalTodo();

  let todoTxn = await todoContract.createTodo();
  await todoTxn.wait();

  todoCount = await todoContract.getTotalTodo();

  todoTxn = await todoContract.deleteTodo();
  await todoTxn.wait();

  todoCount = await todoContract.getTotalTodo();
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