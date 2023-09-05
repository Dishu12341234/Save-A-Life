const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'divyuzzzzzz@gmail.com',
    pass: 'shdigfnkkbxuupvf'
  }
});

const mailOptions = {
  from: 'divyuzzzzzz@gmail.com',
  to: 'divyasnhundley@gmail.com',
  subject: 'Subject',
  text: 'Email content'
};



transporter.sendMail(mailOptions, function(error, info){
  if (error) {
 console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    // do something useful
  }
});