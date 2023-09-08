const fs                = require("fs")    
const jwt               = require('jsonwebtoken');
const smtp              = require('smtp-protocol')
const mysql             = require("mysql")
const crypto            = require('crypto');
const express           = require("express") 
const session           = require('express-session')
const { log }           = require("console")
const nodemailer        = require('nodemailer');
const bodyParser        = require("body-parser")
const cookieParser      = require("cookie-parser")  

const app = express()

//Genertaing A random Key
function generateSecureId(length = 16) {
    if (length <= 0 || typeof length !== 'number') {
        throw new Error('Invalid length for secure ID'); 
    }
    
    const bytes = crypto.randomBytes(Math.ceil(length / 2)); 
    return bytes.toString('hex').slice(0, length);
}

//Gmail transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'divyuzzzzzz@gmail.com',
      pass: 'shdigfnkkbxuupvf'
    }
});

//App specified stuff
app.use(cookieParser());
app.use(bodyParser.json());
app.set("view engine", "pug")
app.use(express.static("views"))
app.use(bodyParser.urlencoded({extended: true,}),);
app.use(session({secret:generateSecureId(64),saveUninitialized:true,cookie : {maxAge:1000*60*60*3},resave:false}))

//MySQL connection
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

//End Points
app.get("/", home)
app.get('/t',verify)
app.get("/login", login)
app.get("/fetch", fetch)
app.post("/login", login)
app.post("/add", add_user)
app.get("/donate", donate)
app.post("/donate", donate) 
app.get("/patient", patient)
app.get("/singout", singout)
app.post("/patient", patient)
app.get("/add_user", add_user)
app.get('/get_donor',get_donors)
app.get('/get_patients',get_patients)

function get_donors(req,res)
{
    con.query('SELECT * FROM donor',(e,r)=>{
        res.json(r)
    })
}

function getLoginState(cookiesr)
{
    let a = cookiesr['login']
    return a
}

//Listner
app.listen(80)

function verify(req,res) {
    if(req.query.token === req.cookies.token && req.query.token != undefined)
    {
        const token = jwt.sign({UNID:req.query.UNID},generateSecureId(32))
        res.cookie('UNID',token)
        getLoginState(req.cookies)
        res.clearCookie('token')
    }
    res.redirect('/fetch')
}

function get_patients(req,res)
{
    con.query('SELECT * FROM patient',(e,r)=>{
        res.json(r)
    })
}

//Fetch : to check if the user is logged in or not 
function fetch(req,res)
{   
    try {
        const UNID = jwt.decode(req.cookies['UNID'])['UNID']
        con.query(`SELECT * FROM profile WHERE UNID = '${UNID}' `,(e,r)=>{
            log(e,r)
            res.redirect('/')
        })
    } catch (error) {
        log(error)
        res.redirect('/login')
        return;
    }
};


//Login
function login(req,res)
{   
    if(req.method == "POST")
    {   
        //Varibles
        let host  = (req.rawHeaders[1])
        let UNID  = req.body.UNID
        let email = req.body.email
        let token = jwt.sign({ login: 'true'}, generateSecureId(128));
        
        //Mail options
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
            <a style='bacground-color:#ff3e3f;padding:10px;border-radius:10px;' href = 'http://${host}/t?token=${token}&UNID=${UNID}'>Verify</a>
            <br>
            <br>
            <br>
            </body>
            </html>`
        };
        log('ss')
        //Sending email
        transporter.sendMail(mailOptions).then(function (email) {
            log('mail send',email.messageId)
            res.cookie('token',token)
            log(getLoginState(token))
            res.redirect("/")
            return
        }).catch(function (exception) {
            log('err'+exception)
        });;
    }
    else
    {
        res.render('login')
    }
}

//Signout
function singout(req,res)
{
    for(x in req.cookies)
    {
        res.clearCookie(x)
    }
    res.render("singout")
}

//Home
function home(req, res) {
    con.query("SELECT * FROM profile;", (e, r) => {
        // console.log(r, e);
        res.render("index")
    }) 
} 

//Add user
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

//Donate
function donate(req,res)
{
    if(req.method == "POST")
    {
        // return;
        body = req.body
        sql = `INSERT INTO donor VALUES('${body.UNID}','${body.blood_group}','${body.age}','${body.gender}')`
        con.query(sql,(e,r)=>{
            log(e,r)
            
        })
    }
    res.render("donate")
}

//Patient
function patient(req,res)
{
    body = req.body
    if(req.method === 'POST')
    {
        sql = `INSERT INTO patient VALUES('${body.UNID}','${body.blood_group}','${body.age}','${body.gender}')`
        con.query(sql,(e,r)=>{
            log(e,r)
        })
    }
    res.render("patient")//ppo
}