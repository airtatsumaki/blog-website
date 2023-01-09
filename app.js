import express from "express";
//__dirname for esm 
// import path from "path";
// import {fileURLToPath} from "url";
import lowerCase from "lodash/lowerCase.js";
import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
mongoose.set('strictQuery', true);

const app = express();
// instead of body-parser
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static("public"));

const url = "mongodb+srv://naz:" + process.env.PASSWORD + "@cluster0.lgbc6oy.mongodb.net/blogsitev2";
try {
  await mongoose.connect(url);
} catch (error) {
  console.log(error);
}

const blogsSchema = new mongoose.Schema({
  title : {type: String, required: true, },
  body : {type: String, required: true}
});
const Blog = mongoose.model("Blog", blogsSchema);

const homeStartingContent = "HOME - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent = "ABOUT - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id faucibus nisl tincidunt eget nullam non nisi est. Tortor at auctor urna nunc id. Risus feugiat in ante metus dictum at tempor commodo ullamcorper. Odio morbi quis commodo odio aenean sed adipiscing diam donec. Nam aliquam sem et tortor consequat id porta nibh. Facilisi morbi tempus iaculis urna id. Ut porttitor leo a diam sollicitudin tempor id. Tristique sollicitudin nibh sit amet. Et odio pellentesque diam volutpat commodo sed egestas egestas. Consequat id porta nibh venenatis cras sed. Nibh sed pulvinar proin gravida hendrerit. Non odio euismod lacinia at. Platea dictumst vestibulum rhoncus est. Eros in cursus turpis massa tincidunt dui ut ornare lectus. Condimentum id venenatis a condimentum vitae sapien pellentesque. Elementum nibh tellus molestie nunc. Vivamus at augue eget arcu dictum varius duis at consectetur. Nullam eget felis eget nunc.";
const contactContent = "CONTACT - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Sed velit dignissim sodales ut. Pellentesque habitant morbi tristique senectus et netus. Nibh sed pulvinar proin gravida hendrerit. Velit egestas dui id ornare arcu odio. Adipiscing elit pellentesque habitant morbi tristique senectus et netus. Aliquet enim tortor at auctor urna nunc id. Tortor consequat id porta nibh venenatis cras sed. Consequat ac felis donec et odio pellentesque diam volutpat. Elit at imperdiet dui accumsan sit amet nulla facilisi morbi. Orci porta non pulvinar neque laoreet suspendisse. Cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla. Id leo in vitae turpis massa sed elementum tempus. Ornare lectus sit amet est placerat. Maecenas accumsan lacus vel facilisis volutpat est velit. Urna nec tincidunt praesent semper feugiat nibh. Quis ipsum suspendisse ultrices gravida dictum fusce ut. Id semper risus in hendrerit gravida rutrum quisque.";

app.get("/", async (req, res) => {
  try {
    const posts = await Blog.find();
    res.render("home", {content: posts ? posts : [{"title": "Home", "body": homeStartingContent}]});
  } catch (error) {
    console.log(error);
  }
});

app.get("/about", (req, res) => {
  res.render("about", {content: aboutContent});
});

app.get("/contact", (req, res) => {
  res.render("contact", {content: contactContent});
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", async (req, res) => {
  try {
    const blogTitle = req.body.title;
    const blogBody = req.body.postBody;
    const newPost = new Blog({title: blogTitle, body: blogBody});
    await newPost.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

app.get("/posts/:postTitle", async (req, res) => {
  try {
    const postContent = {"title": "No Post found", "body": ""};
    const postTitle = req.params.postTitle;
    const result = await Blog.findOne({title: postTitle});
    res.render("post", {content : (result ? result : postContent)});
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running on port 3000"));