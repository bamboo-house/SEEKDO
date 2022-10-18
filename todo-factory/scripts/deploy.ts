import { ethers } from "hardhat";

const main = async () => {
  const [deployer] = await ethers.getSigners();
  const accountBalance = await deployer.getBalance();
  const todoContract = await ethers.getContractFactory("TodoFactory");
  const todoPortal = await todoContract.deploy();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());
  console.log("Contract deployed to: ", todoPortal.address);
  console.log("Contract deployed by:", deployer.address);
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