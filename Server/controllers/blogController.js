const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

//get all blogs

const getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    return res.status(201).send({
      blogsCount: blogs.length,
      message: "All blogs data",
      success: true,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in getAllBlog Callback",
      success: false,
    });
  }
};

//create blog

const createBlogController = async (req, res) => {
  try {
    const { title, description, image, author } = req.body;

    //Validation
    if (!title || !description || !image || !author) {
      return res.status(400).send({
        message: "Please Fill all fields",
        status: false,
      });
    }
    const existingUser = await userModel.findById(author);
    if (!existingUser) {
      return res.status(404).send({
        message: "unable to find user",
        success: false,
      });
    }
    console.log("before session");
    const newBlog = new blogModel({ title, description, image, author });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();

    await newBlog.save();
    return res.status(201).send({
      message: "New blog created ",
      success: true,
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in createBlog Callback",
      success: false,
    });
  }
};

// Get single Blog

const getSingleBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        message: "Blog not found with this id",
        success: false,
      });
    }
    return res.status(201).send({
      message: "Your Blog found",
      success: true,
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: " Error in single blog controller",
      success: false,
      error,
    });
  }
};

// Update Blog

const updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(201).send({
      message: "Blog updated",
      success: true,
      updatedBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in update blod controller",
      success: false,
    });
  }
};

// delete blog

const deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBlog = await blogModel.findByIdAndDelete(id).populate("author");
    await deleteBlog.author.blogs.pull(deleteBlog);
    await deleteBlog.author.save();
    return res.status(201).send({
      message: "Blog deleted!",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "error while deleting blog",
      success: false,
    });
  }
};

//User Blogs

const getUserBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const userBlog = await userModel.findById(id).populate("blogs");
    if (!userBlog) {
      return res.status(404).send({
        message: "Blog not found with this id",
        success: false,
      });
    }
    return res.status(201).send({
      blogsCount: userBlog.blogs.length,
      message: "User Blogs",
      success: true,
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: " Error in single blog controller",
      success: false,
      error,
    });
  }
};

module.exports = {
  getAllBlogsController,
  createBlogController,
  getSingleBlogController,
  updateBlogController,
  deleteBlogController,
  getUserBlogController,
};
