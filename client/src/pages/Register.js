import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/user/register", {
        username: input.username,
        email: input.email,
        password: input.password,
      });
      if (res.data.success) {
        toast.success("User Register Successfully");
        navigate("/login");
      }
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
            Register
          </Typography>
          <TextField
            placeholder="username"
            name="username"
            value={input.username}
            onChange={handleChange}
            margin="normal"
            type="text"
            required
          />
          <TextField
            placeholder="email"
            name="email"
            value={input.email}
            onChange={handleChange}
            margin="normal"
            type="email"
            required
          />
          <TextField
            placeholder="password"
            name="password"
            value={input.password}
            onChange={handleChange}
            margin="normal"
            type="password"
            required
          />
          <Button
            type="submit"
            sx={{ marginTop: 3, borderRadius: 5 }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/login")}
            sx={{ marginTop: 3, borderRadius: 5 }}
          >
            Already Registered ? Please Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
