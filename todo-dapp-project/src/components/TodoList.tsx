import React, { useEffect, useState } from "react";
import { dummyData } from "./DummyData";
import { Todo, todoProps } from "./Todo";

export const TodoList = () => {
  const [todoItems, setTodoItems] = useState<todoProps[]>(dummyData);

  useEffect(() => {
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