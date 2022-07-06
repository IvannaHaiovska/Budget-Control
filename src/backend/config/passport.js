const passport = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

const dbConn = require('./db.config');
let Users;
dbConn.query('SELECT * FROM budgetControl.users', function (error, results) {
    if (error) throw error;
  Users = results;
  });

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, cb) {
    //Assume there is a DB module pproviding a global UserModel

   Users.map(user => {
    if(user.email === email){
        if (user.password != password || user.email != email) {
          return cb(null, false, {
            message: 'Incorrect email or password.'
          });
        }

        return cb(null, user, {
          message: 'Logged In Successfully'
        });
      }
      })
  }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
  },
  function (jwtPayload, cb) {
    //find the user in db if needed
    return Users.findOneById(jwtPayload.user.id)
      .then(user => {
        return cb(null, user);
      })
      .catch(err => {
        return cb(err);
      });
  }
));
