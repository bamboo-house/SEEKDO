import React, { useEffect, useState } from 'react';
import { AccountContainer } from '../common/containers/AccountContainer';
import { Todo } from './Todo';
// 型
import { TodoType } from '../common/Types';
// コントラクト関連ライブラリ
import { ethers } from 'ethers';
import { LOCAL_CONSTANT } from '../common/LocalConstant';
import abi from '../utils/TodoFactory.json';

export const TodoList: React.FC = () => {
  const { currentAccount } = AccountContainer.useContainer();
  const [todoItems, setTodoItems] = useState<TodoType[]>([]);
  const contractAddress = LOCAL_CONSTANT.CONTRACT_ADDRESS;
  const contractABI = abi.abi;

  const getOwnerTodos = async () => {
    const { ethereum }: any = window;

    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const todoFactoryContract = new ethers.Contract(contractAddress, contractABI, signer);

        const todos = await todoFactoryContract.getOwnerTodos();
        const todosCleaned = todos.map((todo: TodoType) => {
          return {
            id: Number(todo.id),
            title: todo.title,
            body: todo.body,
            amount: Number(ethers.utils.formatEther(todo.amount)),
            deadline: new Date(Number(todo.deadline) * 1000),
            isDone: todo.isDone,
          };
        });
        setTodoItems(todosCleaned);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // ここで、NewTodoイベントを受け取って、todoItemsのstate更新する
    let todoFactoryContract: ethers.Contract;

    const onNewTodo = (id: number, title: string, body: string, amount: number, deadline: number, isDone: boolean): void => {
      setTodoItems((prevState) => [
        ...prevState,
        {
          id,
          title,
          body,
          amount: Number(ethers.utils.formatEther(amount)),
          deadline: new Date(deadline * 1000),
          isDone,
        },
      ]);
    };

    const { ethereum }: any = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      todoFactoryContract = new ethers.Contract(contractAddress, contractABI, signer);

      // コントラクトのNewTodoイベントがemitされたときに、フロントのonNewTodo関数を呼び出す
      todoFactoryContract.on('NewTodo', onNewTodo);
    }
    // メモリリークを防ぐために、NewTodoのイベントを解除する
    return () => {
      if (todoFactoryContract) {
        todoFactoryContract.off('NewTodo', onNewTodo);
      }
    };
  }, []);

  useEffect(() => {
    if (currentAccount) {
      getOwnerTodos();
    }
  }, [currentAccount]);

  return (
    <div>
      {todoItems.map((item: TodoType, index: number) => (
        <Todo key={index} items={item} />
      ))}
    </div>
  );
};
