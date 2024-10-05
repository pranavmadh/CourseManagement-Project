const express = require('express')
const { userSigin, userSignup, getCourses } = require('../controllers/userController')
const userRouter = express.Router()


userRouter.post('/signup', userSignup)

userRouter.post('/login',userSigin)

userRouter.get('/courses',getCourses)

module.exports = userRouter