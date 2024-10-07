const express = require('express')
const { userSigin, userSignup, getCourses } = require('../controllers/userController')
const userAuth = require('../Middlewares/userAuth')
const userRouter = express.Router()


userRouter.post('/signup', userSignup)

userRouter.post('/login',userSigin)

userRouter.get('/courses',userAuth,getCourses)

module.exports = userRouter