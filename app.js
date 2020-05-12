const path = require('path');
const express = require("express");
const morgan = require("morgan");
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const indexRoutes = require("./routes/index");
const sequelize = require('./util/database');
require('./passport/local-auth');
require('dotenv').config();

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.set("port", process.env.PORT || 8080);

app.use(morgan("dev"));

app.use(express.urlencoded({
    extended: false
}));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signUpMsg = req.flash('signUpMessage');
    app.locals.signInMsg = req.flash('signInMessage');
    next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", indexRoutes);

sequelize.sync()
    .then(() => {
        app.listen(app.get("port"), () => {
            console.log("Server on port : ", app.get("port"));
        });
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });