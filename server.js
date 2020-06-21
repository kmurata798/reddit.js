// Initialize Express
const express = require('express')
const app = express()

// Middleware
// const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var exphbs = require('express-handlebars');
// const { Mongoose } = require('mongoose');

// Set db
require('./controllers/posts.js')(app);
require('./data/reddit-db');

app.use(bodyParser.json());
// // The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
// // Use the MethodOverride I imported to change POST requests to PUT requests
// app.use(methodOverride('_method'))
// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// Use handlebars to render
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
    return res.render('home');
    })

app.get('/posts/new', (req, res) => {
    res.render('posts-new');
})

// app.get('/posts', function(req, res) {
//     mongoose.model('posts').find(function(err, posts) {
//         res.send(posts);
//     });
// });

const port = 3000


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))