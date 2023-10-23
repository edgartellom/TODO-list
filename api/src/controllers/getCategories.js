const { Category } = require("../db");

async function getCategories(req, res) {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error to get the categories" });
  }
}

module.exports = getCategories;
