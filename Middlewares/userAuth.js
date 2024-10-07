const jwt = require('jsonwebtoken')
const { JWT_USER_PASSWORD } = require('../config')


const userAuth = (req,res,next) => {
    const token = req.headers.token
    console.log(token)
    
    const user = jwt.verify(token,JWT_USER_PASSWORD)
    console.log(user)
    
    if(user) {
        req.userId = user.id
        next()
    } else {
        res.status(400).json({
            message :  "User Authentication Failed",
            success : false
        })
    }
}

module.exports = userAuth