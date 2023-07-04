require("dotenv").config();
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const mongoose = require("mongoose");

//Custom Routes
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

//Rest Object
const app = express();

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.status(200).send({
    Status: "Working",
  });
});

app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);

//Port

const PORT = process.env.PORT || 8080;

//listen
app.listen(8080, () => {
  console.log(`Server Started On port http://localhost:${PORT}`.gray);
});

//DB connect
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("DB connected successfully".green);
  })
  .catch(() => {
    console.log("DB connection failed".red);
    console.log(err);
    process.exit(1);
  });
