"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const main = async () => {
    const [owner, randomPerson] = await hardhat_1.ethers.getSigners();
    // console.log("Hello Typescript: ", owner.address);
    const myTodoContractFactory = await hardhat_1.ethers.getContractFactory("MyTodoPortal");
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
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
runMain();
