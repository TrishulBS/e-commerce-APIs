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
    getUserCart
} = require("../controller/userCtrl")

const {authMiddleware, 
    isAdmin
} = require("../middlewares/authMiddleware")

router.post("/register", createUser)
router.post("/admin-login", loginAdmin)
router.post("/forgot-password-token", forgotPasswordToken)
router.post("/cart", authMiddleware, userCart)
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword)
router.post("/login", loginUserCtrl)
router.get("/all-users", getallUser)
router.get("/refresh", handleRefreshToken)
router.get("/logout", logout)
router.get("/cart", authMiddleware, getUserCart)

router.get("/wishlist", authMiddleware, getWishList)
router.get("/:id", authMiddleware, isAdmin, getaUser)

router.delete("/:id", deleteaUser)
router.put("/edit-user", authMiddleware, updatedUser)
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser)
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser)
router.put("/save-address", authMiddleware, saveAddress)


module.exports = router