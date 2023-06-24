const express = require("express")
const router = express.Router()
const {createProduct,
       getaProduct,
       getallProducts,
       updateProduct,
       deleteProduct,
       addToWishList
      } = require("../controller/productCtrl")



const {isAdmin, authMiddleware} = require("../middlewares/authMiddleware")


router.post("/", authMiddleware, isAdmin, createProduct)
router.get("/:id", getaProduct)
router.put("/wishlist", authMiddleware, addToWishList)
router.put("/:id", authMiddleware, isAdmin, updateProduct)
router.get("/", getallProducts)
router.delete("/:id", authMiddleware, isAdmin, deleteProduct)

module.exports = router