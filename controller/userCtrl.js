const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")
const {generateToken} = require("../config/jwtToken")
const {validateMongoDbId} = require("../utils/validateMongodbid")
const {generateRefreshToken} = require("../config/refreshtoken")
const jwt = require("jsonwebtoken")

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
        const refreshToken = await generateRefreshToken(findUser?._id)
        const updateuser = await User.findByIdAndUpdate(findUser.id, {
            refreshToken: refreshToken
        }, {
            new:true
        })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72*60*60*1000
        })
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

const handleRefreshToken = asyncHandler(async(req, res)=> {
    const cookie = req.cookies
    if(!cookie?.refreshToken) throw new Error ("No refreshToken in cookies")
    const refreshToken = cookie.refreshToken
    console.log(refreshToken)
    const user = await User.findOne({refreshToken})
    if (!user) throw new Error("No refresh token present in db or not matched")
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error("There is something wrong with refresh token")
        }
        const accessToken = generateToken(user?._id)
        res.json({accessToken})
    })
})

const logout = asyncHandler(async(req, res) => {
    const cookie = req.cookies
    if(!cookie?.refreshToken) throw new Error("No refresh Token in Cookie")
    const refreshToken = cookie.refreshToken
    const user = await User.findOne({refreshToken})
    if(!user){
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true
        })
        return res.sendStatustatus(204)
    }
    await User.findOneAndUpdate({refreshToken}, {
        refreshToken: ""
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true
    })
   res.sendStatus(204)
})


const updatedUser = asyncHandler(async (req, res) => {
    const {id} = req.user
    validateMongoDbId(id)
    try{
        const updatedUser = await User.findByIdAndUpdate(id, {
            firstname:req?.body.firstname,
            lastname: req?.body.lastname,
            email:req?.body.email,
            mobile:req?.body.mobile
        },
        {
            new:true
        }
        )
        res.json(updatedUser)
    }catch(error) {
        throw new Error(error)
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
        validateMongoDbId(id)
        const getUser = await User.findOne({_id: id})
        res.json(getUser)
    }
    catch(error){
        throw new Error(error)
    }
})

const deleteaUser = asyncHandler(async(req, res) => {
    try{
        const {id} = req.params
        validateMongoDbId(id)
        const deleteUser = await User.findByIdAndDelete({_id:id})
        res.json(deleteUser)
    }
    catch(error){
        throw new Error(error)
    }
})

const blockUser = asyncHandler(async(req, res) => {
    const {id} = req.params
    validateMongoDbId(id)
    try{
        const block = await User.findByIdAndUpdate(id, {
            isBlocked: true
        }, {
            new:true
        })
        res.json({
            message: "User blocked"
        })
    }catch(error){
        throw new Error(error)
    }
})

const unblockUser = asyncHandler(async(req, res) => {
    const {id} = req.params
    validateMongoDbId(id)
    try{
        const unblock = await User.findByIdAndUpdate(id, {
            isBlocked:false
        }, {
            new:true
        })
        res.json({
            message:"user unblocked"
        })
    } catch(error){
        throw new Error(error)
    }
    

})

const updatePassword = asyncHandler(async(req, res) => {
    const {_id} = req.user;
    const {password} = req.body
    validateMongoDbId(_id)
    const user = await User.findById(_id)
    if (password) {
        user.password = password
        const updatedPassword = await user.save()
        res.json(updatedPassword)
    }else{
        res.json(user)
    }
})


const forgotPasswordToken = asyncHandler(async(req, res) => {
    const {email} = req.body
    const user = await User.find({email})
    if(!user) throw new Error("User not found with this email")
})


module.exports={
    createUser, 
    loginUserCtrl, 
    getallUser, 
    getaUser, 
    deleteaUser,
    updatedUser,
    blockUser,
    unblockUser,
    handleRefreshToken, 
    logout,
    updatePassword, 
    forgotPasswordToken
}