const express = require("express")
const {createCoupon, getallCoupon, updateCoupon, deleteCoupon,
} = require("../controller/couponCtrl")
const router = express.Router()

const {authMiddleware, 
    isAdmin
} = require("../middlewares/authMiddleware")

/**
 * @openapi
 * /api/coupon/:
 *   post:
 *     tags:
 *       - Coupon
 *     summary: Add a new discount coupon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - expiry
 *               - discount
 *             properties:
 *               name:
 *                 type: string
 *                 default: Diwali
 *               expiry:
 *                 type: date
 *                 default: "01-01-2024"
 *               discount:
 *                 type: number
 *                 default: 100          
 *     responses:
 *       201:
 *         description: New Discount coupon created
 *         content: 
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 expiry:
 *                   type: date
 *                 discount:
 *                   type: number
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
router.post("/", authMiddleware, isAdmin, createCoupon);
router.get("/", authMiddleware, isAdmin, getallCoupon)
router.put("/:id", authMiddleware, isAdmin, updateCoupon)
router.delete("/:id", authMiddleware, isAdmin, deleteCoupon)

module.exports = router

