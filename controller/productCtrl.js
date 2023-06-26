const Product = require("../models/productModel")
const asyncHandler = require("express-async-handler")
const slugify = require("slugify")
const User = require("../models/userModel")

const createProduct = asyncHandler(async(req, res) => {
    console.log("hello")
    try{
        if (req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        const newProduct = await Product.create(req.body)
        res.json(newProduct)

    }catch(error){
        throw new Error(error)
    }
})

const updateProduct = asyncHandler(async(req, res) => {
    try{

        const {id} = req.params
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }

        const updateProduct = await Product.findOneAndUpdate({_id:id}, req.body, {new: true})
        res.json(updateProduct)
    }catch(error){
        throw new Error(error)
    }
})


const deleteProduct = asyncHandler(async(req, res) => {
    try{

        const {id} = req.params

        const deleteProduct = await Product.findByIdAndDelete({_id:id})
        res.json(deleteProduct)
    }catch(error){
        throw new Error(error)
    }
})


const getaProduct = asyncHandler(async(req, res) => {
    const {id} = req.params
    try{
        const product = await Product.findById({_id: id})
        res.json(product)
    }catch(error){
        throw new Error(error)
    }
})

const getallProducts = asyncHandler(async(req, res) => {
    try {
        // 
        const queryObj = {...req.query}
        const excludeObj = ["page", "sort", "limit", "fields"]
        excludeObj.forEach(el => delete queryObj[el])
        console.log(queryObj)
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
        console.log(queryStr)
        let query = Product.find(JSON.parse(queryStr))
    

        // sORTING
        if (req.query.sort){
            const sortBy = req.query.sort.split(",").join(" ")
            query = query.sort(sortBy)
        }else{
            query = query.sort("-createdAt")
        }


        // lIMITING

        if (req.query.fields){
            const fields = req.query.fields.split(",").join(" ")
            query = query.select(fields)
        } else {
            query = query.select('-__v')
        }

        // Pagination

        const page = req.query.page
        const limit = req.query.limit
        const skip = (page - 1) * limit
        query = query.skip(skip).limit(limit)
        if(req.query.page) {
            const productCount = await Product.countDocuments()
            if (skip>= productCount) throw new Error('This page does not exist')
        }
        const product = await query
        res.json(product)
    }catch(error){
        throw new Error(error)
    }
})

const addToWishList = asyncHandler(async(req, res) => {
    const {_id} = req.user;
    const {prodId} = req.body;
    try{
        const user = await User.findById(_id)
        const alreadyadded = user.wishlist.find((id) => id.toString() == prodId)
        if(alreadyadded){
            let user = await User.findByIdAndUpdate(_id, {
                $pull: {wishlist: prodId}
            }, {
                new: true
            })
            res.json(user)
        } else {
            let user = await User.findByIdAndUpdate(_id, {
                $push: {wishlist: prodId}
            }, {
                new: true
            })
            res.json(user)
        }

    }catch(error){
        throw new Error(error)
    }
})

const rating = asyncHandler(async(req, res) => {
    try {
        const {_id} = req.user
        const { star, prodId, comment} = req.body
        const product = await Product.findById(prodId)
        let alreadyRated = product.ratings.find(
            (userId) => userId.postedby.toString() === _id.toString()
        )
        if (alreadyRated){
            console.log("helo2")
            const updateRating = await Product.updateOne({
                ratings: {$elemMatch: alreadyRated}
            },{
                $set: {"ratings.$.star": star, "ratings.$.comment": comment}
            }, {
                new: true
            })
        }else{
            console.log("helo3")
            const rateProduct = await Product.findByIdAndUpdate(prodId, {
                $push: {
                    ratings: {
                        star: star,
                        comment: comment,
                        postedby: _id
                    }
                }
            }, {
                new: true
            })
        }

    
    const getallratings = await Product.findById(prodId)
    let totalRating = getallratings.ratings.length
    let ratingsum = getallratings.ratings
        .map((item) => item.star)
        .reduce((prev, curr) => prev + curr, 0)
    console.log(getallratings)
    let actualRating = Math.round(ratingsum/ totalRating)
    let finalproduct = await Product.findByIdAndUpdate(
        prodId,
        {
            totalrating: actualRating
        }, {
            new: true
        }
    )
    console.log("helo")
    res.json(finalproduct)
    }catch(error) {

    }
    
})

const uploadImages = asyncHandler(async(req, res) => {
    console.log(req.files)
})


module.exports = {
    createProduct, 
    getaProduct, 
    getallProducts, 
    updateProduct, 
    deleteProduct,
    addToWishList,
    rating, 
    uploadImages
}