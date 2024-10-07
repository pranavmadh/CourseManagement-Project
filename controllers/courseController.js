const { purchaseModel, courseModel } = require("../db")


const coursePurchase = async (req,res) => {
    const userId = req.userId
    const courseId = req.body.courseId

    if(!courseId) {
        res.status(400).json({
            message : "Purchase Failed",
            success : false
        })
    }

    try {
        await purchaseModel.create({
            userID : userId,
            courseID : courseId
        })
    } catch(e) {
        res.status(400).json({
            message : "Purchase Failed",
            success : false
        })
    }

    res.status(200).json({
        message : "Purchase Successful",
        success : true
    })
    
}

const coursePreview = async (req,res) => {
    const userId = req.userId
    const courseId = req.body.courseId

    if(!courseId) {
        return res.status(400).json({
            message : "Preview Failed : No course Found",
            success : false
        })
    }

    let purchaseCourse = await purchaseModel.findOne({
        userID :  userId,
        courseID  : courseId
    })

    if(!purchaseCourse) {
        return res.status(400).json({
            message : "Preview Failed : No course Found",
            success : false
        })
    }

    const course = await courseModel.findOne({
        _id : courseId
    })
    

    res.status(200).json({
        title : course.title,
        description  : course.description,
        imageUrl : course.imageUrl,
        author  : course.creatorId
    })
}

module.exports = {coursePurchase,coursePreview}