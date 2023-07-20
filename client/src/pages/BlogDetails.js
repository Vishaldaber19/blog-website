import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button, InputLabel } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const BlogDetails = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const [input, setInput] = useState({});

  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`/api/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInput({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogDetail();
  }, [id]);

  const handleChange = (e) => {
    setInput((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/blog/update-blog/${id}`, {
        title: input.title,
        description: input.description,
        imageUrl: input.imageUrl,
      });
      if (data?.success) {
        toast.success("Blog Updated");
        navigate("/my-blogs");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection={"column"}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign="center"
          >
            Update Blog
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={input.title}
            onChange={handleChange}
            margin="normal"
            type="text"
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={input.description}
            onChange={handleChange}
            margin="normal"
            type="text"
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="imageUrl"
            value={input.image}
            onChange={handleChange}
            margin="normal"
            type="text"
          />
          <Button
            type="submit"
            sx={{ marginTop: 3, borderRadius: 5 }}
            variant="contained"
            color="warning"
          >
            Update
          </Button>
        </Box>
      </form>
    </>
  );
};

export default BlogDetails;
