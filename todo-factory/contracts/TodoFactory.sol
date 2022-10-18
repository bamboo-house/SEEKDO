// TodoPortal.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract TodoFactory {

  event  NewTodo(string title, string body, uint256 poolAmount, uint32 deadline);

  struct Todo {
    address creator;
    string title;
    string body;
    uint256 poolAmount;
    uint32 deadline;
    bool done;
    uint32 timestamp;
  }

  Todo[] todos;

  constructor() {
    console.log("TodoFactory - Smart Contract!");
  }

  // 10/5 viewをつけたときなぜか、run.tsでエラーが出る
  function createTodo(string memory _title, string memory _body, uint256 _poolAmount, uint32 _deadline) public {
    totalTodos += 1;
    console.log("%s create todo w/ with \ntitle: %s", msg.sender, _title);
    console.log("body: %s", _body);
    console.log("poolAmount: %s", _poolAmount);
    console.log("deadline: %s", _deadline);

    // 竹内: _deadlineを正しい形に変換？

    // 竹内： 金額をプールする処理

    // 受け取ったデータをブロックチェーン上に保存する
    todos.push(Todo(msg.sender, _title, _body, _poolAmount, _deadline, false, uint32(block.timestamp)));

    // 新しいTdodoを作ったことをフロントに伝える
    emit NewTodo(_title, _body, _poolAmount, _deadline);
  }

  // 竹内：完了ボタンを押したときに返金処理とdoneをtrueにする。
  function doneTodo() public {
    console.log("%s done todo!", msg.sender);
  }

  function getAllTodos() public view returns (Todo[] memory) {
    return todos;
  }

}
