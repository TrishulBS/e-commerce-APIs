const express = require("express");
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getallBrand,
} = require("../controller/brandCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

/**
 * @openapi
 * /api/brand/:
 *   post:
 *     tags:
 *       - Brand
 *     summary: Add a new brand
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
 *         description: New Brand is created
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
router.post("/", authMiddleware, isAdmin, createBrand);
router.put("/:id", authMiddleware, isAdmin, updateBrand);
router.delete("/:id", authMiddleware, isAdmin, deleteBrand);
router.get("/:id", getBrand);
router.get("/", getallBrand);

module.exports = router;