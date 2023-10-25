import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoList from "./components/TodoList/TodoList";
import TodoForm from "./components/TodoForm/TodoForm";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import { fetchCategories } from "./redux/slices/categoryListSlice";
import { fetchTodos, setCurrentPage } from "./redux/slices/todoListSlice";
import Paginated from "./components/Paginated/Paginated";

function App() {
  const dispatch = useDispatch();
  const { todos, currentPage, totalPages, categoriesFilter } = useSelector(
    (state) => state.todoList
  );

  const { categoryList } = useSelector((state) => state.categoryList);
  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchCategories());
  }, [dispatch, currentPage, categoriesFilter]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-800">
      <TodoForm />
      <CategoryFilter
        categories={categoryList}
        categoriesFilter={categoriesFilter}
      />
      <TodoList todos={todos} />
      <Paginated
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
