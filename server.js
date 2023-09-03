const { log }    = require("console")
const express    = require("express")
const app        = express()
const mysql      = require("mysql")
const fs         = require("fs")
const bodyParser = require("body-parser")

app.set("view engine", "pug")
app.use(express.static("views"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true,}),);

let con = mysql.createConnection({
    host: "localhost",
    user: "divyansh",
    password: "divyansh@mysql"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


app.get("/", home)
app.get("/add_user", add_user)
app.post("/add", add_user)

app.listen(8080)

function home(req, res) {
    con.query("SHOW DATABASES", (e, r) => {
        console.log(r, e);
        res.render("index")
    })
}

function add_user(req, res) {

    if (req.method == "POST") {
        log(req.body)
    }

    res.render("add")
}   