import TodoList from "./components/TodoList/TodoList";
import TodoForm from "./components/TodoForm/TodoForm";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";

function App() {
  return (
    <div className="">
      <TodoForm />
      <CategoryFilter />
      <TodoList />
    </div>
  );
}

export default App;
