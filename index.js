const express = require("express");
const app = express();

const cors = require("cors");
const port = 8000;

const { connectDb } = require("./connection");
const BlogPost = require("./module/blogpost");


// middlewares
app.use(express.json());
app.use(cors());

// connect database
connectDb();

//routes
app.post("/post-blog", async (req, res) => {
  let blog = new BlogPost({
    title: req.body.title,
    description: req.body.description,
  });
  await blog.save();
  res.status(200).json({ message: "post saved", blog });
});

app.get("/get-blogs", async (req, res) => {
  let blogs = await BlogPost.find();
  if (!blogs) {
    res.status(404).json({ message: "No blogs found..." });
  }
  res.json({ blogs });
});

app.delete("/delete-blog/:id", async (req, res) => {
  let blog = await BlogPost.findByIdAndDelete(req.params.id);
  if (!blog) {
    res.status(404).json({ message: "No blog found" });
  }
  res.status(200).json({ message: "deleted your blog" });
});

//  n

app.put("/update-blog/:id", async (req, res) => {
  const { title, description } = req.body;
  let blog = await BlogPost.findByIdAndUpdate(req.params.id);

  if (!title && !description) {
    res.status(404).json({ message: "No blog found..." });
  } else if (!title) {
    blog.description = description;
  } else if (!description) {
    blog.title = title;
  } else {
    blog.title = title;
    blog.description = description;
  }
});

// listen server
app.listen(port, () => {
  console.log("Server is runningg to the port 8000");
});
