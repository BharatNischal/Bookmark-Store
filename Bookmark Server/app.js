const          express = require('express'),
              passport = require("passport"),
         localStrategy = require("passport-local"),
 passportLocalMongoose = require("passport-local-mongoose"),
            bookmarkRoute = require("./routes"),
                    db = require("./models/index"),
              session = require("express-session"),
            bodyParser = require("body-parser"),
                  cors = require("cors"),
                 async = require("async"),
                crypto = require("crypto"),
                path   = require("path"),
          mailFunction = require("./mail"),
                   app = express();

// Setting Up Dotenv for .env files environment variable
const dotenv = require('dotenv');
dotenv.config();

 app.use(cors({
   origin:['*'],
   methods:['GET','POST','PUT','DELETE'],
   credentials: true // enable set cookie
 }));

//Express session
app.use(session({
  secret:"Dogs are cute",
  resave:false,
  saveUninitialized:false
}));

//passport Auth setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());





app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//middleware to log curUser
app.use((req,res,next)=>{
  console.log(req.user);
  next();
});

app.post("/api/register",(req,res)=>{
  const {username,name,password} = req.body;
  db.User.register(new db.User({username,name}),password,(err,user)=>{
    if(err){
        console.log(err);
        res.json({err:err.message,success:false,user:undefined});
    }
    passport.authenticate("local")(req,res,()=>{
        res.json({
            success:true,
            user:req.user,
            msg: `You signed up successfully with username ${req.user.username}`
        });
    });
  });
});

//handling login logic
app.post("/api/login",passport.authenticate("local",{
      failureRedirect:"/api/err"
  }),(req,res)=>{
      res.json({
        success:true,
        msg:`You logged in successfully with username ${req.user.username}`,
        user:req.user
      });
});

// logout route
app.get("/api/logout",(req,res)=>{
  console.log("log out user",req.user);
  req.logout();
  res.json({success:true,msg:"You log out successfully!!!",user:undefined});
});

app.get("/api/err",(req,res)=>{
  res.json({success:false,msg:"error",user:req.user});
});


// forgot password
app.post('/api/forget', function(req, res, next) {
  console.log("Inside forgot route");
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      db.User.findOne({ username: req.body.username }, function(err, user) {
        if (!user) {
          return res.json({msg:"No account with that email address exists.",success:false});
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var fullUrl = `${req.protocol}://${req.get('host')}/reset/${token}`;
      const msg = {
        from: '"Bookmark Store" <nischalbharat4819@gmail.com>', // sender address (who sends)
        to: user.username, // list of receivers (who receives)
        subject: 'Password Reset', // Subject line
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                Please click on the following link, or paste this into your browser to complete the process:\n\n ${fullUrl} \n\n
                If you did not request this, please ignore this email and your password will remain unchanged.\nThis link is valid only for 1 hour`
      };

      mailFunction(msg,(err,info)=>{
        done(err,'done');
      });

    }
  ], function(err) {
    if (err)     res.json({msg:err.message,success:false});
    res.json({success:true,msg:"Mail has been Sent"});
  });
});

app.post('/api/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      db.User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          return res.json({msg:'Password reset token is invalid or has expired.'});
        }
          user.setPassword(req.body.password, function(err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function(err) {
              req.logIn(user, function(err) {
                done(err, user);
              });
            });
          })
      });
    },
    function(user, done) {
      const msg = {
        from: '"Bookmark store" <nischalbharat4819@gmail.com>', // sender address (who sends)
        to: user.username, // list of receivers (who receives)
        subject: 'Your password has been changed', // Subject line
        text: `This is a confirmation that the password for your account ${user.username} has just been changed. `
      };
      mailFunction(msg,(err,info)=>{
        done(err,'done');
      });
      res.json({msg:`Success! Your password for username has been changed.`,success:true});
    }
  ], function(err) {
    if(err){return res.json({msg:err.message,success:false});}
    res.json({msg:`Success! Your password for username has been changed.`,success:true});
  });
});



// User details

app.get('/api/user',(req,res)=>{
  res.json({user:req.user});
})

app.use("/api/bookmark",bookmarkRoute);

if (process.env.NODE_ENV === 'production') {
  console.log("Listening on port",8080);	  // Set static folder
  app.use(express.static(__dirname+'/../bookmark-client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..' , 'bookmark-client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 8080;
app.listen(port,()=>{
  console.log("Listening on port ",port);
});
