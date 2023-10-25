import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const categorySlice = createSlice({
  name: "categoryList",
  initialState: {
    categoryList: [],
  },
  reducers: {
    setCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
  },
});

export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await axios.get("categories");
    const jsonData = await response.data;
    const categoryNames = jsonData.map((category) => category.name);
    categoryNames.unshift("All");
    dispatch(categorySlice.actions.setCategoryList(categoryNames));
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export const { setCategoryList } = categorySlice.actions;
export default categorySlice.reducer;
