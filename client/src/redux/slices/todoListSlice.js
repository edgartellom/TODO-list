import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const todoListSlice = createSlice({
  name: "todoList",
  initialState: {
    todos: [],
    currentPage: 1,
    totalPages: 1,
    categoriesFilter: "",
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setCategoriesFilter: (state, action) => {
      state.categoriesFilter = action.payload;
    },
  },
});

export const fetchTodos = () => async (dispatch, getState) => {
  try {
    const { currentPage, categoriesFilter } = getState().todoList;

    const response = await axios.get("todos", {
      params: {
        limit: 6,
        page: currentPage,
        categories: categoriesFilter,
      },
    });
    const jsonData = await response.data;
    dispatch(todoListSlice.actions.setTodos(jsonData.data));
    dispatch(todoListSlice.actions.setTotalPages(jsonData.totalPages));
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

export const {
  setTodos,
  setCurrentPage,
  setTotalPages,
  setCategoriesFilter,
  resetCategories,
} = todoListSlice.actions;
export default todoListSlice.reducer;
