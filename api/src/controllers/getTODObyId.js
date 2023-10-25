const { Todo } = require("../db");

async function getTODObyId(req, res) {
  const { todoId } = req.params;
  try {
    const todo = await Todo.findByPk(todoId);
    if (!todo) {
      return res.status(404).json({ error: "TODO not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error to get the TODO item" });
  }
}

module.exports = getTODObyId;
