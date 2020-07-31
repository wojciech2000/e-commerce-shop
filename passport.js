const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("./models/User");

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) token = req.cookies["access_token"];
  return token;
};

//authorization of routes
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: "secret",
    },
    (payload, done) => {
      User.findById({ _id: payload.sub }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        else return done(null, false);
      });
    }
  )
);

//use it after getting datas from login form
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      // something wrong with db
      if (err) return done(err, true);
      // user doesn't exist
      if (!user) return done(null, false);
      //found user
      user.comparePassword(password, done);
    });
  })
);
