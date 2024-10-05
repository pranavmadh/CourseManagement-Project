const express = require('express')
const { userSigin, userSignup } = require('../controllers/userController')
const userRouter = express.Router()


userRouter.post('/signup', userSignup)

userRouter.post('/login',userSigin)

module.exports = userRouter