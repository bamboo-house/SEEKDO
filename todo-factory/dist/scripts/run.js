"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const main = async () => {
    const todoContractFactory = await hardhat_1.ethers.getContractFactory("TodoFactory");
    const [_, randomPerson] = await hardhat_1.ethers.getSigners();
    const todoContract = await todoContractFactory.deploy();
    await todoContract.deployed();
    console.log("Contract deployed to: ", todoContract.address);
    // depositで0.1ethを送る
    let depositTxn = await todoContract.deposit({
        value: hardhat_1.ethers.utils.parseEther("0.1")
    });
    await depositTxn.wait();
    console.log("0.1ETH 入金");
    /*
     * コントラクトの残高を取得（0.1ETH）であることを確認
     */
    let contractBalance = await hardhat_1.ethers.provider.getBalance(todoContract.address);
    console.log("Contract balance:", hardhat_1.ethers.utils.formatEther(contractBalance));
    depositTxn = await todoContract.connect(randomPerson).deposit({
        value: hardhat_1.ethers.utils.parseEther("0.3")
    });
    await depositTxn.wait();
    console.log("0.3ETH 入金");
    // withdrowで0.01eth取り出す
    const withdrowTxn = await todoContract.withdrow(hardhat_1.ethers.utils.parseEther("0.05"));
    await withdrowTxn.wait();
    console.log("0.05ETH 出金");
    // 再度、残高を確認
    contractBalance = await hardhat_1.ethers.provider.getBalance(todoContract.address);
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
