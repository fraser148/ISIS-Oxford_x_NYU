const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const stripe = require('stripe')('sk_test_gvP8PV77RxyRsaWydycqXNoz00Vx4cNCu9'); // Add your Secret Key Here
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

const app = express();

// This will make our form data much more useful
app.use(bodyParser.urlencoded({ extended: true }));

// This will set express to render our views folder, then to render the files as normal html
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, './views')));

// Future Code Goes Here

// Environment variables
dotenv.config();

//var con = mysql.createConnection({
//  host: "localhost",
//  user: "root",
//  password: "",
//  database: "projec11_node"
//});

var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DATABASE
});


app.post("/charge", (req, res) => {
  try {
    var name = req.body.name;
    var email = req.body.email;
    var poem = req.body.poem;
    var age = req.body.age;
    var pronouns = req.body.pronouns;
    var course = req.body.course;
    var QID7 = req.body.QID7;
    var QID5 = req.body.QID5;
		var QID7 = req.body.QID7;
		var QID8 = req.body.QID8;
		var QID9 = req.body.QID9;
		var QID14 = req.body.QID14;
		var QID16 = req.body.QID16;
		var QID17 = req.body.QID17;
		var QID18 = req.body.QID18;
		var QID19 = req.body.QID19;
		var QID20 = req.body.QID20;
		var QID21 = req.body.QID21;
		var QID22 = req.body.QID22;
		var QID23 = req.body.QID23;
		var QID24 = req.body.QID24;
		var QID25 = req.body.QID25;
		var QID26 = req.body.QID26;
		var QID27 = req.body.QID27;
		var QID28 = req.body.QID28;
		var QID30 = req.body.QID30;
		var QID31 = req.body.QID31;
		var QID32 = req.body.QID32;
		var QID33 = req.body.QID33;
		var QID34 = req.body.QID34;
		var QID35 = req.body.QID35;
		var QID36 = req.body.QID36;
		var QID37 = req.body.QID37;
		var QID38 = req.body.QID38;
		var QID39 = req.body.QID39;
		var QID42 = req.body.QID42;
		var QID43 = req.body.QID43;
    var university = req.body.university;
    var sql = "INSERT INTO deets (name, poem,course, pronouns, email, age, university, QID7, QID8, QID9, QID14, QID16, QID17, QID18, QID19, QID20, QID21, QID22, QID23, QID24, QID25, QID26, QID27, QID28, QID30, QID31, QID32, QID33, QID34, QID35, QID36, QID37, QID38, QID39, QID42, QID43) VALUES ('" + name + "','" + poem +  "','" + course + "','" + pronouns + "','" + email +"','" + age +"','"  + university + "','" + QID7 + "','"  + QID8 + "','"  + QID9 + "','"  + QID14 + "','"  + QID16 + "','"  + QID17 + "','"  + QID18 + "','"  + QID19 + "','"  + QID20 + "','"  + QID21 + "','"  + QID22 + "','"  + QID23 + "','"  + QID24 + "','"  + QID25 + "','"  + QID26 + "','"  + QID27 + "','"  + QID28 + "','"  + QID30 + "','"  + QID31 + "','"  + QID32 + "','"  + QID33 + "','"  + QID34 + "','"  + QID35 + "','"  + QID36 + "','"  + QID37 + "','"  + QID38 + "','"  + QID39 + "','"  + QID42 + "','"  + QID43 +  "')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
    stripe.customers
    .create({
      name: req.body.name,
      email: req.body.email,
      source: req.body.stripeToken
    })
    .then(customer =>
      stripe.charges.create({
        amount: 300,
        currency: "gbp",
        customer: customer.id,
        description: "ISIS - " + name
      })
    )
    .then(() => res.render("completed.html", {email:email}))
    .catch(err => console.log(err));
    emailRecipient(email);
  } catch (err) {
    res.send(err);
  }
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// Email Our recipient

let transport = nodemailer.createTransport({
  host: 'nyuxoxford.isismagazine.org.uk',
  port: 465,
  auth: {
     user: 'isis@nyuxoxford.isismagazine.org.uk',
     pass: process.env.EMAIL
  }
});


function emailRecipient(email) {
  var html = fs.readFileSync("email.html","utf-8");
  const message = {
    from: 'isis@nyuxoxford.isismagazine.org.uk', // Sender address
    to: 'fjrennie1@outlook.com',         // List of recipients
    subject: 'You are signed up!', // Subject line
    html: html // HTML body
};
transport.sendMail(message, function(err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }
});
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server is running... http://localhost:3000'));