const express = require("express");
let session = require("express-session");
let passport = require("passport");

let route = require("./src/routes/pageBase.js");
let db = require("./src/model/db.js");
let User = require("./src/model/User.js");
let passportMiddleware = require("./src/middleware/passeportDemo.js");
let LocalStrategy = require("passport-local").Strategy;
const app = express();
const port = 3001;

// ICI les middleware !
app.set("view engine", "pug");
app.use(express.static("public"));

// get et post
app.use(express.json());
app.use(express.urlencoded());

// Session avec notre cle
app.use(
  session({
    secret: "fkladjsf9ads08f7391r48fhjeoqr3;fnvhv134789fy3o149hfr34",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());
passportMiddleware(passport, LocalStrategy);

app.use(route); // Must be after PASSPORT

(async () => {
  await db.sequelize.sync({ force: false }); // Change to True to up-date new DB Than FALSE to keep it
})();

// Server Start
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// dataConnect().then(() => console.log("fin"));
