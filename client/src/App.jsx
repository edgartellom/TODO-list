import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./components/TodoList/TodoList";
import TodoForm from "./components/TodoForm/TodoForm";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";

function App() {
  return (
    <div className="bg-red-500">
      <TodoForm />
      <CategoryFilter />
      <TodoList />
    </div>
  );
}

export default App;
