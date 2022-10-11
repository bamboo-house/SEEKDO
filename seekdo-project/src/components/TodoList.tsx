import React, { useEffect, useState } from "react";
import { dummyData } from "./DummyData";
import { Todo } from "./Todo";
// コントラクト関連ライブラリ
import { ethers } from "ethers";
import abi from "../utils/TodoFactory.json";


export type todoProps = {
  title: string,
  body: string,
  amount: number,
}

type onNewTodo = {
  (title: string, body: string, amount: number): void
}

export const TodoList = () => {
  const [todoItems, setTodoItems] = useState<todoProps[]>(dummyData);

  const contractAddress = "0xf50B54Ce4BFebc336d0792e5D34697032EC60309";
  const contractABI = abi.abi;

  useEffect(() => {
    // ここで、NewTodoイベントを受け取って、todoItemsのstate更新する
    let todoFactoryContract: any;
	
    const onNewTodo: onNewTodo = (title, body, amount) => {
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
    }
  }, []);

  return (
    <div>
      {todoItems.map((item: todoProps) => (
        <Todo items={item}/>
      ))}
    </div>
  );
};