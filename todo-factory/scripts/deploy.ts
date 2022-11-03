import { ethers } from "hardhat";

const main = async (): Promise<void> => {
  const [deployer] = await ethers.getSigners();
  const accountBalance = await deployer.getBalance();
  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const todoFactoryContract = await ethers.getContractFactory("TodoFactory");
  const todoContract = await todoFactoryContract.deploy();

  await todoContract.deployed();

  console.log("TodoFactory address: ", todoContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();