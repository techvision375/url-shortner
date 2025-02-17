const express = require("express");
const { HandleUserSingUp, HandleUserLogin } = require("../controllers/user");
const router = express.Router();
router.post("/", HandleUserSingUp);
router.post("/login", HandleUserLogin);
module.exports = router;