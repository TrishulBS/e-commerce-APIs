const express = require("express")
const {createCoupon, getallCoupon, updateCoupon, deleteCoupon,
} = require("../controller/couponCtrl")
const router = express.Router()

const {authMiddleware, 
    isAdmin
} = require("../middlewares/authMiddleware")

router.post("/", authMiddleware, isAdmin, createCoupon);
router.get("/", authMiddleware, isAdmin, getallCoupon)
router.put("/:id", authMiddleware, isAdmin, updateCoupon)
router.delete("/:id", authMiddleware, isAdmin, deleteCoupon)

module.exports = router

