const express = require("express"); // used for connecting and querying the databse
const users = express.Router(); // allow routing to other files containing simmilar rout methods
const cors = require("cors"); // used to enable cross domain requests
const jwt = require("jsonwebtoken"); // used to crate jason web tokens
const bcrypt = require("bcrypt"); // used to encrypt the user password

// bring in the User model
const User = require("../models/User");

// everything to be used
users.use(cors());

// string for the secret key
process.env.SECRET_KEY = "secret";

/* ********************************************************************************************************************
 * Route method: /register
 * Method: POST
 * Purpose: this route method handles the user registration
 * ***************************************************************************************************************** */
users.post("/register", (req, res) => {
  // Object to hold user input data
  const userData = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    passwordAgain: req.body.passwordAgain,
    type: 2,
  };
  // Look for a email in the db that matches the one the user entered
  User.findOne({
    where: { email: req.body.email },
    // do the followoing with the user from the databse
  }).then((user) => {
    // if there was no user brought back (hope not its a register)
    if (!user) {
      // hash the password the user entered
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        // overwrite the password the user had entered with the encrypted version
        userData.password = hash;
        // create a user based on the data the user entered
        User.create(userData)
          .then((user) => {
            // respond with the message that the user has been registered
            res.json({ status: user.username + ": registerd" });
            // Spit out the error
          })
          .catch((err) => {
            // error: the user faild to create for some reason
            //        probably something to do with the conection to the databse
            res.send("error: " + err);
          });
      });
    } else {
      res.json({
        message:
          "An account with the email " + userData.email + " already exists",
      });
    }
  });
});

/* ********************************************************************************************************************
 * Route method: /login
 * Method: POST
 * Purpose: this route method handles the user login
 * ***************************************************************************************************************** */
users.post("/login", (req, res) => {
  // look for an email in the database where the email matches the user input
  User.findOne({
    // the condition the used find the user ( ... WHERE email = *user input email*)
    where: { email: req.body.email },
    // then do this if the user was found
  })
    .then((user) => {
      // check if there is a user in the user variable
      if (user) {
        // check if the passwords match (while encrypted)
        bcrypt.compare(req.body.password, user.password, (err, response) => {
          if (response) {
            // generate a token for the user
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
              expiresIn: 1440,
            });
            // sends the response to the server with the token
            res.send({
              auth: true,
              message: token,
              username: user.username,
              email: user.email,
              type: user.type,
            });
          } else {
            res.send({
              auth: false,
              message: "Passwords do not match",
            });
          }
        });
      } else {
        // the case there is no user
        res.json({
          auth: false,
          message: "An account with that email does not exist",
        });
      }
      // if no user was found in the databse
    })
    .catch((err) => {
      // spit out the error
      res.json({
        auth: false,
        error: err,
      });
    });
});

module.exports = users;
