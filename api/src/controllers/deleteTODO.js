const { Todo, Category } = require("../db");

async function deleteTODO(req, res) {
  const { todoId } = req.params;

  try {
    const todo = await Todo.findByPk(todoId);

    if (!todo) {
      return res.status(404).json({ error: "TODO not found" });
    }

    const todosInCategory = await Todo.count({
      where: {
        categoryId: todo.categoryId,
      },
    });

    if (todosInCategory === 1) {
      await Category.destroy({
        where: {
          id: todo.categoryId,
        },
      });
    }

    await Todo.destroy({
      where: {
        id: todoId,
      },
    });

    res.status(200).json({ message: "TODO deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting the TODO item" });
  }
}

module.exports = deleteTODO;
