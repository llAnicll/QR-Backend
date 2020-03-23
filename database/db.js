const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize("nmc-db", "root", "", {
  host: "localhost",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
