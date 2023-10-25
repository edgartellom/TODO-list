import { configureStore } from "@reduxjs/toolkit";
import todoListSlice from "../slices/todoListSlice";
import categoryListSlice from "../slices/categoryListSlice";

const store = configureStore({
  reducer: {
    todoList: todoListSlice,
    categoryList: categoryListSlice,
  },
});

export default store;
