const express = require("express")
const router = express.Router()


const {isAdmin, authMiddleware} = require("../middlewares/authMiddleware")

const {
    createBlog, 
    updateBlog,
    getBlog,
    getallBlogs,
    deleteBlog,
    liketheBlog,
    disliketheBlog,
} = require("../controller/blogCtrl")


router.post("/", authMiddleware, isAdmin, createBlog)
router.put("/likes", authMiddleware, liketheBlog)
router.put("/dislikes", authMiddleware, disliketheBlog)
router.put("/:id", authMiddleware, isAdmin, updateBlog)
router.get("/:id", getBlog)
router.get("/", getallBlogs)
router.delete("/:id", deleteBlog)

module.exports = router