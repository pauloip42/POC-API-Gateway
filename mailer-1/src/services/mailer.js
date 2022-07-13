"use strict";
require('dotenv').config();
const nodemailer = require("nodemailer");

const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
    const email = req.body.email;
    const message = req.body.message;
    console.log('Enviado para o serviço 1: ', message);

    const response = await sendEmail(email, message);

    res.status(200);
    res.json(response);
});

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(email, message) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Fred Foo 👻" <${process.env.EMAIL}>`, // sender address
    to: `${email}`, // list of receivers
    subject: "Hello ✔", // Subject line
    text: `${message}`, // plain text body
    html: "<b>Hello world?</b>", // html body
  });

//   console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//   console.log(info)
    return (nodemailer.getTestMessageUrl(info));
}

// sendEmail().catch(console.error);

module.exports = router;
