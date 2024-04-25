import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

// const db = new pg.Client({
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: process.env.PG_PORT,
// });
// db.connect();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("homepage.ejs");
    console.log("Success");
});

app.get("/about",(req,res)=>{
  res.render( "about.ejs" );
});

app.get("/features",(req,res)=>{
  res.render( "features.ejs" );
});


app.get("/sip",async(req,res)=>{
  res.render("sip.ejs");
  
  console.log("sip");
});

app.get("/fd",async(req,res)=>{
  res.render("fd.ejs");
  
  console.log("fd");
});


app.get("/stepup-sip",async(req,res)=>{
  res.render("stepup-sip.ejs");
  
  console.log("step up sip");
});

app.get("/compound",async(req,res)=>{
  res.render("compound.ejs");
  
  console.log("Compound");
});

app.get("/lumpsum",async(req,res)=>{
  res.render("lumpsum.ejs");
  
  console.log("lumpsum");
});

app.get("/coming",async(req,res)=>{
  res.render("coming.ejs");
  
  console.log("coming");
});

app.get("/ppf",async(req,res)=>{
  res.render("ppf.ejs");
  
  console.log("lumpsum");
});

app.get("/home-loan",async(req,res)=>{
  res.render("home-loan.ejs");
  
  console.log("lumpsum");
});

app.get("/ssy",async(req,res)=>{
  res.render("ssy.ejs");
  
  console.log("ssy");
});


app.get("/gst",async(req,res)=>{

  res.render("gst.ejs");
  console.log("gst");
});

app.get("/signup",(req,res)=>{
  res.render("signup.ejs");
});

app.post("/signup", async (req, res) =>{
  const email = req.body.email;
  const password = req.body.password;
  await  db.query("INSERT INTO users (email, password) VALUES ($1,$2)",[email,password]);
  console.log("Signup successful");
  res.redirect("/");
});

app.get("/login",(req,res)=>{
  res.render("login.ejs");
});

app.post("/login", async (req, res) =>{
  const useremail = req.body.email;
  const password = req.body.password;
  
  const result = await  db.query("SELECT * FROM users WHERE email=$1",[useremail]);
  if(result.rowCount != 0)
  {
    if(result.rows[0].password === password)
    {
      console.log(result.rows);
      console.log("Login succesful");
      res.redirect("/");
    }else{
      console.log("Password is wrong");
      res.redirect("/login");
    }
  }
  else{
    console.log("Email does Not exist in database");
    res.redirect("/login");
  }
  
});


app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
});