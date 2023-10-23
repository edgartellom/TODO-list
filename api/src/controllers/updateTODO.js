const { Todo, Category } = require("../db");

async function updateTODO(req, res) {
  const { id } = req.params;
  const { title, description, category } = req.body;
  try {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ error: "TODO not found" });
    }
    const [categoryDb, created] = await Category.findOrCreate({
      where: { name: category },
    });
    await todo.update({ title, description, categoryId: categoryDb.id });
    res.status(200).json("TODO updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error to mark the TODO item" });
  }
}

module.exports = updateTODO;
