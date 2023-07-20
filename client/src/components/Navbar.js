import React, { useState, useRef } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  //global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = localStorage?.getItem("userId") ? true : false;

  const width = useRef(window.innerWidth);

  const isMobile = width.current < 600 ? true : false;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state
  const [value, setValue] = useState(0);

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundImage: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
          paddingTop: "5px",
        }}
      >
        <Toolbar>
          <Typography
            variant="h4"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Blogs{" "}
            <RssFeedRoundedIcon fontSize="30px" sx={{ marginTop: "3px" }} />
          </Typography>
          {!isMobile && isLogin && (
            <>
              <Box display={"flex"} marginLeft="auto">
                <Tabs
                  textColor="inherit"
                  value={value}
                  onChange={(e, value) => setValue(value)}
                >
                  <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                  <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                  <Tab
                    label="Create Blog"
                    LinkComponent={Link}
                    to="/create-blog"
                  />
                </Tabs>
              </Box>
            </>
          )}
          <Box display={"flex"} marginLeft="auto">
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
            {!isMobile && isLogin && (
              <Button onClick={handleLogout} sx={{ margin: 1, color: "white" }}>
                Logout
              </Button>
            )}
          </Box>
          {isMobile && isLogin && <HamburgerMenu />}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
