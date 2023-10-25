const { Todo, Category, conn } = require("../db");

async function createTODO(req, res) {
  const { title, description, category } = req.body;
  const t = await conn.transaction();

  try {
    const [newCategory, created] = await Category.findOrCreate({
      where: { name: category },
      transaction: t,
    });

    const newTodo = await Todo.create(
      {
        title,
        description,
        categoryId: newCategory.id,
      },
      { transaction: t }
    );

    await t.commit();

    res.status(201).json(newTodo);
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ error: "Error to create the TODO item" });
  }
}

module.exports = createTODO;
