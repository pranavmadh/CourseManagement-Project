const express = require('express')
const { coursePurchase, coursePreview } = require('../controllers/courseController')
const userAuth = require('../Middlewares/userAuth')
const courseRouter = express.Router()


courseRouter.post('/purchase',userAuth, coursePurchase)

courseRouter.post('/preview', coursePreview)

module.exports = courseRouter