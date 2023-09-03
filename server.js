const express = require("express")
const app = express()
const fs = require("fs")
const mysql = require("mysql")

app.set("view engine","pug")
app.use(express.static("views"))

let con = mysql.createConnection({
    host: "localhost",
    user: "divyansh",
    password: "divyansh@mysql"
  });

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  

function home(req,res)
{
    con.query("SHOW DATABASES",(e,r)=>{
        console.log(r,e);
        res.render("index")
    })
}

function add_user(req,res)
{
    res.render("add")
}
app.get("/",home)
app.get("/add_user",add_user)

app.listen(8080)