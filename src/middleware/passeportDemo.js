let User = require("../model/User.js");

module.exports = function (passport, Strategy) {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(
    new Strategy({}, async function (username, password, done) {
      let user = await User.findOne({
        where: {
          userName: username,
        },
      });
      if (user == null) {
        return done(null, false, { message: "Incorrect email." });
      }
      if (!(user.password == password)) {
        // !!!!! VRAIMENT PAS SECURITAIRE!!!!!!!! IL FAUT AJOUTER DE L'ENCRYPTION !!!!!
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    })
  );
};
