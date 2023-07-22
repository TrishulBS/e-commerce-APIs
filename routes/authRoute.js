const express = require("express")
const router = express.Router()
const {
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
} = require("../controller/userCtrl")

const {authMiddleware, 
    isAdmin
} = require("../middlewares/authMiddleware")

/**
 * @openapi
 * /api/user/register:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - mobile
 *               - password
 *             properties:
 *               firstname:
 *                 type: string
 *                 default: Roger
 *               lastname:
 *                 type: string
 *                 default: Federer
 *               email:
 *                 type: string
 *                 default: roger.federer@example.com
 *               mobile:
 *                 type: string
 *                 default: 9517121436
 *               password:
 *                 type: string
 *                 default: Strong@098
 *     responses:
 *       201:
 *         description: New user is created
 *         content: 
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 firstname:
 *                   type: string
 *                 lastname:
 *                   type: string
 *                 email:
 *                   type: string
 *                 mobile:
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
router.post("/register", createUser)


/**
 * @openapi
 * /api/user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: User Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 default: roger.federer@example.com
 *               password:
 *                 type: string
 *                 default: Strong@098
 *     responses:
 *       200:
 *         description: Login Successful
 *         content: 
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 firstname:
 *                   type: string
 *                 lastname:
 *                   type: string
 *                 email:
 *                   type: string
 *                 mobile:
 *                   type: string
 *                 _id:
 *                   type: string
 *                 
 *       401:
 *         description: Unauthorized 
 *       400:
 *         description: Bad Request
 */
router.post("/login", loginUserCtrl)

/**
 * @openapi
 * /api/user/admin-login:
 *   post:
 *     tags:
 *       - User
 *     summary: Admin Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 default: roger.federer@example.com
 *               password:
 *                 type: string
 *                 default: Strong@098
 *     responses:
 *       200:
 *         description: Login Successful
 *         content: 
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 firstname:
 *                   type: string
 *                 lastname:
 *                   type: string
 *                 email:
 *                   type: string
 *                 mobile:
 *                   type: string
 *                 _id:
 *                   type: string
 *                 
 *       401:
 *         description: Unauthorized 
 *       400:
 *         description: Bad Request
 */
router.post("/admin-login", loginAdmin)

router.post("/forgot-password-token", forgotPasswordToken)


/**
 * @openapi
 * /api/user/cart:
 *   post:
 *     tags:
 *       - User
 *     summary: Add products to cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       default: create a product and its id here
 *                     count:
 *                       type: integer
 *                       format: int32
 *                       default: 0
 *                     color:
 *                       type: string
 *                       default: "black"
 *     responses:
 *       200:
 *         description: Added to cart successfully
 *         content: 
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product:
 *                         type: string
 *                       count:
 *                         type: integer
 *                         format: int32
 *                       color:
 *                         type: string
 *                       price:
 *                         type: number
 *                         format: double
 *                       _id:
 *                         type: string
 *                 cartTotal:
 *                   type: number
 *                   format: double
 *                 orderBy:
 *                   type: string
 *                 _id:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 __v:
 *                   type: integer
 *                   format: int32
 *       401:
 *         description: Unauthorized 
 *       400:
 *         description: Bad Request
 */
router.post("/cart", authMiddleware, userCart)

/**
 * @openapi
 * /api/user/cart:
 *   post:
 *     tags:
 *       - User
 *     summary: Add products to cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       default: create a product and its id here
 *                     count:
 *                       type: integer
 *                       format: int32
 *                       default: 0
 *                     color:
 *                       type: string
 *                       default: "black"
 *     responses:
 *       200:
 *         description: Added to cart successfully
 *         content: 
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product:
 *                         type: string
 *                       count:
 *                         type: integer
 *                         format: int32
 *                       color:
 *                         type: string
 *                       price:
 *                         type: number
 *                         format: double
 *                       _id:
 *                         type: string
 *                 cartTotal:
 *                   type: number
 *                   format: double
 *                 orderBy:
 *                   type: string
 *                 _id:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 __v:
 *                   type: integer
 *                   format: int32
 *       401:
 *         description: Unauthorized 
 *       400:
 *         description: Bad Request
 */
router.post("/cart", authMiddleware, userCart)

/**
 * @openapi
 * /api/user/applycoupon:
 *   post:
 *     tags:
 *       - User
 *     summary: Apply discount coupon to the order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - coupon
 *             properties:
 *               coupon:
 *                 type: string
 *                 default: DIWALI DISCOUNT
 *     responses:
 *       201:
 *         description: Discount coupon applied successfully
 *         content: 
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 newTotal:
 *                   type: string
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */

/**
 * @openapi
 * /api/user/applycoupon:
 *   post:
 *     tags:
 *       - User
 *     summary: Apply Discount Coupon to the order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coupon:
 *                 type: string
 *                  

 *     responses:
 *       200:
 *         description: Return user orders
 *         content: 
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       404:
 *         description: No refresh token in cookie
 *       400:
 *         description: Bad Request
 */
router.post("/cart/applycoupon", authMiddleware, applyCoupon)
router.post("/cart/cash-order", authMiddleware, createOrder)
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword)
router.put("/update-order/:id", authMiddleware, isAdmin, updateOrderStatus)
router.get("/all-users", getallUser)

/**
 * @openapi
 * /api/user/get-orders:
 *   get:
 *     tags:
 *       - User
 *     summary: Get user orders
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Return user orders
 *         content: 
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       404:
 *         description: No refresh token in cookie
 *       400:
 *         description: Bad Request
 */
router.get("/get-orders", authMiddleware, getOrders)

/**
 * @openapi
 * /api/user/refresh:
 *   get:
 *     tags:
 *       - User
 *     summary: Handle RefreshToken
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Retured access token successfully
 *         content: 
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       404:
 *         description: No refresh token in cookie
 *       400:
 *         description: Bad Request
 */
router.get("/refresh", handleRefreshToken)

/**
 * @openapi
 * /api/user/logout:
 *   get:
 *     tags:
 *       - User
 *     summary: Logout a user
 *     requestBody:
 *       required: false
 *     responses:
 *       204:
 *         description: logout successful
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */
router.get("/logout", logout)

/**
 * @openapi
 * /api/user/cart:
 *   get:
 *     tags:
 *       - User
 *     summary: Get a user cart
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Requested user cart returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           title:
 *                             type: string
 *                           slug:
 *                             type: string
 *                           description:
 *                             type: string
 *                           price:
 *                             type: number
 *                             format: double
 *                           category:
 *                             type: string
 *                           brand:
 *                             type: string
 *                           quantity:
 *                             type: integer
 *                             format: int32
 *                           sold:
 *                             type: integer
 *                             format: int32
 *                           images:
 *                             type: array
 *                             items:
 *                               type: string
 *                           color:
 *                             type: string
 *                           totalrating:
 *                             type: string
 *                           ratings:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 star:
 *                                   type: integer
 *                                   format: int32
 *                                 postedby:
 *                                   type: string
 *                                 _id:
 *                                   type: string
 *                                 comment:
 *                                   type: string
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                           __v:
 *                             type: integer
 *                             format: int32
 *                       count:
 *                         type: integer
 *                         format: int32
 *                       color:
 *                         type: string
 *                       price:
 *                         type: number
 *                         format: double
 *                       _id:
 *                         type: string
 *                 cartTotal:
 *                   type: number
 *                   format: double
 *                 orderBy:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 __v:
 *                   type: integer
 *                   format: int32
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */

router.get("/cart", authMiddleware, getUserCart)


/**
 * @openapi
 * /api/user/wishlist:
 *   get:
 *     tags:
 *       - User
 *     summary: Return wishlist of the user
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Wishlist successfully returned
 *         content: 
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 wishlist: 
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       slug:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *                         format: double
 *                       category:
 *                         type: string
 *                       brand:
 *                         type: string
 *                       quantity:
 *                         type: integer
 *                         format: int32
 *                       sold:
 *                         type: integer
 *                         format: int32
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                       color:
 *                         type: string
 *                       totalrating:
 *                         type: string
 *                       ratings:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             star:
 *                               type: integer
 *                               format: int32
 *                             postedby:
 *                               type: string
 *                             _id:
 *                               type: string
 *                             comment:
 *                               type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                       __v:
 *                         type: integer
 *                         format: int32
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */

router.get("/wishlist", authMiddleware, getWishList)

/**
 * @openapi
 * /api/user/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Get a user by Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the user
 *         schema:
 *          type: string
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Requested user returned successfully
 *         content: 
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 firstname:
 *                   type: string
 *                 lastname:
 *                   type: string
 *                 email:
 *                   type: string
 *                 mobile:
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
router.get("/:id", authMiddleware, isAdmin, getaUser)

/**
 * @openapi
 * /api/user/empty-cart:
 *   delete:
 *     tags:
 *       - User
 *     summary: Empty the cart 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the user
 *         schema:
 *          type: string
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: User Cart Emptied Suceesfully
 *         content: 
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 firstname:
 *                   type: string
 *                 lastname:
 *                   type: string
 *                 email:
 *                   type: string
 *                 mobile:
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
router.delete('/empty-cart', authMiddleware, emptyCart)

/**
 * @openapi
 * /api/user/{id}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete a user by Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the user
 *         schema:
 *          type: string
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Requested user deleted successfully
 *         content: 
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 firstname:
 *                   type: string
 *                 lastname:
 *                   type: string
 *                 email:
 *                   type: string
 *                 mobile:
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
router.delete("/:id", deleteaUser)




/**
 * @openapi
 * /api/user/edit-user:
 *   put:
 *     tags:
 *       - User
 *     summary: Update User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobile:
 *                 type: string
 *                 default: 99999
 *               firstname:
 *                 type: string
 *                 default: rocky1
 *               lastname:
 *                 type: string
 *                 default: last2
 *     responses:
 *       200:
 *         description: Update Successful
 *         content: 
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 firstname:
 *                   type: string
 *                 lastname:
 *                   type: string
 *                 email:
 *                   type: string
 *                 mobile:
 *                   type: string
 *                 _id:
 *                   type: string
 *                 
 *       401:
 *         description: Unauthorized 
 *       400:
 *         description: Bad Request
 */
router.put("/edit-user", authMiddleware, updatedUser)


/**
 * @openapi
 * /api/user/block-user/{id}:
 *   put:
 *     tags:
 *       - User
 *     summary: Block User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the user
 *         schema:
 *          type: string
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: User blocked successfully
 *         content: 
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 
 *       401:
 *         description: Unauthorized 
 *       400:
 *         description: Bad Request
 */
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser)

/**
 * @openapi
 * /api/user/unblock-user/{id}:
 *   put:
 *     tags:
 *       - User
 *     summary: Unblock User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the user
 *         schema:
 *          type: string
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: User unblocked successfully
 *         content: 
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 
 *       401:
 *         description: Unauthorized 
 *       400:
 *         description: Bad Request
 */
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser)

/**
 * @openapi
 * /api/user/save-address:
 *   put:
 *     tags:
 *       - User
 *     summary: Update Delivery Address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address
 *             properties:
 *               address:
 *                 type: string
 *                 default: Canyon Crest Drive Riverside
 *     responses:
 *       200:
 *         description: Delivery Address updated successfully
 *         content: 
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 address:
 *                   type: string
 *                 message:
 *                   type: string
 *                 _id:
 *                   type: string
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */
router.put("/save-address", authMiddleware, saveAddress)


module.exports = router