const express = require('express');
const path=require('path');
const exphbs = require('express-handlebars');
const methodOveride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport=require('passport');
const mongoose = require('mongoose');

const app = express();

//load routes
const ideas =require('./routes/ideas');
const users=require('./routes/users');

//Passport Config
require('./config/passport')(passport);

//Connect to mongoose, local db or mLab...
mongoose.connect('mongodb://localhost/practice-db')
    .then(() => {
        console.log('MongoDB Connected...')
    })
    .catch(error => {
        console.log(err)
    });



//Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

// parse application/json
app.use(bodyParser.json());

//Method override middleware
app.use(methodOveride('_method'));

//Express-session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Passport middleware init. Right after expression-session
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//Index Route get, post, put, delete
app.get('/', (req, res) => { // '/' is equal to 'localhost:port/'
    const title = 'Welcome';
    res.render('index', {
        title: title
    });
});
//About Route
app.get('/about', (req, res) => {
    res.render('about');
});

//use routes
app.use('/ideas',ideas);
app.use('/users',users);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});