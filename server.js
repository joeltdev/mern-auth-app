const express = require("express");
const app = express();
const ejs = require("ejs");
const session = require("express-session");
const nocache = require("nocache");

// Set EJS as the view engine
app.set("view engine", "ejs");

app.use(nocache());

app.use(express.static("public"));
app.use(
  session({
    secret: "your-secret-key", // Replace with a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded payloads

const username = "admin";
const password = "admin@123";

// Render the EJS template for the home page
app.get("/", (req, res) => {
  if (req.session.isAuth) {
    res.render("/home");
  } else {
    res.render("/layout");
  }
});

app.post("/verify", (req, res) => {
  console.log(req.body);
  if (req.body.username === username && req.body.password === password) {
    res.redirect("/home");
  } else {
    res.render("/layout");
  }
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
