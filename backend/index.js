"use strict";

const compress = require("compression");
const express = require("express");
const bodyParser = require("body-parser");
const Promise = require("promise");

const FalcorServer = require("falcor-express");
const RouterFactory = require("./router-factory");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const flash = require("connect-flash");
const enforce = require("express-sslify");
const passwordless = require("./auth/passwordless");
const pg = require("pg");
const session = require("express-session");
const expressValidator = require("express-validator");

const account = require("./routes/account");

var pgSession = require("connect-pg-simple")(session);
var app = express();

app.use(
  session({
    store: new pgSession({
      pg: pg, // Use global pg-module
      conString: process.env.DATABASE_URL, // Connect using something else than default DATABASE_URL env variable
      tableName: "user_sessions", // Use another table-name than the default "session" one
    }),
    secret: process.env.COOKIE_SECRET,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  })
);

app.use(flash());
app.use(compress({ level: 9 }));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(".", express.static("public"));
passwordless(app);

app.use(
  expressValidator({
    customSanitizers: {
      toLowerCase: function (str) {
        return str.toLowerCase();
      },
    },
  })
);

app.get("*.js", function (req, res, next) {
  req.url = req.url + ".gz";
  res.set("Content-Encoding", "gzip");
  next();
});

app.get("*.css", function (req, res, next) {
  req.url = req.url + ".gz";
  res.set("Content-Encoding", "gzip");
  next();
});

app.use("/account", account);
app.use(
  "/model.json",
  FalcorServer.dataSourceRoute(function (req, res) {
    //console.log('/model.json', req.query);
    return RouterFactory(res.locals.user ? res.locals.user.id : null);
  })
);

app.get("/favicon.ico", function (req, res) {
  res.sendFile("favicon.ico", { root: "./backend/public" });
});

// app.get('/public/*', function(req, res){
//     res.sendFile(req.url, {root: './backend'});
// });

app.get("*", function (req, res) {
  var validation = req.flash("validation")[0],
    error = req.flash("passwordless")[0],
    success = req.flash("passwordless-success")[0],
    user =
      res.locals && res.locals.user
        ? {
            id: res.locals.user.id,
            email: res.locals.user.email,
          }
        : null;

  // var renderer = new ReactComponentRenderer(req.url, {
  //   user: user,
  //   validation: validation,
  //   error: error,
  //   success: success,
  // });

  // renderer.renderToString((reactHtml) => {
  //   res.render("index.ejs", {
  //     reactOutput: reactHtml,
  //     user: user,
  //     validation: validation,
  //     error: error,
  //     success: success,
  //   });
  // });
  res.render("index.ejs", {
    user: user,
    validation: validation,
    error: error,
    success: success,
  });
});

app.set("views", __dirname + "/views");

module.export = app.listen(process.env.PORT || 5000, function (err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log("running on localhost:" + (process.env.PORT || 5000));
});
