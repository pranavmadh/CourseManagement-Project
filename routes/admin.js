const express = require('express')
const { adminSignup, adminSigin, addCourse, updateCourse, getallCourse } = require('../controllers/adminController')
const adminAuth = require('../Middlewares/adminAuth')
const adminRouter = express.Router()

adminRouter.post('/signup', adminSignup)

adminRouter.post('/login', adminSigin)

adminRouter.post('/course',adminAuth, addCourse)

adminRouter.put('/course',adminAuth, updateCourse)

adminRouter.get('/course/Bulk',adminAuth,getallCourse)

module.exports = {adminRouter}