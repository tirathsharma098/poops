const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const User = require('./models/User.js');
const passport = require('passport');
const LocalStrategy = require('passport-local');


const AppError = require('./utilities/AppError');
const allPortalsRoute = require('./routes/allPortals');
const portalsDetailsRoute = require('./routes/portalsDetails');
const portalsReviewsRoute = require('./routes/portalsReviews.js')
const homepageRoute = require('./routes/homepage.js');
const usersRoute = require('./routes/users.js');

const sessionConfig = {
  secret : 'tirath@sonata@7895@9191',
  saveUninitialized : true,
  resave : true,
  cookie : {
    httpOnly : true,
    maxAge : 1000 * 60 * 60 * 24 *15 ,
    signed : true
  }
}

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname,'./public')));
app.use(express.urlencoded({extended:true}));
app.use(session(sessionConfig));
app.use(methodOverride('_method'));
app.use(flash());

    //  Connecting With DataBase
    main().catch(err => console.log(err, 'Error Occurred While Connecting to DB'));

    async function main() {
      await mongoose.connect('mongodb://localhost:27017/poops');
      console.log('Connected to database Successfully');
    }

// PASSPORT
app.use( passport.initialize() );
app.use( passport.session() );
passport.use( new LocalStrategy( User.authenticate() ) );
passport.serializeUser( User.serializeUser() );
passport.deserializeUser( User.deserializeUser() );

// passing FLASH messages
app.use((req, res, next) => {
  res.locals.message = req.flash('actionResponse');
  res.locals.error = req.flash('error');;
  res.locals.currentUser = req.user;
  next();
})

// Here are all Our Routes 
app.use('/', homepageRoute);
// USER INTERACTION ROUTE
app.use('/users', usersRoute );
// Creating New portal, Searching portal and Showing all portals after search
app.use('/portals', allPortalsRoute);
// Displaying particular portal, Editing it and deleting it 
app.use('/portals/details', portalsDetailsRoute);
// Making Review for portal and deleting review
app.use('/portals/reviews', portalsReviewsRoute);

// Page Not found Handler
app.all('*', (req, res, next) => {
  throw new AppError('Ohhhh OO!!! Page Not Found Which you are looking For', 400);
  res.send('It will not execute');
})

// Custom Error Handler
app.use((err, req, res, next) => {
  const {status=500, message = "Some Unknown Error Occured"} = err;
  res.status(status).render('error.ejs', {status, message});
})

app.listen(3000, ()=>{
    console.log('Started listining to port 3000');
})