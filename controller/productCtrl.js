const Product = require("../models/productModel")
const asyncHandler = require("express-async-handler")
const slugify = require("slugify")

const createProduct = asyncHandler(async(req, res) => {
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
        const products = await Product.find()
        res.json(products)
    }catch(error){
        throw new Error(error)
    }
})

module.exports = {createProduct, getaProduct, getallProducts, updateProduct, deleteProduct}