import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import expressLayout from "express-ejs-layouts";
import flash from "connect-flash";
import session from "express-session";
import passport from "passport";

config();

const app = express();

//EJS
app.use(expressLayout);
app.set("view engine", "ejs");

// BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Passport config
// require("./config/passport")(passport);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

const PORT = process.env.PORT || 500;
app.get("/", (req, res) => {
  res.json({ response: true });
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));
