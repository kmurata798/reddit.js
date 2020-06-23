// Initialize Express
const express = require('express')
const app = express()

// Middleware
// const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var exphbs = require('express-handlebars');
// const { Mongoose } = require('mongoose');


// Database
require('./data/reddit-db');

// // The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());


// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// Use handlebars to render
app.set('view engine', 'handlebars');

// Controllers
require('./controllers/posts.js')(app);


const port = process.env.PORT || 3000


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

// Allow other files to access 'app' ==> (exporting app variable)
module.exports = app;