const { Todo, Category } = require("../db");
const { Op } = require("sequelize");

async function getTODOs(req, res) {
  const { categories } = req.query;
  let filterOptions = {};
  try {
    if (categories) {
      if (categories === "All") {
        filterOptions = {};
      } else {
        const categories = categories.split(",");
        const categoryIdsArray = await Promise.all(
          categories.map((categoryName) => {
            const category = Category.findOne({
              where: { name: { [Op.iLike]: categoryName } },
            });
            return category ? category.id : null;
          })
        );
        const validCategoryIds = categoryIdsArray.filter((id) => id !== null);
        filterOptions = { ...filterOptions, categoryId: validCategoryIds };
      }
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    const { rows: todos, count: totalItems } = await Todo.findAndCountAll({
      limit: limit,
      offset: (page - 1) * limit,
      where: filterOptions,
      include: {
        model: Category,
        attributes: ["name"],
      },
    });

    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      data: todos,
      currentPage: page,
      totalPages,
      totalItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error to get the TODO list" });
  }
}

module.exports = getTODOs;
