import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import LoadingSpinner from "../Utils/LoadingSpinner";
import { Grid } from "@mui/material";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoding] = useState(false);

  const getAllBlogs = async () => {
    try {
      setLoding(true);
      const { data } = await axios.get("/api/blog/all-blogs");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
      setLoding(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Grid
          sx={{ paddingLeft: "20px", paddingRight: "20px", marginTop: "20px" }}
          container
          spacing={4}
          justifyContent={"center"}
        >
          {blogs &&
            blogs.map((blog) => (
              <Grid items key={blog._id}>
                <BlogCard
                  id={blog?._id}
                  isUser={localStorage.getItem("userId") === blog?.author?._id}
                  title={blog?.title}
                  description={blog?.description}
                  image={blog?.image}
                  author={blog?.author?.username}
                  time={blog?.createdAt}
                />
              </Grid>
            ))}
        </Grid>
      )}
    </div>
  );
};

export default Blogs;
