const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/user");

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findByPk(id)
        .then((user) => {
            done(null, user);
        })
        .catch((err) => {
            console.log(err);
        });
});

passport.use(
    "local-signup",
    new LocalStrategy({
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        (req, email, password, done) => {
            User.findOne({
                    where: {
                        email: email,
                    },
                })
                .then((user) => {
                    if (user) {
                        return done(
                            null,
                            false,
                            req.flash("signUpMessage", "The e-mail already taken.")
                        );
                    }
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            return User.create({
                                email: email,
                                password: hashedPassword,
                            });
                        }).then((user) => {
                            console.log(user);
                            done(null, user);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    )
);

passport.use(
    "local-signIn",
    new LocalStrategy({
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        (req, email, password, done) => {
            User.findOne({
                    where: {
                        email: email,
                    },
                })
                .then((user) => {
                    if (!user) {
                        return done(
                            null,
                            false,
                            req.flash("signInMessage", "Invalid e-mail."),
                        );
                    }
                    bcrypt.compare(password, user.password).then(isMatch => {
                        if (!isMatch) {
                            return done(
                                null,
                                false,
                                req.flash("signInMessage", "Invalid password")
                            );
                        }
                        done(null, user);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    )
);