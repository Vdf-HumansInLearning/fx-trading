var express = require("express");
const fs = require("fs");
const { url } = require("inspector");
const path = require("path");

var router = express.Router();

//user: id, username, email, password

let emailRegExp = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;
let passRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//check if a string matches a regEx
function checkRegExp(regExp, myStr) {
  return regExp.test(myStr);
}

function validateUser(user) {
  let errArray = [];

  if (user.username < 3) {
    errArray.push("Firstname should have between 3 and 100 characters.");
  }
  if (!user.email) {
    errArray.push("Email is required!");
  }
  if (checkRegExp(emailRegExp, user.email) === false) {
    errArray.push("Invalid! Email should contain '@' and a domain!")
  }
  if (checkRegExp(passRegExp, user.password) === false) {
    errArray.push("Invalid! Password must be 8 characters long and must contain at least: one uppercase, one lowercase, a number and a special character!")
  }
  if (user.password !== user.repassword) {
    errArray.push("Password do not match!");
  }
  return errArray;
}

// return the data from a json file
function readFromFile(relPath) {
  let rawdata = fs.readFileSync(path.resolve(__dirname, relPath));
  let data = JSON.parse(rawdata);
  return data;
}

// write data to a json file
function writeToFile(content, relPath) {
  fs.writeFile(path.resolve(__dirname, relPath), JSON.stringify(content), function (err) {
    if (err) {
      return err;
    } else {
      res.send("Successfully registered");
      return 'User inserted in db';
    }
  })
}
// Get method for login 
router.get('/login', function (req, res) {
  let users = readFromFile("../db/users.json");
  console.log(users);
  res.json(users);
})

// Post method for login 
router.post('/login', function (req, res) {
  let users = readFromFile("../db/users.json");
  console.log(users);
  let user = users.find(i => i.email == req.body.email &&
    i.password == req.body.password);

  if (user.length === 0) {
    res.status(404).send("Invalid username or password.");
  }
  res.json(user);
})

// POST NEW REGISTERED USER
router.post('/register', function (req, res) {
  let users = readFromFile("../db/users.json");
  console.log(users);

  let user = {
    "id": users.length + 1,
    "username": req.body.username,
    "email": req.body.email,
    "password": req.body.password,
    "repassword": req.body.repassword
  }
  let errors = validateUser(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }
  delete user.repassword;
  users.push(user);
  writeToFile(users, "../db/users.json");
});

module.exports = router;
