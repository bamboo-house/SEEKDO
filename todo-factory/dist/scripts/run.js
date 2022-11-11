"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const main = async () => {
    const todoContractFactory = await hardhat_1.ethers.getContractFactory("TodoFactory");
    const [_, randomPerson] = await hardhat_1.ethers.getSigners();
    const todoContract = await todoContractFactory.deploy();
    await todoContract.deployed();
    console.log("Contract deployed to: ", todoContract.address);
    // 【流れ】
    // 1. todoを作る
    // 2. 入金する
    // 3. 残高を確認する
    // 4. todoを完了する
    // 5. 再度残高を確認して減っているか確認
    // 6. 他のユーザーで1~5をやってみる
    const date = new Date(2023, 1, 1);
    let todoTxn = await todoContract.createTodo("禿頭", "はげ太郎", hardhat_1.ethers.utils.parseEther("0.1"), Math.floor(date.getTime() / 1000));
    await todoTxn.wait();
    console.log("Todo1を作成");
    // 入金する
    todoTxn = await todoContract.deposit({
        value: hardhat_1.ethers.utils.parseEther("0.5")
    });
    await todoTxn.wait();
    console.log("オーナーで0.5ETH 入金");
    // 残高を確認する
    let contractBalance = await todoContract.getBalance();
    console.log("Contract balance:", hardhat_1.ethers.utils.formatEther(contractBalance));
    // todoを完了する
    todoTxn = await todoContract.doneTodo(1);
    await todoTxn.wait();
    console.log("Todo1を完了する");
    // 再度、残高を確認
    contractBalance = await todoContract.getBalance();
    console.log("Contract balance:", hardhat_1.ethers.utils.formatEther(contractBalance));
    let Alltodos = await todoContract.getAllTodos();
    console.log("全てのtodos", Alltodos);
    // 他のユーザーでtodo作成
    todoTxn = await todoContract.connect(randomPerson).createTodo("禿頭２", "はげ太郎2", hardhat_1.ethers.utils.parseEther("0.2"), Math.floor(date.getTime() / 1000));
    await todoTxn.wait();
    console.log("ランダムユーザーでTodo2を作成");
    Alltodos = await todoContract.connect(randomPerson).getAllTodos();
    console.log("全てのtodos", Alltodos);
    // 入金する
    todoTxn = await todoContract.connect(randomPerson).deposit({
        value: hardhat_1.ethers.utils.parseEther("0.8")
    });
    await todoTxn.wait();
    console.log("ランダムユーザーで0.8ETH 入金");
    // 残高を確認する
    contractBalance = await todoContract.connect(randomPerson).getBalance();
    console.log("ランダムユーザーのContract balance:", hardhat_1.ethers.utils.formatEther(contractBalance));
    // todoを完了する。idが2であることを確認
    todoTxn = await todoContract.connect(randomPerson).doneTodo(2);
    await todoTxn.wait();
    console.log("Todo2を完了する");
    // 再度、残高を確認
    contractBalance = await todoContract.connect(randomPerson).getBalance();
    console.log("Contract balance:", hardhat_1.ethers.utils.formatEther(contractBalance));
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
