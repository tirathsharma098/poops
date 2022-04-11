const WrapAsync = require('../utilities/WrapAsync');
const User = require('../models/User');
const allCountryArray = require('../data/allCountryArray');

exports.registerRender = (req, res) => {
    res.render('users/register', {allCountryArray});
}

exports.registerPost =  WrapAsync(async (req, res) => {
    const {fullName, email, username, password, userAddress} = req.body;
    const newUser = new User({fullName: fullName, email : email, username: username, 'userAddress.country': userAddress.country, 'userAddress.state' : userAddress.state, 'userAddress.city' : userAddress.city, 'userAddress.street': userAddress.street})
    const userRegistered = await User.register(newUser, password);
    if(userRegistered){
        req.login(userRegistered, err => {
            if(err){
                req.flash('error', "User Logging In Failed");
                return res.redirect('login');
            }
        });
    }
    //console.log(userRegistered);
    req.flash('actionResponse', 'User Registered Successfully');
    res.redirect('/');
})

exports.loginRender = (req, res) => {
    res.render('users/login');
}

exports.loginPost = (req, res) => {
    let requestedPath = req.session.requestedPath || '/';
    delete req.session.requestedPath;
    req.flash('actionResponse','Logged In Successfully.');
    res.redirect(requestedPath);
}

exports.logout = (req, res) =>{
    req.logout();
    req.flash('actionResponse', 'Good Bye ):');
    res.redirect('/');
}