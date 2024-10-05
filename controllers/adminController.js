const express = require('express')
const bcrypt = require('bcrypt')
const z = require('zod')
const jwt = require('jsonwebtoken')
const { JWT_ADMIN_PASSWORD } = require('../config.js')
const { adminModel, courseModel } =  require('../db.js')


//User Signup Control

const adminSignup =  async (req,res) => {

    const bodySchema = z.object({
        firstname : z.string(),
        lastname : z.string(),
        email : z.string().min(5).max(50).email(),
        password : z.string().min(6).refine((password) => /[A-Z]/.test(password) , {message : "Should contain altleast one Capital Letter"})
        .refine((password) => /[a-z]/.test(password), {message : "Should Contain atleast one Lowercase Letter"}).refine((password) => /[!@#$%^&*()]/.test(password),{message : "Should contian atleast one Special Characters"})
    }) 
    
    const parseDataSuccess = bodySchema.safeParse(req.body)

    if(!parseDataSuccess.success) {
        res.status(400).json({
            message : "Schema of input data is not Vlaid" + parseDataSuccess.error.message,
            signup : false
        })
        return
    }

    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const password = req.body.password

    const hashedPassword = await bcrypt.hash(password , 5)

    try {
        await adminModel.create({
            firstname : firstname,
            lastname : lastname,
            email : email,
            password : hashedPassword
        })

    } catch(e){
        res.status(400).json({
            message : "Failed to Insert into DB",
            signup :  false
        })
    }
    

    res.status(200).json({
        message : "Sign up Successful!",
        signup : true
    })
}

//User Sigin Control

const adminSigin = async (req,res) => {
    const email = req.body.email
    const password = req.body.password

    const user = await adminModel.findOne({
        email : email
    })

    if(!user) {
        res.status(400).json({
            message : "Admin not found",
            signin : false
        })
        return
    }

    const passwordMatch = await bcrypt.compare(password,user.password)

    if(passwordMatch) {
        const token = jwt.sign({id : user._id},JWT_ADMIN_PASSWORD)

        res.status(200).json({
            token : token,
            signin : true
        })
    } else {
        res.status(403).json({
            message : "Invalid Username or Password",
            signin : false
        })
    }
}

const addCourse = async (req,res) => {
    const adminId = req.userId
    console.log(adminId)

    const bodySchema = z.object({
        title : z.string().min(5),
        description : z.string().min(20).max(250),
        price : z.string(),
        imageUrl : z.string().url()
    })

    const parseDataSuccess = bodySchema.safeParse(req.body)

    if (!parseDataSuccess.success) {
        res.status(400).json({
            message : "Invalid Schema",
            success : false
        })
        return
    }

    const title = req.body.title
    const description =  req.body.description
    const price = parseFloat(req.body.price)
    const imageUrl = req.body.imageUrl

    try {
        await courseModel.create({
            title : title,
            description : description,
            price : price,
            imageUrl : imageUrl,
            creatorId : adminId
        })
    } catch(e) {
        res.status(400).json({
            message : "Adding Course Failed",
            success : false
        })
    }

    res.status(200).json({
        message : "Course Successfully Added",
        signup : true
    })

}

const updateCourse = async (req, res) => {
    const courseId = req.query.id;

    console.log(courseId);

    if (!courseId) {
        return res.status(400).json({
            message: "Update Failed: Course ID is missing",
            success: false
        });
    }

    const body = req.body;

    try {
        await courseModel.findOneAndUpdate({ _id: courseId }, body);
    } catch (e) {
        return res.status(400).json({
            message: "Update Failed: Error occurred during update",
            success: false
        });
    }

    // Send success response if the update was successful
    return res.status(200).json({
        message: "Update Successful",
        success: true
    });
};

const getallCourse = async (req,res) => {
    const adminId = req.userId

    let courses
    try {
         courses = await courseModel.find({
            creatorId : adminId
        })
    } catch(e) {
        return res.status(400).json({
            message :  "Error in accessing database",
            success : false
        })
    }

    res.status(200).json({courses : courses})
    
}

module.exports = {
    adminSignup , adminSigin , addCourse , updateCourse , getallCourse
}