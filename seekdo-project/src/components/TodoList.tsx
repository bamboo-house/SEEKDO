import React, { useEffect, useState } from "react";
import { dummyData } from "./DummyData";
import { Todo, todoProps } from "./Todo";
import { ethers } from "ethers";


export const TodoList = () => {
  const [todoItems, setTodoItems] = useState<todoProps[]>(dummyData);

  useEffect(() => {
    // ここで、NewTodoイベントを受け取って、todoItemsのstate更新する

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