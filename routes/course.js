const express = require('express')
const { purchaseModel, courseModel } = require('../db')
const { coursePurchase, coursePreview } = require('../controllers/courseController')
const courseRouter = express.Router()


courseRouter.post('/purchase', coursePurchase)

courseRouter.post('/preview', coursePreview)

module.exports = courseRouter