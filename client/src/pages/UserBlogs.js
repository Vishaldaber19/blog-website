import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Grid } from "@mui/material";
import LoadingSpinner from "../Utils/LoadingSpinner";
import { authActions } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";

const UserBlogs = () => {
  const isdeleted = useSelector((state) => state.isdeleted);
  const dispatch = useDispatch();

  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState({});
  const [loading, setLoding] = useState(false);
  const getAllUserBlogs = async () => {
    try {
      setLoding(true);
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/blog/user-blogs/${id}`);
      if (data?.success) {
        setUsername(data?.userBlog.username);
        setBlogs(data?.userBlog.blogs);
      }
      dispatch(authActions.notDeleted());
      setLoding(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUserBlogs();
  }, [isdeleted]);
  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Grid
          sx={{ paddingLeft: "10px", paddingRight: "20px", marginTop: "20px" }}
          container
          spacing={4}
          justifyContent={"center"}
        >
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog._id}>
                <BlogCard
                  id={blog?._id}
                  isUser={true}
                  title={blog?.title}
                  description={blog?.description}
                  image={blog?.image}
                  author={username}
                  time={blog?.createdAt}
                />
              </Grid>
            ))
          ) : (
            <h1 style={{ textAlign: "center", marginTop: "10px" }}>
              You haven't created any Blog
            </h1>
          )}
        </Grid>
      )}
    </div>
  );
};

export default UserBlogs;
