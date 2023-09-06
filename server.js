const fs                = require("fs")    
const jwt               = require('jsonwebtoken');
const smtp              = require('smtp-protocol')
const mysql             = require("mysql")
const crypto            = require('crypto');
const express           = require("express") 
const { log }           = require("console")
const nodemailer        = require('nodemailer');
const bodyParser        = require("body-parser")
const cookieParser      = require("cookie-parser")
const session           = require('express-session')

const app = express()

function generateSecureId(length = 16) {
    if (length <= 0 || typeof length !== 'number') {
        throw new Error('Invalid length for secure ID'); 
    }
    
    const bytes = crypto.randomBytes(Math.ceil(length / 2));
    return bytes.toString('hex').slice(0, length);
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'divyuzzzzzz@gmail.com',
      pass: 'shdigfnkkbxuupvf'
    }
});

app.use(cookieParser());
app.use(bodyParser.json());
app.set("view engine", "pug")
app.use(express.static("views"))
app.use(bodyParser.urlencoded({extended: true,}),);
app.use(session({secret:generateSecureId(64),saveIuninitialized:true,cookie : {maxAge:1000*60*60*3},resave:false}))

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
app.get("/fetch", fetch)
app.get("/login", login)
app.post("/login", login)
app.post("/add", add_user)
app.get("/donate", donate)
app.post("/donate", donate) 
app.get("/singout", singout)
app.get("/patient", patient)
app.post("/patient", patient)
app.get("/add_user", add_user)

app.listen(8080)


function fetch(req,res)
{
    con.query("SELECT * FROM patient",(e,r)=>{
        if(e)
        return;
        log(r)
        res.json(r)
        
    });
}

function login(req,res)
{   
    if(req.method == "POST")
    {   
        let host  = (req.rawHeaders[1])
        let UNID  = req.body.UNID
        let email = req.body.email
        let token = jwt.sign({ login: 'true', key: generateSecureId() }, generateSecureId(128));
        
        const mailOptions = {
            from: 'divyuzzzzzz@gmail.com',
            to: `${email}`,
            subject: 'Verificatiion',
            html: ` 
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            </head>
            <body>
            <h1>Save A Life | Verification</h1>
            <a href = 'http://${host}/t?token=${token}&UNID=${UNID}'>Verify</a>
            </body>
            </html>`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                req.session.UNID = UNID
                req.session.token = token
            }
          });
  
    }

    res.render("login")
}

function singout(req,res)
{
    res.clearCookie('login')
    res.render("singout")
}

function home(req, res) {
    log(req.session)
    con.query("SELECT * FROM profile;", (e, r) => {
        console.log(r, e);
        res.render("index")
    }) 
} 

function add_user(req, res) {
    if (req.method == "POST") {
        let body = req.body
        let unid = generateSecureId(32)
        let sql = `INSERT INTO profile VALUES('${body.name}' , '${body.city}','${body.contact}' , '${unid}','false');`
        log(sql)
        con.query(sql,(e,r)=>{
            log(e,r)
            res.render("login")
        })
    }
    else
    res.render("add")
}   

function donate(req,res)
{
    if(req.method == "POST")
    {   

    }
        // return;
        body = req.body
        sql = `INSERT INTO donor VALUES('${body.UNID}','${body.blood_group}','${body.age}','${body.gender}')`
        con.query(sql,(e,r)=>{
            log(e,r)
            
        })
    res.render("donate")
}


function patient(req,res)
{
    body = req.body
    sql = `INSERT INTO patient VALUES('${body.UNID}','${body.blood_group}','${body.age}','${body.gender}')`
    con.query(sql,(e,r)=>{
        log(e,r)
    })
    res.render("patient")//ppo
}