const jwt = require('jsonwebtoken');
// import passport and passport-jwt modules
const passport = require('passport');

exports.signin = (req, res, next) => {

  const {
    email,
    password
  } = req.body;

  passport.authenticate('local', {
      session: false
    }, (err, user, info) => {
      console.log(err);
      if (!user) {
        return res.status(400).json({
          message: info ? info.message : 'Login failed',
          user: user
        });
      }

      req.login(user, {
        session: false
      }, (err) => {
        if (err) {
          res.send(err);
        }
        if (user.email == email && user.password == password) {
          const token = jwt.sign({name: user}, 'secret', {
            expiresIn: 604800 // 1 week
          });

          return res.status(200).send({
            user,
            token
          });
        }
      });
    })
    (req, res, next);
}
