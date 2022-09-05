"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const main = async () => {
    const [owner, randomPerson] = await hardhat_1.ethers.getSigners();
    console.log("Hello Typescript: ", owner.address);
    // const todoContractFactory = await ethers.getContractFactory("TodoPortal");
    // const todoContract = await todoContractFactory.deploy();
    // const todoPortal = await todoContract.deployed();
    // console.log("Contract deployed to: ", todoPortal.address);
    // console.log("Contract deployed by:", owner.address);
    // let todoCount;
    // todoCount = await todoContract.getTotalTodo();
    // let todoTxn = await todoContract.createTodo();
    // await todoTxn.wait();
    // todoCount = await todoContract.getTotalTodo();
    // todoTxn = await todoContract.deleteTodo();
    // await todoTxn.wait();
    // todoCount = await todoContract.getTotalTodo();
};
const runMain = async () => {
    try {
        await main();
        process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
runMain();
