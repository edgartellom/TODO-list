import { BsArrowRepeat } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  setCurrentPage,
  setCategoriesFilter,
  resetCategories,
} from "../../redux/slices/todoListSlice";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

const CategoryFilter = ({ categories, categoriesFilter }) => {
  const dispatch = useDispatch();

  const handleCategoryClick = (category) => {
    dispatch(setCategoriesFilter(category));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="  flex max-sm:flex-col max-md:hidden   gap-3 items-center justify-center mt-10">
      <h1 className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
        Filter by:
      </h1>
      <DropdownMenu
        name={"Category"}
        data={categories}
        selectedValue={categoriesFilter}
        onClick={handleCategoryClick}
      />
    </div>
  );
};

export default CategoryFilter;
