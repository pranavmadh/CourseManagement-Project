const express = require('express')
const userRouter = require('./routes/user')
const mongoose = require('mongoose')
require('dotenv').config()
const MONGOOSE_URL = process.env.MONGOOSE_URL
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use("/user",userRouter)

const main = async() => {
    await mongoose.connect(MONGOOSE_URL).then(() => {console.log("Database Connected Successfully")})
    app.listen(PORT,() => {
        console.log("You are Listening to Port " + PORT)
    })
}

main()