const { Todo } = require("../db");

async function markTODO(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  try {
    if (status !== "completed" && status !== "incomplete") {
      return res
        .status(400)
        .json({ error: "Status must be completed or incomplete" });
    }
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ error: "TODO not found" });
    }
    await todo.update({ status });
    res.status(200).json("Status updated");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error to mark the TODO item" });
  }
}

module.exports = markTODO;
