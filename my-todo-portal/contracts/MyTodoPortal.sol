// TodoPortal.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract MyTodoPortal {

  uint256 totalTodos;

  event  NewTodo(address indexed from, uint256 timestamp, string message, uint256 limit);

  struct Todo {
    address creator;
    uint256 timestamp;
    string message;
    uint256 limit;
  }

  Todo[] todos;

  constructor() {
    console.log("MyTodoPortal - Smart Contract!");
  }

  function createTodo(string memory _message, uint256 _limit) public {
    totalTodos += 1;
    console.log("%s create todo w/ with message %s", msg.sender, _message);

    // 受け取ったデータをブロックチェーン上に保存する
    todos.push(Todo(msg.sender, block.timestamp, _message, _limit));

    // 新しいTdodoを作ったことをフロントに伝える
    emit NewTodo(msg.sender, block.timestamp, _message, _limit);
  }

  function deleteTodo() public {
    totalTodos -= 1;
    console.log("%s delete todo!", msg.sender);
  }

  function getTotalTodos() public view returns (uint256) {
    return totalTodos;
  }

  function getAllTodos() public view returns (Todo[] memory) {
    return todos;
  }

}
