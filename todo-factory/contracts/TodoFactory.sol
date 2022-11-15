// TodoPortal.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "./Ownable.sol";

contract TodoFactory is Ownable {

  struct Todo {
    uint id;
    address owner;
    string title;
    string body;
    uint amount;
    uint32 deadline;
    bool isDone;
  }

  Todo[] todos;
  // OwnerとTodoは「1対多」の関係なので、OwnerにTodoの情報をもたすために記述
  mapping(address => uint[]) ownerTodoIds;
  mapping(address => uint) balance;

  event NewTodo(uint id, string title, string body, uint amount, uint32 deadline, bool isDone);

  /*
  *  Todo処理
  */ 
  function getAllTodos() public view returns(Todo[] memory) {
    return todos;
  }

  function getOwnerTodos() public view returns(Todo[] memory) {
    uint[] memory todoIds = ownerTodoIds[msg.sender];
    Todo[] memory result = new Todo[](todoIds.length);
    uint counter = 0;
    for (uint i = 0; i < todoIds.length; i++) {
      if (todoIds[i] != 0) {
        uint todoId = todoIds[i];
        result[i] = (todos[todoId - 1]);
        counter++;
      }
    }
    return result;
  }

  function createTodo(string memory _title, string memory _body, uint _amount, uint32 _deadline) public onlyOwner {
    uint id = todos.length + 1;
    bool isDone = false;
    todos.push(Todo(id, msg.sender, _title, _body, _amount, _deadline, isDone));
    ownerTodoIds[msg.sender].push(id);
    emit NewTodo(id, _title, _body, _amount, _deadline, isDone);
  }

  function doneTodo(uint _id) public onlyOwner {
    Todo memory copiedTodo = todos[_id - 1];
    require(copiedTodo.owner == msg.sender, "Don't have this todo");
    require(copiedTodo.isDone == false, "Already done");
    require(copiedTodo.deadline >= block.timestamp, "Deadline has passed");
    _withdraw(copiedTodo.amount);
    todos[_id - 1].isDone = true;
  }

  /*
  *  プール処理
  */
  function getBalance() public view returns(uint) {
    return balance[msg.sender];
  }

  function deposit() public payable onlyOwner {
    balance[msg.sender] += msg.value;
  }

  /*
  *  internal
  */
  function _withdraw(uint _amount) internal {
    require(balance[msg.sender] >= _amount, "Insufficient balance");
    uint beforeWithdraw = balance[msg.sender];
    // check effect interaction（もし、call関数使うならDAOハッキング事件対策のために送金前に引く）
    balance[msg.sender] -= _amount;
    payable(msg.sender).transfer(_amount);
    uint afterWithdraw = balance[msg.sender];
    assert(afterWithdraw == beforeWithdraw - _amount);
  }
}