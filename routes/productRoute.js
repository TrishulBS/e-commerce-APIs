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
 * /api/product/:
 *   post:
 *     tags:
 *       - Product
 *     summary: Add a new product
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

/**
 * @openapi
 * /api/product/{id}:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *     responses:
 *       201:
 *         description: New Product is created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: string
 *                 quantity:
 *                   type: string
 *                 color:
 *                   type: string
 *                 brand:
 *                   type: string
 *                 category:
 *                   type: string
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
router.get("/:id", getaProduct)

/**
 * @openapi
 * /api/product/wishlist:
 *   put:
 *     tags:
 *       - Product
 *     summary: Add product to wishlist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prodId
 *             properties:
 *               prodId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Added the product to wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 firstname:
 *                   type: string
 *                 lastname:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 mobile:
 *                   type: string
 *                 password:
 *                   type: string
 *                 role:
 *                   type: string
 *                 isBlocked:
 *                   type: boolean
 *                 wishlist:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["649a049157566ffbd0a6c744", "64bf6acab590bdefaf58b054"]
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 __v:
 *                   type: integer
 *                 refreshToken:
 *                   type: string
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */

router.put("/wishlist", authMiddleware, addToWishList)

router.get("/:id", getaProduct)

/**
 * @openapi
 * /api/product/rating:
 *   put:
 *     tags:
 *       - Product
 *     summary: Rate a product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prodId
 *               - star
 *               - comment
 *             properties:
 *               prodId:
 *                 type: string
 *               star:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Added a rating to the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 slug:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                   format: double
 *                 category:
 *                   type: string
 *                 brand:
 *                   type: string
 *                 quantity:
 *                   type: integer
 *                 sold:
 *                   type: integer
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *                 color:
 *                   type: string
 *                 totalrating:
 *                   type: string
 *                 ratings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       star:
 *                         type: integer
 *                       comment:
 *                         type: string
 *                       postedby:
 *                         type: string
 *                       _id:
 *                         type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 __v:
 *                   type: integer
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */

router.put("/rating", authMiddleware, rating)

/**
 * @openapi
 * /api/product/{id}:
 *   put:
 *     tags:
 *       - Product
 *     summary: Edit a product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *       200:
 *         description: Updated the product
 *         content: 
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                title:
 *                 type: string
 *                description:
 *                 type: string
 *                price:
 *                 type: string
 *                quantity:
 *                 type: string
 *                color:
 *                 type: string
 *                brand:
 *                 type: string
 *                category:
 *                 type: string
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
router.put("/:id", authMiddleware, isAdmin, updateProduct)

/**
 * @openapi
 * /api/product/:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get all product
 *     requestBody:
 *       required: false
 *     responses:
 *       201:
 *         description: All the Products are returned
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   slug:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                     format: double
 *                   category:
 *                     type: string
 *                   brand:
 *                     type: string
 *                   quantity:
 *                     type: integer
 *                   sold:
 *                     type: integer
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: []
 *                   color:
 *                     type: string
 *                   totalrating:
 *                     type: string
 *                   ratings:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: []
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */
router.get("/", getallProducts)

/**
 * @openapi
 * /api/product/:
 *   delete:
 *     tags:
 *       - Product
 *     summary: Delete a product
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */
router.delete("/:id", authMiddleware, isAdmin, deleteProduct)


module.exports = router