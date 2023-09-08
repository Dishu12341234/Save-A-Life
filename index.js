const nodemailer = require('nodemailer')
const { log } = require('console')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'divyuzzzzzz@gmail.com',
      pass: 'shdigfnkkbxuupvf'
    }
});

const mailOptions = {
    from: 'divyuzzzzzz@gmail.com',
    to: `divyasnhundley@gmail.com`,
    subject: 'Verificatiion',
    html: ` 
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    </head>
    <body style='background-color:#aeaeae;border-radius:20px;'>
    <h1 style = 'background-color:#2e70af;border-radius:20px;color:white;'>Save A Life | Verification</h1>
    <a style='background-color:#2e70af;padding:10px;border-radius:10px;color:white;text-decoration:none;' href = ''>Verify</a>
    <br>
    <br>
    <br>
    </body>
    </html>`
};
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
