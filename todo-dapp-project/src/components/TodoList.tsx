import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { dummyData } from "./DummyData";

export const TodoList = () => {
  const [todoItems, setTodoItems] = useState(dummyData);

  useEffect(() => {
    console.log(dummyData);
  }, []);

  return (
    <div>
      {todoItems.map((item) => (
        <ul>
          <li>{item.creator}</li>
          <li>{item.text}</li>
        </ul>
      ))}
    </div>
  );
};