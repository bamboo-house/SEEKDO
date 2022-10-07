"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const main = async () => {
    const [deployer] = await hardhat_1.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
    const waveContract = await hardhat_1.ethers.getContractFactory("TodoFactory");
    const wavePortal = await waveContract.deploy();
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());
    console.log("Contract deployed to: ", wavePortal.address);
    console.log("Contract deployed by:", deployer.address);
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
