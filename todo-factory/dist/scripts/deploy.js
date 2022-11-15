"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const main = async () => {
    const [deployer] = await hardhat_1.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());
    const todoFactoryContract = await hardhat_1.ethers.getContractFactory("TodoFactory");
    const todoContract = await todoFactoryContract.deploy();
    await todoContract.deployed();
    console.log("TodoFactory address: ", todoContract.address);
};
const runMain = async () => {
    try {
        await main();
        process.exit(0);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
runMain();
