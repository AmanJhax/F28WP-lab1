const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.js");

const isLoggedIn = authController.isLoggedIn; 


router.get("/", isLoggedIn, (req, res) => {
  res.render("index");
});


module.exports = router;