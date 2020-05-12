const router = require("express").Router();

const indexController = require('../controllers/index');

router.get("/", indexController.index);

router.get("/register", indexController.register);

router.post("/register", indexController.signUp);

router.get("/login", indexController.login);

router.post("/login", indexController.signIn);

router.get('/logout', indexController.logout);

router.get("/profile", indexController.isAuthenticated, (req, res, next) => {
    res.render('profile');
});

module.exports = router;