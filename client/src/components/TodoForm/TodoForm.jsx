import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const TodoForm = () => {
  const [toogle, setToogle] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    category: "",
  });

  const addTodo = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("todo", newTodo);
      setNewTodo({ title: "", description: "", category: "" });
      setToogle(false);
      await Swal.fire({
        title: "Creation success",
        text: "The task has been created",
        icon: "success",
        width: 400,
        color: "#161616",
        background: "#FFF9EB",
        confirmButtonColor: "#0250B6",
        confirmButtonText: "Done",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error creating TODO:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTodo({ ...newTodo, [name]: value });
  };

  return (
    <>
      <div className="w-full max-w-sm mt-8 flex flex-col items-center">
        {toogle ? (
          <form className="w-full" onSubmit={addTodo}>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="title"
                >
                  Title
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Input a TODO title"
                  value={newTodo.title}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="description"
                >
                  Description
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Input a TODO description"
                  value={newTodo.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="category"
                >
                  Category
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  id="category"
                  name="category"
                  type="text"
                  placeholder="Input a TODO category"
                  value={newTodo.category}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Create
                </button>
                <button
                  className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ml-5"
                  type="button"
                  onClick={() => setToogle(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        ) : (
          <button
            className="shadow bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mt-5 rounded"
            type="button"
            onClick={() => setToogle(true)}
          >
            Add a new TODO
          </button>
        )}
      </div>
    </>
  );
};

export default TodoForm;
