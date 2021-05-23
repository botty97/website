const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const blogPost = require("./models/blogpost");

mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true });

const app = express();
const ejs = require("ejs");
app.set("view engine", "ejs");
const port = 3112;

app.use(express.static("public"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", async (req, res) => {
  const blogposts = await blogPost.find({});
  console.log(blogposts);
  res.render("index", {
    blogposts,
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/post/:id", async (req, res) => {
  const blogpost = await blogPost.findById(req.params.id);
  res.render("post", blogpost);
});

app.get("/posts/new", (req, res) => {
  res.render("create");
});

app.post("/posts/store", async (req, res) => {
  console.log(req.body);
  await blogPost.create(req.body);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
