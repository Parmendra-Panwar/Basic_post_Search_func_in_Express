const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
//uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const methodOverride = require("method-override");
//--------------------------------------------
//-------------------------------------------
const multer = require('multer');
const storage =multer.diskStorage({
  destination: ( req , file , cb )=>{
    cb(null, 'public/uploads')
  },
  filename:(req, file, cb)=>{
    //console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({storage: storage});
//---------------------------------------------
//---------------------------------------------
app.use(express.urlencoded({extended: true})); //for post req. data con
app.use(express.static('pubic'));
app.use(express.static(path.join(__dirname,"public"))); //seting the path for public 
app.use(methodOverride("_method"));
//-----
app.use(express.static(path.join(__dirname,'image')));
//--------------------------------------------
app.set("view engine", "ejs"); //seting view file to view engine 
app.set("views", path.join(__dirname,"views")); //seting the path of view
//---------------------------------------------
//---------------------------------------------


let posts =[
  {
    id: uuidv4(),
    username : "paras",
    content : " i love coding"
  },
  {
    id: uuidv4(),
    username : "paras2",
    content : " i love coding2"
  },
  {
    id: uuidv4(),
    username : "paras3",
    content : " i love coding3"
  }, {
    id: uuidv4(),
    username : "paras",
    content : " i love coding"
  },
  {
    id: uuidv4(),
    username : "paras2",
    content : " i love coding2"
  },
  {
    id: uuidv4(),
    username : "paras3",
    content : " i love coding3"
  }, {
    id: uuidv4(),
    username : "paras",
    content : " i love coding"
  },
  {
    id: uuidv4(),
    username : "paras2",
    content : " i love coding2"
  },
  {
    id: uuidv4(),
    username : "paras3",
    content : " i love coding3"
  }, {
    id: uuidv4(),
    username : "paras",
    content : " i love coding"
  },
  {
    id: uuidv4(),
    username : "paras2",
    content : " i love coding2"
  },
  {
    id: uuidv4(),
    username : "paras3",
    content : " i love coding3"
  },
]

//----
app.get("/posts", (req,res) =>{
  res.render("index.ejs", {posts});
  //  res.send("Done");  test check
});;

app.get("/posts/new" ,(req,res) =>{
  res.render("new.ejs");
});

app.post("/posts",(req,res) =>{
  //console.log(req.body);
  let {username, content} =req.body;
  let id = uuidv4();
  posts.unshift({ id , username , content});
  res.redirect("/posts");
  //res.send("post request working");
});

app.get("/posts/:id", (req,res) => {
  let {id} = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs",{post});
  //console.log(id);
  //res.send("req working");
});

app.patch("/posts/:id",(req,res) =>{
  let {id} = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  console.log(post); 
  //console.log(id);
  //res.send("done");
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req,res)=>{
  let {id} = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs",{post});
});

app.delete("/posts/:id", (req,res) =>{
  let {id} = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});
//--------------------------------------------------
//--------------------------------------------------
app.get("/upload",(req,res) =>{
  res.render("upload.ejs");
});
/*
app.post("/upload", upload.single("image") ,(req,res)=>{
  //res.send("image mil gai");
  const imagePath = req.file.path;
  res.redirect("/posts");
});
*/
app.post('/upload', upload.single('image'), (req, res) => {
  // Handle the uploaded file here
  const imagePath = req.file.path;
  res.json({ imagePath: imagePath });
});
//--------------------------------------------------
//--------------------------------------------------

app.get("/search", (req,res) => {
  let {userName} = req.query;
  let post = posts.find((p) => userName === p.username);
  //console.log(post);
  res.render("search.ejs",{post});
});

//--------------------------------------------------
app.listen(port, () =>{
  console.log("listening to port : 8080");
});