// TodoPortal.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract TodoFactory {

  event  NewTodo(string title, string body, uint256 poolAmount, uint32 deadline);

  // 竹内：アドレスとプール金額を確認
  mapping(address => uint) balance;

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

  function getAllTodos() public view returns (Todo[] memory) {
    return todos;
  }

  function getBalance() public view returns(uint) {
    return balance[msg.sender];
  }

  // 10/5 viewをつけたときなぜか、run.tsでエラーが出る
  function createTodo(string memory _title, string memory _body, uint256 _poolAmount, uint32 _deadline) public {
    console.log("%s create todo w/ with \ntitle: %s", msg.sender, _title);
    console.log("body: %s", _body);
    console.log("poolAmount: %s", _poolAmount);
    console.log("deadline: %s", _deadline);

    // 竹内: _deadlineを正しい型に変換？

    // 竹内： 金額をプールする処理

    // 受け取ったデータをブロックチェーン上に保存する
    todos.push(Todo(msg.sender, _title, _body, _poolAmount, _deadline, false, uint32(block.timestamp)));

    // 新しいTdodoを作ったことをフロントに伝える
    emit NewTodo(_title, _body, _poolAmount, _deadline);
  }

  // 竹内：プール処理
  function deposit() public payable {
    balance[msg.sender] += msg.value;
  }

  function withdrow(uint _amount) public {
    balance[msg.sender] -= _amount;
    payable(msg.sender).transfer(_amount);
  }

  // 竹内：完了ボタンを押したときに返金処理とdoneをtrueにする。
  function doneTodo() public view {
    console.log("%s done todo!", msg.sender);
  }

}
