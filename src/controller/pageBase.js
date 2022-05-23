var passport = require("passport");
let parametres = require("../model/parametres.js");

exports.getHomepage = (req, res, next) => {
  res.render("index", {});
};
exports.postHomepage = (req, res, next) => {
  res.render("index", {});
};

//////////// LOGIN INFO

exports.getSigninPage = (req, res, next) => {
  res.render("sign in", {});
};

exports.postSignin = (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("index");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.render("formulaire");
    });
  })(req, res, next);
};

/////////// Registers FORM input INFO into DB

exports.getFormulaire = (req, res, next) => {
  res.render("formulaire", {});
};
exports.postFormulaire = async (req, res, next) => {
  await parametres.postFormulaire(
    req.body.salinite,
    req.body.no3,
    req.body.po4,
    req.body.alcalinite,
    req.body.calcium,
    req.body.magnesium,
    req.body.ph
  );
  res.render("formulaire", {});
};

/////////// AFFICHE items from list to the AFFICHAGE Page

exports.getAffichage = async (req, res, next) => {
  const lesParametres = await parametres.getAffichage();
  res.render("affichage", {
    Parametres: lesParametres,
  });
};

exports.postAffichage = async (req, res, next) => {
  console.log("deleteButton: " + req.body.deleteButton);
  await parametres.delete(req.body.deleteButton);

  // Afficher whats left after delete
  const lesParametres = await parametres.getAffichage();
  res.render("affichage", {
    Parametres: lesParametres,
  });
};

//////////// CONCLUSION Page

exports.getunParametre = async (req, res, next) => {
  const lesParametres = await parametres.getAffichage();
  res.render("unParametre", {
    Parametres: lesParametres,
  });
};
