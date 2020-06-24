// Dotenv library used to encrypt passwords for security -> 'salting' a password
require('dotenv').config();
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
// Initialize Express
const express = require('express')
const app = express()

// Assign dependencies to variables so that their methods can be accessed anywhere in the project.
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var exphbs = require('express-handlebars');


// Database
require('./data/reddit-db');

// // The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser()); // Add this after you initialize express.
// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// Use handlebars to render
app.set('view engine', 'handlebars');

// Controllers
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);


const port = process.env.PORT || 3000


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

// Allow other files to access 'app' ==> (exporting app variable)
module.exports = app;