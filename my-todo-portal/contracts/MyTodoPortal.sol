// TodoPortal.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract MyTodoPortal {

  uint256 totalTodos;

  event  NewTodo(address indexed from, uint256 timestamp, string title, string body, uint256 amount);

  struct Todo {
    address creator;
    uint256 timestamp;
    string title;
    string body;
    uint256 amount;
  }

  Todo[] todos;

  constructor() {
    console.log("MyTodoPortal - Smart Contract!");
  }

  function createTodo(string memory _title, string memory _body, uint256 _amount) public view {
    // totalTodos += 1;
    console.log("%s create todo w/ with \n title: %s", msg.sender, _title);
    console.log("body: %s", _body);
    console.log("amount: %s", _amount);

    // 受け取ったデータをブロックチェーン上に保存する
    // todos.push(Todo(msg.sender, block.timestamp, _title, _body, _amount));

    // 新しいTdodoを作ったことをフロントに伝える
    // emit NewTodo(msg.sender, block.timestamp, _title, _body, _amount);
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
