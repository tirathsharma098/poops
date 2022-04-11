
exports.validateUser = (req, res, next) => {
    if(!req.isAuthenticated()){
        delete req.session.requestedPath;
        req.session.requestedPath = req.originalUrl;
        req.flash('error', "You Should LogIn First");
        return res.redirect('/users/login');
    }
    next();
}
