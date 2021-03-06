const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Set your stripe private key here
const stripe = require('stripe')('sk_test_51HnOIGHFh0EYi2CVhNrGyoSxkcAR2Ic5oxKBrWXvU6jgmBHU4kfIBYjq07pD3WbOaU7p5WleVOxtQ4ygKlc8hBb700nNzRsOEp');
const app = express();
app.use(cors());
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.post('/charge', (req, res) => {
    console.log(req.body);
 
     stripe.charges.create({
        amount: parseInt(req.body.amount),
        currency: 'ngn',
        source: req.body.token,
        // capture: false,
    }).then(response => {
        res.send(response);
        // do something in success here
     }).catch(error => {
         res.send(error);
        // do something in error here
     });
});

app.use(function(err, req, res, next) {
        res.status(err.status || 500).json({ message: err.message });
      });
      
app.listen(port);
