const main = async () => {
  const todoContractFactory = await hre.ethers.getContractFactory("TodoPortal");
  const todoContract = await todoContractFactory.deploy();
  const todoPortal = await todoContract.deployed();

  console.log("TodoPortal address: ", todoPortal.address);
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