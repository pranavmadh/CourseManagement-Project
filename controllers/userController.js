const express = require('express')
const bcrypt = require('bcrypt')
const z = require('zod')
const jwt = require('jsonwebtoken')
const { JWT_USER_PASSWORD } = require('../config.js')
const { userModel } =  require('../db.js')


//User Signup Control

const userSignup =  async (req,res) => {

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
        await userModel.create({
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

const userSigin = async (req,res) => {
    const email = req.body.email
    const password = req.body.password

    const user = await userModel.findOne({
        email : email
    })

    if(!user) {
        res.status(400).json({
            message : "User not found",
            signin : false
        })
        return
    }

    const passwordMatch = await bcrypt.compare(password,user.password)

    if(passwordMatch) {
        const token = jwt.sign({id : user._id},JWT_USER_PASSWORD)

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

module.exports = {
    userSignup , userSigin
}