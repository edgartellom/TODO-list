const { Todo, Category } = require("../db");

async function updateTODO(req, res) {
  const { todoId } = req.params;
  const { title, description, category } = req.body;
  try {
    const todo = await Todo.findByPk(todoId);
    if (!todo) {
      return res.status(404).json({ error: "TODO not found" });
    }
    const categoryDb = await Category.findByPk(todo.categoryId);
    await categoryDb.update({ name: category });
    await todo.update({ title, description, categoryId: categoryDb.id });
    res.status(200).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error to mark the TODO item" });
  }
}

module.exports = updateTODO;
