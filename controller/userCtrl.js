const User = require("../models/userModel")
const Product = require("../models/productModel")
const Cart = require("../models/cartModel")
const asyncHandler = require("express-async-handler")
const {generateToken} = require("../config/jwtToken")
const {validateMongoDbId} = require("../utils/validateMongodbid")
const {generateRefreshToken} = require("../config/refreshtoken")
const jwt = require("jsonwebtoken")
const sendEmail = require("./emailCtrl")
const crypto = require("crypto")
const Coupon = require("../models/couponModel")
const Order = require("../models/orderModel")
const uniqid = require("uniqid")

const createUser = asyncHandler(async (req, res) => {
    try {
      const email = req.body.email;
      const findUser = await User.findOne({ email: email });
  
      if (!findUser) {
        const newUser = await User.create(req.body);
        const resp = {
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email,
            mobile: newUser.mobile,
            _id: newUser._id,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        }
        res.status(201).json(resp);
      } else {
        const error = new Error('User already exists');
        res.status(409).json({ error: error.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

const loginUserCtrl = asyncHandler(async(req, res)=>{
    try{
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
            res.status(200).json({
                _id: findUser?._id,
                firstname: findUser?.firstname,
                lastname: findUser?.lastname,
                email: findUser?.email,
                mobile: findUser?.mobile,
                token: generateToken(findUser?._id)
            })
        }else{
            const error =  new Error("invalid credentials")
            res.status(401).json({error: error.message})
        }
} catch (error) {
    res.status(500).json({ error: error.message }); 
}
})

// Login the admin
const loginAdmin = asyncHandler(async(req, res)=>{
    try{
    const {email, password} = req.body
    const findAdmin = await User.findOne({email:email})
    if (findAdmin.role !== "admin") {
        const error =  new Error("Not Authorised")
        res.status(401).json({error: error.message})
        return 

    }
    if (findAdmin && (await findAdmin.isPasswordMatched(password))){
        const refreshToken = await generateRefreshToken(findAdmin?._id)
        const updateuser = await User.findByIdAndUpdate(findAdmin.id, {
            refreshToken: refreshToken
        }, {
            new:true
        })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72*60*60*1000
        })
        res.status(200).json({
            _id: findAdmin?._id,
            firstname: findAdmin?.firstname,
            lastname: findAdmin?.lastname,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            token: generateToken(findAdmin?._id)
        })
    }else{
        const error =  new Error("Invaid Crendentials")
        res.status(401).json({error: error.message})
    }}
    catch (error) {
        res.status(500).json({ error: error.message }); 
    }
})


// save the address

const saveAddress = asyncHandler(async(req, res) => {
    const {_id} = req.user
    validateMongoDbId(_id)
    try {
        const updatedUser = await User.findByIdAndUpdate(_id, {
            address:req?.body?.address,
            
        },
        {
            new:true
        }
        )
        res.status(200).json({address: updatedUser.address, _id: updatedUser._id, message: "Updated address successfully"})

    } catch(error){
        res.status(500).json({ error: error.message }); 
    }
})

const getWishList = asyncHandler(async(req, res) => {
    const { _id} = req.user
    try {
        const findUser = await User.findById(_id).populate('wishlist')
        res.json(findUser)
    }catch(error){
        throw new Error(error)
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
        res.status(200).json({
            message: "User blocked"
        })
    }catch(error){
        res.status(500).json({ error: error.message }); 
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
        res.status(200).json({
            message:"user unblocked"
        })
    } catch(error){
        res.status(500).json({ error: error.message }); 
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


const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found with this email");
    try {
      const token = await user.createPasswordResetToken();
      await user.save();
      const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</>`;
      const data = {
        to: email,
        text: "Hey User",
        subject: "Forgot Password Link",
        htm: resetURL,
      };
      sendEmail(data);
      res.json(token);
    } catch (error) {
      throw new Error(error);
    }
  });

  const resetPassword = asyncHandler(async(req, res) => {
    const {password} = req.body
    const { token} = req.params
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
    const user = await User.findOne({
        passwordResetToken: hasheToken,
        passwordResetExpires: {$gt: Date.now()}
    })

    if(!user) throw new Error (" Token Expired. Please try again later")
    user.password = password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()
    res.json(user)
})


const userCart = asyncHandler(async(req, res) => {
    try{
        const { cart} = req.body
        const {_id} = req.user
        validateMongoDbId(_id)
        let products = []
        const user = await User.findById(_id)
        // ceck if user already have product in cart
        const alreadyExistCart = await Cart.findOne({orderby: user._id})
        if(alreadyExistCart) {
            alreadyExistCart.remove()
        }
        for(let i=0; i<cart.length; i++){
            let object = {}
            object.product = cart[i]._id;
            object.count = cart[i].count;
            object.color = cart[i].color
            let getPrice = await Product.findById(cart[i]._id).select("price").exec()
            object.price = getPrice.price
            products.push(object)
        }
        let cartTotal = 0
        for (let i=0; i<products.length; i++){
            cartTotal = cartTotal + products[i].price*products[i].count
        }
        let newCart = await new Cart({
            products,
            cartTotal,
            orderBy: user?._id
        }).save()
        user.cart = newCart
        await user.save()
        console.log(user)
        res.json(newCart)
    } catch(error){
        throw new Error (error)
    }
})

const getUserCart = asyncHandler(async(req, res) => {
    const {_id} = req.user
    validateMongoDbId(_id)
    const user = await User.findById(_id)
    try {
        const cart = await Cart.findOne({orderBy: _id}).populate(
            "products.product")
        res.json(cart)
    } catch(error) {
        throw new Error(error)
    }
})

const emptyCart = asyncHandler(async(req, res) => {
    try{
    const {_id} = req.user
    validateMongoDbId(_id)
    const user = await User.findOne(_id)
    const cart = await Cart.findOneAndRemove({orderby: user._id})
    res.json(cart)
    }catch(error) {
        throw new Error(error)
    }

})

const applyCoupon = asyncHandler(async(req, res) => {
    const {coupon} = req.body
    const {_id} = req.user
    const validCoupon = await Coupon.findOne({name: coupon})
    if (validCoupon === null) {
        throw new Error ("Invalid Coupon")
    }
    const user = await User.findOne({_id})
    const v = await Cart.findOne({orderBy: user._id})
    console.log(v, "v")
    let {cartTotal} = await Cart.findOne({
        orderby: user._id
    }).populate("products.product")
    let totalAfterDiscount = (cartTotal - (cartTotal*validCoupon.discount)/100).toFixed(2)
    await Cart.findOneAndUpdate({orderby: user._id}, 
        {totalAfterDiscount},
        {new: true})
        res.json(totalAfterDiscount)
})

const createOrder = asyncHandler(async(req, res) => {
    try{
        const { COD, couponApplied} = req.body
        const {_id} = req.user
        validateMongoDbId(_id)
        if(!COD) throw new Error("Create cash order failed")
        const user = await User.findById(_id)
        let userCart = await Cart.findOne({orderby: user._id})
        let finalAmount = 0
        if(couponApplied && userCart.totalAfterDiscount){
            finalAmount = userCart.totalAfterDiscount*100
        } else {
            finalAmount = userCart.cartTotal*100
        }

        let newOrder = await new Order({
            products: userCart.products,
            paymentIntent:{
                id: uniqid(),
                method: "COD",
                amount: finalAmount,
                status: "COD",
                created: Date.now(),
                currency: "usd"
            },
            orderby: user._id,
            orderStatus: "COD"
        }).save()

        let update = userCart.products.map((item) => {
            return {
                updateOne: {
                    filter: {_id: item.product._id},
                    update: {$inc: {quantity: -item.count, sold: +item.count}}
                }
            }
        })
        const updated = await Product.bulkWrite(update,{})
        res.json({message: "success"})
    }
    catch(error){
        throw new Error(error)
    }    
})

const getOrders = asyncHandler(async(req, res) => {
    try {
        const {_id} = req.user
        validateMongoDbId(_id)
        const userorders = await Order.findOne({orderby: _id})
        .populate("products.product")
        .exec()
        res.json(userorders)
    } catch(error){
        throw new Error(error)
    }
})

const updateOrderStatus = asyncHandler(async(req, res) => {
    try {
        const {status} = req.body
        const{_id} = req.params
        validateMongoDbId(id)
        const findOrder = await Order.findByIdAndUpdate(
            id, 
            { orderStatus: status,
            paymentIntent: {
                status: status
            }}, 
            {new: true})
            res.json(findOrder)
    }catch(error){
        throw new Error(error)
    }
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
    forgotPasswordToken,
    resetPassword,
    loginAdmin,
    getWishList, 
    saveAddress,
    userCart,
    getUserCart,
    emptyCart, 
    applyCoupon,
    createOrder,
    getOrders, 
    updateOrderStatus
}