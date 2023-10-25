import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";

const TodoItem = ({ data }) => {
  const { id, title, description, category, status } = data;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedCategory, setEditedCategory] = useState(category);

  const handleDeleteClick = async () => {
    try {
      await Swal.fire({
        title: "Are you sure you want to delete?",
        text: "To confirm, click OK.",
        icon: "question",
        showCancelButton: true,
        width: 400,
        background: "#FFF9EB",
        color: "#161616",
        confirmButtonColor: "#0250B6",
        cancelButtonColor: "#8D0106",
        confirmButtonText: "OK",
        cancelButtonText: "CANCEL",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await Swal.fire({
            title: "Delete success",
            text: "The task has been deleted.",
            icon: "success",
            width: 400,
            color: "#161616",
            background: "#FFF9EB",
            confirmButtonColor: "#0250B6",
            confirmButtonText: "Done",
          });

          await axios.delete(`todo/${id}`);
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Error al eliminar el TODO:", error);
    }
  };
  const handleMarkClick = async () => {
    try {
      const newStatus = status === "incomplete" ? "completed" : "incomplete";
      await axios.put(`markTodo/${id}`, { status: newStatus });
      window.location.reload();
    } catch (error) {
      console.error("Error to mark TODO item:", error);
    }
  };

  const handleEditClick = async () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`todo/${id}`, {
        title: editedTitle,
        description: editedDescription,
        category: editedCategory,
      });
      setIsEditing(false);
      await Swal.fire({
        title: "TODO updated",
        text: "The task has been updated",
        icon: "success",
        width: 400,
        color: "#161616",
        background: "#FFF9EB",
        confirmButtonColor: "#0250B6",
        confirmButtonText: "Done",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error to update TODO item:", error);
    }
  };

  const handleCancelClick = () => {
    setEditedTitle(title);
    setEditedDescription(description);
    setEditedCategory(category);
    setIsEditing(false);
  };

  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex">
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2 flex items-center gap-5">
            {!isEditing ? (
              <div>{title}</div>
            ) : (
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Input a title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            )}
            {!isEditing && (
              <FaEdit
                onClick={handleEditClick}
                style={{ cursor: "pointer" }}
                title="Edit"
              />
            )}
            {!isEditing && (
              <IoMdCheckmarkCircleOutline
                onClick={handleMarkClick}
                style={{ cursor: "pointer" }}
                title="Mark"
              />
            )}
            {!isEditing && (
              <MdDelete
                onClick={handleDeleteClick}
                style={{ cursor: "pointer" }}
                title="Delete"
              />
            )}
          </div>
          <div className="text-gray-700 text-base">
            {!isEditing ? (
              <p>{description}</p>
            ) : (
              <input
                id="description"
                name="description"
                type="text"
                placeholder="Input a description"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            )}
          </div>
        </div>
        <div className="flex items-center gap-10">
          <div className="text-sm">
            <p className="text-gray-900 leading-none">Category</p>
            <div className="text-gray-600">
              {!isEditing ? (
                <p>{category.name}</p>
              ) : (
                <input
                  id="category"
                  name="category"
                  type="text"
                  placeholder="Input a category"
                  value={editedCategory.name}
                  onChange={(e) => setEditedCategory(e.target.value)}
                />
              )}
            </div>
          </div>
          <div className="text-sm">
            <p className="text-gray-900 leading-none">Status</p>
            <p
              className={`${
                status === "completed" ? "text-green-600" : "text-red-600"
              }`}
            >
              {status}
            </p>
          </div>
        </div>
        {isEditing && (
          <div class="md:flex md:items-center">
            <div class="md:w-1/3"></div>
            <div class="md:w-2/3">
              <button
                class="shadow bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mt-5 rounded"
                type="button"
                onClick={handleSaveClick}
              >
                Save
              </button>
              <button
                class="shadow bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mt-5 rounded"
                type="button"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
