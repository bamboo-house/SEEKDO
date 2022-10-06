"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomicfoundation/hardhat-toolbox");
const config = {
    solidity: "0.8.9",
    networks: {
        rinkeby: {
            url: "https://eth-rinkeby.alchemyapi.io/v2/ehYeBkP-dS4qaVVUvm-Oi6p6-TPAiZjS",
            accounts: ["c73706c8fdf6b4ffc9c146cc1fb0b5cc941096a1ee0b71c2366409f0b13072c1"],
        }
    }
};
exports.default = config;
