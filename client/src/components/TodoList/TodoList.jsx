import React, { useState, useEffect } from "react";
import TodoItem from "../TodoItem/TodoItem";
import axios from "axios";
import CategoryFilter from "../CategoryFilter/CategoryFilter";

const TodoList = ({ todos }) => {
  return (
    <>
      <li className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 place-items-center py-4">
        {todos?.map((todo) => (
          <TodoItem key={todo.id} data={todo} />
        ))}
      </li>
    </>
  );
};

export default TodoList;
