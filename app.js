if (process.env.NODE_ENV!= 'production') {
  require('dotenv').config()
}
const express = require('express');
const app = express();  
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./router/router');
const path = require('path');
const engine = require('ejs-mate');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const Admin = require('./model/admin');
const expressError = require('./utils/expressErr');
const helmet = require('helmet');

async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
  } catch (err) {
    console.log(err);
  }
}

main().then(() => {
  console.log('database connected');
}).catch(err => console.log(err));

// use and set middleware
app.set('view engine', 'ejs');
app.set('views' , path.join(__dirname , '/views'))
app.use(express.static(path.join(__dirname, '/public')));
app.engine('ejs', engine);
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

 console.log(__dirname);
const sessionOptions = {
  secret: process.env.SESSION_SECRECT, 
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) // 1 day
  }
};

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());



app.use('/', router);


// page not found
app.all('/*', (req, res, next) => {
  next(new expressError(404, 'Page not found'));
});

app.use((err, req, res, next) => {
  let { status = 500, message = 'Something wrong with the server' } = err;
  res.status(status).json({
    status,
    message
  });

});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});