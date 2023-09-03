const express = require("express")
const app = express()
const fs = require("fs")

app.set("view engine","pug")

function home(req,res)
{
    res.render("index")
}

app.get("/",home)

app.listen(8080)