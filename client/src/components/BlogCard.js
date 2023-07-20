import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";

export default function BlogCard({
  title,
  description,
  image,
  author,
  time,
  isUser,
  id,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/blog/delete-blog/${id}`);
      if (data?.success) {
        toast.success("Blog Deleted");
        navigate("/my-blogs");
        dispatch(authActions.deleted());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card
      sx={{
        maxWidth: "350px",
        maxHeight: "400px",
        marginBottom: "10px",
        marginLeft: "30px",
        padding: 2,
        border: "1px solid black",
        boxShadow: "5px 5px 10px #ccc",
      }}
    >
      {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <ModeEditIcon />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: green[500] }}>
            {author.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={author}
        subheader={time}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Image not found"
      />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          Title : {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description : {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
