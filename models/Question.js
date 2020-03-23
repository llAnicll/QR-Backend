// Required node packages
const Sequelize = require("sequelize"); // allows us to map our object to our databse schemas

// Required local files (this is the databse connection)
const db = require("../database/db");

/* ********************************************************************************************************************
 * Model: question 
 * Purpose: this model maps our question object to the questions table and export it to use in the route methods
 * ***************************************************************************************************************** */
module.exports  = db.sequelize.define('question', {
        id: {
            type: Sequelize.INTEGER, // question_id is of data type INTEGER
            primaryKey: true, // question_id is the primary key
            autoIncrement: true // question_id does auto increment
        },
        question: { 
            type: Sequelize.STRING // question is of data type STRING
        },
        answer: { 
            type: Sequelize.STRING // answer_id is of data type INTEGER
        }
    },
    { 
        timestamps: false 
    }
);