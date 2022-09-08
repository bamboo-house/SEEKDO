// TodoPortal.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract MyTodoPortal {

  uint256 totalTodo;

  struct Todo {
    address creator;
    string message;
    uint256 timestamp;
    uint256 limit;
  }

  Todo[] todos;

  constructor() {
    console.log("Here is my fiirst smart contract!");
  }

  function createTodo(string memory _message, uint256 _limit) public {
    totalTodo += 1;
    console.log("%s waved w/ message %s", msg.sender, _message);

    todos.push(Todo(msg.sender, _message, block.timestamp, _limit));
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
