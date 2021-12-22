var express = require("express");
var router = express.Router();

const fs = require("fs");
const path = require("path");

//user: id, username,email, password
/* GET auth */
router.get("/login", (req, res) => {
  console.log("login");
});
module.exports = router;
