const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const jade = require('jade')

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Constructing Classes/Models as well as passing it through a router:
app.get('/',(req, res, next) => {
  mongoose.model('User').find({}, (err, users) => {
    if (err) {return next(err); }
    res.render('index.jade', { users });
  }); 
});

// For creating my DB Schema:
mongoose.model('User', {
  name: String
});

mongoose.connect('mongodb://localhost/finstagram', (err) => {
  if (err) { throw err; }
  app.listen(8000);
  console.log('Ready on Port:8000')
});