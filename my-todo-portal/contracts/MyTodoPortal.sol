// TodoPortal.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract MyTodoPortal {

  uint256 myTotalTodo;

  constructor() {
    console.log("Here is my fiirst smart contract!");
  }

  function createTodo() public {
    myTotalTodo += 1;
    console.log("%s create todo!", msg.sender);
  }

  function deleteTodo() public {
    myTotalTodo -= 1;
    console.log("%s delete todo!", msg.sender);
  }

  function getMyTotalTodo() public view returns (uint256) {
    console.log("We have %d total todo!", myTotalTodo);
    return myTotalTodo;
  }

}
