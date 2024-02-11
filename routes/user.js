const express = require('express')
const { loginUser, signUpUser } = require('../controllers/userController')
const router = express.Router()


// Login route
router.post("/login", loginUser)

//Signup Route
router.post("/signup", signUpUser)

module.exports = router