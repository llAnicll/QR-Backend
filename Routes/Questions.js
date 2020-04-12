// Required node packages
const express = require("express");
const questions = express.Router();
const cors = require("cors");
const Sequelize = require("sequelize");

// Required local files (use the question module for these routs)
const Question = require("../models/Question");

// allow web app from another origin to get access these resources
questions.use(cors());

/* ********************************************************************************************************************
 * Route method: /getQuestion
 * Rout location: /questions/getQuestion
 * Method: POST
 * Purpose: this rout gets a set number of random questions from the databse
 * ***************************************************************************************************************** */
questions.get("/getQuestion", (req, res) => {
  Question.findAll({
    limit: 5,
    order: Sequelize.fn("RAND"),
  })
    .then((q) => {
      if (q) {
        res.json(q);
      } else {
        // the case there is no question
        res.status(400).json({ error: "There are not questions" });
      }
    })
    .catch((err) => {
      // spit out the error
      res.status(400).json({ error: err });
    });
});

/* ********************************************************************************************************************
 * Route method: /makeQuestion
 * Rout location: /questions/makeQuestion
 * Method: POST
 * Purpose: this rout gets a set number of random questions from the databse
 * ***************************************************************************************************************** */
questions.post("/makeQuestion", (req, res) => {
  const newQuestion = {
    question: req.body.question,
    answer: req.body.answer,
  };
  Question.findOne({
    where: { question: req.body.question },
  }).then((question) => {
    if (!question) {
      Question.create(newQuestion);
    } else {
      res.json({
        message: "That Question already exists",
      });
    }
  });
});

module.exports = questions;
