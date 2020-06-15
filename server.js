const express = require('express')
const app = express()
// const methodOverride = require('method-override')
// const bodyParser = require('body-parser');
var exphbs = require('express-handlebars');


// // The following line must appear AFTER const app = express() and before your routes!
// app.use(bodyParser.urlencoded({ extended: true }));
// // Use the MethodOverride I imported to change POST requests to PUT requests
// app.use(methodOverride('_method'))
// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// Use handlebars to render
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    return res.render('home');
    })

const port = 3000


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))