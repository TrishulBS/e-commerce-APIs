const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")
const {generateToken} = require("../config/jwtToken")

const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email
    const findUser = await User.findOne({email:email})

    if(!findUser){
        const newUser = await User.create(req.body)
        res.json(newUser)
    }else{
       throw new Error("User already exists")
    }
})

const loginUserCtrl = asyncHandler(async(req, res)=>{
    const {email, password} = req.body
    const findUser = await User.findOne({email:email})
    if (findUser && (await findUser.isPasswordMatched(password))){
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id)
        })
    }else{
        throw new Error("invalid credentials")
    }
})

const getallUser = asyncHandler(async(req, res) => {
    try{
        const getUsers = await User.find()
        res.json(getUsers)

    }
    catch(error){
        throw new Error(error)
    }
})

const getaUser = asyncHandler(async(req, res) => {
    try{
        const {id} = req.params
        const getUser = await User.findOne({_id: id})
        res.json(getUser)
    }
    catch(error){
        throw new Error(error)
    }
})

module.exports={createUser, loginUserCtrl, getallUser, getaUser}