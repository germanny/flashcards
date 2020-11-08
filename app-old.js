const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const names = [
  {
    first: "jen",
    last: "germann"
  },
  {
    first: "artie",
    last: "germann"
  }
]

app.set('view engine', 'pug');

// app.use('/one', (req, res, next) => {
//   req.message = "This message made it.";
//   next();
// }); // this runs every time a request comes into the app

// app.use((req, res, next) => {
//   console.log(req.message);
//   next();
// }); // this runs every time a request comes into the app

// app.use((req, res, next) => {
//   console.log("Hello");
//   const err = new Error('Oh no!');
//   err.status = 500;
//   next(err);
// }); // this runs every time a request comes into the app



app.get('/', (req, res) => {
  const name = req.cookies.username;

  if (name) {
    res.render('index', { name });
  } else {
    res.redirect('/hello');
  }
});

app.get('/cards', (req, res) => {
  //res.render('view', {option params}, function(err, html));
  res.render('card', { prompt: "Who is buried in Grant's tomb?", hint: "Think about whose tomb it is.", names });

  // can also use .locals
  // res.locals.prompt = "Who is buried in Grant's tomb?";
});

app.get('/hello', (req, res) => { // serves the form
  const name = req.cookies.username;

  if (name) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});

app.post('/goodbye', (req, res) => { // serves the form
  res.clearCookie('username')
  res.redirect('/hello');
});

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

app.post('/hello', (req, res) => { // serves the form
  //console.dir(req.body);
  //res.json(req.body);
  res.cookie('username', req.body.username);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('The application is running on localhost:3000');
});
