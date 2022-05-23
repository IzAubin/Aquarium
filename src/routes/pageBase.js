var express = require("express");
var router = express.Router();
var pageBase = require("../controller/pageBase.js");

router.get("/", pageBase.getHomepage);

router.post("/signin", pageBase.postSignin);
router.get("/signin", pageBase.getSigninPage);

router.get("/formulaire", pageBase.getFormulaire);
router.post("/formulaire", pageBase.postFormulaire);

router.get("/affichage", pageBase.getAffichage);
router.post("/affichage", pageBase.postAffichage);

router.get("/unParametre", pageBase.getunParametre);

module.exports = router;
