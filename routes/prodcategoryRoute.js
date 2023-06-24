const express = require("express")
const router = express.Router()

const { updateCategory,
        createCategory,
        deleteCategory, 
        getaCategory,
        getallCategory} = require("../controller/prodcategoryCtrl")

const {authMiddleware, 
       isAdmin
} = require("../middlewares/authMiddleware")


router.post("/", authMiddleware, isAdmin, createCategory)
router.put("/:id", authMiddleware, isAdmin, updateCategory)
router.delete("/:id", authMiddleware, isAdmin, deleteCategory)
router.get("/:id", getaCategory)
router.get("/", getallCategory)



module.exports = router
