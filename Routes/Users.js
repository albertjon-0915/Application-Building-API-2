const express = require("express");
const User = require("../Controllers/User.js");
const router = express.Router();

router.post("/register", User.Register);
router.post("/login", User.Login);

module.exports = router;
