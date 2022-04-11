const express = require('express');
const router = express.Router();
const passport = require('passport');
const {registerRender, registerPost, loginRender, loginPost, logout} = require('../controllers/users.js')

router.route('/register')
    .get(registerRender)
    .post(registerPost)


router.route('/login')
    .get(loginRender)
    .post( passport.authenticate('local', {failureFlash: true, failureRedirect: 'login'}), loginPost)

router.route('/logout')
    .get(logout)

module.exports = router;