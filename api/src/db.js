require("dotenv").config();
const { Sequelize } = require("sequelize");
const models = require("./models");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY, DB_NAME } = process.env;

let sequelize;
DB_DEPLOY
  ? (sequelize = new Sequelize(DB_DEPLOY, {
      logging: false,
      native: false,
    }))
  : (sequelize = new Sequelize(
      `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
      {
        logging: false,
        native: false,
      }
    ));

// Iterar sobre los modelos y pasarles la instancia de Sequelize
Object.values(models).forEach((model) => {
  model(sequelize);
});

// Función para capitalizar la primera letra y la letra después de un guion bajo
function capitalize(str) {
  return str.replace(/(?:^|_)([a-z])/g, (_, char) => char.toUpperCase());
}

// Capitalizar los nombres de los modelos
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(([modelName, model]) => [
  capitalize(modelName),
  model,
]);

sequelize.models = Object.fromEntries(capsEntries);

const { Category, Todo } = sequelize.models;

Category.hasMany(Todo);
Todo.belongsTo(Category);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
