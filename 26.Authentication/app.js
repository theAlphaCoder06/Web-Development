require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2');
const findOrCreate = require('mongoose-findorcreate');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const password = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');

const port = 3000;
const app = express();
const secret = process.env.SECRET;

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb://127.0.0.1:27017/userDB", {useNewUrlParser: true});
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    facebookId: String,
    githubId: String,
    secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        username: user.username,
        picture: user.picture
      });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/secrets"
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);
  User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/github/secrets"
},
function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return done(err, user);
  });
}
));

app.get('/', (req, res)=>{
    res.render('home');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/google/secrets', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/secrets');
  });

app.get('/auth/facebook',
  passport.authenticate('facebook'));

  app.get('/auth/facebook/secrets',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/secrets');
  });

  app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'profile' ] }));

app.get('/auth/github/secrets', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/secrets');
  });

app.get('/login', (req, res)=>{
    res.render('login');
});
app.get('/register', (req, res)=>{
    res.render('register');
});

app.get('/secrets', (req, res)=>{
    User.find({"secret": {$ne: null}}, (err, foundUser)=>{
      if(err)console.log(err);
      else{
        if(foundUser){
          res.render("secrets", {userswithSecrets: foundUser});
        }
      }
    });
});

app.get("/logout", (req, res) => {
    req.logout(req.user, err => {
      if(err) return next(err);
      res.redirect("/");
    });
  });

app.get('/submit', (req, res)=>{
  if(req.isAuthenticated()){
    res.render("submit");
}
else{
    res.redirect("/login");
}
});


app.post('/register', (req, res)=>{
        User.register({username: req.body.username}, req.body.password, (err, user)=>{
            if(err){
                console.log(err);
                res.redirect("/register")
            }else{
                passport.authenticate('local')(req, res, ()=>{
                    res.redirect("/secrets");
                })
            }
        })
});


app.post('/login', (req, res)=>{
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    req.login(user, (err)=>{
        if(err){
            console.log(err);
        }else{
            passport.authenticate("local")(req, res, ()=>{
                res.redirect("/secrets");
            })
        }
    })
});

app.post("/submit", (req, res)=>{
  const submittedSecret = req.body.secret;

  User.findById(req.user.id, (err, foundUser)=>{
    if(err)console.log(err);
    else{
      foundUser.secret = submittedSecret;
      foundUser.save(()=>{
        res.redirect("/secrets");
      })
    }
  });
});

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})