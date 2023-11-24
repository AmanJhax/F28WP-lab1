const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.js");

const isLoggedIn = authController.isLoggedIn; 


router.post("/register", authController.register);
router.post("/login", authController.login);
router.post('/logout', (req, res) => {
  res.redirect('/auth/login');
});
router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile");
});

module.exports = router;