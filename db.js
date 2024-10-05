const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const userSchema = new Schema({
    firstName : String,
    lastName : String,
    email : {type : String, unique : true},
    password : String
})

const adminSchema = new Schema({
    firstName : String,
    lastName : String,
    email : {type : String, unique : true},
    password : String
})

const courseSchema = new Schema({
    title : String,
    description :  String,
    price : Number,
    imageUrl : String,
    creatorId : {type : ObjectId, ref : 'adminSchema'}
})

const purchaseShema = new Schema({
    userID : {type : ObjectId, ref : 'userSchema'},
    courseID : {type  : ObjectId , ref  :  'courseShema'}
})

const userModel = mongoose.model('users',userSchema)
const courseModel = mongoose.model('courses',courseSchema)
const adminModel = mongoose.model('admins',adminSchema)
const purchaseModel = mongoose.model('purchases',purchaseShema)


module.exports = {userModel ,courseModel ,adminModel ,purchaseModel}