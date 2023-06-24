const Pcategory = require("../models/prodcategoryModel")
const asyncHandler = require("express-async-handler")
const {validateMongoDbId} = require("../utils/validateMongodbid")


const createCategory = asyncHandler(async (req, res) => {
    try{
        const newCategory = await Pcategory.create(req.body)
        res.json(newCategory)
    } catch(error){
        throw new Error(error)
    }
})

const updateCategory = asyncHandler(async (req, res) => {
    const {id} = req.params
    try {
        const updatedCategory = await Pcategory.findByIdAndUpdate(id, req.body, {
            new: true
        })
        res.json(updatedCategory)
    } catch(error){
        throw new Error(error)
    }
})

const deleteCategory = asyncHandler(async (req, res) => {
    const {id} = req.params
    try {
        const deleteCategory = await Pcategory.findByIdAndDelete(id)
        res.json(deleteCategory)
    } catch(error){
        throw new Error(error)
    }
})

const getaCategory = asyncHandler(async (req, res) => {
    try{
        const {id} = req.params
        console.log(id)
        validateMongoDbId(id)
        const getaCategory = await Pcategory.findById(id)
        res.json(getaCategory)
    } catch(error){
        throw new Error(error)
    }
})

const getallCategory = asyncHandler(async (req, res) => {
    try{
        const getallCategory = await Pcategory.find()
        res.json(getallCategory)
    } catch(error){
        throw new Error(error)
    }
})

module.exports = { createCategory, updateCategory, deleteCategory, getaCategory, getallCategory }