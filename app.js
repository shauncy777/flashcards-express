
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const express = require("express");

const app = express();

// This is a built in middle-ware function that replaced body-parser
app.use(express.urlencoded({ extended: false}));
// This is required to read the cookie once it's set
app.use(cookieParser());
app.use('/static', express.static('public'));

// Sets the template engine to use and expects a 'views' directory in order to render templates as HTML
app.set('view engine', 'pug');

// In a professional setting developers will organize their code with routes in a separate file
const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);


app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');

});

app.listen(3000, () =>{
    console.log('The application is up and running on localhost: 3000!')

});