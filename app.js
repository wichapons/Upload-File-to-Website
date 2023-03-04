const path = require('path');

const express = require('express');

const userRoutes = require('./routes/users');
const db = require('./data/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));  //any files in the 'public' directory can be accessed by the client side of the application, such as HTML, CSS, and JavaScript files.
app.use('/uploadImages',express.static('uploadImages'));

app.use(userRoutes);

db.connectToDatabase().then(function () {
  app.listen(3000);
});


 