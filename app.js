import express from "express";
//__dirname for esm 
import path from "path";
import {fileURLToPath} from "url";
import lowerCase from "lodash/lowerCase.js";
const app = express();
// instead of body-parser
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const homeStartingContent = "HOME - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent = "ABOUT - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id faucibus nisl tincidunt eget nullam non nisi est. Tortor at auctor urna nunc id. Risus feugiat in ante metus dictum at tempor commodo ullamcorper. Odio morbi quis commodo odio aenean sed adipiscing diam donec. Nam aliquam sem et tortor consequat id porta nibh. Facilisi morbi tempus iaculis urna id. Ut porttitor leo a diam sollicitudin tempor id. Tristique sollicitudin nibh sit amet. Et odio pellentesque diam volutpat commodo sed egestas egestas. Consequat id porta nibh venenatis cras sed. Nibh sed pulvinar proin gravida hendrerit. Non odio euismod lacinia at. Platea dictumst vestibulum rhoncus est. Eros in cursus turpis massa tincidunt dui ut ornare lectus. Condimentum id venenatis a condimentum vitae sapien pellentesque. Elementum nibh tellus molestie nunc. Vivamus at augue eget arcu dictum varius duis at consectetur. Nullam eget felis eget nunc.";
const contactContent = "CONTACT - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Sed velit dignissim sodales ut. Pellentesque habitant morbi tristique senectus et netus. Nibh sed pulvinar proin gravida hendrerit. Velit egestas dui id ornare arcu odio. Adipiscing elit pellentesque habitant morbi tristique senectus et netus. Aliquet enim tortor at auctor urna nunc id. Tortor consequat id porta nibh venenatis cras sed. Consequat ac felis donec et odio pellentesque diam volutpat. Elit at imperdiet dui accumsan sit amet nulla facilisi morbi. Orci porta non pulvinar neque laoreet suspendisse. Cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla. Id leo in vitae turpis massa sed elementum tempus. Ornare lectus sit amet est placerat. Maecenas accumsan lacus vel facilisis volutpat est velit. Urna nec tincidunt praesent semper feugiat nibh. Quis ipsum suspendisse ultrices gravida dictum fusce ut. Id semper risus in hendrerit gravida rutrum quisque.";
let posts = [{"title": "Home", "body": homeStartingContent}];

app.get("/", (req, res) => {
  res.render("home", {content: posts});
});

app.get("/about", (req, res) => {
  res.render("about", {content: aboutContent});
});

app.get("/contact", (req, res) => {
  res.render("contact", {content: contactContent});
});

app.get("/compose", (req, res) => {
  res.render("compose");
})

app.get("/posts/:postTitle", (req, res) => {
  // console.log(req.params.postTitle);
  let postContent = {"title": "No Post found", "body": ""};
  posts.forEach((item) => {
    if(lowerCase(item.title) === lowerCase(req.params.postTitle))
    {
      postContent = item;
    }
  });
  res.render("post", {content : postContent});
})

app.post("/compose", (req, res) => {
  // console.log(req.body);
  const post = {"title": req.body.title, "body": req.body.postBody};
  // console.log(post);
  posts.push(post);
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running on port 3000"));