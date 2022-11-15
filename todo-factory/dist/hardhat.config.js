"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomicfoundation/hardhat-toolbox");
require("dotenv/config");
const config = {
    solidity: "0.8.9",
    networks: {
        goerli: {
            url: process.env.STAGING_ALCHEMY_KEY,
            accounts: [process.env.PRIVATE_KEY || ""],
        }
    }
};
exports.default = config;
