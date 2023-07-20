import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
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
      const { data } = await axios.post("/api/user/login", {
        email: input.email,
        password: input.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success("User Login Successfully");
        navigate("/blogs");
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
            Login
          </Typography>
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
            Login
          </Button>
          <Button
            onClick={() => navigate("/register")}
            sx={{ marginTop: 3, borderRadius: 5 }}
          >
            Not a User ? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
