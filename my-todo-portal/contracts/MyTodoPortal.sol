// TodoPortal.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract TodoFactory {

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
    console.log("TodoFactory - Smart Contract!");
  }

  // 10/5 viewをつけたときなぜか、run.tsでエラーが出る
  function createTodo(string memory _title, string memory _body, uint256 _amount) public {
    totalTodos += 1;
    console.log("%s create todo w/ with \ntitle: %s", msg.sender, _title);
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
