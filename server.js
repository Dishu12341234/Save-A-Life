const jwt = require('jsonwebtoken');
const smtp = require('smtp-protocol')
const mysql = require('mysql')
const crypto = require('crypto');
const express = require('express')
const session = require('express-session')
const { log } = require('console')
const notifier = require('node-notifier');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { networkInterfaces } = require('os');
const { findSourceMap } = require('module');


const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        if (net.family === familyV4Value && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}

function getProfile(req,res)
{
    isLoggedIn(req.cookies)
}

function sanitizeQuery(inputQuery) {
    // Remove potentially harmful characters or SQL keywords
    const sanitizedQuery = inputQuery.replace(/["'`;()<>]/g, '');
  
    return sanitizedQuery;
  }

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
app.set('view engine', 'pug')
app.use(express.static('views'))
app.use(bodyParser.urlencoded({ extended: true, }),);
app.use(session({ secret: generateSecureId(64), saveUninitialized: true, cookie: { maxAge: 1000 * 60 * 60 * 3 }, resave: false }))

for (let k in results) {
    var con = mysql.createConnection({
        host: results[k][0],
        user: 'divyansh_admin',
        password: 'divyansh'
    });
    log(results[k][0] + ' ------> ' + k)
    break;
}
con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');
    con.query('USE admin_divyansh;');
});

//End Points
app.get('/', home)
app.get('/t', verify)
app.get('/login', login)
app.get('/fetch', fetch)
app.post('/login', login)
app.post('/add', add_user)
app.get('/donate', donate)
app.get('/rm', removeUser)
app.post('/donate', donate)
app.get('/signUp', add_user)
app.get('/patient', patient)
app.get('/signOut', singout)
app.post('/patient', patient)
app.get('/get_donor', get_donors)
app.get('/get_patients', get_patients)
app.get('/sendLoginStatus', sendLoginStatus)
app.get('/getUserCredentials', getUserCredentials)
//Listner   
app.listen(80)

function getUserCredentials(req, res) {
    isLoggedIn(req.cookies, () => {
        let UNID = jwt.decode(req.cookies['UNID']);
        UNID = UNID['UNID']
        sql = sanitizeQuery(`SELECT * FROM profile WHERE UNID = '${UNID}'`)
        con.query(sql, (e, r) => {
            res.json(r)
        })
    }, () => {
        res.redirect('/login')
    })
}

function removeUser(req, res) {
    let UNID = req.query.rf
    sql = sanitizeQuery(`DELETE FROM profile WHERE UNID = '${UNID}'`)

    con.query(sql, (e, r) => { log(e, r) })
    res.render('index')

}

//An endPoint for frontend to get the login status
function sendLoginStatus(req, res) {
    isLoggedIn(req.cookies, () => {
        log('s')
        res.send(true);
    },
        () => {
            res.send(false)
        });
}

//Send the mail for login and signin
function send_mail(res, mailOptions, token = null) {
    transporter.sendMail(mailOptions).then(function (email) {
        log('mail send', email.messageId)
        if (token != (null || undefined))
            res.cookie('token', token)
        res.render('postLogin')
        return
    }).catch(function (exception) {
        log('err' + exception)
        res.render('login')
    });;
}

//Get the donor list
function get_donors(req, res) {
    con.query(sanitizeQuery('SELECT * FROM donor   INNER JOIN profile ON donor.UNID = profile.UNID'), (e, r) => {
        res.json(r)
    })
}


function verify(req, res) {
    if (req.query.token === req.cookies.token && req.query.token != undefined) // The user is now logged in
    {
        const token = jwt.sign({ UNID: req.query.UNID }, generateSecureId(32))
        res.cookie('UNID', token)
        res.clearCookie('token')

        con.query(sanitizeQuery(`UPDATE profile SET login='true' WHERE UNID = '${req.query.UNID}'`), (e, r) => {

        })
    }
    res.redirect('/fetch')
}

function get_patients(req, res) {
    con.query(sanitizeQuery('SELECT * FROM patient INNER JOIN profile ON patient.UNID = profile.UNID'), (e, r) => {

        res.json(r)
    })
}

//Fetch : to check if the user is logged in or not 
function fetch(req, res) {
    try {
        const UNID = jwt.decode(req.cookies['UNID'])['UNID']
        con.query(sanitizeQuery(`SELECT * FROM profile WHERE UNID = '${UNID}' `), (e, r) => {

            res.redirect('/')
        })
    } catch (error) {
        res.redirect('/login')
        return;
    }
};

//Check if the user is logged in or not
function isLoggedIn(PUNID, cb = function () { }, scb = function () { }) {//Parameter UNID
    let login = false
    try {

        let UNID = jwt.decode(PUNID['UNID']);
        UNID = UNID['UNID']
        let sql = sanitizeQuery(`SELECT login FROM profile WHERE UNID = '${UNID}'`)
        con.query(sql, (e, r) => {
            login = r[0]['login']
            if (login)
                cb()
            else
                scb()
        })

    } catch (error) {
        scb()
        return false;
    }
}

//Login
function login(req, res) {
    if (req.method == 'POST') {
        //Varibles
        let host = (req.rawHeaders[1])
        let UNID = req.body.UNID
        let email = req.body.email
        let token = jwt.sign({ login: 'true' }, generateSecureId(128));

        //Mail options
        const mailOptions = {
            from: 'divyuzzzzzz@gmail.com',
            to: `${email}`,
            subject: 'Verificatiion',
            html: ` 
            <!DOCTYPE html>
            <html lang='en'>
            <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Document</title>
            </head>
            <body style='background-color:#aeaeae;border-radius:20px;'>
            <h1 style = 'background-color:#2e70af;border-radius:20px;color:white;'>Save A Life | Verification</h1>
            <a style='background-color:#2e70af;padding:10px;border-radius:10px;color:white;text-decoration:none;' href = 'http://${host}/t?token=${token}&UNID=${UNID}'>Verify</a>
            <br>
            <br>
            <br>
            </body>
            </html>`
        };
        //Sending email
        send_mail(res, mailOptions, token)
    }
    else {
        res.render('login')
    }
}

//Signout
function singout(req, res) {
    for (x in req.cookies) {
        res.clearCookie(x)
    }
    res.render('singout')
}

//Home
function home(req, res) {
    con.query('SELECT * FROM profile;', (e, r) => {
        res.render('index')
    })
}

//Add user
function add_user(req, res) {
    if (req.method == 'POST') {
        let body = req.body
        let unid = generateSecureId(4)
        let sql = sanitizeQuery(`INSERT INTO profile VALUES('${body.name}' , '${body.city}','${body.contact}' , '${unid}','false','${body.email}','${Date().toLocaleUpperCase()}');`)
        con.query(sql, (e, r) => {//Succes
            log(e, r)
            let host = (req.rawHeaders[1])
            const mailOptions = {
                from: 'divyuzzzzzz@gmail.com',
                to: `${body.email}`,
                subject: 'Verificatiion',
                html: ` 
                <!DOCTYPE html>
                <html lang='en'>
                <head>
                <meta charset='UTF-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <title>Document</title>
                </head>
                <body style='background-color:#aeaeae;border-radius:20px;'>
                <h1 style = 'background-color:#2e70af;border-radius:20px;color:white;'>Save A Life | SignIn Succes</h1>
                <p>Your UNID is ${unid}</p>
                <p>Wasn't you?</p>
                <a href='http://${host}/rm?rf=${unid}'>Remove Account</a>
                </body>
                </html>`
            };
            send_mail(res, mailOptions)
        })
    }
    else
        res.render('add')
}

//Donate
function donate(req, res) {
    if (req.method == 'POST') {
        isLoggedIn(req.cookies, () => {
            body = req.body
            sql = sanitizeQuery(`INSERT INTO donor VALUES('${body.UNID}','${body.blood_group}','${body.age}','${body.gender}')`)
            con.query(sql, (e, r) => {

                res.redirect('/donate')

            })
        }, () => {
            res.redirect('/login')
        })

    }
    else
        res.render('donate')
}

//Patient
function patient(req, res) {
    body = req.body
    if (req.method === 'POST') {
        isLoggedIn(req.cookies, () => {
            sql = sanitizeQuery(`INSERT INTO patient VALUES('${body.UNID}','${body.blood_group}','${body.age}','${body.gender}')`)
            con.query(sql, (e, r) => {

                res.redirect('/donate')
            })
        }, () => {
            res.redirect('/login')
        })

    }
    else
        res.render('patient')//ppo
}