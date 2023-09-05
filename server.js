const fs                = require("fs")    
const mysql             = require("mysql")
const crypto            = require('crypto');
const { log }           = require("console")
const express           = require("express")
const bodyParser        = require("body-parser")
const jwt               = require('jsonwebtoken');
const cookieParser      = require("cookie-parser")
const nodemailer        = require('nodemailer');

const app = express()

function generateSecureId(length = 16) {
    if (length <= 0 || typeof length !== 'number') {
        throw new Error('Invalid length for secure ID');
    }
    
    const bytes = crypto.randomBytes(Math.ceil(length / 2));
    return bytes.toString('hex').slice(0, length);
}

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'divyuzzzzzz@gmail.com',
        pass: 'divyansh@google'
    }
});

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
app.get("/singout", singout)
app.get("/login", login)
app.post("/login", login)
app.get("/fetch", fetch)

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
        token = generateSecureId(4);
        destination_mail_addr = req.body.email
        UNID = req.body.UNID
        let mailDetails = {
            from: 'divyuzzzzzz@gmail.com',
            to: `${destination_mail_addr}`,
            subject: 'Login Confirmation',
            text: `https://${req.url}/t?token=${token}&UNID=${UNID}`
        };  

        log(mailDetails)
        // mailTransporter.sendMail(mailDetails, function(err, data) {
        //     if(err) {
        //         console.log('Error Occurs');
        //     } else {
        //         console.log('Email sent successfully');
        //     }
        // });
    }

    let token = jwt.sign({ login: 'true' }, generateSecureId());
    // res.cookie('login',token,{expire:Date.now()+864000000}) //10 days
    res.render("login")
}

function singout(req,res)
{
    res.clearCookie('login')
    res.render("singout")
}

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
        let login_;
        try {
            login_ = jwt.decode(req.cookies.login)['login']
        } catch (error) {
            if(error.message == "Cannot read properties of null (reading 'login')")
            {
                res.redirect('/add_user')
            }
        }
        body = req.body
        sql = `INSERT INTO patient VALUES('${body.UNID}','${body.blood_group}','${body.age}','${body.gender}')`
        con.query(sql,(e,r)=>{
            log(e,r)
        })
    }
    res.render("patient")//ppo
}