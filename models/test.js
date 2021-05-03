const mongoose = require("mongoose");
const blogPost = require("./blogpost");

mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true });

blogPost.create(
  {
    title: "The Random Text here",
    body: "Even more random text here to keep everything looking good",
  },
  (error, blogPost) => {
    console.log(error, blogPost);
  }
);

blogPost.find({}, (error, blogPost) => {
  console.log(error, blogPost);
});

blogPost.find(
  {
    title: /The/,
  },
  (error, blogPost) => {
    console.log(error, blogPost);
  }
);
