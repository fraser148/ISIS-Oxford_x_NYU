const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const stripe = require('stripe')('sk_test_gvP8PV77RxyRsaWydycqXNoz00Vx4cNCu9'); // Add your Secret Key Here

const app = express();

// This will make our form data much more useful
app.use(bodyParser.urlencoded({ extended: true }));

// This will set express to render our views folder, then to render the files as normal html
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, './views')));

// Future Code Goes Here

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "projec11_node"
});


app.post("/charge", (req, res) => {
  try {
    var name = req.body.name;
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
      .then(() => res.render("completed.html"))
      .catch(err => console.log(err));
    var university = req.body.university;
    var sql = "INSERT INTO deets (name, email, age, university) VALUES ('" + name + "', 'fjrennie1@outlook.com', 19, '" + university + "')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  } catch (err) {
    res.send(err);
  }
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server is running... http://localhost:3000'));