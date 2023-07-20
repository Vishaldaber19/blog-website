import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { authActions } from "../redux/store";

export default function MenuPopupState() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Options
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem
              onClick={() => {
                navigate("/blogs");
                popupState.close();
              }}
            >
              Blogs
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/my-blogs");
                popupState.close();
              }}
            >
              My Blogs
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/create-blog");
                popupState.close();
              }}
            >
              Create Blog
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleLogout();
                popupState.close();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
