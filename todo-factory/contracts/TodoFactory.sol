// TodoPortal.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract TodoFactory {

  event  NewTodo(uint id, address, string title, string body, uint256 poolAmount, uint32 deadline);

  mapping(address => uint) balance;
  // 処理速度向上のために定義
  mapping(address => uint) todoCountByOwner;
  struct Todo {
    uint id;
    address owner;
    string title;
    string body;
    uint256 poolAmount;
    uint32 deadline;
    bool isDone;
    uint32 timestamp;
  }

  Todo[] todos;

  function getAllTodos() public view returns(Todo[] memory) {
    Todo[] memory result = new Todo[](todoCountByOwner[msg.sender]);
    uint counter = 0;
    for (uint i = 0; i < todos.length; i++) {
        if (todos[i].owner == msg.sender) {
            result[counter] = todos[i];
            counter += 1;
        }
    }
    return result;
  }

  function getBalance() public view returns(uint) {
    return balance[msg.sender];
  }

  function createTodo(string memory _title, string memory _body, uint256 _poolAmount, uint32 _deadline) public {
    console.log("%s create todo w/ with \ntitle: %s", msg.sender, _title);
    console.log("body: %s", _body);
    console.log("poolAmount: %s", _poolAmount);
    console.log("deadline: %s", _deadline);

    // 竹内: _deadlineを正しい型に変換？

    // 受け取ったTodoをブロックチェーン上に保存する
    uint id = todos.length + 1;
    todos.push(Todo(id, msg.sender, _title, _body, _poolAmount, _deadline, false, uint32(block.timestamp)));
    todoCountByOwner[msg.sender]++;

    // 新しいTdodoを作ったことをフロントに伝える
    emit NewTodo(id, msg.sender, _title, _body, _poolAmount, _deadline);
  }

  // 竹内：プール処理
  function deposit() public payable {
    balance[msg.sender] += msg.value;
  }

  function _withdrow(uint _amount) private {
    balance[msg.sender] -= _amount;
    payable(msg.sender).transfer(_amount);
  }

  // 竹内：完了ボタンを押したときに返金処理とdoneをtrueにする。
  function doneTodo(uint id, uint _amount) public {
    console.log("%s done todo!", msg.sender);
    _withdrow(_amount);
    // isDoneがfalseの場合下記実行
    // deadlineが今の時刻を超えている場合下記実行
    // isDoneをtrueにする
    // amountの金額をwithdrowする
  }

}
