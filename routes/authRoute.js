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
router.post("/cart", authMiddleware, userCart)
router.post("/cart/applycoupon", authMiddleware, applyCoupon)
router.post("/cart/cash-order", authMiddleware, createOrder)
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword)
router.put("/update-order/:id", authMiddleware, isAdmin, updateOrderStatus)
router.get("/all-users", getallUser)
router.get("/get-orders", authMiddleware, getOrders)
router.get("/refresh", handleRefreshToken)
router.get("/logout", logout)
router.get("/cart", authMiddleware, getUserCart)

router.get("/wishlist", authMiddleware, getWishList)
router.get("/:id", authMiddleware, isAdmin, getaUser)
router.delete('/empty-cart', authMiddleware, emptyCart)
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