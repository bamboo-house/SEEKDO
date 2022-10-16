import React, { useEffect, useState } from "react";
import { Todo } from "./Todo";
// 型
import { TodoType } from "../common/Types"
// コントラクト関連ライブラリ
import { ethers } from "ethers";
import { LOCAL_CONSTANT } from "../common/LocalConstant";
import abi from "../utils/TodoFactory.json";

type Props = {
  currentAccount: string;
}

export const TodoList: React.FC<Props> = (props) => {
  const [todoItems, setTodoItems] = useState<TodoType[]>([]);
  const contractAddress = LOCAL_CONSTANT.CONTRACT_ADDRESS;
  const contractABI = abi.abi;

  const getAllTodos = async () => {
    const { ethereum }: any = window;
    
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const todoFactoryContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer,
        );

        const todos = await todoFactoryContract.getAllTodos();
        const todosCleaned = todos.map((todo: TodoType) => {
          return {
            title: todo.title,
            body: todo.body,
            amount: Number(todo.amount),
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
	
    const onNewTodo = (title: string, body: string, amount: number): void => {
      console.log("NewTodo:", title, body, amount.toString());
      // 10/9 下記エラーが出る
      setTodoItems((prevState) => [
        ...prevState,
        {
          title: title,
          body: body,
          amount: Number(amount),
        },
      ]);
    };

    const { ethereum }: any = window;
    if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
    
        todoFactoryContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        // コントラクトのNewTodoイベントがemitされたときに、フロントのonNewTodo関数を呼び出す
        todoFactoryContract.on("NewTodo", onNewTodo);
      }
    // メモリリークを防ぐために、NewTodoのイベントを解除する
    return () => {
      if (todoFactoryContract) {
        todoFactoryContract.off("NewTodo", onNewTodo)
      }
    };
  }, []);

  useEffect(() => {
    if (props.currentAccount) {
      getAllTodos();
    }
  }, [props.currentAccount]);


  return (
    <div>
      {todoItems.map((item: TodoType, index: number) => (
        <Todo key={index} items={item}/>
      ))}
    </div>
  );
};