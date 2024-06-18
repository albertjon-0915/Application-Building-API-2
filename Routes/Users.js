const express = require("express");
const User = require("../Controllers/User.js");
const router = express.Router();

const { verify } = require("../auth.js");

router.get("/", verify, User.getUser);
router.post("/register", User.Register);
router.post("/login", User.Login);

module.exports = router;
