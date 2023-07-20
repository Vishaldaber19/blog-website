const express = require("express");

const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getSingleBlogController,
  deleteBlogController,
  getUserBlogController,
} = require("../controllers/blogController");

const router = express.Router();

//get all blogs

router.get("/all-blogs", getAllBlogsController);

//Create blog

router.post("/create-blog", createBlogController);

//Update blog

router.put("/update-blog/:id", updateBlogController);

//get single blog

router.get("/get-blog/:id", getSingleBlogController);

//Delete blog

router.delete("/delete-blog/:id", deleteBlogController);

//User blogs

router.get("/user-blogs/:id", getUserBlogController);

module.exports = router;
