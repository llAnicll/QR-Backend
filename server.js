// Required node pacakges
const express = require("express");
const path = require("path");
const cors = require("cors"); // used to give web application from another origin access to resources form another location (this location)
// used to allow the request to access the for data within the client form and pars it in json format
const bodyParser = require("body-parser");
const app = express();

// Required local files
var Users = require("./Routes/Users");
var Questions = require("./Routes/Questions");

// Specify what packages the application uses
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Specify the routs for different rout methods
app.use("/users", Users);
app.use("/questions", Questions);

// Static file declaration
app.use(express.static(path.join(__dirname, "./../nmc-frontend/build")));

// production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./../nmc-frontend/build")));
  app.get("/", (req, res) => {
    res.sendfile(path.join((__dirname = "./../nmc-frontend/build/index.html")));
  });
}

/* ********************************************************************************************************************
 * Route method: /
 * Rout location: /
 * Method: GET
 * Purpose: this route is to serve the static build of the react app
 * ***************************************************************************************************************** */
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname + "./../nmc-frontend/public/index.html"))
);

/* ********************************************************************************************************************
 * Route method: /tree
 * Rout location: /tree
 * Method: GET
 * Purpose: this rout displays all the routs there are currently built
 * ***************************************************************************************************************** */
app.get("/tree", (req, res) =>
  res.json({
    current_route: "/tree - Root",
    routs: {
      root_rout: "/",
      users_rout: "/users",
      users_sub_routs: {
        signup_rout: "/register",
        signin_rout: "/login"
      },
      questions_route: "/questions",
      questions_sub_routs: {
        getQuestions: "/getQuestion"
      }
    }
  })
);

// Starts a server on a specific port
const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
