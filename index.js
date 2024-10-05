const express = require('express')
const userRouter = require('./routes/user')
const mongoose = require('mongoose')
const { adminRouter } = require('./routes/admin')
require('dotenv').config()
const MONGOOSE_URL = process.env.MONGOOSE_URL
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.use("/api/v1/user",userRouter)
app.use("/api/v1/course",userRouter)
app.use("/api/v1/admin",adminRouter)

const main = async() => {
    await mongoose.connect(MONGOOSE_URL).then(() => {console.log("Database Connected Successfully")})
    app.listen(PORT,() => {
        console.log("You are Listening to Port " + PORT)
    })
}

main()