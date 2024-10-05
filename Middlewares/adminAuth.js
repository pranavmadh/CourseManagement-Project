const jwt = require('jsonwebtoken')
const { JWT_ADMIN_PASSWORD } = require('../config')


const adminAuth = (req,res,next) => {
    const token = req.headers.token
    console.log(token)
    
    const admin = jwt.verify(token,JWT_ADMIN_PASSWORD)
    console.log(admin)

    if(admin) {
        req.userId = admin.id
        next()
    } else {
        res.status(400).json({
            message :  "Admin Authentication Failed",
            success : false
        })
    }
}

module.exports = adminAuth