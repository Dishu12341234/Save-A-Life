const fs                = require("fs")    
const mysql             = require("mysql")
const crypto            = require('crypto');
const { log }           = require("console")
const express           = require("express")
const bodyParser        = require("body-parser")
const jwt               = require('jsonwebtoken');
const cookieParser      = require("cookie-parser")
const app = express()

function generateSecureId(length = 16) {
    if (length <= 0 || typeof length !== 'number') {
        throw new Error('Invalid length for secure ID');
    }
    
    const bytes = crypto.randomBytes(Math.ceil(length / 2));
    return bytes.toString('hex').slice(0, length);
}

app.use(cookieParser());
app.use(bodyParser.json());
app.set("view engine", "pug")
app.use(express.static("views"))
app.use(bodyParser.urlencoded({extended: true,}),);

let con = mysql.createConnection({
    host: "localhost",
    user: "divyansh",
    password: "divyansh@mysql"
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("USE SAL;");
});

app.get("/", home)
app.get("/add_user", add_user)
app.post("/add", add_user)
app.get("/donate", donate)
app.post("/donate", donate) 
app.get("/patient", patient)
app.post("/patient", patient)

app.listen(8080)

function home(req, res) {
    con.query("SELECT * FROM profile;", (e, r) => {
        console.log(r, e);
        res.render("index")
    }) 
} 

function add_user(req, res) {
    if (req.method == "POST") {
        let body = req.body
        let unid = generateSecureId(32)
        let sql = `INSERT INTO profile VALUES('${body.name}' , '${body.city}','${body.contact}' , '${unid}');`
        log(sql)
        con.query(sql,(e,r)=>{
            log(e,r)
            if(!e)
            {
                var token = jwt.sign({ login: 'true' }, generateSecureId(),{expiresIn:10});
                res.cookie("login",token)
                res.render("add")
            }
        })
    }
    else
    res.render("add")
}   

function donate(req,res)
{
    if(req.method == "POST")
    {   
        let login_;
        try {
            login_ = jwt.decode(req.cookies.login)['login']
        } catch (error) {
            if(error.message == "Cannot read properties of null (reading 'login')")
            {
                res.redirect('/add_user')
            }
        }

        // return;
        body = req.body
        sql = `INSERT INTO donor VALUES('${body.UNID}','${body.blood_group}','${body.age}','${body.gender}')`
        con.query(sql,(e,r)=>{
            log(e,r)

        })
    }
    res.render("donate")
}


function patient(req,res)
{
    if(req.method == "POST")
    {
        body = req.body
        sql = `INSERT INTO patient VALUES('${body.UNID}','${body.blood_group}','${body.age}','${body.gender}')`
        con.query(sql,(e,r)=>{
            log(e,r)
        })
    }
    res.render("patient")//ppo
}