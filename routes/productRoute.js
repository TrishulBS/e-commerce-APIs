const express = require("express")
const router = express.Router()
const {createProduct,
       getaProduct,
       getallProducts,
       updateProduct,
       deleteProduct,
       addToWishList,
       rating,
       uploadImages
      } = require("../controller/productCtrl")



const {isAdmin, authMiddleware} = require("../middlewares/authMiddleware")
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImages")


router.post("/", authMiddleware, isAdmin, createProduct)
router.put(
      "/upload/:id", 
      authMiddleware, 
      isAdmin, 
      uploadPhoto.array('images', 10),
      productImgResize,
      uploadImages)
      
router.get("/:id", getaProduct)
router.put("/wishlist", authMiddleware, addToWishList)
router.put("/rating", authMiddleware, rating)
router.put("/:id", authMiddleware, isAdmin, updateProduct)
router.get("/", getallProducts)
router.delete("/:id", authMiddleware, isAdmin, deleteProduct)


module.exports = router