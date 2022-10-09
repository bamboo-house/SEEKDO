import React, { useEffect, useState } from "react";
import { dummyData } from "./DummyData";
import { Todo } from "./Todo";
import { ethers } from "ethers";

export type todoProps = {
  title: string,
  body: string,
  amount: number,
}

export const TodoList = () => {
  const [todoItems, setTodoItems] = useState<todoProps[]>(dummyData);

  useEffect(() => {
    // ここで、NewTodoイベントを受け取って、todoItemsのstate更新する
    let todoPortalContract;
	
    // const onNewTodo = (title, body, amount) => {
    // };

    // if (window.ethereum) {
    //     const provider = new ethers.providers.Web3Provider(window.ethereum);
    //     const signer = provider.getSigner();
    
    //     todoPortalContract = new ethers.Contract(
    //       contractAddress,
    //       contractABI,
    //       signer
    //     );
    //     // コントラクトのNewTodoイベントがemitされたときに、フロントのonNewTodo関数を呼び出す
    //     todoPortalContract.on("NewTodo", onNewTodo);
    //   }
    console.log(todoItems);
  }, []);

  return (
    <div>
      {todoItems.map((item: todoProps) => (
        <Todo items={item}/>
      ))}
    </div>
  );
};