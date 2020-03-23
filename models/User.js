// Required node packages
const Sequelize = require("sequelize"); // allows us to map our object to our databse schemas

// Required local files (this is the databse connection)
const db = require("../database/db");

/* ********************************************************************************************************************
 * Model: user
 * Purpose: this model maps our user object to the users table and export it to use in the route methods
 * ***************************************************************************************************************** */
module.exports = db.sequelize.define(
  "user",
  {
    email: {
      type: Sequelize.STRING, // email is of data type STRING
      primaryKey: true, // email is the primary key
      autoIncrement: false // email does not auto increment
    },
    username: {
      type: Sequelize.STRING // username is of data type STRING
    },
    password: {
      type: Sequelize.STRING // password is of data type STRING
    }
  },
  {
    timestamps: false
  }
);
