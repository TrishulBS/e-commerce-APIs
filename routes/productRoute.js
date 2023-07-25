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

/**
 * @openapi
 * /api/product:
 *   post:
 *     tags:
 *       - Product
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - price
 *               - quantity
 *               - color
 *               - brand
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 default: Watch
 *               description:
 *                 type: string
 *                 default: Digital watch from lenevo
 *               price:
 *                 type: string
 *                 default: 100
 *               quantity:
 *                 type: string
 *                 default: 1000
 *               color:
 *                 type: string
 *                 default: white
 *               brand:
 *                 type: string
 *                 default: Lenevo
 *               category:
 *                 type: string
 *                 default: Watch
 *              
 *     responses:
 *       201:
 *         description: New Product is created
 *         content: 
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                title:
 *                 type: string
 *                 default: Watch
 *                description:
 *                 type: string
 *                 default: Digital watch from lenevo
 *                price:
 *                 type: string
 *                 default: 100
 *                quantity:
 *                 type: string
 *                 default: 1000
 *                color:
 *                 type: string
 *                 default: white
 *                brand:
 *                 type: string
 *                 default: Lenevo
 *                category:
 *                 type: string
 *                 default: Watch
 *                 _id:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */
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