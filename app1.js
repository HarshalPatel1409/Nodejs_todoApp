// 1. API and Params
import express from "express";
import mongoose from "mongoose";
const app = express();

// middleware
// always use this at the top
app.use(express.json());

// Connecting db
mongoose
  .connect("mongodb://0.0.0.0:27017/", {
    dbName: "backendapi",
  })
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));

//   Defining Schema
const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// defining the model(user collection)
const User = mongoose.model("User", schema);

app.get("/", (req, res) => {
  res.send("Working");
});

// API to get all users data
app.get("/users/all", async (req, res) => {
  const users = await User.find({});

  const keyword = req.query.keyword;
  console.log(keyword);

  res.json({
    success: true,
    users,
  });
});

// API to set the users
app.post("/users/new", async (req, res) => {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });

  res.status(201).cookie("temp", "lol").json({
    success: true,
    message: "Registered Successfully",
  });
});

// Static Routing
app.get("/userid/special", (req, res) => {
  res.json({
    success: true,
    message: "Just for Testing",
  });
});

// Dynamic Routing
// after the '/userid' everything is considered as id
app.get("/userid/:id", async (req, res) => {
  // const { id } = req.body;       // if you want to get id from body
  // const id = req.query.id;          // if you want to get id from params(query)
  const { id } = req.query;
  const user = await User.findById(id);

  // console.log(req.params);
  res.json({
    success: true,
    user,
  });
});

app.listen(5000, () => {
  console.log("Server is working");
});
